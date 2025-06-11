
import { useState } from 'react';
import { SpecialistSelector } from '@/components/SpecialistSelector';
import { ChatInterface } from '@/components/ChatInterface';
import { ChatSidebar } from '@/components/ChatSidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Specialist, BehavioralSettings } from '@/types/specialist';

const Index = () => {
  const [selectedSpecialists, setSelectedSpecialists] = useState<Specialist[]>([]);
  const [activeSpecialist, setActiveSpecialist] = useState<Specialist | null>(null);
  const [behavioralSettings, setBehavioralSettings] = useState<BehavioralSettings>({
    location: '',
    approach: '',
    experience: '',
    continent: ''
  });
  const [chatHistory, setChatHistory] = useState<any[]>([]);

  const handleSpecialistToggle = (specialist: Specialist) => {
    setSelectedSpecialists(prev => {
      const isSelected = prev.some(s => s.id === specialist.id);
      if (isSelected) {
        return prev.filter(s => s.id !== specialist.id);
      } else {
        return [...prev, specialist];
      }
    });
  };

  const handleStartConsultation = () => {
    if (selectedSpecialists.length > 0) {
      setActiveSpecialist(selectedSpecialists[0]); // Start with first selected specialist
    }
  };

  const handleNewChat = () => {
    setActiveSpecialist(null);
    setSelectedSpecialists([]);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gray-50 flex w-full">
        <ChatSidebar 
          chatHistory={chatHistory}
          onNewChat={handleNewChat}
          selectedSpecialist={activeSpecialist}
        />
        
        <div className="flex-1 flex flex-col min-w-0">
          <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-4 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <SidebarTrigger />
                <img 
                  src="/lovable-uploads/6ec2a542-1e91-4ba2-8337-687e93f3031b.png" 
                  alt="PersonaBot" 
                  className="h-10 w-auto"
                />
                <h1 className="text-xl md:text-2xl font-bold text-primary">PersonaBot</h1>
              </div>
            </div>
          </header>

          <div className="flex-1 flex flex-col min-h-0">
            {!activeSpecialist ? (
              <SpecialistSelector 
                selectedSpecialists={selectedSpecialists}
                onSpecialistToggle={handleSpecialistToggle}
                onStartConsultation={handleStartConsultation}
                behavioralSettings={behavioralSettings}
                setBehavioralSettings={setBehavioralSettings}
              />
            ) : (
              <ChatInterface 
                specialist={activeSpecialist}
                behavioralSettings={behavioralSettings}
                onBack={() => setActiveSpecialist(null)}
              />
            )}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
