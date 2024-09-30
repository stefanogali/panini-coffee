import { getWPJSON, retrievePageObj, retrieveFieldGroups } from "./utils";
import HeroVideo from "./components/HeroVideo/HeroVideo";
import AboutHome from "./components/AboutHome/AboutHome";
import ImagesShowcase from "./components/ImagesShowcase/ImagesShowcase";

type HeroContent = {
	hero_video: { url: string };
	hero_content: string;
	button_label: string;
	button_link: string;
};

// todo: change button_text with button_label
type AboutCol1 = {
	section_title: string;
	content: string;
	button_label: string;
	button_url: string;
};

type AboutCol2 = {
	icon_1: Image;
	content_first_icon_card: string;
	icon_2: Image;
	content_second_icon_card: string;
	icon_3: Image;
	content_third_icon_card: string;
	icon_4: Image;
	content_fourth_icon_card: string;
};

type AboutContent = {
	col_1: AboutCol1;
	col_2: AboutCol2;
};

type ImagesShowcaseContent = {
	image_1: Image;
	image_2: Image;
	image_3: Image;
	image_4: Image;
	image_5: Image;
	header?: string;
	button_label?: string;
	button_link?: string;
};

function aboutCards(aboutSection: { col_2: AboutCol2 }) {
	const card1 = {
		icon: {
			id: aboutSection.col_2.icon_1.id,
			width: aboutSection.col_2.icon_1.width,
			height: aboutSection.col_2.icon_1.height,
			url: aboutSection.col_2.icon_1.url,
			alt: aboutSection.col_2.icon_1.alt,
		},
		content: aboutSection.col_2.content_first_icon_card,
	};
	const card2 = {
		icon: {
			id: aboutSection.col_2.icon_2.id,
			width: aboutSection.col_2.icon_2.width,
			height: aboutSection.col_2.icon_2.height,
			url: aboutSection.col_2.icon_2.url,
			alt: aboutSection.col_2.icon_2.alt,
		},
		content: aboutSection.col_2.content_second_icon_card,
	};
	const card3 = {
		icon: {
			id: aboutSection.col_2.icon_3.id,
			width: aboutSection.col_2.icon_3.width,
			height: aboutSection.col_2.icon_3.height,
			url: aboutSection.col_2.icon_3.url,
			alt: aboutSection.col_2.icon_3.alt,
		},
		content: aboutSection.col_2.content_third_icon_card,
	};
	const card4 = {
		icon: {
			id: aboutSection.col_2.icon_4.id,
			width: aboutSection.col_2.icon_4.width,
			height: aboutSection.col_2.icon_4.height,
			url: aboutSection.col_2.icon_4.url,
			alt: aboutSection.col_2.icon_4.alt,
		},
		content: aboutSection.col_2.content_fourth_icon_card,
	};
	return [card1, card2, card3, card4];
}

function groupImagesShowcase(imagesShowcaseSection: ImagesShowcaseContent) {
	return [imagesShowcaseSection.image_1, imagesShowcaseSection.image_2, imagesShowcaseSection.image_3, imagesShowcaseSection.image_4, imagesShowcaseSection.image_5];
}

export default async function Home() {
	const pageData: PageMeta<FieldGroup<HeroContent & AboutContent & ImagesShowcaseContent>>[] = await getWPJSON("wp-json/wp/v2/pages");

	const pageObjs = retrievePageObj(pageData, "home");

	const pageLayout: React.ReactElement[] = [];

	pageObjs.map((pageMeta) => {
		if (pageMeta?.acf_field_groups.length > 0) {
			const [heroPageSection] = retrieveFieldGroups<FieldGroup<HeroContent>, HeroContent>(pageMeta.acf_field_groups, "Homepage Hero");
			const [aboutPageSection] = retrieveFieldGroups<FieldGroup<AboutContent>, AboutContent>(pageMeta.acf_field_groups, "About home two cols");
			const [imagesShowcasePageSection] = retrieveFieldGroups<FieldGroup<ImagesShowcaseContent>, ImagesShowcaseContent>(pageMeta.acf_field_groups, "Images showcase");

			if (heroPageSection) {
				pageLayout.push(<HeroVideo heroContent={heroPageSection.hero_content} buttonLabel={heroPageSection.button_label} buttonLink={heroPageSection.button_link} url={heroPageSection.hero_video.url} key={pageMeta.id} />);
			}
			if (aboutPageSection) {
				pageLayout.push(<AboutHome title={aboutPageSection.col_1.section_title} content={aboutPageSection.col_1.content} buttonLabel={aboutPageSection.col_1.button_label} buttonLink={aboutPageSection.col_1.button_url} cardContent={aboutCards(aboutPageSection)} />);
			}
			if (imagesShowcasePageSection) {
				pageLayout.push(<ImagesShowcase title={imagesShowcasePageSection.header!} buttonLabel={imagesShowcasePageSection.button_label!} buttonLink={imagesShowcasePageSection.button_link!} images={groupImagesShowcase(imagesShowcasePageSection)} />);
			}
		}
	});
	return pageLayout;
}
