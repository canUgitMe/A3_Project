import Sidebar from '@/components/Sidebar'
import '../globals.css'
import { NavigationBar } from '@/components/Navigation'
import { Toaster } from 'react-hot-toast'

export const metadata = {
	title: 'PeerPulse',
	description: 'Peer-driven feedback for professional growth',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>
				<NavigationBar />
				<div className="max-w-7xl mx-auto px-4 mt-40 mb-[5vh]">
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
						<div className="hidden lg:block lg:col-span-3">
							<Sidebar />
						</div>
						<div className="lg:col-span-9">{children}</div>
					</div>
				</div>
				<Toaster />
			</body>
		</html>
	)
}
