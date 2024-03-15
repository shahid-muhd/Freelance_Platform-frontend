import React from "react";
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons/social-icons"
function GoogleAuthBtn() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  return (

      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </Button>
  
  );
}

export default GoogleAuthBtn;
