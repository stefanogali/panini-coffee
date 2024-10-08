import Link from "next/link";
import Button from "../Button/Button";
import Image from "next/image";

export default function FeaturedProductHome({ product }: { product: FeaturedProduct }) {
	console.log("product", product);
	return (
		<section className="bg-white mt-36 bg-[url('images/logo-waves.svg')] bg-cover bg-center bg-no-repeat">
			<div className="centered-content flex items-center py-20">
				<div className="text-background pr-20">
					<h2 className="font-bold mb-10">{product.title}</h2>
					<p>{product.short_description}</p>
					<Link className="mt-auto" href={`/product/${product.slug}`}>
						<Button className="border-[3px] border-background uppercase">Look Product</Button>
					</Link>
				</div>
				<div>
					<Image
						src={product.image.url}
						width={product.image.width}
						height={product.image.height}
						alt={product.image.alt}
						className="max-w-56 drop-shadow-xl"
					/>
				</div>
			</div>
		</section>
	);
}
