"use client";

import Image from "next/image";
import Nav from "../Nav/Nav";
import Link from "next/link";
import { usePathname } from "next/navigation";

type HeaderProps = {
	logoUrl: string;
};

export default function Header({ logoUrl }: HeaderProps) {
	const pathname = usePathname();
	return (
		<header
			className={`py-8 ${
				pathname === "/" ? "absolute top-0 left-0 w-full bg-transparent z-10" : "bg-background"
			}`}>
			<div className="container px-5">
				<div className="flex justify-between items-center">
					<Link href="/">
						<Image
							src={logoUrl}
							alt="Logo"
							width={175}
							height={55}
							// blurDataURL="data:..." automatically provided
							// placeholder="blur"
						/>
					</Link>
					<Nav />
				</div>
			</div>
		</header>
	);
}
