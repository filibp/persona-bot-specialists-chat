import { useState } from "react";
import { Button } from "@/components/ui/button";
import { HelpCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface TutorialStep {
  id: string;
  title: string;
  description: string;
  position: {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
    transform?: string;
  };
  arrowDirection: 'up' | 'down' | 'left' | 'right';
}

const tutorialSteps: TutorialStep[] = [
  {
    id: "specialists",
    title: "Choose Your Specialists",
    description: "Select from our expert specialists based on your needs. You can pick multiple specialists for diverse perspectives!",
    position: { top: "20%", left: "10%" },
    arrowDirection: "right"
  },
  {
    id: "settings",
    title: "Customize Settings",
    description: "Adjust conversation style, language, and region to match your preferences.",
    position: { top: "20%", right: "10%" },
    arrowDirection: "left"
  },
  {
    id: "start-button",
    title: "Start Your Consultation",
    description: "Click here once you've selected specialists and configured your settings.",
    position: { bottom: "25%", left: "50%", transform: "translateX(-50%)" },
    arrowDirection: "up"
  }
];

const ConversationCloud = ({ 
  step, 
  onClose 
}: { 
  step: TutorialStep; 
  onClose: () => void; 
}) => {
  const arrowClasses = {
    up: "absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-background",
    down: "absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-b-[8px] border-l-transparent border-r-transparent border-b-background",
    left: "absolute -right-2 top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-[8px] border-b-[8px] border-l-[8px] border-t-transparent border-b-transparent border-l-background",
    right: "absolute -left-2 top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-[8px] border-b-[8px] border-r-[8px] border-t-transparent border-b-transparent border-r-background"
  };

  return (
    <div 
      className="absolute z-50 animate-fade-in"
      style={step.position}
    >
      <div className="relative bg-background border border-border rounded-lg p-4 shadow-lg max-w-xs">
        <div className={arrowClasses[step.arrowDirection]} />
        <Button
          variant="ghost"
          size="sm"
          className="absolute -top-1 -right-1 h-6 w-6 p-0 rounded-full"
          onClick={onClose}
        >
          <X className="h-3 w-3" />
        </Button>
        <h4 className="font-semibold text-sm mb-1 text-foreground pr-6">
          {step.title}
        </h4>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {step.description}
        </p>
      </div>
    </div>
  );
};

export const TutorialOverlay = () => {
  const [showTutorial, setShowTutorial] = useState(false);
  const [visibleSteps, setVisibleSteps] = useState<string[]>([]);

  const startTutorial = () => {
    setShowTutorial(true);
    setVisibleSteps(tutorialSteps.map(step => step.id));
  };

  const closeTutorial = () => {
    setShowTutorial(false);
    setVisibleSteps([]);
  };

  const closeStep = (stepId: string) => {
    setVisibleSteps(prev => prev.filter(id => id !== stepId));
    if (visibleSteps.length === 1) {
      setShowTutorial(false);
    }
  };

  return (
    <>
      <Button 
        variant="outline" 
        size="sm" 
        className="gap-2"
        onClick={startTutorial}
      >
        <HelpCircle className="w-4 h-4" />
        Tutorial
      </Button>

      {showTutorial && (
        <>
          {/* Overlay backdrop */}
          <div className="fixed inset-0 bg-black/20 z-40 animate-fade-in" />
          
          {/* Tutorial clouds */}
          {tutorialSteps.map((step) => 
            visibleSteps.includes(step.id) && (
              <ConversationCloud
                key={step.id}
                step={step}
                onClose={() => closeStep(step.id)}
              />
            )
          )}

          {/* Close all button */}
          <div className="fixed bottom-4 right-4 z-50">
            <Button 
              variant="secondary" 
              size="sm"
              onClick={closeTutorial}
              className="shadow-lg"
            >
              Close Tutorial
            </Button>
          </div>
        </>
      )}
    </>
  );
};