export const SITE = {
  name: 'IKIGAI Hospitals',
  title: 'IKIGAI Hospitals — Expert Vascular & Surgical Care',
  description:
    'Advanced diagnosis, precision treatment and compassionate care led by experienced vascular, endovascular, plastic and reconstructive specialists.',
  url: (import.meta.env.VITE_SITE_URL as string | undefined) ?? '',
  ogImage: '/images/faq/reception-desk.png',
  phone: '+91 9063453373',
  phoneHref: 'tel:+919063453373',
  tagline: 'A Speciality Plastic and Vascular Surgery Hospital',
} as const
