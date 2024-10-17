import Image from "next/image";

type HeroTwoColsProps = {
	title: string;
	firstParagraph: string;
	secondParagraph: string;
	image: Image;
};

export default function HeroTwoCols({
	title,
	firstParagraph,
	secondParagraph,
	image,
}: HeroTwoColsProps) {
	return (
		<section className="flex overflow-hidden">
			<div className="flex items-center basis-1/2">
				<div className="ml-auto pl-5 pr-24 xl:w-half-container-xl">
					<h1 className="font-bold mb-7">{title}</h1>
					<p className="mb-5">{firstParagraph}</p>
					<p>{secondParagraph}</p>
				</div>
			</div>
			<div className="basis-1/2">
				<Image
					className="aspect-square object-cover w-full h-full max-h-[700px]"
					src={image.url}
					width={image.width}
					height={image.height}
					alt={image.alt}
				/>
			</div>
		</section>
	);
}
