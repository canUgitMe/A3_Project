import ChatWidget from '@/components/ChatWidget'
import './globals.css'
import NextTopLoader from 'nextjs-toploader'

export const metadata = {
  title: 'PeerPulse',
  description: 'Peer-driven feedback for professional growth',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="relative">
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

        {/* Page Content */}
        {children}

        {/* Floating Chat Widget on all pages */}
        <ChatWidget />
      </body>
    </html>
  )
}