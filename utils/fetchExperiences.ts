import { Experience } from "../typings";
import { sanityClient } from "../sanity";

export const fetchExperiences = async () => {
    return sanityClient.fetch<Experience[]>(`
        *[_type == "experience"] | order(dateStarted asc, dateEnded) {
            ...,
            technologies[]->
        }
    `)
}
