

type SkillsType = string[] | null;


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
  id?: number;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  profile_image?: string;
  projects_listed?: number;
  projects_working?: number;
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

type SkillsWithoutId = Omit<Skills, "id">;

// Extend Overview and SkillsWithoutId to create WorkProfile
interface WorkProfile extends Overview, SkillsWithoutId {
  id: string; // Retain id property from WorkProfile
  user?: number;
}

interface Project extends Overview, Skills {
  budget: string;
  features: string[];
  deadline: Date | undefined;
  freelancer?: number;
  freelancer_expertise: string;
  client?: number;
  status?: string;
}

type ProjectApplicationType = {
  bid: string;
  coverLetter: string;
  document: File | null;
  workProfile: string;
  project: string;
};

type ProposalStatus = "accepted" | "unanswered" | "responded";
type Proposal = {
  id: number;
  applicant: number;
  bid_amount: string;
  cover_letter: string;
  project_title: number;
  work_profile: string;
  freelancer_name: string;
  created_date: string;
  status: ProposalStatus;
  project: number;
  is_advance_paid: boolean;
  accepted_work: "sample" | "final" | null;
};
type ProposalFilterCondition = "accepted" | "unanswered" | "all" | null;

interface WebSocketService {
  connect: () => void;
  disconnect: () => void;
  sendMessage: (message: string) => void;
}

type Message = {
  id: string;
  created_time: string;
  text: string;
  sender: number;
  receiver: number;
  status: "seen" | "unseen";
};

type NewMessage = {
  text: string;
  receiver: number;
};

type ExchangerPrimitive = {
  id: number;
  first_name: string;
  last_name: string;
  profile_image: string;
};

type Subscription = {
  package_name: "standard" | "delux";
  validity: string;
  projects_left: string;
  invoice_url: string;
};

type PrePaymentDetails = {
  id: number;
  product_id: string;
  advance_pricing_id: string;
  final_pricing_id: string;
  project_id: number;
  freelancer_id: string;
};

type Notification = {
  id: string;
  title: string;
  description: string;
  status: string;
  type?: string;
};

export type {
  ProfileFrom,
  FormSubmitParams,
  verificationParams,
  User,
  UserData,
  PortfolioItem,
  WorkProfile,
  Overview,
  NewWorkProfile,
  SkillsType,
  PortfoliosState,
  Address,
  Project,
  Skills,
  ProjectApplicationType,
  Proposal,
  ProposalStatus as proposalStatus,
  ProposalFilterCondition,
  WebSocketService,
  Message,
  NewMessage,
  ExchangerPrimitive,
  Subscription,
  Notification,
  PrePaymentDetails,
};
