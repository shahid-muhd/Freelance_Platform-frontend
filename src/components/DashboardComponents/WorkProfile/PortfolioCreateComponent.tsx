import PortfolioCreationManager from "@/app/services/PortfolioCreationManager";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useWorkProfileContext } from "@/utils/context/contextProviders";
import { PortfolioItem } from "@/utils/types";
import React, { ChangeEvent, useState } from "react";

type Props = {
  isModelOpen: boolean;
  closeModel: React.Dispatch<React.SetStateAction<any>>;
};
function PortfolioCreateComponent(props: Props) {
  const [portfolioData, setPortfolioData] = useState<PortfolioItem>({
    listing_id: 0,
    title: "",
    description: "",
    link: "",
    image: null,
  });

  const { handlePortfolioFormSubmit } = PortfolioCreationManager();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setPortfolioData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const uploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e?.target.files ? e.target.files[0] : null;

    setPortfolioData({
      ...portfolioData,
      image: file,
    });
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log("inside funcy 1......");

    handlePortfolioFormSubmit(portfolioData);
    props.closeModel(false);
  };
  return (
    <div>
      <div className="portfolio-form-wrapper w-full space-y-3">
        <div className="title">
          <p className="text-xl">Add Portfolio</p>
        </div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="space-y-2">
            <div className="space-y-1 w-full">
              <Label htmlFor="title">Portfolio Title</Label>
              <Input
                onChange={handleChange}
                id="title"
                value={portfolioData.title}
                name="title"
                placeholder="Eg : Front End Developer"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="description">Description</Label>
              <Textarea
                onChange={handleChange}
                name="description"
                value={portfolioData.description}
                className="min-h-24 max-h-44"
                id="description"
                maxLength={350}
                placeholder="Write a short description about your work"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="link">Add External Link</Label>
              <br />

              <Input
                id="link"
                name="link"
                value={portfolioData.link}
                onChange={handleChange}
                type="url"
                placeholder="Add a link to your work"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="portfolio-cover-image">Add images</Label>
              <br />

              <Input
                id="portfolio-cover-image"
                name="image"
                onChange={uploadImage}
                type="file"
                accept="image/png, image/jpeg"
              />
            </div>
            <div className="form-footer w-full flex justify-end  ">
              <div className="form-submit-btn  ">
                <Button type="submit">Add Portfolio</Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PortfolioCreateComponent;
