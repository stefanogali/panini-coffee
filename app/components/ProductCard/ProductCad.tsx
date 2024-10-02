import Image from "next/image";
import { ImageProps } from "next/image";

export default function ProductCard(props: ImageProps) {
	const { children, ...imageProps } = props;
	return (
		<div className="flex flex-col items-center justify-center py-14 px-5 rounded-[20px] bg-gradient-to-br from-white to-[#B9B9B9]">
			<Image {...imageProps} />
			{children}
		</div>
	);
}
