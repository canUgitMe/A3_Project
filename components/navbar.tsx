"use client";
import {
	Navbar,
	NavBody,
	NavItems,
	MobileNav,
	NavbarLogo,
	NavbarButton,
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
	const navItems = [
		{ name: "Dashboard", link: "#features" },
		{ name: "Explore", link: "#pricing" },
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
					<NavItems items={navItems} />

					{/* Right side buttons */}
					<div className="flex items-center gap-4">
						{!loading && (
							<>
								{user ? (
									<NavbarButton
										as="button"
										onClick={handleSignOut}
										variant="secondary"
									>
										Sign Out
									</NavbarButton>
								) : (
									<Link href="/signin">
										<NavbarButton variant="secondary">Login</NavbarButton>
									</Link>
								)}
							</>
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
						{navItems.map((item, idx) => (
							<a
								key={`mobile-link-${idx}`}
								href={item.link}
								onClick={() => setIsMobileMenuOpen(false)}
								className="relative text-neutral-600 dark:text-neutral-300"
							>
								<span className="block">{item.name}</span>
							</a>
						))}

						{/* Mobile buttons */}
						<div className="flex w-full flex-col gap-4">
							{!loading && (
								<>
									{user ? (
										<NavbarButton
											as="button"
											onClick={() => {
												handleSignOut();
												setIsMobileMenuOpen(false);
											}}
											variant="primary"
											className="w-full"
										>
											Sign Out
										</NavbarButton>
									) : (
										<Link href="/signin" className="w-full">
											<NavbarButton
												onClick={() => setIsMobileMenuOpen(false)}
												variant="primary"
												className="w-full"
											>
												Login
											</NavbarButton>
										</Link>
									)}
								</>
							)}
						</div>
					</MobileNavMenu>
				</MobileNav>
			</Navbar>
		</div>
	);
}

