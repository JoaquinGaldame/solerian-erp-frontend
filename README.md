# Solerian ERP Frontend

Solerian ERP Frontend is the Angular client application for a modern ERP workspace. It provides a scalable frontend foundation with modular feature boundaries, authenticated/private navigation, shared UI primitives, and NgRx-based state management.

## Overview

This repository contains the initial application shell for the ERP platform, including:

- standalone Angular architecture
- feature-based routing with lazy loading
- public and private application layouts
- authentication state management with NgRx
- reusable UI building blocks
- responsive navigation for core ERP areas

## Technology Stack

- Angular 20
- TypeScript
- NgRx Store
- NgRx Effects
- NgRx Router Store
- Tailwind CSS

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

Build the application:

```bash
npm run build
```

Run unit tests:

```bash
npm run test
```

## Application Structure

```txt
src/
  app/
    core/
      auth/
      config/
      http/
      layout/
    shared/
      ui/
    features/
      auth/
      dashboard/
      customers/
      products/
      inventory/
      sales/
      purchases/
      finance/
      reports/
      ai-assistant/
    store/
    app.config.ts
    app.routes.ts
```

## Architecture

### Core

Cross-cutting application concerns such as authentication, layout, configuration, and HTTP infrastructure.

### Shared

Reusable UI components and presentation helpers used across multiple features.

### Features

Business-facing modules organized by domain, each with its own routes and pages.

### Store

Application-level state configuration and root NgRx wiring.

## Routing

The application uses Angular standalone routing with lazy-loaded feature areas.

Primary routes include:

- `/login`
- `/app/dashboard`
- `/app/customers`
- `/app/products`
- `/app/inventory`
- `/app/sales`
- `/app/purchases`
- `/app/finance`
- `/app/reports`
- `/app/ai-assistant`

## State Management

NgRx is configured at the application level with:

- root store registration
- root effects registration
- router-store integration
- development devtools support
- authentication actions, reducer, selectors, and effects

## UI Foundation

The shared UI layer includes reusable building blocks such as:

- page headers
- summary cards
- data tables
- empty states
- loading indicators

## Layout System

The frontend provides two main layout shells:

- a public layout for access-related screens
- a private layout with sidebar, top header, and feature content outlet

## Project Scripts

```bash
npm start
npm run build
npm run watch
npm run test
```

## Development Notes

- Routes are configured in `src/app/app.routes.ts`
- Application providers are configured in `src/app/app.config.ts`
- Global styling and Tailwind entrypoint are defined in `src/styles.css`
- Authentication state lives under `src/app/core/auth`

## License

Private internal project.
