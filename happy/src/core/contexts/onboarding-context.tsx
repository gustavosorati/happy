import { ReactNode, createContext, useEffect, useState } from "react";
import { STORAGE_ONBOARDING } from "../libs/mmkv/onboarding-storage";

type OnboardingContextProps = {
  shouldOnboardingBeDisplayed: boolean;
  handleDisplayOnboarding: () => void;
}

type OnboardingProviderProps = {
  children: ReactNode;
}

export const OnboardingContext = createContext<OnboardingContextProps>({} as OnboardingContextProps);

export function OnboardingProvider({ children }: OnboardingProviderProps) {
  const [ shouldOnboardingBeDisplayed, setShouldOnboardingBeDisplayed] = useState(true);

  function handleDisplayOnboarding() {
    console.log("handleDisplayOnboarding");
    STORAGE_ONBOARDING.set(true);
    setShouldOnboardingBeDisplayed(false);
  }

  useEffect(() => {
    const alreadyDisplayed = STORAGE_ONBOARDING.get();

    console.log(alreadyDisplayed)
    if(alreadyDisplayed) {
      setShouldOnboardingBeDisplayed(false);
    }
  }, []);

  return (
    <OnboardingContext.Provider
      value={{
        shouldOnboardingBeDisplayed,
        handleDisplayOnboarding
      }}
    >
      {children}
    </OnboardingContext.Provider>
  )
}
