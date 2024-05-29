import { Project, WorkProfile } from "@/utils/types/types";
import { create } from "zustand";

interface WorkProfileStore {
  workProfiles: WorkProfile[];
  addWorkProfiles: (profiles: WorkProfile[]) => void;
  removeWorkProfiles: (profileId: string) => void;
  updateWorkProfiles: (updatedProfile: WorkProfile) => void;
}

const useWorkProfileStore = create<WorkProfileStore>((set) => ({
  workProfiles: [],
  addWorkProfiles: (workProfiles) => set({ workProfiles }),
  removeWorkProfiles: (profileId) =>
    set((state) => ({
      workProfiles: state.workProfiles.filter(
        (profile) => profile.id  !== profileId
      ),
    })),
  updateWorkProfiles: (updatedProfile) =>
    set((state) => ({
      workProfiles: state.workProfiles.map((profile) =>
        profile.id === updatedProfile.id ? updatedProfile : profile
      ),
    })),
}));

export default useWorkProfileStore;
