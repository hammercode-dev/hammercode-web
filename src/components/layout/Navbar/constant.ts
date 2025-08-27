export const LINKS = [
  {
    id: "1",
    href: "/about",
  },
  {
    id: "2",
    href: "/events",
  },
  {
    id: "3",
    href: "/testimonial",
  },
  {
    id: "4",
    href: "/blogs",
  },
  {
    id: "5",
    href: "/support-us",
  },
];

export type UserRole = "admin" | "user";

export interface LinkItem {
  id: string;
  href: string;
}

export const USER_LINKS: Record<UserRole, LinkItem[]> = {
  admin: [
    {
      id: "dashboard",
      href: "/admin/events",
    },
  ],
  user: [
    // {
    //   id: "my-blogs",
    //   href: "/my-blogs",
    // },
    {
      id: "my-events",
      href: "/my-events",
    },
    {
      id: "profile",
      href: "/profile",
    },
  ],
};

export const getUserLinks = (role: string): LinkItem[] => {
  return USER_LINKS[role as UserRole] || [];
};
