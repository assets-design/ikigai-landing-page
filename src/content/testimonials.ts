export type Testimonial = {
  id: string
  name: string
  treatment: string
  quote: string
  rating: 5
}

export const PATIENT_STORIES_HEADING = {
  label: 'Patient Stories',
  titleLine1: 'Trusted by Patients.',
  titleLine2: 'Driven by Outcomes.',
  description:
    'Real experiences from patients who chose Ikigai for specialised care.',
} as const

export const TESTIMONIALS: readonly Testimonial[] = [
  {
    id: 'prasanth-reddy',
    name: 'Prasanth Reddy',
    treatment: 'Vein Laser Treatment',
    quote:
      'I underwent vein laser treatment at Ikigai Hospitals. The procedure was smooth and the recovery was quick. The doctors explained every step clearly and made me feel comfortable throughout.',
    rating: 5,
  },
  {
    id: 'sowmya-g',
    name: 'Sowmya G',
    treatment: 'Cleft Palate Surgery',
    quote:
      'My daughter was born with cleft palate and was advised to get operated after she turns 1 year old. Dr K. Manikanth garu has done palatoplasty for my daughter last year. Since then he has taken very good care of my daughter even after the surgery, and now my daughter is perfectly alright.',
    rating: 5,
  },
  {
    id: 'neelima-karri',
    name: 'Neelima Karri',
    treatment: 'Vascular & Plastic Surgery',
    quote:
      'Ikigai clinics is offering expert surgical care for all vascular and plastic surgery related conditions. It offers a serene ambience, world class infrastructure and highly skilled surgeons with personalized treatment plan for every patient. Highly recommended.',
    rating: 5,
  },
  {
    id: 'ravi-katta',
    name: 'Ravi Katta',
    treatment: 'Varicose Veins Treatment',
    quote:
      'Excellent care for my varicose veins. The team was professional and compassionate. The entire treatment journey from diagnosis to recovery was well-coordinated.',
    rating: 5,
  },
  {
    id: 'babu-rao',
    name: 'Babu Rao',
    treatment: 'AVF Surgery',
    quote:
      "My AVF surgery was handled with great expertise. The surgeons are highly experienced and the staff ensured I was comfortable at every stage. Very grateful for the care I received.",
    rating: 5,
  },
  {
    id: 'narendra-vavilala',
    name: 'Narendra Vavilala',
    treatment: 'Body Contouring Surgery',
    quote:
      'From the very first consultation through surgery and the entire postoperative recovery, what impressed me most was surgical expertise, patience, accessibility, and commitment to achieving the best possible result. Dr. Manikanth was always available to guide me throughout my transformation.',
    rating: 5,
  },
  {
    id: 'arunakumari-pisapati',
    name: 'Arunakumari Pisapati',
    treatment: 'Varicose Veins Treatment',
    quote:
      'I approached Ikigai Clinics in Kondapur for treatment of my varicose veins. My overall experience has been excellent, right from the warm welcome at the front desk to the attentive post-procedure care. Dr. Surya Kiran Indukuri garu is extremely patient, knowledgeable, and reassuring.',
    rating: 5,
  },
  {
    id: 'rahul-shah',
    name: 'Rahul Shah',
    treatment: 'Hair Treatment',
    quote:
      'I recently underwent hair treatment at IKIGAI Hospital, and I am extremely happy with the experience. Dr. Manikanth garu is highly knowledgeable, humble, and genuinely cares for his patients. The entire IKIGAI team was professional, caring, and supportive throughout.',
    rating: 5,
  },
  {
    id: 'pavan-kumar',
    name: 'Pavan Kumar',
    treatment: 'Hair Transplant',
    quote:
      'I highly recommend this hospital for anyone considering a hair transplant. Dr. Manikanth is an exceptional surgeon who is knowledgeable, patient, and genuinely cares about his patients. He takes the time to answer every question thoroughly.',
    rating: 5,
  },
  {
    id: 'gowtham-sap',
    name: 'Gowtham SAP',
    treatment: 'Vascular Care',
    quote:
      'I had a wonderful experience at Ikigai. From the moment I walked in, the staff was extremely professional, friendly, and supportive. The doctors took the time to understand my concerns and explained the entire procedure in a very clear and reassuring manner.',
    rating: 5,
  },
  {
    id: 'shamili-reddy',
    name: 'Shamili Reddy',
    treatment: 'Diabetic Foot Care',
    quote:
      'We are from Nalgonda, and my father was severely affected by a diabetic foot infection which progressed to wet gangrene. After visiting Ikigai Hospitals, the doctors provided expert care and helped us through a difficult time with compassion and clinical excellence.',
    rating: 5,
  },
  {
    id: 'sai-babu',
    name: 'Sai Babu',
    treatment: 'Diabetic Foot Surgery',
    quote:
      "When I was diagnosed to go for full feet amputation by multiple doctors, by God's grace I found a great solution at Dr K. Manikanth. He diagnosed me after a thorough verification and finally saved me with a simple surgery.",
    rating: 5,
  },
] as const
