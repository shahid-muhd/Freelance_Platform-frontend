import { skillsApi } from "@/api/skillsApi";
import { workProfileApi } from "@/api/workProfileApi";
import { useToast } from "@/components/ui/use-toast";
import useWorkProfileStore from "@/stores/workProfileStore";
import { NewWorkProfile, WorkProfile } from "@/utils/types/types";

function useWorkProfileServices() {
  const { addWorkProfiles, workProfiles } = useWorkProfileStore();
  const { toast } = useToast();
  const getSkillSuggestion = async (query: string) => {
    return skillsApi.getSkillOptions(query);
  };

  const createWorkProfile =async (workProfileData: NewWorkProfile) => {
    const data = workProfileData;
    const formData = new FormData();
    formData.append("overview", JSON.stringify(data.overview));
    formData.append("skills", JSON.stringify(data.skills));
    formData.append("portfolios", JSON.stringify(data.portfolios));
    for (let i = 0; i < data.portfolios.length; i++) {
      const image = data.portfolios[i].image;
      if (image) {
        formData.append(`portfolio_${i + 1}_image`, image);
      }
    }

     workProfileApi.createWorkProfile(formData).then(()=>{
      getWorkProfiles({userSpecific:true})
     })
  };

  const getWorkProfiles = async ({
    userSpecific = false,
    slug,
  }: {
    userSpecific: boolean;
    slug?: string | null;
  }) => {
    if (slug) {
      const workProfile = await workProfileApi.getWorkProfiles(
        userSpecific,
        slug
      );
      if (workProfile) {
        let workProfileParsed = JSON.parse(workProfile as string)[0];
        return workProfileParsed as WorkProfile;
      }
    }

    workProfileApi.getWorkProfiles(userSpecific).then((workProfiles) => {
      if (workProfiles) {
        let parsedData = JSON.parse(workProfiles as string);
        addWorkProfiles(parsedData as WorkProfile[]);
      }
    });
  };

  const updateWorkProfileService = async (data: WorkProfile, slug: string) => {
    workProfileApi.updateWorkProfile(data, slug).then(() => {
      toast({
        description: "Work Profile Updated ",
      });
      getWorkProfiles({ userSpecific: false });
    });
  };

  const deleteWorkProfileService = async (slug: string) => {
    workProfileApi.deleteWorkProfile(slug).then(() => {
      toast({
        description: "Work Profile Removed ",
      });

      const updatedWorkProfiles = workProfiles.filter(
        (profile) => profile.id !== slug
      );
      addWorkProfiles(updatedWorkProfiles);
    });
  };
  return {
    getSkillSuggestion,
    createWorkProfile,
    getWorkProfiles,
    updateWorkProfileService,
    deleteWorkProfileService,
  };
}
export default useWorkProfileServices;
