<div align="center">
  <img src="https://user-images.githubusercontent.com/37687705/192227260-db082018-947a-4166-a3f4-983e1024dd59.png" width="20%">
  <h1>Strapi Drag Drop Content Types Plugin</h1>
  <p>A powerful and intuitive drag-and-drop sorting solution for Strapi v5 content types</p>

[![npm version](https://img.shields.io/npm/v/@yunusemrejs/drag-drop-content-types-strapi5)](https://www.npmjs.com/package/@yunusemrejs/drag-drop-content-types-strapi5)
[![npm downloads](https://img.shields.io/npm/dm/@yunusemrejs/drag-drop-content-types-strapi5)](https://www.npmjs.com/package/@yunusemrejs/drag-drop-content-types-strapi5)
[![GitHub issues](https://img.shields.io/github/issues/yunusemrejs/drag-drop-content-types-strapi5)](https://github.com/yunusemrejs/drag-drop-content-types-strapi5/issues)
[![GitHub stars](https://img.shields.io/github/stars/yunusemrejs/drag-drop-content-types-strapi5)](https://github.com/yunusemrejs/drag-drop-content-types-strapi5/stargazers)
[![License](https://img.shields.io/npm/l/@yunusemrejs/drag-drop-content-types-strapi5)](https://github.com/yunusemrejs/drag-drop-content-types-strapi5/blob/main/LICENSE)

</div>

## ✨ Features

![dragdropcrop](https://user-images.githubusercontent.com/37687705/212884821-356ec68c-b71a-4b89-9e99-8a625f84cfbe.gif)

- 🚀 Built for Strapi v5 with TypeScript support
- ⚡️ High-performance drag-and-drop using dnd-kit
- 📱 Responsive design for both desktop and mobile
- 🎨 Smooth animations and visual feedback
- 🔒 Built-in permission system integration
- 🌐 Internationalization support
- 🔄 Real-time content order updates
- 📦 Easy installation and configuration

Originally inspired by the [Drag-Drop-Content-Type Strapi 4 plugin](https://github.com/plantagoIT/strapi-drag-drop-content-type-plugin), this plugin has been completely rewritten using the modern dnd-kit library to ensure compatibility with React 18 and provide better performance.

## 🚀 Quick Start

### Installation

```bash
# Using npm
npm install @yunusemrejs/drag-drop-content-types-strapi5

# Using yarn
yarn add @yunusemrejs/drag-drop-content-types-strapi5

# Using pnpm
pnpm add @yunusemrejs/drag-drop-content-types-strapi5
```

## ⚙️ Configuration

### Step 1: Enable the Plugin

Create or modify your `config/plugins.ts` file:

```typescript
export default () => ({
  'drag-drop-content-types-strapi5': {
    enabled: true,
  },
});
```

### Step 2: Build and Restart

```bash
npm run build
npm run develop
```

## 🛠️ Setup Guide

### Content Type Configuration

1. Navigate to `Settings` → `Drag Drop Content Type` → `Configuration`
2. Configure the following settings:

#### Basic Setup

- Set the `Rank Field Name` (default: `rank`)
- Add an integer field to your Content Type with the specified rank field name
- Set default sorting in Content Type settings:
  - `Default sort attribute`: Your rank field
  - `Default sort order`: ASC

#### Advanced Options

- **Display Settings**

  ```typescript
  {
    title: 'name',           // Field to use as title
    subtitle: 'description', // Optional: Field to show as subtitle
    mainField: 'title'      // Optional: Fallback field
  }
  ```

- **Webhook Integration**
  Enable webhooks to trigger external systems when order changes

#### Permissions

Grant appropriate permissions in Settings → Users & Permissions → Roles:

- Read permission for content type
- Update permission for the rank field

## 📡 API Usage

### REST API

Fetch ordered content:

```bash
# Basic sorting
GET /api/{content-type}?sort=rank:asc

# With pagination
GET /api/{content-type}?sort=rank:asc&pagination[page]=1&pagination[pageSize]=25

# With relations
GET /api/{content-type}?sort=rank:asc&populate=*
```

### GraphQL

```graphql
query {
  contentType(sort: "rank:asc") {
    data {
      id
      attributes {
        title
        rank
      }
    }
  }
}
```

## 💪 Support

- Star ⭐️ the project
- [Submit issues](https://github.com/yunusemrejs/drag-drop-content-types-strapi5/issues)
- Share with your network
- Consider [sponsoring](https://github.com/sponsors/yunusemrejs)

## 📄 License

MIT © [Yunus Emre Kara](LICENSE)
