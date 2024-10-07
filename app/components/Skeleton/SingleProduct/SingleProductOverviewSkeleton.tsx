export default function SingleProductOverviewSkeleton() {
	return (
		<div className="flex justify-between gap-48 animate-pulse max-h-[400px] overflow-hidden">
			<div className="flex justify-center items-center bg-gradient-to-br from-white to-[#B9B9B9] rounded-[20px] w-full">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth="2"
					stroke="currentColor"
					className="w-12 h-12 text-gray-500">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"></path>
				</svg>
			</div>
			<div className="w-full">
				<div className="block w-3/4 h-4 mb-6 bg-gray-300 rounded-full"></div>
				{Array.from({ length: 30 }).map((_, index) => (
					<div key={index} className="block h-2 mb-4 bg-gray-300 rounded-full"></div>
				))}
			</div>
		</div>
	);
}
