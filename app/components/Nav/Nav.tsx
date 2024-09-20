import Cart from "@/app/icons/Cart";

const HeaderCart = () => {
	return (
		<div className="bg-white p-2.5 rounded-full flex items-center justify-center cursor-pointer">
			<Cart />
		</div>
	);
};

export default function Nav() {
	return (
		<nav className="text-white">
			<ul className="flex gap-x-7 items-center text-2xl">
				<li>Home</li>
				<li>Shop</li>
				<li>Contacts</li>
				<li>About</li>
				<HeaderCart />
			</ul>
		</nav>
	);
}
