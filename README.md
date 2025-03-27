

# Custom Drag-and-Drop Plugin for Project Positioning

One of the core features of our project is the ability to reorder project positions both for artists and on the homepage. Since Strapi does not support this functionality out of the box, we explored existing community solutions.

## Background

We found an open-source plugin created by [yunusemrej](https://github.com/yunusemrej) – [`yunusemrejs/drag-drop-content-types-strapi5`](https://github.com/yunusemrej/drag-drop-content-types-strapi5). While it provided basic drag-and-drop functionality, it didn’t meet our project requirements for the following reasons:

1. **Element Limit**: The plugin could only display up to 100 items.
2. **No Filter Support**: It lacked filtering capabilities, which are essential for viewing projects associated with specific artists.

## Our Solution

We forked and modified the plugin to fit our use case. After customization, the plugin now supports:

- Filtering by fields (e.g., filtering projects by artist).
- Displaying **all items**, regardless of quantity.

## How to Use

### Home Page

On the **Home page**, the plugin works **without filters**.  

> ⚠️ Applying filters on this page may break the order logic and is therefore disabled.

### Project Page

On the **Project page**, the plugin works **only when the filter `artist is` is selected**.  
This ensures that project reordering happens **only within the context of a single artist**, which helps maintain consistent order and avoids conflicts.

Currently, the plugin is enabled for the **Home** and **Project** pages, but it can be extended to other pages if needed.

## For Developers

### API Logic

The plugin uses the custom endpoint:

```
/sort-index
```

It handles data retrieval and sorting logic internally.

To modify backend logic, check:

```
server/src/services/dragdrop.ts
```

### UI Logic

To customize or update the admin UI, refer to:

```
admin/src/components
```

## Warnings

- The plugin is designed to work with **Strapi v5.9.0**.
- If you upgrade Strapi to a newer version, the plugin may stop functioning correctly.
- In that case, additional adjustments will be required to make it compatible with the updated version of Strapi.

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

## 📄 License

MIT © [Yunus Emre Kara](LICENSE)
