export default function SingleProductLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="single-product">
			<div className="container px-5 pt-7">{children}</div>
		</div>
	);
}
