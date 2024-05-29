import { useWorkProfileContext } from "@/utils/context/stateContextProviders";
import { PortfolioItem } from "@/utils/types/types";


function usePortfolioCreationManager() {
  const { portfolios, setPortfolios } = useWorkProfileContext();

  const handlePortfolioFormSubmit = (portfolioData: PortfolioItem) => {
    let portfolioLength = 1;

    portfolioLength = portfolios?.length;

    if (portfolioLength >= 0 && portfolioLength < 3) {
      const newPortfolioId = portfolioLength + 1;

      let newPortfolio = portfolioData;
      newPortfolio.listing_id = newPortfolioId;

      setPortfolios((prevPortfolios) => {
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

  return { handlePortfolioFormSubmit, removePortfolio };
}

export default usePortfolioCreationManager;
