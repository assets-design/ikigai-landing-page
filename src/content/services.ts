export type Service = {
  title: string
  description: string
  image: string
  imageAlt: string
  tags: readonly string[]
}

export const SERVICES_HEADING = {
  label: 'Our Services',
  titleLine1: 'Advanced Care.',
  titleLine2: 'One Integrated Approach.',
  description:
    'From Diagnosis To Treatment And Recovery, Ikigai Hospitals Brings Specialised Expertise And Advanced Care Together Under One Roof.',
} as const

export const SERVICES: readonly Service[] = [
  {
    title: 'Plastic & Cosmetic Surgery',
    description:
      'Advanced Aesthetic And Reconstructive Procedures For Facial, Breast And Hair Restoration.',
    image: '/images/services/plastic-cosmetic.png',
    imageAlt: 'Plastic and cosmetic surgery treatment',
    tags: [
      'Hair Restoration & Hair Transplantation',
      'Laser Scar Rejuvenation',
      'Gynecomastia (Male Breast Reduction)',
      'Botox / Fillers / Threads',
      'Laser Hair Removal',
      'Facial Plastic Surgery',
      'Breast Cosmetic Surgery',
    ],
  },
  {
    title: 'Diabetic Foot Care',
    description:
      'Comprehensive Foot Assessment, Protection And Custom Solutions For Diabetic Patients.',
    image: '/images/services/diabetic-foot.png',
    imageAlt: 'Diabetic foot care examination',
    tags: [
      'Foot Lab',
      'Neurotouch',
      'Plantar Pressure Assessment',
      'Diabetic Foot Pedicure',
      'Orthotics & Prosthetics',
      'Custom Footwear',
    ],
  },
  {
    title: 'Varicose Veins Treatment',
    description:
      'Minimally Invasive Laser, Glue And Sclerotherapy Treatments For Venous Conditions.',
    image: '/images/services/varicose-veins.png',
    imageAlt: 'Varicose veins treatment on leg',
    tags: [
      'Laser Therapy',
      'Glue Therapy',
      'Aesthetic Sclerotherapy',
      'Compression Therapy',
      'Thrombosis Clinic (For Blood Clots)',
    ],
  },
  {
    title: 'Dialysis Access Services',
    description:
      'Expert Creation And Maintenance Of Dialysis Access For Long-Term Renal Care.',
    image: '/images/services/dialysis-access.png',
    imageAlt: 'Dialysis access services',
    tags: [
      'AV Fistula',
      'AV Graft',
      'Permcath Placement',
      'Fistuloplasty And Fistula Salvage',
      'Central Vein Angioplasty',
    ],
  },
  {
    title: 'Advanced Wound Care',
    description:
      'Cutting-Edge Therapies For Non-Healing And Complex Wounds Including HBOT And Stem Cell.',
    image: '/images/services/advanced-wound.png',
    imageAlt: 'Advanced wound care treatment',
    tags: [
      'Vacuum Therapy',
      'Stem Cell Therapy',
      'Plasma Therapy',
      'Hyperbaric Oxygen Therapy (HBOT)',
      'Velox',
      'Artificial (New Wound Cover) Skin Substitutes',
    ],
  },
  {
    title: 'Vascular & Endovascular',
    description:
      'Full-Spectrum Vascular Diagnostics And Interventions From Bypass To Stenting.',
    image: '/images/services/vascular-endovascular.png',
    imageAlt: 'Vascular and endovascular care',
    tags: [
      'Vascular Lab With ABPI',
      'Doppler Scan',
      'Bypass Surgery',
      'Angioplasty & Stenting',
      'Atherectomy',
      'Vascular Stenting',
      'Lithotripsy',
      'IVC Filter Placement',
      'Angiojet',
      'IVUS',
    ],
  },
  {
    title: 'Hand Surgery',
    description:
      'Specialised Surgical Care For Nerve, Congenital And Traumatic Hand Conditions.',
    image: '/images/services/hand-surgery.png',
    imageAlt: 'Hand surgery examination',
    tags: [
      'Brachial Plexus And Nerve Surgeries',
      'Congenital Hand Deformity Correction',
      'Post Burn Contractures',
      'Hand Trauma',
    ],
  },
  {
    title: 'Cosmetic Gynaecology',
    description:
      'Sensitive And Expert Cosmetic Gynaecological Procedures For Patient Wellbeing.',
    image: '/images/services/cosmetic-gynaecology.png',
    imageAlt: 'Cosmetic gynaecology consultation',
    tags: ['Vaginoplasty', 'Labiaplasty', 'Clitoroplasty'],
  },
] as const
