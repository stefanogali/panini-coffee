// export function isGenericObject<T>(value: unknown): value is GenericObject<T> {
//     return value !== null && typeof value === 'object' && !Array.isArray(value);
// }

// export function isHeroVideo(data: unknown): data is HeroVideo {
//     return isGenericObject<string>(data) && typeof data.url === 'string';
// }

// export function isPageSection(data: unknown): data is PageSection {
//     return (
//         isGenericObject<string | number>(data) &&
//         isHeroVideo(data.hero_video) &&
//         typeof data.hero_content === 'string' &&
//         typeof data.button_text === 'string' &&
//         typeof data.button_link === 'string' &&
//         typeof data.id === 'number'
//     );
// }

// export function isPageMeta(data: unknown): data is PageMeta {
//     return (
//         isGenericObject<number>(data) &&
//         typeof data.id === 'number' &&
//         Array.isArray(data.acf_field_groups) &&
//         data.acf_field_groups.every(isPageSection)
//     );
// }

// export function isGenericObjectArray(data: unknown): data is GenericObject<string | number | boolean>[] {
//     return Array.isArray(data) && data.every(isGenericObject);
// }