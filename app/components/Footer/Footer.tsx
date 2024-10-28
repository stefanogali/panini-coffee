import { getWPJSON } from "@/app/utils";
import Image from "next/image";
import Link from "next/link";
import Form from "../Form/form";
import Input from "../Input/Input";
import Button from "../Button/Button";

type FooterProps = {
	logoUrl: string;
};

const FooterColumn1 = ({ content }: { content: string }) => {
	return (
		<>
			<div className="flex gap-x-16 basis-1/3 grow lg:grow-0">
				<div className="brand-details" dangerouslySetInnerHTML={{ __html: content }}></div>
			</div>
		</>
	);
};

const FooterColumn2 = () => {
	return (
		<div className="basis-1/3 grow lg:grow-0">
			<h5 className="mb-7">Contrary to popular belief, Lorem Ipsum is not simply random text.</h5>
			<Form>
				<Input className="w-full bg-transparent border-b-[1px]" />
				<Button className="uppercase border-white border-[3px]">Send</Button>
			</Form>
		</div>
	);
};

const FooterColumn3 = () => {
	return (
		<div className="basis-1/3 grow lg:grow-0">
			<div className="flex gap-16">
				<div className="flex flex-col">
					<Link
						href={{
							pathname: "#",
						}}>
						Link 1
					</Link>
					<Link
						href={{
							pathname: "#",
						}}>
						Link 2
					</Link>
				</div>
				<div className="flex flex-col">
					<Link
						href={{
							pathname: "#",
						}}>
						Link 3
					</Link>
					<Link
						href={{
							pathname: "#",
						}}>
						Link 4
					</Link>
				</div>
			</div>
		</div>
	);
};

export default async function Footer({ logoUrl }: FooterProps) {
	const footerEditable: { content: string } = await getWPJSON("wp-json/custom/v1/footer");
	const { content } = footerEditable;

	return (
		<footer className="py-section-vertical md:py-section-vertical-lg bg-background text-white">
			<div className="container px-5">
				<div className="flex justify-center">
					<div className="flex-initial w-32 mb-16">
						<Image src={logoUrl} width={128} height={40} alt="Panini coffee logo" />
					</div>
				</div>
				<div className="flex flex-col gap-12 flex-wrap md:flex-row md:gap-8 lg:flex-nowrap lg:gap-16">
					<FooterColumn1 content={content} />
					<FooterColumn2 />
					<FooterColumn3 />
				</div>
			</div>
		</footer>
	);
}
