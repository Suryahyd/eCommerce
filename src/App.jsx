import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  ArrowDownRight,
  ArrowRight,
  BookOpen,
  BookText,
  Check,
  ChevronDown,
  ChevronRight,
  Compass,
  Heart,
  LogOut,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  Sparkles,
  Star,
  Trash2,
  X,
} from 'lucide-react'
import { books, categories } from './books.js'
import {
  addToCart,
  setCartOpen,
  setCategory,
  setNavigation,
  setQuery,
  signIn,
  signOut,
  toggleWishlist,
  updateQuantity,
} from './store.js'
import './App.css'
import './MobileNav.css'

const coverUrl = (isbn) => `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`

function Brand({ compact = false }) {
  return (
    <a className={`brand${compact ? ' brand-compact' : ''}`} href="#discover" aria-label="Papertrail home">
      <span className="brand-mark"><BookOpen size={19} strokeWidth={2.2} /></span>
      <span>papertrail<span className="brand-period">.</span></span>
    </a>
  )
}

function LoginScreen() {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('surya@example.com')
  const [password, setPassword] = useState('surya1234')

  const enterStore = (event) => {
    event?.preventDefault()
    const name = email.split('@')[0].split(/[._-]/)[0]
    dispatch(signIn({ name: name.charAt(0).toUpperCase() + name.slice(1), email }))
  }

  return (
    <main className="login-page">
      <section className="login-panel">
        <Brand />
        <div className="login-content">
          <span className="eyebrow"><Sparkles size={14} /> A little more wonder</span>
          <h1>Your next chapter<br />starts <em>here.</em></h1>
          <p className="login-intro">A good book finds you at just the right time. Let’s find yours.</p>
          <form className="login-form" onSubmit={enterStore}>
            <label htmlFor="email">Email address</label>
            <input id="email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
            <div className="password-label"><label htmlFor="password">Password</label><button type="button" className="text-button">Forgot?</button></div>
            <input id="password" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} minLength={6} required />
            <button className="primary-button login-submit" type="submit">Sign in <ArrowRight size={17} /></button>
          </form>
          <p className="login-footnote">New around here? <button type="button" className="text-button" onClick={enterStore}>Explore as a guest</button></p>
          <div className="login-perks"><span><Check size={14} /> Free shipping over $35</span><span><Check size={14} /> Curated by real readers</span></div>
        </div>
        <div className="login-bottom"><span>Independent books, thoughtfully found.</span><span>© Papertrail Books</span></div>
      </section>
      <aside className="login-art">
        <div className="art-topline"><span>THE PAPERTRAIL EDIT</span><span>VOL. 04 &nbsp; / &nbsp; 2025</span></div>
        <div className="art-composition">
          <div className="art-sun" />
          <img className="login-cover" src={coverUrl('9780593652886')} alt="The Creative Act by Rick Rubin book cover" />
          <div className="art-note"><span>01 — JUST ADDED</span><strong>Make space<br />for a new idea.</strong><span>Our readers’ pick this week</span></div>
          <div className="art-sticker"><span>WELL<br />READ</span><Star size={17} fill="currentColor" /></div>
        </div>
        <div className="art-bottomline"><span>GOOD STORIES, FOUND HERE.</span><span>INDEPENDENTLY CURATED</span></div>
      </aside>
    </main>
  )
}

