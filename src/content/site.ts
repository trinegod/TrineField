export const siteConfig = {
  brand: "Trine",
  owner: "Steven Adkins",
  contactEmail: "Stevenadkins917@gmail.com",
  formEndpoint: "/api/contact",
  socialLinks: {
    instagram: "https://www.instagram.com/tr1negod/",
    linkedin: "https://www.linkedin.com/in/kidpluto",
    github: "https://github.com/trinegod",
    whatsapp: "https://wa.me/19162875897",
    email: "mailto:Stevenadkins917@gmail.com",
    wechat: "#wechat",
    booking: "",
  },
  whatsappNumber: "+1 916-287-5897",
  wechatId: "wxid_1d9o3v999oi712",
  wechatQr: "/wechat-steven-adkins.jpg",
  resumePdf: "/steven-adkins-master-resume.pdf",
  analytics: {
    enabled: false,
    provider: "none",
  },
} as const;

export type SocialKey = keyof typeof siteConfig.socialLinks;
