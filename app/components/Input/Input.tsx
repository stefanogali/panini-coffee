import clsx from "clsx";

export default function Input(props: React.ComponentProps<"input">) {
	return <input {...props} className={clsx("p-2.5 pl-0 focus:outline-hidden", props.className)} />;
}
