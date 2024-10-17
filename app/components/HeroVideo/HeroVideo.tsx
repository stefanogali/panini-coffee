import Button from "../Button/Button";

type HomeVideoProps = {
	url: string;
	heroContent: string;
	buttonLabel: string;
	buttonLink: string;
};

export default function HeroVideo({ url, heroContent, buttonLabel, buttonLink }: HomeVideoProps) {
	return (
		<section className="hero-video">
			<div className="h-[calc(100vh-var(--headerHeight))] relative">
				<video loop autoPlay muted className="h-full w-full object-cover">
					<source src={url} type="video/mp4" />
					{/* <source src="movie.ogg" type="video/ogg"> */}
					Your browser does not support the video tag.
				</video>
				<div className="container px-5 absolute bottom-0 left-0 right-0">
					<div className="max-w-[50%] mb-40">
						<h2 className="text-white">{heroContent}</h2>
						<Button className="font-medium border-[3px]">{buttonLabel}</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
