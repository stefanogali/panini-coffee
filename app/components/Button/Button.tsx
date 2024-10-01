import clsx from "clsx";

export function Button(props: React.ComponentProps<"button">) {
	return (
		<button {...props} className={clsx("px-6 py-3.5 leading-none text-xl mt-7", props.className)}>
			{props.children}
		</button>
	);
}
