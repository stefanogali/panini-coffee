import Image from "next/image";
import { clsx } from "clsx";
import { ImageProps } from "next/image";

export default function ProductCard(props: ImageProps & { imageClassName?: string }) {
	const { children, className, imageClassName, ...imageProps } = props;
	return (
		<div
			className={clsx(
				"flex flex-col justify-center w-full h-full items-center text-background py-14 px-5 rounded-[20px] bg-gradient-to-br from-white to-[#B9B9B9]",
				className
			)}>
			<Image className={imageClassName} {...imageProps} />
			{children}
		</div>
	);
}
