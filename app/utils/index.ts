import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

export async function getWPJSON<T>(endpoint: string): Promise<T>{
    try {
        const response = await fetch(`${process.env.SITE_URL}/${endpoint}`, {
            // revalidate request after 5 seconds
            next: { revalidate: 5 },
            method: 'GET',
            // headers: {
            //     'X-API-SECRET': process.env.SECRET_KEY || ''
            // }
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
        // console.log('fields', fields)
    return fields;
}

export function connectWCApi(){
    const api = new WooCommerceRestApi({
      url: "http://localhost:8888/panini-coffee/",
      consumerKey: "ck_3d6e0da8c2b2b2ce4dc4ab2ef48c4b8ba1510457",
      consumerSecret: "cs_11f7f846dbec1f2a7f35e610e38b98c99eae16cc",
      version: "wc/v3"
    });
    return api;
}