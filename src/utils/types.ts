import { Url } from "url";

type ProfileFrom = {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
};

type FormSubmitParams = {
  data: {
    first_name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
  };
};

type verificationParams = {
  data: {
    email?: string | undefined;
    phone?: string | undefined;
    otp?: string | undefined;
  };
};

type UserData = {
  user?: {
    first_name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
  };

  address?: {};
};

interface PortfolioItem {
  listing_id: number;
  title: string;
  description: string;
  link: string;
  image: File | null;
}

interface WorkProfileOverview {
  title: string;
  description: string;
}
type Skills = string[] | null;
type PortfoliosState = PortfolioItem[];

type NewWorkProfile = {
  overview: WorkProfileOverview;
  skills: Skills;
  portfolios: PortfoliosState;
};

interface WorkProfile extends WorkProfileOverview {
  id: number;
  skills: string[];
}

export type {
  ProfileFrom,
  FormSubmitParams,
  verificationParams,
  UserData,
  PortfolioItem,
  WorkProfile,
  WorkProfileOverview,
  NewWorkProfile ,
  Skills,
  PortfoliosState,
};
