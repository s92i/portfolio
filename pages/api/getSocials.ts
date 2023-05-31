import type { NextApiRequest, NextApiResponse } from "next"
import { groq } from 'next-sanity'
import { sanityClient } from "../../sanity"
import { Social } from "../../typings"

type Data = {
    socials: Social[]
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const query = groq`
    *[_type == "social"]
`
    const socials: Social[] = await sanityClient.fetch(query)

    res.status(200).json({ socials })
}