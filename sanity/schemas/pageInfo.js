export default {
  name: 'pageInfo',
  title: 'PageInfo',
  type: 'document',
  fields: [
    {
      name: 'siteUrl', title: 'Public website URL', type: 'url',
      description: 'Your deployed homepage URL, used for canonical and sharing links.',
      validation: Rule => Rule.uri({ scheme: ['http', 'https'] }),
    },
    {
      name: 'seoDescription', title: 'Search description', type: 'text',
      description: 'A short portfolio introduction for search and social previews.',
      validation: Rule => Rule.max(160),
    },
    {
      name: 'socialImage', title: 'Social preview image', type: 'image',
      description: 'Use a 1200 × 630 image. The hero image is used when this is empty.',
      options: { hotspot: true },
    },
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'role',
      title: 'Role',
      type: 'string',
    },
    {
      name: 'heroImage',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'backgroundInformation',
      title: 'BackgroundInformation',
      type: 'string',
    },
    {
      name: 'profilePic',
      title: 'ProfilePic',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'phoneNumber',
      title: 'PhoneNumber',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
    },
    {
      name: 'address',
      title: 'Address',
      type: 'string',
    },
    {
      name: 'socials',
      title: 'Socials',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'social' } }],
    },
  ],
}
