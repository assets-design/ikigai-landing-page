export type Faq = {
  id: string
  question: string
  answer: string
}

export const FAQS_HEADING = {
  label: 'FAQs',
  title: 'Frequently Asked Questions',
  description:
    'Have a question? Here are answers to some of the most common queries we receive.',
} as const

export const FAQ_IMAGE = {
  src: '/images/faq/reception-desk.png',
  alt: 'IKIGAI Hospitals reception desk with branded wall and chandelier',
} as const

export const FAQS: readonly Faq[] = [
  {
    id: 'conditions',
    question: 'What conditions does Ikigai Hospitals specialise in?',
    answer:
      'Ikigai Hospitals specialises in vascular and endovascular conditions, diabetic foot care, advanced wound care, varicose veins, dialysis access, plastic and reconstructive surgery, hand surgery, and cosmetic gynaecology.',
  },
  {
    id: 'diabetic-foot',
    question: 'Do you provide treatment for diabetic foot problems?',
    answer:
      'Yes. Our diabetic foot care programme covers assessment, wound management, infection control, and coordinated treatment to help protect limb health and mobility.',
  },
  {
    id: 'varicose-veins',
    question: 'What treatments are available for varicose veins?',
    answer:
      'We offer modern minimally invasive options such as laser and glue-based therapies, along with clinical evaluation to recommend the right approach for your condition.',
  },
  {
    id: 'vascular-consult',
    question: 'Can I consult a vascular and endovascular surgeon?',
    answer:
      'Yes. You can book a consultation with our vascular and endovascular specialists at either our Kondapur or Manikonda centre.',
  },
  {
    id: 'plastic-surgery',
    question: 'Do you offer plastic and reconstructive surgery?',
    answer:
      'Yes. Our plastic, aesthetic, and reconstructive surgery team provides both reconstructive and cosmetic procedures as part of our integrated care approach.',
  },
] as const
