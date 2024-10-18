import { getWPJSON, retrievePageObj, retrieveFieldGroups } from "../utils";
import HeroTwoCols from "../components/HeroTwoCols/HeroTwoCols";
import Timeline from "../components/Timeline/Timeline";
import ImageTextTwoCols from "../components/ImageTextTwoCols/ImageTextTwoCols";
import TestimonialSlider from "../components/TestimonialSlider/TestimonialSlider";

type HeroCol1 = {
	title: string;
	first_paragraph: string;
	second_paragraph: string;
};

type HeroCol2 = {
	image: Image;
};

type Timeline = {
	year_first_step: string;
	content_first_step: string;
	year_second_step: string;
	content_second_step: string;
	year_third_step: string;
	content_third_step: string;
	year_fourth_step: string;
	content_fourth_step: string;
	year_fifth_step: string;
	content_fifth_step: string;
};

type ImageTextTwoCols = {
	col_1: {
		image: Image;
	};
	col_2: {
		title: string;
		content: string;
		button_label: string;
		button_link: string;
	};
};

type HeroTwoColsContent = { first_col: HeroCol1; second_col: HeroCol2 };

type AboutPageContent = HeroTwoColsContent & Timeline & ImageTextTwoCols;

export default async function Page() {
	const pageData: PageMeta<FieldGroup<AboutPageContent>>[] = await getWPJSON("wp-json/wp/v2/pages");
	const pageObjs = retrievePageObj(pageData, "about");

	const pageLayout: React.ReactElement[] = [];

	pageObjs.map((pageMeta) => {
		if (pageMeta?.acf_field_groups.length > 0) {
			const [heroPageSection] = retrieveFieldGroups<FieldGroup<AboutPageContent>, AboutPageContent>(
				pageMeta.acf_field_groups,
				"Hero two cols"
			);
			const [timelinePageSection] = retrieveFieldGroups<FieldGroup<Timeline>, Timeline>(
				pageMeta.acf_field_groups,
				"Timeline"
			);

			const [imageTextPageSection] = retrieveFieldGroups<
				FieldGroup<ImageTextTwoCols>,
				ImageTextTwoCols
			>(pageMeta.acf_field_groups, "Image text two cols");
			pageLayout.push(
				<>
					<HeroTwoCols
						title={heroPageSection.first_col.title}
						firstParagraph={heroPageSection.first_col.first_paragraph}
						secondParagraph={heroPageSection.first_col.second_paragraph}
						image={heroPageSection.second_col.image}
					/>
					<Timeline
						yearFirst={timelinePageSection.year_first_step}
						contentFirst={timelinePageSection.content_first_step}
						yearSecond={timelinePageSection.year_second_step}
						contentSecond={timelinePageSection.content_second_step}
						yearThird={timelinePageSection.year_third_step}
						contentThird={timelinePageSection.content_third_step}
						yearFourth={timelinePageSection.year_fourth_step}
						contentFourth={timelinePageSection.content_fourth_step}
						yearFifth={timelinePageSection.year_fifth_step}
						contentFifth={timelinePageSection.content_fifth_step}
					/>
					<ImageTextTwoCols
						image={imageTextPageSection.col_1.image}
						title={imageTextPageSection.col_2.title}
						content={imageTextPageSection.col_2.content}
						buttonLabel={imageTextPageSection.col_2.button_label}
						buttonLink={imageTextPageSection.col_2.button_link}
					/>
				</>
			);
			pageLayout.push(<TestimonialSlider />);
		}
	});

	return pageLayout;
}
