"use client";

import Joyride, { Step, CallBackProps, STATUS } from 'react-joyride';
import { useTheme } from 'next-themes'; // Assuming you use next-themes for theme management

// Define the shape of the component's props
interface OnboardingTourProps {
  run: boolean;
  steps: Step[];
  onCallback: (data: CallBackProps) => void;
}

export function OnboardingTour({ run, steps, onCallback }: OnboardingTourProps) {
  // Get the current theme to apply correct styles
  const { theme } = useTheme();

  return (
    <Joyride
      run={run}
      steps={steps}
      callback={onCallback}
      continuous={true} // Go to the next step when 'Next' is clicked
      showProgress={true} // Show progress like "1 of 5"
      showSkipButton={true} // Allow users to skip the tour
      // FIX: This is the modern and correct way to style the tour
      styles={{
        options: {
          // Use CSS variables from your shadcn/ui theme for perfect consistency
          arrowColor: 'hsl(var(--card))',
          backgroundColor: 'hsl(var(--card))',
          primaryColor: 'hsl(var(--primary))', // Color for the 'Next' button
          textColor: 'hsl(var(--card-foreground))',
          zIndex: 1000,
        },
        buttonNext: {
          backgroundColor: 'hsl(var(--primary))',
          color: 'hsl(var(--primary-foreground))',
          borderRadius: '0.5rem',
        },
        buttonBack: {
          color: 'hsl(var(--muted-foreground))',
          marginRight: 'auto',
        },
        buttonSkip: {
            color: 'hsl(var(--muted-foreground))',
        },
        tooltip: {
            borderRadius: '0.75rem',
        },
        spotlight: {
            borderRadius: '0.75rem',
        }
      }}
      // This ensures the tour is only rendered on the client, preventing SSR issues
      // You may not need this if your parent component already handles client-side rendering
      floaterProps={{
        disableFlip: true
      }}
    />
  );
}
