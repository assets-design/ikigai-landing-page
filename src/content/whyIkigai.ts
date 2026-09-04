export type ValueProp = {
  title: string
  description: string
  icon: string
  iconAlt: string
}

export const WHY_IKIGAI_HEADING = {
  label: 'Why Ikigai',
  titleLine1: 'Advanced Care Built on Trust,',
  titleLine2: 'Expertise and Precision.',
  description:
    'Our Specialists Combine Deep Clinical Expertise With Advanced Technology To Deliver Coordinated, Patient-Centred Care.',
} as const

export const WHY_IKIGAI_SYMBOL = {
  src: '/images/brand/ikigai-symbol.png',
  alt: 'IKIGAI interlocking circles symbol',
} as const

export const WHY_IKIGAI_VALUES: readonly ValueProp[] = [
  {
    title: 'Expert-Led Multidisciplinary Care',
    description:
      'Specialists Across Vascular, Endovascular, Plastic, Reconstructive, Diabetic Foot And Wound Care Work Together For Coordinated Treatment.',
    icon: '/images/icons/medical-assistance-1.png',
    iconAlt: 'Doctor with stethoscope icon',
  },
  {
    title: 'Advanced Technology & Clinical Precision',
    description:
      'Modern Diagnostics, Specialised Labs And Advanced Treatment Technologies Support Accurate Diagnosis And Precise Interventions.',
    icon: '/images/icons/medical-assistance-2.png',
    iconAlt: 'Microscope icon',
  },
  {
    title: 'Comprehensive Care Under One Roof',
    description:
      'From Diagnosis And Treatment To Recovery And Follow-Up, Patients Receive Coordinated Care Throughout Their Journey.',
    icon: '/images/icons/medical-assistance-3.png',
    iconAlt: 'Care team icon',
  },
  {
    title: 'Patient-First Approach',
    description:
      'Every Treatment Plan Is Designed Around The Patient’s Condition, Comfort, Safety And Long-Term Outcomes.',
    icon: '/images/icons/medical-assistance-4.png',
    iconAlt: 'Patient care icon',
  },
] as const
