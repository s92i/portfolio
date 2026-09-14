import { createClient } from "next-sanity";
import createImageUrlBuilder from '@sanity/image-url'
import studioConfig from './sanity/sanity.json'

export const config = {
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || studioConfig.api.dataset,
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || studioConfig.api.projectId,
    apiVersion: '2021-03-25',
    // ISR must read newly published content rather than a cached CDN response.
    useCdn: false,
}

export const sanityClient = createClient(config)

export const urlFor = (source: any) => createImageUrlBuilder(config).image(source)
