import { Project } from "../typings";
import { sanityClient } from "../sanity";

export const fetchProjects = async () => {
    return sanityClient.fetch<Project[]>(`
        *[_type == "project"] | order(dateStarted desc) {
            ...,
            technologies[]->
        }
    `)
}
