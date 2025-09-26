"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Cart from "@/app/icons/Cart";
import Button from "../Button/Button";

const navigation = ["Home", "Shop", "About"];

const HeaderCart = () => {
	return (
		<div className="bg-white p-2.5 rounded-full flex items-center justify-center cursor-pointer">
			<Cart />
		</div>
	);
};

const NavDesktop = ({ pathname }: { pathname: string }) => {
	return (
		<ul className="gap-x-7 items-center text-2xl hidden md:flex">
			{navigation.map((item, index) => {
				return (
					<li
						key={index}
						className={`font-bold ${
							item === "Home" && pathname === "/"
								? "text-orange"
								: `/${item.toLowerCase()}` === pathname
								? "text-orange"
								: ""
						} `}>
						<Link href={`${item === "Home" ? "/" : `/${item.toLowerCase()}`}`}>{item}</Link>
					</li>
				);
			})}
			<HeaderCart />
		</ul>
	);
};

const BurgerMobile = ({ handleClick, isOpen }: { handleClick: () => void; isOpen: boolean }) => {
	return (
		<Button
			onClick={handleClick}
			className="mt-0! relative z-30 flex flex-col justify-center items-center gap-1 md:hidden">
			<span
				className={`bg-white block transition-all duration-300 ease-out 
		h-0.5 w-6 rounded-xs ${isOpen ? "rotate-45 translate-y-1" : "-translate-y-0.5"}`}></span>
			<span
				className={`bg-white block transition-all duration-300 ease-out 
		h-0.5 w-6 rounded-xs my-0.5 ${isOpen ? "opacity-0" : "opacity-100"}`}></span>
			<span
				className={`bg-white block transition-all duration-300 ease-out 
		h-0.5 w-6 rounded-xs ${isOpen ? "-rotate-45 -translate-y-[11px]" : "translate-y-0.5"}`}></span>
		</Button>
	);
};

const NavMobilePanel = ({ pathname, isOpen }: { pathname: string; isOpen: boolean }) => {
	return (
		<aside
			className={`fixed z-20 ${
				isOpen ? "right-0" : "-right-[300px]"
			} top-0 w-[90%] max-w-[300px] h-full bg-background transition-[right]  md:hidden`}>
			<ul className={`items-start mt-16 px-7 text-2xl ${isOpen ? "flex flex-col" : "hidden"}`}>
				{navigation.map((item, index) => {
					return (
						<li
							key={index}
							className={`w-full py-2.5 font-bold border-b border-gray-10 ${
								item === "Home" && pathname === "/"
									? "text-orange"
									: `/${item.toLowerCase()}` === pathname
									? "text-orange"
									: ""
							} `}>
							<Link href={`${item === "Home" ? "/" : `/${item.toLowerCase()}`}`}>{item}</Link>
						</li>
					);
				})}
			</ul>
		</aside>
	);
};

export default function Nav() {
	const pathname = usePathname();
	const [isOpen, setIsOpen] = useState(false);

	const handleClick = () => {
		setIsOpen((prev) => !prev);
	};

	useEffect(() => {
		setIsOpen(false);
	}, [pathname]);

	return (
		<>
			<nav className="text-white">
				<NavDesktop pathname={pathname} />
				<BurgerMobile handleClick={handleClick} isOpen={isOpen} />
				<NavMobilePanel pathname={pathname} isOpen={isOpen} />
			</nav>
		</>
	);
}