function Sidebar({ cartCount }) {
  const dispatch = useDispatch()
  const { activeNav, activeCategory, wishlist } = useSelector((state) => state.bookstore)
  const navItems = [
    { name: 'Discover', icon: Compass },
    { name: 'My wishlist', icon: Heart, count: wishlist.length },
    { name: 'Bestsellers', icon: Star },
    { name: 'New arrivals', icon: Sparkles },
  ]

  return (
    <aside className="sidebar">
      <Brand />
      <div className="side-label">YOUR BOOKSHOP</div>
      <nav className="side-nav" aria-label="Main navigation">
        {navItems.map(({ name, icon: Icon, count }) => (
          <button className={`side-link${activeNav === name ? ' selected' : ''}`} key={name} onClick={() => dispatch(setNavigation(name))}>
            <Icon size={18} strokeWidth={1.8} /><span>{name}</span>{count > 0 && <span className="side-count">{count}</span>}
          </button>
        ))}
      </nav>
      <div className="side-label categories-label">BROWSE BY GENRE</div>
      <nav className="genre-nav" aria-label="Book genres">
        {categories.map(({ name, count }) => (
          <button className={`genre-link${activeCategory === name && activeNav === 'Discover' ? ' selected' : ''}`} key={name} onClick={() => dispatch(setCategory(name))}>
            <span>{name}</span><span className="genre-count">{count}</span>
          </button>
        ))}
      </nav>
      <button className="sidebar-cart" onClick={() => dispatch(setCartOpen(true))}>
        <span className="cart-icon"><ShoppingBag size={17} /></span><span>Your bag</span><span className="bag-count">{cartCount}</span>
      </button>
      <div className="sidebar-note"><span className="note-sparkle"><Sparkles size={15} /></span><strong>Good things<br />take a page.</strong><span>Free delivery on orders over $35.</span><button onClick={() => dispatch(setNavigation('Discover'))}>Keep browsing <ArrowRight size={14} /></button></div>
      <div className="sidebar-caption">MADE FOR THE LOVE OF READING</div>
    </aside>
  )
}

function BookCard({ book }) {
  const dispatch = useDispatch()
  const { cart, wishlist } = useSelector((state) => state.bookstore)
  const isSaved = wishlist.includes(book.id)
  const quantity = cart.find((item) => item.id === book.id)?.quantity ?? 0

  return (
    <article className="book-card">
      <div className={`book-cover book-cover-${book.color}`}>
        <img src={coverUrl(book.isbn)} alt={`${book.title} book cover`} loading="lazy" onError={(event) => { event.currentTarget.style.display = 'none' }} />
        <span className="book-badge">{book.badge}</span>
        <button className={`save-button${isSaved ? ' is-saved' : ''}`} aria-label={isSaved ? `Remove ${book.title} from wishlist` : `Add ${book.title} to wishlist`} onClick={() => dispatch(toggleWishlist(book.id))}>
          <Heart size={16} fill={isSaved ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className="book-meta"><div className="book-copy"><h3>{book.title}</h3><p>{book.author}</p></div><span className="book-rating"><Star size={12} fill="currentColor" />{book.rating}</span></div>
      <div className="book-buy-row"><span className="book-price">${book.price.toFixed(2)}</span><button className={`add-button${quantity ? ' added' : ''}`} aria-label={`Add ${book.title} to bag`} onClick={() => dispatch(addToCart(book.id))}>{quantity ? <><Check size={15} /><span>{quantity}</span></> : <Plus size={17} />}</button></div>
    </article>
  )
}

function CartDrawer() {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.bookstore.cart)
  const cartBooks = cart.map((item) => ({ ...item, book: books.find((book) => book.id === item.id) })).filter((item) => item.book)
  const total = cartBooks.reduce((sum, item) => sum + item.book.price * item.quantity, 0)

  return (
    <div className="drawer-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) dispatch(setCartOpen(false)) }}>
      <aside className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title">
        <div className="drawer-heading"><div><span className="eyebrow">YOUR PAPER BAG</span><h2 id="cart-title">A good choice.</h2></div><button className="icon-button" aria-label="Close bag" onClick={() => dispatch(setCartOpen(false))}><X size={20} /></button></div>
        {cartBooks.length === 0 ? <div className="empty-cart"><span className="empty-icon"><ShoppingBag size={24} /></span><h3>It’s a little light in here.</h3><p>Find a story that feels like yours.</p><button className="primary-button" onClick={() => dispatch(setCartOpen(false))}>Browse books <ArrowRight size={16} /></button></div> : <>
          <div className="cart-list">{cartBooks.map(({ book, quantity }) => <div className="cart-item" key={book.id}><div className={`cart-thumb book-cover-${book.color}`}><img src={coverUrl(book.isbn)} alt="" /></div><div className="cart-item-info"><strong>{book.title}</strong><span>{book.author}</span><b>${(book.price * quantity).toFixed(2)}</b><div className="quantity-control"><button aria-label={`Remove one ${book.title}`} onClick={() => dispatch(updateQuantity({ id: book.id, quantity: quantity - 1 }))}><Minus size={13} /></button><span>{quantity}</span><button aria-label={`Add one ${book.title}`} onClick={() => dispatch(updateQuantity({ id: book.id, quantity: quantity + 1 }))}><Plus size={13} /></button></div></div><button className="remove-item" aria-label={`Remove ${book.title}`} onClick={() => dispatch(updateQuantity({ id: book.id, quantity: 0 }))}><Trash2 size={15} /></button></div>)}</div>
          <div className="cart-summary"><div><span>Subtotal</span><strong>${total.toFixed(2)}</strong></div><p>{total >= 35 ? 'Your order ships free. Nice.' : `$${(35 - total).toFixed(2)} away from free shipping.`}</p><button className="primary-button checkout-button" onClick={() => dispatch(setCartOpen(false))}>Continue to checkout <ArrowRight size={16} /></button><span className="checkout-note">Taxes and shipping calculated at checkout</span></div>
        </>}
      </aside>
    </div>
  )
}

