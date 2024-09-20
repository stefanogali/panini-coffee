import { getWPJSON, retrievePageObj, retrieveFieldGroups } from "./utils";

type HeroContent = {
	hero_video: { url: string };
	hero_content: string;
	button_text: string;
	button_link: string;
};

import HeroVideo from "./components/HeroVideo/HeroVideo";

export default async function Home() {
	const pageData: PageMeta<FieldGroup<HeroContent>>[] = await getWPJSON("wp-json/wp/v2/pages");

	const pageObjs = retrievePageObj(pageData, "home");

	return pageObjs.map((pageMeta) => {
		if (pageMeta?.acf_field_groups.length > 0) {
			const heroPageSection = retrieveFieldGroups<FieldGroup<HeroContent>, HeroContent>(pageMeta.acf_field_groups, "Homepage Hero")[0];
			if (heroPageSection) {
				return <HeroVideo heroContent={heroPageSection.hero_content} buttonText={heroPageSection.button_text} buttonLink={heroPageSection.button_link} url={heroPageSection.hero_video.url} key={pageMeta.id} />;
			} else {
				return null;
			}
		}
	});
}
