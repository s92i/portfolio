import { Social } from "../typings";
import { sanityClient } from "../sanity";

export const fetchSocials = async () => {
    return sanityClient.fetch<Social[]>('*[_type == "social"]')
}
