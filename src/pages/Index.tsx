import { useState } from "react";
import { SpecialistSelector } from "@/components/SpecialistSelector";
import { ChatInterface } from "@/components/ChatInterface";
import { ChatSidebar } from "@/components/ChatSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Specialist, BehavioralSettings } from "@/types/specialist";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [selectedSpecialists, setSelectedSpecialists] = useState<Specialist[]>(
    []
  );
  const [activeSpecialists, setActiveSpecialists] = useState<Specialist[]>([]);
  const [behavioralSettings, setBehavioralSettings] =
    useState<BehavioralSettings>({
      location: "",
      approach: "",
      experience: "",
      continent: "",
    });
  const [chatHistory, setChatHistory] = useState<any[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSpecialistToggle = (specialist: Specialist) => {
    setSelectedSpecialists((prev) => {
      const isSelected = prev.some((s) => s.id === specialist.id);
      if (isSelected) {
        return prev.filter((s) => s.id !== specialist.id);
      } else {
        return [...prev, specialist];
      }
    });
  };

  const handleStartConsultation = () => {
    if (selectedSpecialists.length > 0) {
      setActiveSpecialists(selectedSpecialists);
    }
  };

  const handleNewChat = () => {
    setActiveSpecialists([]);
    setSelectedSpecialists([]);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <SidebarProvider>
      <div className="h-screen bg-gray-50 flex w-full">
        <ChatSidebar
          chatHistory={chatHistory}
          onNewChat={handleNewChat}
          selectedSpecialists={activeSpecialists}
          isOpen={sidebarOpen}
          onToggle={toggleSidebar}
        />

        <div className="flex-1 flex flex-col min-w-0 h-full">
          <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-4 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {!sidebarOpen && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleSidebar}
                    className="p-2"
                  >
                    <Menu className="w-5 h-5" />
                  </Button>
                )}
                <h1 className="text-xl md:text-2xl font-bold text-primary">
                  PersonaBot
                </h1>
              </div>
              <img
                src="/lovable-uploads/6ec2a542-1e91-4ba2-8337-687e93f3031b.png"
                alt="PersonaBot"
                className="h-10 w-auto"
              />
            </div>
          </header>

          <div className="flex-1 min-h-0">
            {activeSpecialists.length === 0 ? (
              <SpecialistSelector
                selectedSpecialists={selectedSpecialists}
                onSpecialistToggle={handleSpecialistToggle}
                onStartConsultation={handleStartConsultation}
                behavioralSettings={behavioralSettings}
                setBehavioralSettings={setBehavioralSettings}
              />
            ) : (
              <ChatInterface
                specialists={activeSpecialists}
                behavioralSettings={behavioralSettings}
                onBack={() => setActiveSpecialists([])}
              />
            )}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
