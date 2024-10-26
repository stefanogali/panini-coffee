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
		<section className="flex flex-col-reverse overflow-hidden lg:flex-row">
			<div className="flex items-center basis-1/2">
				<div className="ml-auto px-5 lg:pr-half-container-padding-right xl:w-half-container-xl">
					<h1 className="font-bold mb-heading-margin-bottom">{title}</h1>
					<p>{firstParagraph}</p>
					<p>{secondParagraph}</p>
				</div>
			</div>
			<div className="mb-7 basis-1/2 lg:mb-0">
				<Image
					className="aspect-square object-cover w-full h-full max-h-[400px] lg:max-h-[700px]"
					src={image.url}
					width={image.width}
					height={image.height}
					alt={image.alt}
				/>
			</div>
		</section>
	);
}
