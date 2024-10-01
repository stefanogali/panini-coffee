import Button from "../Button/Button";

type HomeVideo = {
	url: string;
	heroContent: string;
	buttonLabel: string;
	buttonLink: string;
};

export default function HeroVideo({ url, heroContent, buttonLabel, buttonLink }: HomeVideo) {
	return (
		<section className="hero-video">
			<div className="h-[calc(100vh-150px)] relative">
				<video loop autoPlay muted className="h-full w-full object-cover">
					<source src={url} type="video/mp4" />
					{/* <source src="movie.ogg" type="video/ogg"> */}
					Your browser does not support the video tag.
				</video>
				<div className="absolute bottom-0 left-0 right-0 centered-content">
					<div className="max-w-[50%] mb-40">
						<h2 className="text-white">{heroContent}</h2>
						<Button className="font-medium border-[3px]">{buttonLabel}</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
