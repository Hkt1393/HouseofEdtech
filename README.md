# 🎬 AURA - Movie Streaming Application

AURA is a premium movie streaming application built with React Native and Expo as part of the House of Edtech React Native Assignment. The project focuses on delivering a polished OTT-style experience inspired by platforms such as Disney+ Hotstar and AITV, while following production-oriented engineering practices like strict TypeScript, reusable components, repository-based data access, and a theme-driven design system.

The application showcases a modern mobile streaming experience with a dynamic Home screen, cinematic Hero banner, movie discovery flows, search, rich movie details, profile management, offline handling, and polished feedback states. The goal is not only to build attractive UI, but also to structure the project in a way that is scalable, maintainable, and easy to extend.

From an engineering perspective, the project is organized around MVVM architecture, Context-powered global providers, typed navigation, reusable UI primitives, and a centralized API layer for TMDB integration. This keeps data flow predictable and allows the view layer to remain focused on presentation.

## 🖼️ Screenshots

### Splash
![Splash Screen](docs/screenshots/splash.png)

### Home
![Home Screen](docs/screenshots/home.png)

### Movie Details
![Movie Details Screen](docs/screenshots/movie-details.png)

### Search
![Search Screen](docs/screenshots/search.png)

### Profile
![Profile Screen](docs/screenshots/profile.png)

### Offline Screen
![Offline Screen](docs/screenshots/offline.png)

### Skeleton Loader
![Skeleton Loader](docs/screenshots/skeleton-loader.png)

## ✨ Features

### Movie Experience
- Dynamic Home screen with a premium Hero banner
- Multiple movie categories powered by TMDB
- Genre filter chips for quick discovery
- Search movies with a dedicated search experience
- Rich Movie Detail screen with cast, similar movies, and recommendations
- Floating bottom tab bar for Home, Search, and Profile

### User Experience
- Animated splash screen
- Skeleton loaders for key loading states
- Empty states and error states
- Offline detection with global connectivity feedback
- Global toast messages for request feedback
- Pull-to-refresh interactions
- Dark and light theme support
- Responsive layouts for phones and tablets

### Architecture
- MVVM-based screen structure
- Repository pattern for API and data abstraction
- Context API for theme, toast, and network state
- Reusable component architecture with shared base, layout, feedback, and UI layers
- Typed navigation with React Navigation Native Stack and Bottom Tabs

### Performance
- React.memo, useMemo, and useCallback across critical flows
- Expo Image integration with prefetching and transitions
- Repository-level caching for repeated requests
- FlatList optimization for large and horizontally scrolling content
- Skeleton-first loading to reduce layout shifts

## 🧰 Tech Stack

| Category | Technology |
| --- | --- |
| Framework | React Native `0.81.5` |
| App Runtime | Expo Managed Workflow `SDK 54` |
| Language | TypeScript `Strict Mode` |
| Styling | NativeWind + Theme System |
| Navigation | React Navigation `Native Stack + Bottom Tabs` |
| Images | Expo Image |
| Animation | React Native Reanimated |
| Networking | Expo Network |
| Video | Expo Video |
| State / Global Context | Context API |
| Architecture | MVVM + Repository Pattern |
| Data Source | TMDB API |

## 📁 Folder Structure

```text
src
├── assets
│   ├── icons
│   ├── illustrations
│   └── images
├── components
│   ├── base
│   ├── feedback
│   ├── layout
│   └── ui
├── constants
├── hooks
├── navigation
├── providers
├── screens
│   ├── Details
│   ├── Downloads
│   ├── Home
│   ├── Login
│   ├── Profile
│   ├── Search
│   ├── SectionMovies
│   ├── Settings
│   └── Splash
├── services
│   ├── api
│   ├── mock
│   └── repositories
├── store
├── theme
├── types
└── utils
```

## 🏗️ Architecture Overview

The project follows an MVVM-inspired structure for every screen:

- `index.ts` exports the screen entry
- `container.tsx` handles state, effects, data mapping, and user actions
- `view.tsx` stays focused on rendering and presentation
- `styles.ts` contains style definitions and dynamic style helpers

### Screen-Level Flow

```text
Navigation Route
      │
      ▼
Screen Entry (index.ts)
      │
      ▼
Container (state, handlers, mapping)
      │
      ▼
View (pure presentation)
```

### Data Flow

```text
Screen
  ↓
Container
  ↓
Repository
  ↓
API Client
  ↓
TMDB API
```

