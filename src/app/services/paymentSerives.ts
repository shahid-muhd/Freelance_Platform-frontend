import { paymentsApi } from "@/api/paymentsApi";
import { prePaymentsApi } from "@/api/prePaymentApi";
import { subscriptionsApi } from "@/api/subscriptionsApi";
import { useSubscriptionContext } from "@/utils/context/stateContextProviders";
import { PrePaymentDetails, Subscription } from "@/utils/types/types";
function usePaymentSerives() {
  const { setSubscription } = useSubscriptionContext();

  const createCheckoutSession = async (data: any) => {
    const redirectUrl = await paymentsApi.createChecoutSession(data);
    return redirectUrl as string;
  };

  const getSubscriptionDetails = async () => {
    const currentSubscription = await subscriptionsApi.getSubscription();
    setSubscription(currentSubscription as Subscription);
    return currentSubscription;
  };

  const getPaymentAddressService = async (projectID: number, userID: number) => {
    const data = {
      project_id: projectID,
      user_id: userID,
    };
    const prePaymentDetails = await prePaymentsApi.getPrePaymentDetails(data);
    return prePaymentDetails as PrePaymentDetails;
  };
  return {
    createCheckoutSession,
    getSubscriptionDetails,
   getPaymentAddressService,
  };
}

export default usePaymentSerives;
