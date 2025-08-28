"use client";
import {
	Navbar,
	NavBody,
	NavItems,
	MobileNav,
	NavbarLogo,
	MobileNavHeader,
	MobileNavToggle,
	MobileNavMenu,
} from "@/components/ui/nav";
import { useState } from "react";
import { useAuth } from "@/lib/useAuth";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { IconUserPlus, IconLogout, IconLocationSearch, IconUserCog } from "@tabler/icons-react";

export function NavbarDemo() {
	const baseNavItems = [
		{ name: "Dashboard", link: "#features", icon: <IconUserCog className="w-5 h-5" /> },
		{ name: "Explore", link: "#pricing", icon: <IconLocationSearch className="w-5 h-5" /> },
	];

	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const { user, loading } = useAuth();

	const handleSignOut = async () => {
		await signOut(auth);
	};

	return (
		<div className="relative w-full">
			<Navbar>
				{/* Desktop Navigation */}
				<NavBody>
					{/* Left - Logo */}
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{
							type: "spring",
							stiffness: 260,
							damping: 20,
							delay: 0.1
						}}
						className="flex-1"
					>
						<NavbarLogo />
					</motion.div>

					{/* Center - Nav Items */}
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							type: "spring",
							stiffness: 260,
							damping: 20,
							delay: 0.2
						}}
						className="flex-1 flex justify-center"
					>
						<NavItems
							items={baseNavItems}
							className="!relative !justify-center"
						/>
					</motion.div>

					{/* Right - Auth Button */}
					<motion.div
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{
							type: "spring",
							stiffness: 260,
							damping: 20,
							delay: 0.3
						}}
						className="flex-1 flex justify-end items-center gap-4"
					>
						{!loading && (
							<AnimatePresence mode="wait">
								{user ? (
									<motion.button
										key="signout"
										initial={{ opacity: 0, scale: 0.9 }}
										animate={{ opacity: 1, scale: 1 }}
										exit={{ opacity: 0, scale: 0.9 }}
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
										transition={{
											type: "spring",
											stiffness: 400,
											damping: 17
										}}
										onClick={handleSignOut}
										className="hidden lg:block text-red-500 hover:text-red-600 relative"
									>
										<IconLogout className="w-6 h-6" />
									</motion.button>
								) : (
									<motion.div
										key="auth-button"
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
										transition={{
											type: "spring",
											stiffness: 400,
											damping: 17
										}}
										className="hidden lg:block"
									>
										<Link href="/signup">
											<IconUserPlus className="w-6 h-6 text-neutral-300 hover:text-white" />
										</Link>
									</motion.div>
								)}
							</AnimatePresence>
						)}
					</motion.div>
				</NavBody>

				{/* Mobile Navigation */}
				<MobileNav>
					<MobileNavHeader>
						<NavbarLogo />
						<MobileNavToggle
							isOpen={isMobileMenuOpen}
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
						/>
					</MobileNavHeader>

					<MobileNavMenu
						isOpen={isMobileMenuOpen}
						onClose={() => setIsMobileMenuOpen(false)}
					>
						{/* Mobile links */}
						{baseNavItems.map((item, idx) => (
							<Link
								key={`mobile-link-${idx}`}
								href={item.link}
								onClick={() => setIsMobileMenuOpen(false)}
								className="relative text-xl text-neutral-300 hover:text-white flex items-center gap-2"
							>
								{item.icon}
								<span className="block">{item.name}</span>
							</Link>
						))}
						{!loading && !user && (
							<Link
								href="/signup"
								onClick={() => setIsMobileMenuOpen(false)}
								className="relative text-xl text-neutral-300 hover:text-white flex items-center gap-2"
							>
								<IconUserPlus className="w-5 h-5" />
								<span className="block">Sign Up</span>
							</Link>
						)}

						{/* Mobile Sign Out */}
						{!loading && user && (
							<button
								onClick={() => {
									handleSignOut();
									setIsMobileMenuOpen(false);
								}}
								className="flex text-xl items-center gap-2 px-4 py-2 bg-red-500/30 backdrop-blur-md text-white rounded-md hover:bg-red-500/50 transition-colors"
							>
								<IconLogout className="w-5 h-5" />
								<span>Sign Out</span>
							</button>
						)}
					</MobileNavMenu>
				</MobileNav>
			</Navbar>
		</div>
	);
}