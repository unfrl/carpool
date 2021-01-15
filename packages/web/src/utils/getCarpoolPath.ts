import slugify from "slugify";

/**
 * Gets the carpool route path.
 * @param name - The carpool name
 * @param urlId - The carpool URL ID, not the GUID!
 */
export const getCarpoolPath = (name: string, urlId: string) => {
    return `/carpools/${urlId}/${slugify(name, { lower: true })}`;
};
