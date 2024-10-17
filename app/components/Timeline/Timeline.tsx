"use client";

import { useEffect, useRef, useState, forwardRef } from "react";
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

type TimelineStepsProps = {
	width: string;
	top?: string;
	bottom?: string;
	left?: string;
	right?: string;
	isActive: boolean;
	year: string;
	content: string;
	beforeClasses?: string;
	afterClasses?: string;
	textAlign?: "text-left" | "text-right";
	textContentLeft?: string;
	textContentRight?: string;
};

type LastTimelineStepsProps = {
	year: string;
	content: string;
	isActive: boolean;
};

const TimelineStep = ({
	width,
	top,
	bottom,
	left,
	right,
	isActive,
	year,
	content,
	beforeClasses = "",
	afterClasses = "",
	textAlign = "text-left",
	textContentLeft = "",
	textContentRight = "",
}: TimelineStepsProps) => {
	return (
		<div
			className={`${width} h-[5px] flex items-center bg-oliveGreen absolute ${
				top ? `${top}` : ""
			} ${bottom ? `${bottom}` : ""} ${left ? `${left}` : ""} ${
				right ? `${right}` : ""
			} ${beforeClasses} ${afterClasses} ${isActive ? "visible animate-bounceIn" : "invisible"}`}>
			<div
				className={`absolute ${textContentLeft ? textContentLeft : ""} ${
					textContentRight ? textContentRight : ""
				} -top-2.5  ${textAlign}`}>
				<h4 className="text-oliveGreen font-bold">{year}</h4>
				<p>{content}</p>
			</div>
		</div>
	);
};

const Timeline5 = forwardRef<HTMLDivElement, LastTimelineStepsProps>((props, ref) => {
	const { isActive, year, content } = props;
	return (
		<div
			className={`w-28 h-[5px] flex items-center bg-oliveGreen absolute bottom-0 -left-28 before:content-[''] before:block before:bg-oliveGreen before:rounded-full before:w-4 before:h-4 ${
				isActive ? "visible animate-bounceIn" : "invisible"
			}`}>
			<div className="absolute -left-20 -top-2.5" ref={ref}>
				<h4 className="text-oliveGreen font-bold">{year}</h4>
				<p>{content}</p>
			</div>
		</div>
	);
});

const TIMELINE_LENGTH = 900;

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
	const timeline5Ref = useRef<HTMLDivElement | null>(null);
	const [timeline5Height, setTimeline5Height] = useState(0);
	const [height, setHeight] = useState(0);
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

				if (height > -(rect.y - oneThirdScreen + 1)) {
					return;
				}
				if (rect.y - oneThirdScreen > -TIMELINE_LENGTH) {
					setHeight(Math.trunc(oneThirdScreen - rect.y));
				}
			}
		};
		handleScroll();

		window.addEventListener("scroll", handleScroll);

		if (height > 100) {
			setTimelineSteps((prev) => {
				return { ...prev, timeline1: true };
			});
		}
		if (height > 330) {
			setTimelineSteps((prev) => {
				return { ...prev, timeline2: true };
			});
		}
		if (height > 500) {
			setTimelineSteps((prev) => {
				return { ...prev, timeline3: true };
			});
		}
		if (height > 730) {
			setTimelineSteps((prev) => {
				return { ...prev, timeline4: true };
			});
		}
		if (height > 850) {
			setTimelineSteps((prev) => {
				return { ...prev, timeline5: true };
			});
		}

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [height]);

	useEffect(() => {
		setTimeline5Height(timeline5Ref.current ? timeline5Ref.current.clientHeight : 0);
	}, []);

	return (
		<>
			<section className="pt-36">
				<h3 className="text-center font-bold mb-5">Our timeline</h3>
				<div
					className="flex flex-col justify-start items-center"
					style={{ height: `${TIMELINE_LENGTH + timeline5Height}px` }}>
					<div className="bg-oliveGreen rounded-full w-7 h-7"></div>
					<div
						className="bg-oliveGreen relative"
						style={{ height: `${height}px`, width: "5px" }}
						ref={timelineRef}>
						<TimelineStep
							width="w-32"
							top="top-24"
							left="-left-32"
							beforeClasses="before:content-[''] before:block before:bg-oliveGreen before:rounded-full before:w-4 before:h-4"
							textContentLeft="-left-20"
							year={yearFirst}
							content={contentFirst}
							isActive={timelineSteps.timeline1}
						/>
						<TimelineStep
							width="w-40"
							top="top-72"
							afterClasses="after:left-40 after:content-[''] after:absolute after:right-0 after:bg-oliveGreen after:rounded-full after:w-4 after:h-4"
							textContentLeft="left-4"
							textContentRight="-right-24"
							textAlign="text-right"
							year={yearSecond}
							content={contentSecond}
							isActive={timelineSteps.timeline2}
						/>
						<TimelineStep
							width="w-56"
							top="top-[500px]"
							left="-left-56"
							beforeClasses="before:content-[''] before:block before:bg-oliveGreen before:rounded-full before:w-4 before:h-4"
							textContentLeft="-left-20"
							year={yearThird}
							content={contentThird}
							isActive={timelineSteps.timeline3}
						/>

						<TimelineStep
							width="w-72"
							top="top-[730px]"
							afterClasses="after:left-72 after:content-[''] after:absolute after:right-0 after:bg-oliveGreen after:rounded-full after:w-4 after:h-4"
							textContentLeft="left-4"
							textContentRight="-right-24"
							textAlign="text-right"
							year={yearFourth}
							content={contentFourth}
							isActive={timelineSteps.timeline4}
						/>
						<Timeline5
							year={yearFifth}
							content={contentFifth}
							isActive={timelineSteps.timeline5}
							ref={timeline5Ref}
						/>
					</div>
				</div>
			</section>
			<div>
				<Image className="mx-auto mt-10" src={flagIcon} width={67} height={67} alt="flag icon" />
				<h3 className="text-center font-bold">
					At vero eos et accusamus et iusto odio dignissimos ducimus
				</h3>
			</div>
		</>
	);
}
