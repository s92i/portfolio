import { Skill } from "../typings";
import { sanityClient } from "../sanity";

export const fetchSkills = async () => {
    return sanityClient.fetch<Skill[]>('*[_type == "skill"]')
}
