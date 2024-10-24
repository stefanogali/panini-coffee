import Image from "next/image";
import Button from "../Button/Button";
import Link from "next/link";
import { extractLastSegmentUrl } from "@/app/utils";

type ImageTextTwoColsProps = {
	image: Image;
	title: string;
	content: string;
	buttonLabel: string;
	buttonLink: string;
};

export default function ImageTextTwoCols({
	image,
	title,
	content,
	buttonLabel,
	buttonLink,
}: ImageTextTwoColsProps) {
	return (
		<section className="pt-20 md:pt-36 flex flex-col md:flex-row">
			<div className="basis-1/2">
				<Image
					className="aspect-square object-cover w-full h-full max-h-[300px] md:max-h-[700px]"
					src={image.url}
					width={image.width}
					height={image.height}
					alt={image.alt}
				/>
			</div>
			<div className="basis-1/2 bg-white text-background flex items-center justify-center">
				<div className="mr-auto px-5 py-10 text-center xl:w-half-container-xl 2xl:pl-24">
					<h2 className="font-bold mb-5">{title}</h2>
					<p>{content}</p>
					<Link href={extractLastSegmentUrl(buttonLink)}>
						<Button className="border-[3px] border-background uppercase">{buttonLabel}</Button>
					</Link>
				</div>
			</div>
		</section>
	);
}
