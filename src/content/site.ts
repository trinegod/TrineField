export const siteConfig = {
  owner: "Steven",
  contactEmail: "",
  formEndpoint: "/api/contact",
  socialLinks: {
    instagram: "",
    linkedin: "",
    email: "",
    wechat: "",
    booking: "",
  },
  analytics: {
    enabled: false,
    provider: "none",
  },
} as const;

export type SocialKey = keyof typeof siteConfig.socialLinks;
