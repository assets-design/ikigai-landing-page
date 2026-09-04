export const APPOINTMENT_HEADING = {
  label: 'Book an Appointment',
  titleLine1: 'Your Health Deserves',
  titleLine2: 'Specialist Care.',
  description:
    'Speak with the Ikigai team and find the right specialist for your condition.',
} as const

export const APPOINTMENT_POPUP = {
  title: 'Book Your Appointment',
  description: 'We help you find the right specialist for your condition.',
  closeLabel: 'Close appointment form',
} as const

export const APPOINTMENT_POPUP_STORAGE_KEY = 'ikigai-appointment-popup-dismissed'

export const APPOINTMENT_POPUP_OPEN_EVENT = 'ikigai:open-appointment-popup'

export function openAppointmentPopup() {
  window.dispatchEvent(new CustomEvent(APPOINTMENT_POPUP_OPEN_EVENT))
}

export const TREATMENT_OPTIONS = [
  'Plastic & Cosmetic Surgery',
  'Diabetic Foot Care',
  'Varicose Veins Treatment',
  'Dialysis Access Services',
  'Advanced Wound Care',
  'Vascular & Endovascular',
  'Hand Surgery',
  'Cosmetic Gynaecology',
] as const

export const FOOTER = {
  copyright: '© 2026 Ikigai Hospitals. All rights reserved.',
  credit: {
    prefix: 'Designed by ',
    company: 'Theories Consulting',
    href: 'https://theories.consulting/',
  },
  locations: [
    {
      name: 'Kondapur',
      phone: '9063453373',
      tel: 'tel:+919063453373',
    },
    {
      name: 'Manikonda',
      phone: '8977318477',
      tel: 'tel:+918977318477',
    },
  ],
  social: [
    {
      id: 'instagram',
      label: 'Ikigai Hospitals on Instagram',
      href: 'https://www.instagram.com/ikigaihospitals/',
      icon: '/images/icons/instagram-circle.svg',
    },
    {
      id: 'facebook',
      label: 'Ikigai Hospitals on Facebook',
      href: 'https://www.facebook.com/people/Ikigai-Hospitals/61590426793208/',
      icon: '/images/icons/facebook-circle.svg',
    },
    {
      id: 'youtube',
      label: 'Ikigai Hospitals on YouTube',
      href: 'https://youtube.com/@ikigaihospitals',
      icon: '/images/icons/youtube-circle.svg',
    },
  ],
} as const
