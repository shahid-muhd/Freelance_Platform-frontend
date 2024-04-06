import { skillsApi } from "@/api/skillsApi";
import { workProfileApi } from "@/api/workProfileApi";
import { NewWorkProfile } from "@/utils/types";
import React from "react";

function workProfileServices() {
  const getSkillSuggestion = async (query: string) => {
    return skillsApi.getSkillOptions(query);
  };

  const createWorkProfile =  (workProfileData: NewWorkProfile) => {
    const data = workProfileData;
    const formData = new FormData();
    formData.append("overview", JSON.stringify(data.overview));
    formData.append("skills", JSON.stringify(data.skills));
    formData.append('portfolios', JSON.stringify(data.portfolios));
    for (let i = 0; i < data.portfolios.length; i++) {  
    if (data.portfolios[i].image) {
        formData.append(`portfolio_${i + 1}_image`, data.portfolios[i].image);
      }
    }
    return workProfileApi.createWorkProfile(formData);
  }

  const getWorkProfiles=()=>{
   return workProfileApi.getWorkProfiles( )
  }
  return { getSkillSuggestion, createWorkProfile,getWorkProfiles };
}
export default workProfileServices;
