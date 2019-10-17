import slugify from "slugify";

export const getCarpoolPath = (name: string, id: string) => {
    return `/carpools/${slugify(name, { lower: true })}/${id}`;
};
