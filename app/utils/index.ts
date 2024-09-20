
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

export function retrieveFieldGroups<T extends FieldGroup<F>, F>(acfFieldsArray: T[], fieldGroupName: string){
    const fields = acfFieldsArray.map((fieldObj) => {
        if(fieldObj.field_group  === fieldGroupName) {
            return fieldObj.fields
        }
    });
    return fields;
}