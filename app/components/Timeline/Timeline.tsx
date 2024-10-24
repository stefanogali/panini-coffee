"use client";

// todo: this component needs refactoring for calculating number of children in container
import { useEffect, useRef, useState } from "react";
import flagIcon from "../../icons/flag.svg";
import Image from "next/image";

type TimelineProps = {
	yearFirst: string;
	contentFirst: string;
	yearSecond: string;
	contentSecond: string;
	yearThird: string;
	contentThird: string;
	yearFourth: string;
	contentFourth: string;
	yearFifth: string;
	contentFifth: string;
};

// this constant needs to be same number of px for margin top of TimelineContainer component
const TIMELINE_MARGIN_TOP = 96;
const MARGIN_TOP_TIMELINE_CONTAINER = "mt-24";

const TimelineContainer = ({
	isActive,
	year,
	content,
}: {
	isActive: boolean;
	year: string;
	content: string;
}) => {
	return (
		<div
			className={`${MARGIN_TOP_TIMELINE_CONTAINER} px-5 py-5 w-[90%] lg:w-[50%] bg-background ${
				isActive ? "visible animate-bounceIn" : "invisible"
			}`}>
			<h4 className="text-oliveGreen font-bold text-center">{year}</h4>
			<p>{content}</p>
		</div>
	);
};

