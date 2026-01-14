import { Roboto } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";

const roboto = Roboto({
  subsets: ["latin"],
});

export const metadata = {
  title: "SaaS Boilerplate | Next.js + Firebase + Dodopayments + Resend + Shadcn UI + Tailwind CSS",
  description: "A production-ready SaaS boilerplate built with Next.js, Firebase, DodoPayments, and Resend.",
  openGraph: {
    title: "SaaS Boilerplate",
    description: "Build your SaaS faster.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className} antialiased`}
      >
        <AuthProvider>
          <ThemeProvider 
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <main>
              {children}
            </main>
          </ThemeProvider>
        </AuthProvider>
        <Toaster position="top-center"/>
      </body>
    </html>
  );
}
