
# Chat-App - Frontend Developer Assessment (Next.js)


## Table of Contents
- [Project Overview](#project-overview)
- [Demo](#demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running Locally](#running-locally)
- [Deployment](#deployment)
- [Future Improvements](#future-improvements)
- [Author](#author)

---

## Project Overview

**Chat-App** is a modern, single-page application built using **Next.js**, **TypeScript**, and **TailwindCSS**, integrating **Shadcn/ui components** and the **Prompt-kit library** for interactive UI elements. The application simulates a conversational interface between a user and an AI assistant with static, pre-defined messages to demonstrate frontend skills.

The purpose of this project is to showcase:

- TypeScript implementation
- Responsive design principles
- Integration of Shadcn/ui components
- Clean and modular TailwindCSS styling
- Prompt-kit UI interactions

---

## Demo

[chat-assistant-app](https://chat-assistant-app.netlify.app/)

---

## Features

- Fully responsive chat interface
- Static messages with predefined emotions
- Right sidebar with Prompt-kit interactive demo
- Dynamic interactions logging
- Dark mode support using TailwindCSS and custom CSS variables
- Sidebar toggle functionality for mobile devices
- Clean component-based architecture with TypeScript

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | [Next.js (latest)](https://nextjs.org/) |
| UI Library | [Shadcn/ui](https://ui.shadcn.com/) |
| Styling | [TailwindCSS](https://tailwindcss.com/) |
| Language | TypeScript |
| Special Library | [Prompt-kit](https://www.prompt-kit.com/) |

---

## Project Structure

```

chat-app/
├─ src/
│  ├─ app/
│  │  ├─ favicon.ico
│  │  ├─ globals.css         # Tailwind + theme variables
│  │  ├─ layout.tsx
│  │  └─ page.tsx            # Main SPA
│  ├─ components/
│  │  ├─ ChatInterface.tsx
│  │  ├─ ChatMessage.tsx
│  │  ├─ PromptKitDemo.tsx
│  │  └─ prompt-kit/
│  │     └─ PromptInputWithActions.tsx
│  ├─ data/
│  │  └─ messages.ts         # Static messages
│  ├─ lib/
│  │  ├─ types.ts
│  │  └─ utils.ts
├─ public/                    # Static assets (icons, SVGs, images)
├─ tailwind.config.ts
├─ tsconfig.json
├─ package.json
└─ README.md

````

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/<your-username>/chat-app.git
cd chat-app
````

2. Install dependencies:

```bash
npm install
```

---

## Running Locally

1. Start the development server:

```bash
npm run dev
```

2. Open your browser and visit:

```
http://localhost:3000
```

The application should display the chat interface with a responsive sidebar and interactive Prompt-kit demo.

---

## Deployment

**Netlify Deployment** (Static Export Compatible)

1. Update `next.config.js` for static export:

```ts
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
};

module.exports = nextConfig;
```

2. Build the project:

```bash
npm run build
```

3. The exported static site will be available in the `out/` folder.
4. Connect your GitHub repository to **Netlify** and deploy the `out/` folder.
5. Add `_redirects` file if using SPA routing:

```
/* /index.html 200
```

---

## Future Improvements

* Integrate backend API for real-time messages
* Enhance emotion display with color-coded badges
* Add user authentication and persistent chat history
* Implement full accessibility support (WCAG)
* Optimize for SEO and performance

---

## Author

**Rakesh Biswas**

* GitHub: [https://github.com/rakesh-biswas](https://github.com/Rakesh01999)
* Portfolio: [https://rakesh-biswas-portfolio.netlify.app/](https://rakesh-biswas-portfolio-nextjs.vercel.app/)


---

## License

This project is for **assessment purposes only**.

```


