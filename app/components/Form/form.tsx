import clsx from "clsx";

export default function Form(props: React.ComponentProps<"form">) {
	return (
		<form {...props} className={clsx("", props.className)}>
			{props.children}
		</form>
	);
}
