"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Nav from "../Nav/Nav";
import Link from "next/link";
import { usePathname } from "next/navigation";

type HeaderProps = {
	logoUrl: string;
};

export default function Header({ logoUrl }: HeaderProps) {
	const pathname = usePathname();
	const normalizedPath = (pathname ?? "/").split("?")[0] || "/";
	const isHome = normalizedPath === "/";
	const headerRef = useRef<HTMLElement>(null);
	const [attachHeader, setAttachHeader] = useState(false);
	const [headerHeight, setHeaderHeight] = useState(0);

	useEffect(() => {
		const handleScroll = () => {
			const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
			const threshold = window.innerHeight;
			setAttachHeader(scrollTop > threshold);
		};

		handleScroll();
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	useEffect(() => {
		if (headerRef.current) {
			setHeaderHeight(headerRef.current.offsetHeight);
		}
	}, [attachHeader]);

	return (
		<>
			{!isHome && attachHeader && <div style={{ height: headerHeight }}></div>}
			<header
				className={`py-8 z-20 ${
					isHome
						? `${
								attachHeader ? "fixed fade-in bg-background" : "absolute bg-transparent"
						  } top-0 left-0 w-full `
						: `${attachHeader ? "fixed top-0 left-0 w-full fade-in" : "static"} bg-background`
				}`}
				ref={headerRef}>
				<div className="container px-5">
					<div className="flex justify-between items-center">
						<Link href="/">
							<Image
								className="max-w-[150px] h-auto md:w-[175px]"
								src={logoUrl}
								alt="Logo"
								width={175}
								height={55}
							/>
						</Link>
						<Nav />
					</div>
				</div>
			</header>
		</>
	);
}
