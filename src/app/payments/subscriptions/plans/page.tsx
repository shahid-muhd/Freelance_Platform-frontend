"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import { GoDotFill } from "react-icons/go";
import { FaDollarSign } from "react-icons/fa";
import StripeCheckout from "@/components/payment/stripeCheckout";
import usePaymentSerives from "@/app/services/paymentSerives";
import { useSubscriptionContext } from "@/utils/context/stateContextProviders";
function Page() {
  const { subscription } = useSubscriptionContext();
  console.log("subscription details===>>", subscription);

  return (
    <div className=" h-screen ">
      <div className="border rounded-lg py-5 px-32 md:h-5/6">
        <div className="h-full w-full space-y-3 p-1">
          <div className="subscription-title text-4xl text-center  font-bold">
            <h2>Subscribe now to get amazing benefits</h2>
          </div>

          <div className="subscription-plans-wrapper pt-2 w-full md:h-5/6 flex gap-10 justify-center">
            <div className="pricing-small-wrapper  h-full w-60 flex items-center hover:scale-105 duration-500">
              <div className="small-pricing-plan p-4 w-full h-5/6 bg-secondary rounded-lg space-y-5 relative">
                <div className="pricing-title text-lg font-semibold">
                  <h4> Standard Package </h4>
                </div>
                <div className="pricing-value flex">
                  <div className="dollar-icon">
                    <FaDollarSign size={20} />
                  </div>
                  <div className="text-5xl">25</div>
                </div>
                <div className="plan-features space-y-5">
                  <div className="flex items-center gap-3  ">
                    <div className="bullet-icon">
                      <GoDotFill className="text-foreground" />
                    </div>
                    <div className="subscription-benefit">Text chat access</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bullet-icon">
                      <GoDotFill className="text-foreground" />
                    </div>
                    <div className="subscription-benefit">
                      List upto 10 projects
                    </div>
                  </div>

                  <div className="flex items-center gap-3  ">
                    <div className="bullet-icon">
                      <GoDotFill className="text-foreground" />
                    </div>
                    <div className="subscription-benefit">
                      Upto 6 months validity
                    </div>
                  </div>
                </div>

                {subscription?.package_name !== "delux" && (
                  <div className="pricing-btn w-11/12 left-3 absolute  bottom-3">
                    {subscription?.package_name == "standard" ? (
                      <div className="w-full text-center dark:text-gray-400">
                        <p>Current Plan</p>
                      </div>
                    ) : (
                      <StripeCheckout
                      productType="subscription"
                      pricingName="price_1PBs97SH2VYOeREXhDCAuHmf"
                      >
                        <Button
                          variant={"outline"}
                          className="w-full hover:bg-background border-0 hover:scale-105 "
                        >
                          Subscribe
                        </Button>
                      </StripeCheckout>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="pricing-large-wrapper  h-full w-64 hover:scale-105 duration-500  ">
              <div className="small-pricing-plan p-4 w-full h-full bg-gray-900 rounded-lg space-y-8 relative">
                <div className="pricing-title text-lg font-semibold">
                  <h4> Deluxe Package </h4>
                </div>

                <div className="pricing-value flex">
                  <div className="dollar-icon">
                    <FaDollarSign size={20} />
                  </div>
                  <div className="text-5xl">79</div>
                </div>
                <div className="plan-features space-y-5">
                  <div className="flex items-center gap-3  ">
                    <div className="bullet-icon">
                      <GoDotFill className="text-foreground" />
                    </div>
                    <div className="subscription-benefit">
                      Video chat access
                    </div>
                  </div>
                  <div className="flex items-center gap-3  ">
                    <div className="bullet-icon">
                      <GoDotFill className="text-foreground" />
                    </div>
                    <div className="subscription-benefit">Text chat access</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bullet-icon">
                      <GoDotFill className="text-foreground" />
                    </div>
                    <div className="subscription-benefit">
                      List upto 25 projects
                    </div>
                  </div>

                  <div className="flex items-center gap-3  ">
                    <div className="bullet-icon">
                      <GoDotFill className="text-foreground" />
                    </div>
                    <div className="subscription-benefit">
                      Upto 12 months validity
                    </div>
                  </div>
                  <div className="pricing-btn w-11/12 left-3 absolute  bottom-3">
                    {subscription?.package_name == "delux" ? (
                      <div className="w-full text-center dark:text-gray-400">
                        <p>Current Plan</p>
                      </div>
                    ) : (
                      <StripeCheckout
                      productType="subscription"
                      pricingName="price_1PBty8SH2VYOeREX4LeQ5ANH"
                      >
                        <Button
                          variant={"outline"}
                          className="w-full hover:bg-background border-0 hover:scale-105 duration-1000 "
                        >
                          Subscribe
                        </Button>
                      </StripeCheckout>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
