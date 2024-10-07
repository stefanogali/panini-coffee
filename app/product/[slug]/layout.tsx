export default function SingleProductLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="single-product">
			<div className="centered-content pt-7">{children}</div>
		</div>
	);
}
