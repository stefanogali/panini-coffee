import Image from "next/image";
import Nav from "../Nav/Nav";

type HeaderProps = {
	logoUrl: string;
};

export default function Header({ logoUrl }: HeaderProps) {
	return (
		<header className="bg-background py-12">
			<div className="centered-content">
				<div className="flex justify-between items-center">
					<Image
						src={logoUrl}
						alt="Logo"
						width={175}
						height={55}
						// blurDataURL="data:..." automatically provided
						// placeholder="blur"
					/>
					<Nav />
				</div>
			</div>
		</header>
	);
}