function Dashboard() {
  const dispatch = useDispatch()
  const { user, activeCategory, activeNav, query, cart, wishlist, cartOpen } = useSelector((state) => state.bookstore)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const [sortOrder, setSortOrder] = useState('Featured')
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  let visibleBooks = books.filter((book) => {
    const matchesCategory = activeCategory === 'All books' || book.category === activeCategory
    const matchesQuery = `${book.title} ${book.author}`.toLowerCase().includes(query.toLowerCase())
    const matchesWishlist = activeNav !== 'My wishlist' || wishlist.includes(book.id)
    return matchesCategory && matchesQuery && matchesWishlist
  })
  if (activeNav === 'Bestsellers') visibleBooks = visibleBooks.filter((book) => book.badge === 'Bestseller')
  if (activeNav === 'New arrivals') visibleBooks = visibleBooks.filter((book) => ['Trending', 'Staff pick', 'Feel-good read'].includes(book.badge))
  if (sortOrder === 'Price: low to high') visibleBooks = [...visibleBooks].sort((a, b) => a.price - b.price)
  if (sortOrder === 'Top rated') visibleBooks = [...visibleBooks].sort((a, b) => b.rating - a.rating)

  const greetingName = user?.name || 'Reader'
  const listingTitle = activeNav === 'My wishlist' ? 'Saved for later' : activeNav === 'Bestsellers' ? 'Reader favorites' : activeNav === 'New arrivals' ? 'Fresh off the press' : activeCategory === 'All books' ? 'A few good reads' : `${activeCategory}, picked for you`

  return (
    <div className="store-layout">
      <Sidebar cartCount={cartCount} />
      <main className="store-main" id="discover">
        <header className="topbar">
          <div className="mobile-brand"><Brand compact /></div>
          <div className="topbar-crumb"><span>BOOKSHOP</span><ChevronRight size={13} /><span>DISCOVER</span></div>
          <div className="topbar-actions">
            <label className={`search-box${mobileSearchOpen ? ' search-open' : ''}`}><Search size={17} /><input aria-label="Search books or authors" placeholder="Search books, authors..." value={query} onChange={(event) => dispatch(setQuery(event.target.value))} /><kbd>⌘ K</kbd></label>
            <button className="mobile-search-toggle icon-button" aria-label="Search books" onClick={() => setMobileSearchOpen(!mobileSearchOpen)}>{mobileSearchOpen ? <X size={19} /> : <Search size={19} />}</button>
            <button className="top-cart" aria-label={`Open shopping bag, ${cartCount} items`} onClick={() => dispatch(setCartOpen(true))}><ShoppingBag size={19} /><span>Bag</span><b>{cartCount}</b></button>
            <button className="avatar-button" aria-label="Sign out" title="Sign out" onClick={() => dispatch(signOut())}>{greetingName.charAt(0)}<span className="avatar-status" /><span className="avatar-menu"><LogOut size={13} /></span></button>
          </div>
        </header>
        <nav className="mobile-navigation" aria-label="Bookshop views">
          {[['Discover', Compass], ['My wishlist', Heart], ['Bestsellers', Star], ['New arrivals', Sparkles]].map(([name, Icon]) => <button className={activeNav === name ? 'active' : ''} key={name} onClick={() => dispatch(setNavigation(name))}><Icon size={15} />{name}</button>)}
        </nav>
        <div className="store-content">
          <section className="welcome-row"><div><span className="eyebrow"><span className="eyebrow-dot" /> YOUR PERSONAL BOOKSHOP</span><h1>Morning, {greetingName}<span className="wave">.</span></h1><p>There’s a whole world between these covers.</p></div><button className="reading-streak"><span className="streak-icon"><BookText size={18} /></span><span><b>12 day streak</b><small>Keep your pages turning</small></span><ArrowDownRight size={17} /></button></section>
          <section className="feature-banner" aria-label="Featured book collection">
            <div className="feature-copy"><span className="feature-kicker"><Sparkles size={14} /> THE WEEKEND EDIT &nbsp; / &nbsp; 04</span><h2>Stories that<br />stay with you.</h2><p>Hand-picked pages for the curious, the dreamers, and everyone in between.</p><button onClick={() => dispatch(setNavigation('Bestsellers'))}>Explore the edit <ArrowRight size={16} /></button></div>
            <div className="feature-visual"><div className="feature-shape shape-one" /><div className="feature-shape shape-two" /><div className="feature-book-shadow" /><img src={coverUrl('9780525559474')} alt="The Midnight Library by Matt Haig" /><span className="feature-caption">A READER’S FAVORITE ↗</span><span className="feature-stamp">THE<br />GOOD<br />STUFF</span></div>
            <div className="feature-index"><span>01</span><span className="index-line" /><span>03</span></div>
          </section>
          <section className="category-strip" aria-label="Filter by genre">{categories.slice(0, 5).map(({ name }) => <button key={name} className={`category-chip${activeCategory === name && activeNav === 'Discover' ? ' active' : ''}`} onClick={() => dispatch(setCategory(name))}>{name}</button>)}<button className="category-more" onClick={() => dispatch(setCategory('Poetry'))}>More genres <ChevronDown size={14} /></button></section>
          <section className="book-section">
            <div className="section-heading"><div><span className="eyebrow">A GOOD PLACE TO START</span><h2>{listingTitle}<span className="heading-count">{String(visibleBooks.length).padStart(2, '0')}</span></h2></div><label className="sort-control"><span>Sort by</span><select aria-label="Sort books" value={sortOrder} onChange={(event) => setSortOrder(event.target.value)}><option>Featured</option><option>Price: low to high</option><option>Top rated</option></select></label></div>
            {visibleBooks.length ? <div className="book-grid">{visibleBooks.map((book) => <BookCard key={book.id} book={book} />)}</div> : <div className="empty-results"><span className="empty-icon"><BookOpen size={22} /></span><h3>No pages found just yet.</h3><p>Try another search or browse all of our books.</p><button onClick={() => { dispatch(setCategory('All books')); dispatch(setNavigation('Discover')); dispatch(setQuery('')) }}>See all books <ArrowRight size={15} /></button></div>}
          </section>
          <section className="reading-note"><span className="note-star"><Star size={16} fill="currentColor" /></span><p>“A reader lives a thousand lives before he dies.”</p><span>— George R. R. Martin</span><button aria-label="Browse fantasy books" onClick={() => dispatch(setCategory('Fantasy'))}><ArrowRight size={17} /></button></section>
          <footer className="store-footer"><Brand compact /><span>Independent books, thoughtfully found.</span><span>© 2025 Papertrail Books</span></footer>
        </div>
      </main>
      {cartOpen && <CartDrawer />}
    </div>
  )
}

export default function App() {
  const user = useSelector((state) => state.bookstore.user)
  return user ? <Dashboard /> : <LoginScreen />
}
