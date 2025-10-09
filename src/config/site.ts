export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Vite + HeroUI",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Dashboard",
      href: "/",
    },
    {
      label: "Estoque",
      href: "/stock",
    },
    {
      label: "Produção",
      href: "/production",
    },
    {
      label: "Atendimento",
      href: "/service",
    },
  ],
  navMenuItems: [
    {
      label: "Dashboard",
      href: "/",
    },
    {
      label: "Estoque",
      href: "/stock",
    },
    {
      label: "Produção",
      href: "/production",
    },
    {
      label: "Atendimento",
      href: "/service",
    },
    
  ],
  // Ver isso aqui depois
  links: {
    github: "https://github.com/heroui-inc/heroui",
    twitter: "https://twitter.com/hero_ui",
    docs: "https://heroui.com",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
