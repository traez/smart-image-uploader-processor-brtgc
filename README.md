# Turso SQLite Cloudinary Sandbox App - BRTGC

Modified BRTGC Assignment: Turso SQLite Cloudinary Sandbox App

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
  - [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
  - [Author](#author)
  - [Acknowledgments](#acknowledgments)

## Overview

### The Challenge/User Stories

This is a small Next.js app that allows users to upload and manage images. Uploaded JPEG or PNG files are stored locally, with metadata saved in SQLite (filename, size, and upload date). Users can view thumbnails and delete images. Optional enhancements include basic image transformations, drag-and-drop uploads, and simple search by filename.

The app focuses on a clean, functional core with proper validation and edge case handling. With more time, features like additional image transformations, bulk uploads, and improved UI polish could be added. Full setup instructions, completed features, and known limitations are documented in this repo.

### Screenshot

![](/public/screenshot-desktop.png)

### Links

- Solution URL: [https://github.com/traez/turso-sqlite-cloudinary](https://github.com/traez/turso-sqlite-cloudinary)
- Live Site URL: [https://turso-sqlite-cloudinary.vercel.app/](https://turso-sqlite-cloudinary.vercel.app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox and CSS Grid
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [Next.js](https://nextjs.org/) - React framework
- Typescript
- Nodejs
- Tailwind CSS
- ShadCN  
- @radix-ui  
- class-variance-authority  
- clsx  
- lucide-react  
- tailwind-merge  
- next-cloudinary – Cloudinary integration for Next.js  
- cloudinary – Node SDK for server-side Cloudinary operations  
- nextjs-toploader – page load progress indicator  
- @libsql/client – client library to connect to Turso/SQLite databases from Node/Next.js  

### What I learned

**1 Technology Stack Exploration**  
Tested my skills and learned **SQLite**, **Turso.tech**, and **Cloudinary** integration. Initially explored Prisma but ultimately chose to work without it. Same with local storage and drag-and-drop functionality. A light Prisma review confirmed it's conceptually similar to Drizzle ORM.    

**2 Understanding the SQLite → LibSQL → Turso Ecosystem**  
**SQLite** is a lightweight, file-based database designed for local storage in applications, offering simplicity and speed but limited to single-file access without built-in networking or multi-user support.

**LibSQL** builds on SQLite by adding a networked layer, enabling concurrent multi-user access, authentication, and replication—effectively turning SQLite into a cloud-ready database engine.

**Turso** is a cloud platform that uses LibSQL under the hood, providing globally distributed, low-latency SQLite-compatible databases accessible over HTTPS.

The **@libsql/client** package is the official JavaScript/TypeScript client that allows applications (like Next.js apps) to connect securely to a Turso database and execute SQL queries as if interacting with a local SQLite database.  

**3 Schema Management: Turso vs. Supabase**  
Unlike Supabase, Turso doesn't provide a full GUI to create tables—you manage schema either through the CLI (`turso db shell`) or by using tools like Prisma migrations, which is the recommended approach for Next.js projects.

With Prisma, you define your tables in `schema.prisma`, run migrations, and everything stays version-controlled. This makes it easy for others (like interviewers) to clone your repo and set up the database with a single command, instead of relying on manual SQL in the Turso shell.   

**4 Security & Access Control Considerations**  
Turso is essentially "just a database," so unlike Supabase, it doesn't provide built-in row-level security (RLS), auth, or API layers.

With Turso, your `TURSO_AUTH_TOKEN` must stay server-side, and any access control (like limiting users to their own rows) must be enforced in your app's server code—through server actions, API routes, or middleware—using your chosen auth system.

Supabase bakes these policies directly into the database, while with Turso you handle them yourself at the application layer.  

**5 Turso Pricing & Setup**  
- **Pricing plans**: [https://turso.tech/pricing](https://turso.tech/pricing)
- **Proceed with Turso Cloud**
- Sign up and create a database at [https://app.turso.tech/](https://app.turso.tech/)
- Choose the group nearest to your location (e.g., Ireland for Nigeria)
- Add connection string and auth token to `.env`
- Install the Turso CLI using Windows (WSL) in VS Code terminal
- Integrate Turso into your Next.js app using the official SDK:

```shellscript
pnpm add @libsql/client
``` 

**6 Turso Helpful Resources**  
- **CLI database commands** start with `turso db shell <database-name>`: [https://docs.turso.tech/cli/db/shell](https://docs.turso.tech/cli/db/shell)  
- **Next.js integration guide**: [https://docs.turso.tech/sdk/ts/guides/nextjs](https://docs.turso.tech/sdk/ts/guides/nextjs)

**7 Next.js Caching: `revalidatePath`vs. `revalidateTag`**  
In Next.js, **`revalidatePath`** is a function you call in a server action or route handler to force a specific route (like `/dashboard` or `/posts/[id]`) to refresh its cached data on the next request. It's useful when you know exactly which page depends on the data you just changed.

By contrast, **`revalidateTag`** works at the data level: when you fetch data using `fetch` or a cacheable function with a tag, you can later call `revalidateTag("posts")` to invalidate everything linked to that tag, regardless of how many routes are involved.

**The key difference**: `revalidatePath` targets a URL path, while `revalidateTag` targets groups of cached data you've tagged during fetches. They're often used together—use tags for data-driven invalidation across multiple pages, and use path revalidation for precise page-level refreshes. 

**8 ️ Cloudinary Integration for Image Uploads**  
Used **Cloudinary** for image upload functionality. Comments are included in code files to explain the logic flow.

**Resources**:

- Console: [https://console.cloudinary.com/](https://console.cloudinary.com/)
- Documentation: [https://cloudinary.com/documentation](https://cloudinary.com/documentation)
- Admin API: [https://cloudinary.com/documentation/admin_api](https://cloudinary.com/documentation/admin_api)
- Next.js integration: [https://next.cloudinary.dev/](https://next.cloudinary.dev/)  

### Continued development

- More projects; increased competence!

### Useful resources

Stackoverflow  
YouTube  
Google  
ChatGPT

## Author

- Website - [Zeeofor Technologies](https://zeeofor.tech)
- Twitter - [@trae_z](https://twitter.com/trae_z)

## Acknowledgments

-Jehovah that keeps breath in my lungs
