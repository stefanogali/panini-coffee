export default function SingleProductDetailsSkeleton() {
	return (
		<div className="mt-36 animate-pulse">
			<div className="flex flex-col">
				<div className="flex">
					<div className="bg-gray-300 h-10 basis-32 grow-0 shrink mr-1"></div>
					<div className="bg-gray-300 h-10 basis-32 grow-0 shrink"></div>
				</div>
				<div className="w-full mt-5">
					{Array.from({ length: 5 }).map((_, index) => (
						<div key={index} className="block h-2 mb-4 bg-gray-300 rounded-full"></div>
					))}
				</div>
			</div>
		</div>
	);
}
