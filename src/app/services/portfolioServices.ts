import { portfolioApi } from "@/api/portfolioApi";
import { PortfolioItem, PortfoliosState } from "@/utils/types/types";
import React from "react";

function usePortfolioServices() {
  const getPortfolioService = async (workProfileId:string) => {
    const portfolios = await portfolioApi.getAllPorfolios(workProfileId);

    return portfolios as PortfolioItem[];
  };
  return { getPortfolioService };
}

export default usePortfolioServices;
