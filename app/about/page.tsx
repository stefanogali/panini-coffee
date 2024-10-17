import { getWPJSON, retrievePageObj, retrieveFieldGroups } from "../utils";
import HeroTwoCols from "../components/HeroTwoCols/HeroTwoCols";
import Timeline from "../components/Timeline/Timeline";

type Col1 = {
	title: string;
	first_paragraph: string;
	second_paragraph: string;
};

type Col2 = {
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

type HeroTwoColsContent = { first_col: Col1; second_col: Col2 };

type AboutPageContent = HeroTwoColsContent & Timeline;

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
				</>
			);
		}
	});

	return pageLayout;
}
