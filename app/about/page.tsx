import { getWPJSON, retrievePageObj, retrieveFieldGroups } from "../utils";
import HeroTwoCols from "../components/HeroTwoCols/HeroTwoCols";

type Col1 = {
	title: string;
	first_paragraph: string;
	second_paragraph: string;
};

type Col2 = {
	image: Image;
};

type HeroTwoColsContent = { first_col: Col1; second_col: Col2 };

type AboutPageContent = HeroTwoColsContent;

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
			pageLayout.push(
				<>
					<HeroTwoCols
						title={heroPageSection.first_col.title}
						firstParagraph={heroPageSection.first_col.first_paragraph}
						secondParagraph={heroPageSection.first_col.second_paragraph}
						image={heroPageSection.second_col.image}
					/>
				</>
			);
		}
	});

	return pageLayout;
}
