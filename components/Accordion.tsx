"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronRight } from "react-icons/fi";

interface AccordionItemProps {
	title: string;
	content: string;
	isOpen: boolean;
	onClick: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
	title,
	content,
	isOpen,
	onClick,
}) => {
	return (
		<div
			className="mb-2 rounded-lg bg-black/40 border border-white/10 p-3 cursor-pointer select-none shadow-sm hover:bg-black/50 transition"
			onClick={onClick}
		>
			{/* Header */}
			<div className="flex justify-between items-center text-white">
				<span className="text-base font-medium">{title}</span>
				<motion.span
					animate={{ rotate: isOpen ? 90 : 0 }}
					transition={{ duration: 0.3, ease: "easeInOut" }}
				>
					<FiChevronRight size={18} />
				</motion.span>
			</div>

			{/* Content */}
			<AnimatePresence initial={false}>
				{isOpen && (
					<motion.div
						key="content"
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.5, ease: [0.25, 0.8, 0.25, 1] }}
						className="overflow-hidden mt-1 text-sm text-gray-300"
					>
						<div className="p-1">{content}</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default function CustomAccordion() {
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	const toggleItem = (index: number) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	return (
		<div className="flex justify-center items-start min-h-[60vh] py-8 text-white">
			{/* Outer glassmorphic box */}
			<div className="w-full max-w-6xl rounded-2xl p-6 shadow-2xl">

				{/* Heading */}
				<h2 className="text-5xl font-bold text-center mb-15">Frequently Asked Questions</h2>

				{/* Inner glassmorphic box */}
				<div className="w-full p-4 shadow-lg">
					{[
						{ title: "Accordion 1", content: "This is the content for Accordion 1." },
						{ title: "Accordion 2", content: "This is the content for Accordion 2." },
						{ title: "Accordion 3", content: "This is the content for Accordion 3." },
					].map((item, index) => (
						<AccordionItem
							key={index}
							title={item.title}
							content={item.content}
							isOpen={openIndex === index}
							onClick={() => toggleItem(index)}
						/>
					))}
				</div>
			</div>
		</div>
	);
}