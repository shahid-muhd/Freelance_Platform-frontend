import { Url } from "url";

type SkillsType = string[] | null;
type skill={
  id?: number;
  skills: string;
}

// interface Skills extends Array<skill> {}
interface Skills {
  id?: number;
  skills?: SkillsType;
}
type ProfileFrom = {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
};

type FormSubmitParams = {
  data: {
    user?: User;
    address?: Address;
  };
};

type verificationParams = {
  data: {
    email?: string | undefined;
    phone?: string | undefined;
    otp?: string | undefined;
  };
};

type User = {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
};

type Address = {
  house_name: string;
  street: string;
  place: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
};

type UserData = {
  user?: User;
  address?: Address;
};

interface PortfolioItem {
  listing_id: number;
  title: string;
  description: string;
  link: string;
  image: File | null;
}

interface Overview {
  title: string;
  description: string;
}
type PortfoliosState = PortfolioItem[];

interface NewWorkProfile extends Skills {
  overview: Overview;
  portfolios: PortfoliosState;
}

interface WorkProfile extends Overview, Skills {
  id: number;
}

interface Project extends Overview, Skills {
  budget: string;
  features: string[];
  expertise: string;
}
export type {
  ProfileFrom,
  FormSubmitParams,
  verificationParams,
  UserData,
  PortfolioItem,
  WorkProfile,
  Overview,
  NewWorkProfile,
  SkillsType,
  PortfoliosState,
  Address,
  Project,
  Skills
};