export default function Timeline({
	yearFirst,
	contentFirst,
	yearSecond,
	contentSecond,
	yearThird,
	contentThird,
	yearFourth,
	contentFourth,
	yearFifth,
	contentFifth,
}: TimelineProps) {
	const timelineRef = useRef<HTMLDivElement | null>(null);
	const pathRef = useRef<SVGPathElement>(null);
	const containerRef = useRef<HTMLDivElement | null>(null);
	const [isFlagVisible, setIsFlagVisible] = useState(false);
	const [height, setHeight] = useState(0);
	const [windowHeight, setWindowHeight] = useState(0);
	const [timelineSteps, setTimelineSteps] = useState({
		timeline1: false,
		timeline2: false,
		timeline3: false,
		timeline4: false,
		timeline5: false,
	});

	useEffect(() => {
		const handleScroll = () => {
			if (timelineRef.current) {
				const rect = timelineRef.current.getBoundingClientRect();
				const oneThirdScreen = window.innerHeight / 1.3;

				if (height > -(rect.y - oneThirdScreen)) {
					return;
				}
				if (rect.y - oneThirdScreen > -containerRef.current!.clientHeight) {
					setHeight(Math.trunc(oneThirdScreen - rect.y));
				}
			}
		};
		handleScroll();

		window.addEventListener("scroll", handleScroll);

		if (
			height >
			(containerRef.current!.children[0] as HTMLElement).offsetTop + TIMELINE_MARGIN_TOP
		) {
			setTimelineSteps((prev) => {
				return { ...prev, timeline1: true };
			});
		}
		if (
			height >
			(containerRef.current!.children[1] as HTMLElement).offsetTop + TIMELINE_MARGIN_TOP
		) {
			setTimelineSteps((prev) => {
				return { ...prev, timeline2: true };
			});
		}
		if (
			height >
			(containerRef.current!.children[2] as HTMLElement).offsetTop + TIMELINE_MARGIN_TOP
		) {
			setTimelineSteps((prev) => {
				return { ...prev, timeline3: true };
			});
		}
		if (
			height >
			(containerRef.current!.children[3] as HTMLElement).offsetTop + TIMELINE_MARGIN_TOP
		) {
			setTimelineSteps((prev) => {
				return { ...prev, timeline4: true };
			});
		}
		if (
			height >
			(containerRef.current!.children[4] as HTMLElement).offsetTop + TIMELINE_MARGIN_TOP
		) {
			setTimelineSteps((prev) => {
				return { ...prev, timeline5: true };
			});
		}

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [height]);

	useEffect(() => {
		const drawCircle = () => {
			// Get length of the path
			const pathLength = pathRef.current!.getTotalLength();
			// The start position of the drawing
			pathRef.current!.style.strokeDasharray = `${pathLength}`;
			// Hide the svg by offsetting dash.
			pathRef.current!.style.strokeDashoffset = `${pathLength}`;

			// Get position of svg from top
			const rect = pathRef.current!.getBoundingClientRect();
			// Get window inner height
			const windowHeight = window.innerHeight;
			setWindowHeight(windowHeight);

			// if svg is currently on the screen while scrolling
			if (windowHeight - rect.top > 0 && windowHeight - rect.top < windowHeight) {
				// Get percentage of how much the element has scrolled related to the window height
				const scrollPercentage = Math.round(((windowHeight - rect.top) / windowHeight) * 100);
				// how much to draw on svg related to its length
				const drawLength = (pathLength * scrollPercentage) / 100;

				// draw faster with *2
				if (pathLength - drawLength * 2 > 0) {
					pathRef.current!.style.strokeDashoffset = `${pathLength - drawLength * 2}`;
				} else {
					setIsFlagVisible(true);
					pathRef.current!.style.strokeDashoffset = `0`;
				}
			}
		};

		drawCircle();

		if (!isFlagVisible) {
			window.addEventListener("scroll", drawCircle);
		}
		return () => {
			window.removeEventListener("scroll", drawCircle);
		};
	}, [isFlagVisible]);

	return (
		<>
			<section className="pt-20 md:pt-36">
				<h3 className="text-center font-bold mb-5">Our timeline</h3>
				<div
					className="flex flex-col justify-start items-center relative"
					style={{
						height: `${
							containerRef.current
								? containerRef.current.clientHeight + TIMELINE_MARGIN_TOP
								: windowHeight
						}px`,
					}}>
					<div className="bg-oliveGreen rounded-full w-7 h-7"></div>
					<div
						className="bg-oliveGreen relative"
						style={{ height: `${height}px`, width: "5px" }}
						ref={timelineRef}></div>
					<div
						ref={containerRef}
						className="w-full flex flex-col items-center justify-center absolute top-20 left-[50%] -translate-x-[50%]">
						<TimelineContainer
							isActive={timelineSteps.timeline1}
							year={yearFirst}
							content={contentFirst}
						/>
						<TimelineContainer
							isActive={timelineSteps.timeline2}
							year={yearSecond}
							content={contentSecond}
						/>
						<TimelineContainer
							isActive={timelineSteps.timeline3}
							year={yearThird}
							content={contentThird}
						/>
						<TimelineContainer
							isActive={timelineSteps.timeline4}
							year={yearFourth}
							content={contentFourth}
						/>
						<TimelineContainer
							isActive={timelineSteps.timeline5}
							year={yearFifth}
							content={contentFifth}
						/>
					</div>
				</div>
			</section>
			<div>
				{/* <Image className="mx-auto mt-10" src={flagIcon} width={67} height={67} alt="flag icon" /> */}
				<div className="flex justify-center relative -left-[28px]">
					<Image
						className={`relative max-w-[55px] h-auto left-[70px] ${
							isFlagVisible ? "visible animate-bounceIn" : "invisible"
						}`}
						src={flagIcon}
						width={67}
						height={67}
						alt="flag icon"
					/>
					<svg
						id="Layer_1"
						data-name="Layer 1"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 89.92 89.92"
						className={`w-20 h-20`}>
						<path
							d="M87.42,44.96c0,23.45-19.01,42.46-42.46,42.46S2.5,68.41,2.5,44.96,21.51,2.5,44.96,2.5s42.46,19.01,42.46,42.46Z"
							fill="none"
							stroke="#969e4c"
							strokeMiterlimit="10"
							strokeWidth="5"
							ref={pathRef}
						/>
					</svg>
				</div>

				<h3 className="text-center font-bold">
					At vero eos et accusamus et iusto odio dignissimos ducimus
				</h3>
			</div>
		</>
	);
}
