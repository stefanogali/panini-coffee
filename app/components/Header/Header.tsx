import Image from "next/image";
import Nav from "../Nav/Nav";
import Link from "next/link";

type HeaderProps = {
	logoUrl: string;
};

export default function Header({ logoUrl }: HeaderProps) {
	return (
		<header className="bg-background py-12">
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
