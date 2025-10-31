# 🛒 E-Commerce Client

> A modern, feature-rich Angular 14 e-commerce application with comprehensive admin capabilities, real-time updates, and seamless authentication.

[![Angular](https://img.shields.io/badge/Angular-14.1.2-red?logo=angular)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.6.2-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.1.3-purple?logo=bootstrap)](https://getbootstrap.com/)
[![Material](https://img.shields.io/badge/Material-14.1.2-blue?logo=material-ui)](https://material.angular.io/)

## 📖 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Configuration](#configuration)
- [Available Scripts](#available-scripts)
- [Acknowledgements](#acknowledgements)
- [Support](#support)

## 🎯 Overview

This is a production-ready Angular 14 single-page application (SPA) for e-commerce operations. It provides a dual-interface system:

- **Public Storefront**: Customer-facing interface for browsing products, managing baskets, and account operations
- **Admin Dashboard**: Comprehensive back-office for product, customer, and order management

The application leverages modern web technologies including JWT authentication with refresh tokens, OAuth social logins, real-time bi-directional communication via SignalR, and a responsive Material Design + Bootstrap UI.

## ✨ Key Features

### Public Interface
- 🏠 **Home & Product Catalog**: Responsive product listing with pagination and lazy loading
- 🛍️ **Shopping Basket**: Cart management with real-time updates
- 🔐 **Multi-channel Authentication**: 
  - Traditional email/password registration and login
  - Google OAuth integration
  - Facebook OAuth integration
- 📱 **Responsive Design**: Mobile-first approach with Bootstrap 5
- 🔔 **Real-time Notifications**: Instant updates via SignalR

### Admin Portal
- 📊 **Dashboard**: Overview of store metrics and activities
- 📦 **Product Management**:
  - Full CRUD operations
  - Multi-image upload with drag-and-drop support
  - Image gallery management
  - Showcase image selection
- 👥 **Customer Management**: User account administration
- 📋 **Order Management**: Order processing and tracking
- 🔒 **Role-based Access Control**: Protected routes with authentication guards

### Technical Highlights
- ⚡ **Performance**: Lazy-loaded modules, route-level code splitting
- 🔄 **State Management**: RxJS-based reactive patterns
- 🎨 **UI/UX**: Material Design components, toast notifications, loading spinners
- 🛡️ **Security**: JWT tokens, HTTP interceptors, XSS protection
- 🌐 **API Communication**: Centralized HTTP service with error handling
- 🔌 **Real-time**: SignalR hub connections with automatic reconnection

## 🚀 Tech Stack

### Core Framework
- **Angular 14.1.2** - Progressive web framework
- **TypeScript 4.6.2** - Type-safe JavaScript
- **RxJS 7.5.0** - Reactive programming library

### UI & Styling
- **Angular Material 14.1.2** - Material Design components
- **Bootstrap 5.1.3** - Responsive CSS framework
- **SCSS** - Enhanced CSS with variables and mixins

### Authentication & Security
- **@auth0/angular-jwt 5.0.2** - JWT token handling and auto-injection
- **@abacritt/angularx-social-login 1.2.2** - OAuth social authentication

### Real-time Communication
- **@microsoft/signalr 6.0.8** - WebSocket-based real-time messaging

### User Experience
- **ngx-toastr 14.3.0** - Toast notification system
- **alertifyjs 1.13.1** - Alert and confirmation dialogs
- **ngx-spinner 14.0.0** - Loading indicators
- **ngx-file-drop 13.0.0** - Drag-and-drop file uploads

### Development Tools
- **Angular CLI 14.1.2** - Command-line interface
- **Karma & Jasmine** - Unit testing framework
- **TypeScript ESLint** - Code quality



## 📋 Prerequisites

Before you begin, ensure you have the following installed:

| Requirement | Version | Purpose |
|------------|---------|---------|
| **Node.js** | 16.x or 18.x LTS | JavaScript runtime |
| **npm** | 8.x+ | Package manager |
| **Angular CLI** | 14.x | Development tooling (optional but recommended) |
| **Backend API** | - | REST API server (see [API Integration](#api-integration)) |

### System Requirements
- **OS**: Windows 10/11, macOS 10.15+, or Linux
- **Memory**: 4GB RAM minimum (8GB recommended)
- **Disk Space**: 500MB for node_modules

### Backend Dependencies
This frontend requires a running .NET backend API. The default configuration expects:
- **API Base URL**: `https://localhost:7275/api`
- **SignalR Hub**: `https://localhost:7275/products-hub`
- **CORS**: Must allow `http://localhost:4200` origin

## 🔧 Installation & Setup

### 1. Clone the Repository
```powershell
git clone https://github.com/tofigamraslanov/e-commerce-client.git
cd e-commerce-client
```

### 2. Install Dependencies
```powershell
npm install
```

This will install all required packages listed in `package.json` (~200MB).

### 3. Configure Environment
Update the configuration files to match your backend setup (see [Configuration](#configuration) section).

### 4. Start Development Server
```powershell
npm start
```

The application will be available at **http://localhost:4200**

The dev server features:
- ✅ Hot module replacement (HMR)
- ✅ Automatic browser refresh
- ✅ Source maps for debugging
- ✅ TypeScript compilation watch mode

## ⚙️ Configuration

### API Base URL

**Location**: `src/app/app.module.ts`

```typescript
providers: [
  {
    provide: 'baseUrl',
    useValue: 'https://localhost:7275/api',  // ← Update this
    multi: true,
  },
  // ...
]
```

**Recommended**: Move to environment files for better separation:

```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'https://localhost:7275/api',
  hubUrl: 'https://localhost:7275/products-hub'
};
```

### JWT Configuration

**Location**: `src/app/app.module.ts`

```typescript
JwtModule.forRoot({
  config: {
    tokenGetter: () => localStorage.getItem('accessToken'),
    allowedDomains: ['localhost:7275'],  // ← Update for production
    // disallowedRoutes: ['localhost:7275/api/auth/login']
  },
})
```

**Security Notes**:
- Tokens are stored in `localStorage` (consider `HttpOnly` cookies for production)
- Add production domain to `allowedDomains` array
- Use `disallowedRoutes` for endpoints that shouldn't have the token

### SignalR Hub Configuration

**Location**: `src/app/constants/hub-urls.ts`

```typescript
export enum HubUrls {
  ProductHub = 'https://localhost:7275/products-hub',  // ← Update this
}
```

### OAuth Social Login

**Location**: `src/app/app.module.ts`

```typescript
{
  provide: 'SocialAuthServiceConfig',
  useValue: {
    autoLogin: false,
    providers: [
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider(
          'YOUR-GOOGLE-CLIENT-ID.apps.googleusercontent.com'  // ← Replace
        ),
      },
      {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider('YOUR-FACEBOOK-APP-ID'),  // ← Replace
      },
    ],
  } as SocialAuthServiceConfig,
}
```

**Setup Instructions**:

1. **Google OAuth**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create OAuth 2.0 credentials
   - Add `http://localhost:4200` to authorized origins
   - Copy client ID

2. **Facebook OAuth**:
   - Go to [Facebook Developers](https://developers.facebook.com/)
   - Create an app and get App ID
   - Configure OAuth redirect URIs

## 📜 Available Scripts

| Command | Description | Usage |
|---------|-------------|-------|
| `npm start` | Start dev server | Daily development |
| `npm run build` | Production build | Deployment preparation |
| `npm run watch` | Build with watch mode | Development with external tools |
| `npm test` | Run unit tests | Testing during development |
| `ng serve` | Angular CLI serve | Alternative to `npm start` |
| `ng build --configuration production` | Optimized build | CI/CD pipelines |
| `ng generate component <name>` | Scaffold component | Creating new components |

### Build Configurations

- **Development**: Source maps, no minification, verbose errors
- **Production**: Minification, tree-shaking, AOT compilation, output hashing


## 🙏 Acknowledgements

### Core Technologies
- [Angular](https://angular.io/) - Web application framework
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- [RxJS](https://rxjs.dev/) - Reactive programming

### UI Libraries
- [Angular Material](https://material.angular.io/) - Material Design components
- [Bootstrap](https://getbootstrap.com/) - CSS framework
- [ngx-toastr](https://github.com/scttcper/ngx-toastr) - Toast notifications
- [AlertifyJS](https://alertifyjs.com/) - Alert dialogs

### Authentication & Real-time
- [Auth0 Angular JWT](https://github.com/auth0/angular2-jwt) - JWT utilities
- [Angularx Social Login](https://github.com/abacritt/angularx-social-login) - OAuth integration
- [SignalR](https://dotnet.microsoft.com/apps/aspnet/signalr) - Real-time communication

### Developer Tools
- [ngx-spinner](https://github.com/Napster2210/ngx-spinner) - Loading animations
- [ngx-file-drop](https://github.com/georgipeltekov/ngx-file-drop) - File upload component

---

## 📞 Support

For questions or issues:

1. Check the [Troubleshooting](#troubleshooting) section
2. Search existing [GitHub Issues](https://github.com/tofigamraslanov/e-commerce-client/issues)
3. Create a new issue with:
   - Clear description
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment details (OS, Node version, browser)

---

**Built with ❤️ using Angular 14**

*Last updated: October 31, 2025*