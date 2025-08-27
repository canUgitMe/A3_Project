"use client";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
	motion,
	AnimatePresence,
	useScroll,
	useMotionValueEvent,
} from "framer-motion";
import React, { useRef, useState } from "react";

interface NavbarProps {
	children: React.ReactNode;
	className?: string;
}

interface NavBodyProps {
	children: React.ReactNode;
	className?: string;
	visible?: boolean;
}

interface NavItemsProps {
	items: {
		name: string;
		link: string;
	}[];
	className?: string;
	onItemClick?: () => void;
}

interface MobileNavProps {
	children: React.ReactNode;
	className?: string;
	visible?: boolean;
}

interface MobileNavHeaderProps {
	children: React.ReactNode;
	className?: string;
}

interface MobileNavMenuProps {
	children: React.ReactNode;
	className?: string;
	isOpen: boolean;
	onClose: () => void;
}

export const Navbar = ({ children, className }: NavbarProps) => {
	const ref = useRef<HTMLDivElement>(null);
	const { scrollY } = useScroll({
		target: ref,
		offset: ["start start", "end start"],
	});
	const [visible, setVisible] = useState<boolean>(false);

	useMotionValueEvent(scrollY, "change", (latest) => {
		if (latest > 100) {
			setVisible(true);
		} else {
			setVisible(false);
		}
	});

	return (
		<motion.div
			ref={ref}
			className={cn("fixed inset-x-0 top-5 z-40 w-full", className)}
		>
			{React.Children.map(children, (child) =>
				React.isValidElement(child)
					? React.cloneElement(
						child as React.ReactElement<{ visible?: boolean }>,
						{ visible },
					)
					: child,
			)}
		</motion.div>
	);
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
	return (
		<motion.div
			animate={{
				backdropFilter: visible ? "blur(16px)" : "blur(16px)",
				boxShadow: visible
					? "0 0 24px rgba(82, 39, 255, 0.1), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(82, 39, 255, 0.1)"
					: "0 0 12px rgba(82, 39, 255, 0.05), 0 0 0 1px rgba(82, 39, 255, 0.05)",
				width: visible ? "40%" : "100%",
				y: visible ? 20 : 0,
			}}
			transition={{
				type: "spring",
				stiffness: 200,
				damping: 50,
			}}
			style={{
				minWidth: "800px",
			}}
			className={cn(
				"relative z-[60] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-full bg-transparent border border-[#6600ff] px-4 py-2 lg:flex",
				visible,
				className,
			)}
		>
			{children}
		</motion.div>
	);
};

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
	const [hovered, setHovered] = useState<number | null>(null);

	return (
		<motion.div
			onMouseLeave={() => setHovered(null)}
			className={cn(
				"absolute inset-0 hidden flex-1 flex-row items-center justify-end space-x-2 text-sm font-medium text-neutral-300 transition duration-200 hover:text-white lg:flex lg:space-x-2",
				className,
			)}
		>
			{items.map((item, idx) => (
				<a
					onMouseEnter={() => setHovered(idx)}
					onClick={onItemClick}
					className="relative px-4 py-2 text-neutral-300 hover:text-white"
					key={`link-${idx}`}
					href={item.link}
				>
					{hovered === idx && (
						<motion.div
							layoutId="hovered"
							className="absolute inset-0 h-full w-full rounded-full bg-neutral-800"
						/>
					)}
					<span className="relative z-20">{item.name}</span>
				</a>
			))}
		</motion.div>
	);
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
	return (
		<motion.div
			animate={{
				backdropFilter: visible ? "blur(16px)" : "blur(8px)",
				boxShadow: visible
					? "0 0 24px rgba(82, 39, 255, 0.1), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(82, 39, 255, 0.1)"
					: "0 0 12px rgba(82, 39, 255, 0.05), 0 0 0 1px rgba(82, 39, 255, 0.05)",
				width: visible ? "90%" : "100%",
				paddingRight: visible ? "12px" : "0px",
				paddingLeft: visible ? "12px" : "0px",
				borderRadius: visible ? "1.5rem" : "2rem",
				y: visible ? 20 : 0,
			}}
			transition={{
				type: "spring",
				stiffness: 200,
				damping: 50,
			}}
			className={cn(
				"relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between bg-white/10 border border-[#5227FF]/20 px-0 py-2 lg:hidden rounded-full",
				visible && "bg-white/15",
				className,
			)}
		>
			{children}
		</motion.div>
	);
};

export const MobileNavHeader = ({
	children,
	className,
}: MobileNavHeaderProps) => {
	return (
		<div
			className={cn(
				"flex w-full flex-row items-center justify-between",
				className,
			)}
		>
			{children}
		</div>
	);
};

export const MobileNavMenu = ({
	children,
	className,
	isOpen,
	onClose,
}: MobileNavMenuProps) => {
	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					initial={{
						opacity: 0,
						backdropFilter: "blur(8px)",
						backgroundColor: "rgba(255, 255, 255, 0.1)"
					}}
					animate={{
						opacity: 1,
						backdropFilter: "blur(20px)",
						backgroundColor: "rgba(255, 255, 255, 0.15)"
					}}
					exit={{
						opacity: 0,
						backdropFilter: "blur(8px)",
						backgroundColor: "rgba(255, 255, 255, 0.1)"
					}}
					transition={{
						duration: 0.3,
						ease: "easeInOut"
					}}
					className={cn(
						"absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-2xl bg-white/10 border border-[#5227FF]/20 px-4 py-8 shadow-[0_0_24px_rgba(82,_39,_255,_0.1),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(82,_39,_255,_0.1)]",
						className,
					)}
				>
					{children}
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export const MobileNavToggle = ({
	isOpen,
	onClick,
}: {
	isOpen: boolean;
	onClick: () => void;
}) => {
	return isOpen ? (
		<IconX className="text-white mr-5" onClick={onClick} />
	) : (
		<IconMenu2 className="text-white mr-5" onClick={onClick} />
	);
};

export const NavbarLogo = () => {
	return (
		<a
			href="#"
			className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-white"
		>
			<img
				src="/logo.png"
				alt="logo"
				width={40}
				height={40}
			/>
			<span className="font-medium text-white">PeerPulse</span>
		</a>
	);
};

export const NavbarButton = ({
	href,
	as: Tag = "a",
	children,
	className,
	variant = "primary",
	...props
}: {
	href?: string;
	as?: React.ElementType;
	children: React.ReactNode;
	className?: string;
	variant?: "primary" | "secondary" | "dark" | "gradient";
} & (
		| React.ComponentPropsWithoutRef<"a">
		| React.ComponentPropsWithoutRef<"button">
	)) => {
	const baseStyles =
		"px-4 py-2 rounded-md bg-neutral-900 text-white text-sm font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center";

	const variantStyles = {
		primary:
			"shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
		secondary: "bg-transparent border border-neutral-800",
		dark: "bg-neutral-900 text-white",
		gradient:
			"bg-gradient-to-b from-neutral-800 to-neutral-900 text-white shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset]",
	};

	return (
		<Tag
			href={href || undefined}
			className={cn(baseStyles, variantStyles[variant], className)}
			{...props}
		>
			{children}
		</Tag>
	);
};