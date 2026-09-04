export type Specialist = {
  name: string
  specialty: string
  qualification: string
  role: string
  registrationNo?: string
  image: string
  imageAlt: string
  imageClassName?: string
  portraitImage?: string
  portraitClassName?: string
}

export const SPECIALISTS_HEADING = {
  label: 'Our Specialists',
  titleLine1: 'Meet the Specialists',
  titleLine2: 'Behind Your Care',
  description:
    'Experienced Specialists Bringing Advanced Surgical Expertise, Precision And Compassionate Care To Every Patient.',
} as const

export const SPECIALISTS: readonly Specialist[] = [
  {
    name: 'Dr. Viswanath Atreyapurapu',
    specialty: 'Vascular & Endovascular Surgeon',
    qualification: 'MBBS, MS, DNB (Vascular Surgery), EPHM (IIM-C)',
    role: 'Director - Department Of Vascular & Endovascular Surgery',
    registrationNo: '74412',
    image: '/images/specialists/Dr.%20Viswanath%20Atreyapurapu.png',
    imageAlt: 'Dr. Viswanath Atreyapurapu',
  },
  {
    name: 'Dr. Pinjala Rama Krishna',
    specialty: 'Vascular & Endovascular Surgeon',
    qualification: 'MBBS, M.S. FRCSM, FICS',
    role: 'Clinical & Academic Director, Department Of Vascular & Endovascular Surgery',
    registrationNo: '13631',
    image: '/images/specialists/Dr.%20Pinjala%20Rama%20Krishna.png',
    imageAlt: 'Dr. Pinjala Rama Krishna',
  },
  {
    name: 'Dr. K.S.M. Manikanth Babu',
    specialty: 'Plastic, Aesthetic & Reconstructive Surgeon',
    qualification: 'MBBS, DNB, MCh (Plastic Surgery)',
    role: 'Director - Department Of Plastic & Reconstructive Surgery',
    registrationNo: '74329',
    image: '/images/specialists/Dr.%20K.S.M.%20Manikanth%20Babu.png',
    imageAlt: 'Dr. K.S.M. Manikanth Babu',
  },
  {
    name: 'Dr. Nikhila Pinjala',
    specialty: 'Vascular & Endovascular Surgeon',
    qualification: 'MBBS, MS, DrNB (Vascular Surgery)',
    role: 'Director - Center For Venous Diseases',
    registrationNo: '78858',
    image: '/images/specialists/Dr.%20Nikhila%20Pinjala.png',
    imageAlt: 'Dr. Nikhila Pinjala',
  },
  {
    name: 'Dr. Surya Kiran Indukuri',
    specialty: 'Vascular & Endovascular Surgeon',
    qualification: 'MBBS, MS, DrNB (Vascular Surgery)',
    role: 'Director - Peripheral Cathlab',
    registrationNo: '71900',
    image: '/images/specialists/Dr.%20Surya%20Kiran%20Indukuri.png',
    imageAlt: 'Dr. Surya Kiran Indukuri',
  },
  {
    name: 'Dr. Puneeth',
    specialty: 'Vascular & Endovascular Surgeon',
    qualification: 'DA, DNB Anesthesiology MBA (Hospital Administration.)',
    role: 'Chief Anesthesiologist Medical',
    image: '/images/specialists/Dr.%20Puneeth.png',
    imageAlt: 'Dr. Puneeth',
  },
  {
    name: 'Dr. Sumeera Farhath SK.',
    specialty: 'Plastic, Aesthetic & Reconstructive Surgeon',
    qualification: 'MBBS, MS, MCh (Plastic Surgery)',
    role: 'Department Of Plastic & Reconstructive Surgery',
    registrationNo: '72359',
    image: '/images/specialists/Dr.%20Sumeera%20Farhath%20SK..png',
    imageAlt: 'Dr. Sumeera Farhath SK.',
  },
] as const
