import { useContext } from "react";
import { OnboardingContext } from "../contexts/onboarding-context";

export function useOnBoarding() {
  const context = useContext(OnboardingContext);

  return context;
}
