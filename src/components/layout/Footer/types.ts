type Resource = {
  name: string;
  navigate_url: string;
};

type Contact = {
  value: string;
  navigate_url?: string;
};

export type FooterType = {
  resource: {
    title: string;
    data: Resource[];
  };
  social_media: {
    title: string;
    data: Resource[];
  };
  contact: {
    title: string;
    data: Contact[];
  };
};
