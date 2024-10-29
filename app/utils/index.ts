import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

export async function getWPJSON<T>(endpoint: string,defaultValue: T): Promise<T>{
    try {
        const response = await fetch(`${process.env.SITE_URL}/${endpoint}`, {
            // revalidate request after 5 seconds. Adjust to your needs
            next: { revalidate: 5 },
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching JSON:', error);
        return defaultValue;
    }
}

export function retrievePageObj<T>(arrayOfObjects:PageMeta<T>[], pageSlug:string):PageMeta<T>[]{
    const pageObjectArray:PageMeta<T>[] = arrayOfObjects.filter((object) => object.slug === pageSlug);
    return pageObjectArray;
}

export function retrieveFieldGroups<T extends FieldGroup<F>, F>(acfFieldsArray: T[], fieldGroupName: string): F[] {
    const fields = acfFieldsArray
        .filter(fieldObj => { return fieldObj.field_group === fieldGroupName})
        .map(fieldObj => { return fieldObj.fields});
    return fields;
}

export function connectWCApi(){
    const api = new WooCommerceRestApi({
      url: process.env.SITE_URL as string,
      consumerKey: process.env.WOOCOMMERCECONSUMERKEY as string,
      consumerSecret: process.env.WOOCOMMERCECONSUMERSECRET as string,
      version: "wc/v3"
    });
    return api;
}

export function extractLastSegmentUrl(url:string) {
    if (url){
       const explodeUrl = url.split("/").filter((item) => item !== "");
	const sendTo = `/${explodeUrl[explodeUrl.length - 1]}`;
    return sendTo; 
    }
    return '/';
    
}