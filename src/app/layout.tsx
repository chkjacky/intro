import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import "./globals.css";

import IdleScrollHint from "@/components/IdleScrollHint";

import { ThemeProvider } from "./providers/ThemeProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "600", "700"],
  variable: "--font-sans", // important
});

export const metadata: Metadata = {
  title: "Jacky's Personal Website",
  description: "Developed By Jacky",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${poppins.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <IdleScrollHint />
        </ThemeProvider>
      </body>
    </html>
  );
}
