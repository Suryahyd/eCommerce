# eCommerce

React UI application: a responsive bookstore storefront built with Vite and Redux Toolkit.

## Requirements

- Node.js 20.19+ or 22.12+
- npm (included with Node.js)
- Internet access to load book covers from Open Library and fonts from Google Fonts

The app uses React and React DOM, Redux Toolkit and React Redux for state management, and Lucide React for icons. Vite runs the development server and creates production builds. These packages are installed from `package.json`.

## Install and run

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite. To create a production build or run the linter:

```sh
npm run build
npm run lint
```

## Demo sign-in

Use the prefilled credentials: `surya@example.com` / `surya1234`, or choose **Explore as a guest**. Sign-in is a mock flow; no backend or real authentication is configured. The catalog, filters, wishlist, and shopping bag use mock data managed by Redux.
