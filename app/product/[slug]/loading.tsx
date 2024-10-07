import SingleProductOverviewSkeleton from "@/app/components/Skeleton/SingleProduct/SingleProductOverviewSkeleton";
import SingleProductDetailsSkeleton from "@/app/components/Skeleton/SingleProduct/SingleProductDetailsSkeleton";

export default function Loading() {
	// You can add any UI inside Loading, including a Skeleton.
	return (
		<>
			<SingleProductOverviewSkeleton />
			<SingleProductDetailsSkeleton />
		</>
	);
}
