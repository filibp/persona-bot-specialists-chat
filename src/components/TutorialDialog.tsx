import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HelpCircle, Users, Settings, MessageSquare, ArrowRight } from "lucide-react";

export const TutorialDialog = () => {
  const [open, setOpen] = useState(false);

  const tutorialSteps = [
    {
      icon: <Users className="w-6 h-6 text-primary" />,
      title: "Select Your Specialists",
      description: "Choose from our expert specialists based on your needs. You can select multiple specialists to get diverse perspectives on your questions."
    },
    {
      icon: <Settings className="w-6 h-6 text-primary" />,
      title: "Configure Settings",
      description: "Customize the conversation style, language, geographic region, and other behavioral settings to match your preferences."
    },
    {
      icon: <ArrowRight className="w-6 h-6 text-primary" />,
      title: "Start Consultation",
      description: "Click 'Start Consultation' to begin your conversation with the selected specialists."
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-primary" />,
      title: "Chat with Experts",
      description: "Ask questions and get expert advice. Each specialist will provide their unique perspective based on their expertise."
    }
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <HelpCircle className="w-4 h-4" />
          Tutorial
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <HelpCircle className="w-5 h-5 text-primary" />
            How PersonaBot Works
          </DialogTitle>
          <DialogDescription>
            Learn how to get the most out of your consultation with our AI specialists
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 mt-4">
          {tutorialSteps.map((step, index) => (
            <div key={index} className="flex gap-4 p-4 rounded-lg bg-muted/30 border">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                {step.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" className="text-xs px-2 py-1">
                    Step {index + 1}
                  </Badge>
                  <h3 className="font-semibold text-foreground">{step.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
          <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
            <h4 className="font-semibold text-primary mb-2">💡 Pro Tip</h4>
            <p className="text-sm text-muted-foreground">
              For best results, be specific with your questions and don't hesitate to ask follow-up questions. Each specialist brings unique expertise to help you get comprehensive answers.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};