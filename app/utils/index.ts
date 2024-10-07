import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

export async function getWPJSON<T>(endpoint: string): Promise<T>{
    try {
        const response = await fetch(`${process.env.SITE_URL}/${endpoint}`, {
            // revalidate request after 5 seconds
            next: { revalidate: 30 },
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching JSON:', error);
        throw error;
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
      url: "http://localhost:8888/panini-coffee/",
      consumerKey: process.env.WOOCOMMERCECONSUMERKEY as string,
      consumerSecret: process.env.WOOCOMMERCECONSUMERSECRET as string,
      version: "wc/v3"
    });
    return api;
}