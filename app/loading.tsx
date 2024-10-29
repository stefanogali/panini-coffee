import Image from "next/image";
import { getWPJSON } from "./utils";

export default async function Loading() {
	const logo: Logo = await getWPJSON("wp-json/custom/v1/logo", {
		logo_url: "/logo/logo-colors.svg",
	});
	return (
		<div className="bg-background fixed top-0 left-0 w-full h-full flex items-center justify-center z-10">
			<div className="w-[175px] h-[55px]">
				<div className="animate-container">
					<Image className="animate-image" src={logo.logo_url} alt="Logo" width={175} height={55} />
				</div>
			</div>
		</div>
	);
}
