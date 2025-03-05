export type SocialMediaType = {
  id: number;
  icon: string;
  is_gradient: boolean;
  color_one: string;
  color_two?: string;
  navigate_url: string;
};

export type PartnerType = {
  id: number;
  logo: string;
  alt: string;
};

export type ProgramType = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

export type CourseType = {
  id: number;
  logo: string;
  title: string;
  role: string;
};

export type TestimonialType = {
  id: number;
  name: string;
  role: string;
  quote: string;
  avatar_url: string;
  company_name: string;
  company_url: string;
};
