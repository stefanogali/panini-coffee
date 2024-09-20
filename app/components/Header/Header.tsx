import Image from "next/image";
import Nav from "../Nav/Nav";

type Header = {
	logoUrl: string;
};

export default function Header({ logoUrl }: Header) {
	return (
		<header className="bg-foreground py-12">
			<div className="centered-content">
				<div className="flex justify-between items-center">
					<Image
						src={logoUrl}
						alt="Picture of the author"
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
