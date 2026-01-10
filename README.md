# SaaS Boilerplate

A production-ready SaaS boilerplate built with Next.js, Firebase, DodoPayments, and Resend, Shadcn UI.

## Features

- **Frontend**: Next.js (App Router), Tailwind CSS
- **Backend**: Firebase (Auth, Firestore), Next.js API Routes
- **Payments**: DodoPayments (Checkout, Webhooks)
- **Emails**: Resend (Transactional Emails)
- **Authentication**: Google, GitHub, Email/Password
- **Security**: Protected Routes, Firebase Admin SDK

## Prerequisites

- Node.js 18+
- Firebase Project
- DodoPayments Account
- Resend Account

## Setup

1.  **Clone the repository**

    ```bash
    git clone <repo-url>
    cd nextjs-and-firebase-starter
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Environment Variables**

    Copy `.env.example` to `.env.local` and fill in your API keys.

    ```bash
    cp .env.example .env.local
    ```

    - **Firebase**: Get config from Project Settings > General > Your Apps.
    - **Firebase Admin**: Generate a new private key from Project Settings > Service Accounts.
    - **DodoPayments**: Get keys from Developer Settings.
    - **Resend**: Get API key from API Keys.

4.  **Run the development server**

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser.

## Project Structure

- `app/`: Next.js App Router pages and API routes.
- `components/`: Reusable UI components.
- `context/`: React Context (Auth).
- `lib/`: Utility functions and SDK initializations.
- `hooks/`: Custom hooks.

## Deployment

Deploy easily on Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fnext.js%2Ftree%2Fcanary%2Fexamples%2Fhello-world)
