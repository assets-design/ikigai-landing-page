export type Location = {
  id: string
  name: string
  addressLines: readonly string[]
  mapEmbedUrl: string
  mapAlt: string
  mapsUrl: string
}

export const LOCATIONS_HEADING = {
  label: 'Locations',
  title: 'Care, Wherever You Need It',
  description:
    'With multiple locations across Hyderabad, Ikigai Hospitals brings specialised medical expertise closer to you. Find the centre most convenient for you and access trusted, advanced care with ease.',
} as const

export const LOCATIONS: readonly Location[] = [
  {
    id: 'kondapur',
    name: 'Kondapur',
    addressLines: [
      '4th floor, Prasad Enclave, Masjid Banda Rd,',
      'above Starbucks, Kondapur,',
      'Camelot Layout, Gachibowli, Hyderabad,',
      'Telangana 500084',
    ],
    mapEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.774!2d78.3478514!3d17.4654766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93a0a8594fc7%3A0x4565090211030df9!2sIKIGAI+Hospitals+-+Kondapur%2C+Hyderabad!5e0!3m2!1sen!2sin!4v1756900800000',
    mapAlt: 'Map showing IKIGAI Hospitals - Kondapur, Hyderabad',
    mapsUrl:
      'https://www.google.com/maps/place/IKIGAI+Hospitals+-+Kondapur,+Hyderabad/@17.4654766,78.3478514,17z/data=!3m1!4b1!4m6!3m5!1s0x3bcb93a0a8594fc7:0x4565090211030df9!8m2!3d17.4654766!4d78.3478514!16s%2Fg%2F11wp90kxfz',
  },
  {
    id: 'manikonda',
    name: 'ManiKonda',
    addressLines: [
      'Marrichettu Road, opp. Paradise,',
      'Manikonda, Hyderabad,',
      'Telangana 500089',
    ],
    mapEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.774!2d78.3845117!3d17.406775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb97c34c46a33f%3A0xab3aa50852a0b756!2sIkigai+Hospitals+-+Advanced+Centre+for+Diabetic+Foot+Care%2C+Wound+Healing%2C+Vascular+%26+Plastic+Surgery+in+Hyderabad!5e0!3m2!1sen!2sin!4v1756900800000',
    mapAlt:
      'Map showing Ikigai Hospitals - Advanced Centre for Diabetic Foot Care, Wound Healing, Vascular & Plastic Surgery in Hyderabad',
    mapsUrl:
      'https://www.google.com/maps/place/Ikigai+Hospitals+-+Advanced+Centre+for+Diabetic+Foot+Care,+Wound+Healing,+Vascular+%26+Plastic+Surgery+in+Hyderabad/@17.406775,78.3845117,17z/data=!4m6!3m5!1s0x3bcb97c34c46a33f:0xab3aa50852a0b756!8m2!3d17.406775!4d78.3845117',
  },
] as const
