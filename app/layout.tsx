import './globals.css'

export const metadata = {
  title: 'PeerPulse',
  description: 'Peer-driven feedback for professional growth',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
