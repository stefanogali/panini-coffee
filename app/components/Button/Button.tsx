import clsx from "clsx";

export default function Button(props: React.ComponentProps<"button">) {
	return (
		<button
			{...props}
			className={clsx("px-6 py-3.5 leading-none font-medium text-xl mt-7", props.className)}>
			{props.children}
		</button>
	);
}
