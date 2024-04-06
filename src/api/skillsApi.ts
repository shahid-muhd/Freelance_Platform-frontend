import axios from "axios";

export const skillsApi = {
  getSkillOptions: async (query: string) => {
    return await axios.get("https://api.apilayer.com/skills", {
      params: {q:query},
      headers: {
        apikey: "8JA03IcE6KcYXGJn6zyqCLZmoLA5GS4a",
      },
    });
  },
};
