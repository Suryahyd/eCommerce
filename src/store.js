import { configureStore, createSlice } from '@reduxjs/toolkit'

const bookstoreSlice = createSlice({
  name: 'bookstore',
  initialState: {
    user: null,
    activeCategory: 'All books',
    activeNav: 'Discover',
    query: '',
    cart: [],
    wishlist: [],
    cartOpen: false,
  },
  reducers: {
    signIn(state, action) {
      state.user = action.payload
    },
    signOut(state) {
      state.user = null
      state.cartOpen = false
    },
    setCategory(state, action) {
      state.activeCategory = action.payload
      state.activeNav = 'Discover'
    },
    setNavigation(state, action) {
      state.activeNav = action.payload
      state.activeCategory = 'All books'
    },
    setQuery(state, action) {
      state.query = action.payload
    },
    toggleWishlist(state, action) {
      const exists = state.wishlist.includes(action.payload)
      state.wishlist = exists
        ? state.wishlist.filter((id) => id !== action.payload)
        : [...state.wishlist, action.payload]
    },
    addToCart(state, action) {
      const book = state.cart.find((item) => item.id === action.payload)
      if (book) book.quantity += 1
      else state.cart.push({ id: action.payload, quantity: 1 })
    },
    updateQuantity(state, action) {
      const book = state.cart.find((item) => item.id === action.payload.id)
      if (!book) return
      if (action.payload.quantity < 1) {
        state.cart = state.cart.filter((item) => item.id !== action.payload.id)
      } else {
        book.quantity = action.payload.quantity
      }
    },
    setCartOpen(state, action) {
      state.cartOpen = action.payload
    },
  },
})

export const {
  addToCart,
  setCartOpen,
  setCategory,
  setNavigation,
  setQuery,
  signIn,
  signOut,
  toggleWishlist,
  updateQuantity,
} = bookstoreSlice.actions

export const store = configureStore({
  reducer: { bookstore: bookstoreSlice.reducer },
})
