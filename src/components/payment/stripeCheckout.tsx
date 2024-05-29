"use client";
import React, { useState, useEffect } from "react";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { Button } from "@/components/ui/button";
import usePaymentSerives from "@/app/services/paymentSerives";
import { useRouter } from "next/navigation";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

function StripeCheckout({
  children,
  pricingName,
  productType,
}: Readonly<{
  children: React.ReactNode;

  pricingName: string;
  productType: string;
}>) {
  const [stripe, setStripe] = useState<Stripe | null>(null);
  const { createCheckoutSession } = usePaymentSerives();
  const { getSubscriptionDetails } = usePaymentSerives();
  const router = useRouter();
  const paymentData = {
    pricing_name:pricingName,
    product_type:productType
  };
  useEffect(() => {
    if (!stripe) {
      stripePromise.then((stripe) => setStripe(stripe));
    }
  }, [stripe]);

  const handlePaymentBtnClick = async () => {
    // Creates a Stripe Checkout session on Django backend
    createCheckoutSession(paymentData).then((redirectUrl) => {
      redirectUrl && router.replace(redirectUrl);
    });
  };
  return (
    <div>
      <div onClick={handlePaymentBtnClick} className="text-lg">
        {children}
      </div>
    </div>
  );
}

export default StripeCheckout;
