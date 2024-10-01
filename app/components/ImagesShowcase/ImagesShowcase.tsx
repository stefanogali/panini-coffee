import Image from "next/image";
import { Fragment } from "react";
import { Button } from "../Button/Button";

type ImagesShowcaseProps = {
	title: string;
	buttonLabel: string;
	buttonLink: string;
	images: Image[];
};

export default function ImagesShowcase({ title, buttonLabel, buttonUrl, images }: ImagesShowcaseProps) {
	return (
		<div className="pt-36">
			<div className="grid grid-cols-3">
				{images.map((image, index) => {
					return (
						<Fragment key={image.id}>
							{index === 4 && (
								<div className="aspect-square bg-white text-background px-12 text-center flex flex-col items-center justify-center">
									<h2 className="font-bold">{title}</h2>
									<Button className="text-background border-background border-[3px]">{buttonLabel}</Button>
								</div>
							)}
							<div className="aspect-square">
								<Image className="w-full h-full object-cover" src={image.url} width={image.width} height={image.height} alt="Picture of the author" />
							</div>
						</Fragment>
					);
				})}
			</div>
		</div>
	);
}
