import { PageInfo } from "../typings";
import { sanityClient } from "../sanity";

export const fetchPageInfo = async () => {
    return sanityClient.fetch<PageInfo>('*[_type == "pageInfo"][0]')
}
