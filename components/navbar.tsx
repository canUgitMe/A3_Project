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

export function NavbarDemo() {
	const baseNavItems = [
		{ name: "Dashboard", link: "#features" },
		{ name: "Explore", link: "#pricing" },
	];

	const authNavItems = [
		{ name: "Sign Up", link: "/signup" },
		{ name: "Sign In", link: "/signin" },
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
					<NavbarLogo />
					{/* Normal nav items */}
					<NavItems
						items={
							!loading
								? user
									? [...baseNavItems] // only Dashboard & Explore if signed in
									: [...baseNavItems, ...authNavItems] // include Sign up / Sign in if not signed in
								: baseNavItems
						}
					/>

					{/* Sign Out button (only when signed in) */}
					<div className="flex items-center gap-4">
						{!loading && user && (
							<button
								onClick={handleSignOut}
								className="text-neutral-600 dark:text-neutral-300 relative transition-colors hover:text-neutral-900 dark:hover:text-white"
							>
								Sign Out
							</button>
						)}
					</div>
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
						{(!loading && !user
							? [...baseNavItems, ...authNavItems]
							: baseNavItems
						).map((item, idx) => (
							<Link
								key={`mobile-link-${idx}`}
								href={item.link}
								onClick={() => setIsMobileMenuOpen(false)}
								className="relative text-neutral-600 dark:text-neutral-300"
							>
								<span className="block">{item.name}</span>
							</Link>
						))}

						{/* Mobile Sign Out */}
						{!loading && user && (
							<button
								onClick={() => {
									handleSignOut();
									setIsMobileMenuOpen(false);
								}}
								className="w-full text-neutral-600 dark:text-neutral-300 relative transition-colors hover:text-neutral-900 dark:hover:text-white"
							>
								Sign Out
							</button>
						)}
					</MobileNavMenu>
				</MobileNav>
			</Navbar>
		</div>
	);
}








// "use client";
// import {
// 	Navbar,
// 	NavBody,
// 	NavItems,
// 	MobileNav,
// 	NavbarLogo,
// 	NavbarButton,
// 	MobileNavHeader,
// 	MobileNavToggle,
// 	MobileNavMenu,
// } from "@/components/ui/nav";
// import { useState } from "react";
// import { useAuth } from "@/lib/useAuth";
// import { auth } from "@/lib/firebase";
// import { signOut } from "firebase/auth";
// import Link from "next/link";

// export function NavbarDemo() {
// 	const navItems = [
// 		{ name: "Dashboard", link: "#features" },
// 		{ name: "Explore", link: "#pricing" },
// 	];

// 	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
// 	const { user, loading } = useAuth();

// 	const handleSignOut = async () => {
// 		await signOut(auth);
// 	};

// 	return (
// 		<div className="relative w-full">
// 			<Navbar>
// 				{/* Desktop Navigation */}
// 				<NavBody>
// 					<NavbarLogo />
// 					<NavItems items={navItems} />

// 					{/* Right side buttons */}
// 					<div className="flex items-center gap-4">
// 						{!loading && (
// 							<>
// 								{user ? (
// 									<NavbarButton
// 										as="button"
// 										onClick={handleSignOut}
// 										variant="secondary"
// 									>
// 										Sign Out
// 									</NavbarButton>
// 								) : (
// 									<Link href="/signin">
// 										<NavbarButton variant="secondary">Login</NavbarButton>
// 									</Link>
// 								)}
// 							</>
// 						)}
// 					</div>
// 				</NavBody>

// 				{/* Mobile Navigation */}
// 				<MobileNav>
// 					<MobileNavHeader>
// 						<NavbarLogo />
// 						<MobileNavToggle
// 							isOpen={isMobileMenuOpen}
// 							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
// 						/>
// 					</MobileNavHeader>

// 					<MobileNavMenu
// 						isOpen={isMobileMenuOpen}
// 						onClose={() => setIsMobileMenuOpen(false)}
// 					>
// 						{navItems.map((item, idx) => (
// 							<a
// 								key={`mobile-link-${idx}`}
// 								href={item.link}
// 								onClick={() => setIsMobileMenuOpen(false)}
// 								className="relative text-neutral-600 dark:text-neutral-300"
// 							>
// 								<span className="block">{item.name}</span>
// 							</a>
// 						))}

// 						{/* Mobile buttons */}
// 						<div className="flex w-full flex-col gap-4">
// 							{!loading && (
// 								<>
// 									{user ? (
// 										<NavbarButton
// 											as="button"
// 											onClick={() => {
// 												handleSignOut();
// 												setIsMobileMenuOpen(false);
// 											}}
// 											variant="primary"
// 											className="w-full"
// 										>
// 											Sign Out
// 										</NavbarButton>
// 									) : (
// 										<Link href="/signin" className="w-full">
// 											<NavbarButton
// 												onClick={() => setIsMobileMenuOpen(false)}
// 												variant="primary"
// 												className="w-full"
// 											>
// 												Login
// 											</NavbarButton>
// 										</Link>
// 									)}
// 								</>
// 							)}
// 						</div>
// 					</MobileNavMenu>
// 				</MobileNav>
// 			</Navbar>
// 		</div>
// 	);
// }

