export const site = {
  name: "Simon Ilincev",
  url: "https://simonilincev.com",
  email: "simon@simonilincev.com",
  description:
    "Simon Ilincev is a Cornell computer scientist, writer, language learner, and builder of software products.",
  nav: [
    { href: "/", label: "Home" },
    { href: "/work/", label: "Work" },
    { href: "/writing/", label: "Writing" },
    { href: "/photos/", label: "Photos" },
    { href: "/about/", label: "About" },
    { href: "/downloads/Simon_Ilincev_Resume.pdf", label: "Resume" },
    { href: "/contact/", label: "Contact" }
  ],
  socials: [
    { href: "https://github.com/Destaq", label: "GitHub" },
    { href: "https://www.linkedin.com/in/simon-ilincev/", label: "LinkedIn" },
    { href: "mailto:simon@simonilincev.com", label: "Email" }
  ]
};

export const formatDate = (date: Date) =>
  new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(date);
