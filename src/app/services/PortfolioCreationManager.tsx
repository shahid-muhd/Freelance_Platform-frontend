import { useWorkProfileContext } from "@/utils/context/contextProviders";
import { PortfolioItem } from "@/utils/types";
import React from "react";

function PortfolioCreationManager() {
  const { portfolios, setPortfolios } = useWorkProfileContext();

  const handlePortfolioFormSubmit = (portfolioData: PortfolioItem) => {
    console.log('inside funcy 2');
    let portfolioLength =1
    console.log('length',portfolioLength);
    portfolioLength = portfolios?.length;
    console.log('length',portfolioLength);
    
    if (portfolioLength>=0 && portfolioLength < 3) {
      const newPortfolioId = portfolioLength + 1;

      let newPortfolio = portfolioData;
      newPortfolio.listing_id = newPortfolioId;

      console.log('setting portfolios step 1 ....');
      setPortfolios((prevPortfolios) => {
        console.log('setting portfolios');
        
        const updatedPortfolios = [...prevPortfolios, newPortfolio];

        return updatedPortfolios;
      });
    }
  };

  const removePortfolio = (portfolioId: number) => {
    setPortfolios((prevItems) =>
      prevItems.filter((item) => item.listing_id != portfolioId)
    );
  };


  return { handlePortfolioFormSubmit,removePortfolio };
}

export default PortfolioCreationManager;