### Provider Flow

```text
App
  ↓
AppProviders
  ├── ThemeProvider
  ├── ToastProvider
  └── NetworkProvider
```

### How Data Moves Through the App

1. A screen route mounts its `container.tsx`.
2. The container requests data through a repository.
3. The repository talks to the shared API client and maps remote data into app-friendly models.
4. The container converts those models into view props.
5. The `view.tsx` renders the UI using reusable components only.

This separation keeps the UI layer clean, avoids direct API calls inside screens, and makes the app easier to extend and test.

## ✅ Assignment Requirement Checklist

| Requirement | Status |
| --- | --- |
| Expo Managed Workflow | ✅ |
| TypeScript | ✅ |
| NativeWind | ✅ |
| Bottom Tabs | ✅ |
| Native Stack | ✅ |
| Animated Splash Screen | ✅ |
| Hero Banner | ✅ |
| Dynamic Home Screen | ✅ |
| Search Screen | ✅ |
| Movie Detail Screen | ✅ |
| Profile Screen | ✅ |
| Skeleton Loader | ✅ |
| Error State | ✅ |
| Empty State | ✅ |
| Pull To Refresh | ✅ |
| Infinite Horizontal Pagination | ✅ |
| Offline Support | ✅ |
| Toast Messages | ✅ |
| Dark & Light Theme | ✅ |
| Reusable Components | ✅ |
| MVVM Architecture | ✅ |
| Repository Pattern | ✅ |

## ⚡ Performance Optimizations

- `React.memo` is used across reusable components and screen exports to reduce unnecessary re-renders.
- `useMemo` is used for derived props, style calculations, mapped data, and static screen sections.
- `useCallback` is used for event handlers, list renderers, and navigation callbacks.
- `AppFlatList` centralizes list defaults such as `keyExtractor`, `initialNumToRender`, `maxToRenderPerBatch`, `windowSize`, and `removeClippedSubviews`.
- Horizontal carousels use stable keys and `getItemLayout` where fixed item widths are available.
- Movie posters, backdrops, avatars, and gallery assets use Expo Image for smoother rendering and transitions.
- Image prefetching is used before revealing critical content on Home, Search, Section Movies, and Movie Details.
- Repository-level caching reduces repeated requests for home sections, search results, trending queries, popular talent, and movie details.
- Skeleton-first loading avoids partial UI flashes and reduces perceived latency.

## 🎥 API

All movie data in this project is sourced from TMDB through a centralized API layer and repository mapping strategy.

- TMDB Website: `Add approved TMDB website link here`
- TMDB Documentation: `Add approved TMDB documentation link here`

The app uses environment variables to keep TMDB credentials outside the source code and to support local development safely.

## 🔐 Environment Variables

Create a local `.env` file in the project root before running the app.

### Required

- `EXPO_PUBLIC_TMDB_ACCESS_TOKEN`

### Optional

- `EXPO_PUBLIC_TMDB_API_KEY`

### `.env.example`

```env
EXPO_PUBLIC_TMDB_ACCESS_TOKEN=your_tmdb_read_access_token
EXPO_PUBLIC_TMDB_API_KEY=your_tmdb_api_key
```

> Do not commit real credentials to version control.

## 🚀 Installation

```bash
git clone <your-repository-url>
cd HouseofEdtechProject
npm install
npx expo start
```

## 📦 Build APK

Use EAS Build to generate an Android build:

```bash
npx eas login
npx eas build:configure
npx eas build --platform android
```

If you need a custom build profile later, add an `eas.json` file and extend the command with `--profile <profile-name>`.

## 🧪 Quality Checks

```bash
npx tsc --noEmit
npm run lint
```

## 🎬 Demo Video

Add your project demo here:

- Demo Video Link: `Add Loom / Drive / YouTube link here`

## 🔮 Future Improvements

- Authentication and user session handling
- Watchlist and favorites sync
- Real video streaming playback
- Offline downloads management
- Push notifications
- Automated testing
- CI/CD pipeline setup
- Analytics and crash reporting

## 👨‍💻 Developer

- Name: `Himanshu Takle`
- GitHub: `https://github.com/Hkt1393/HouseofEdtech`
- LinkedIn: `https://www.linkedin.com/in/himanshu-takle-40b989267/`

## 📄 License

This project was created as part of the House of Edtech React Native Assignment.
