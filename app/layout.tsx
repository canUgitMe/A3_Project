import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import ChatWidget from "@/components/ChatWidget";
import { Toaster } from "react-hot-toast"; // ✅ For consistent toast notifications

export const metadata = {
  title: "PeerPulse",
  description: "Peer-driven feedback for professional growth",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative min-h-screen bg-background text-foreground">
        {/* Top Loader */}
        <NextTopLoader
          color={`linear-gradient(to right,
                    #ffff00 0%,
                    #ed5a9c 30%,
                    #f49c69 60%,
                    #c044e8 100%)`}
          easing="ease-in"
          speed={350}
          height={7}
          showSpinner={false}
        />

        {/* Main App Content */}
        <main className="pb-16">{children}</main>

        {/* Floating Chat Widget */}
        <ChatWidget />

        {/* Toast Notifications (for post likes, comments, etc.) */}
        <Toaster position="bottom-center" toastOptions={{ duration: 3000 }} />
      </body>
    </html>
  );
}