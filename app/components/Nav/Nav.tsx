"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Cart from "@/app/icons/Cart";

const navigation = ["Home", "Shop", "Contacts", "About"];

const HeaderCart = () => {
	return (
		<div className="bg-white p-2.5 rounded-full flex items-center justify-center cursor-pointer">
			<Cart />
		</div>
	);
};

export default function Nav() {
	const pathname = usePathname();

	return (
		<nav className="text-white">
			<ul className="flex gap-x-7 items-center text-2xl">
				{navigation.map((item, index) => {
					return (
						<li
							key={index}
							className={`${
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
		</nav>
	);
}
