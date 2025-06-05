
import { useState } from 'react';
import { SpecialistSelector } from '@/components/SpecialistSelector';
import { ChatInterface } from '@/components/ChatInterface';
import { ChatSidebar } from '@/components/ChatSidebar';
import { Specialist, BehavioralSettings } from '@/types/specialist';

const Index = () => {
  const [selectedSpecialist, setSelectedSpecialist] = useState<Specialist | null>(null);
  const [behavioralSettings, setBehavioralSettings] = useState<BehavioralSettings>({
    location: 'city',
    approach: 'science',
    experience: 'young',
    continent: 'North America'
  });
  const [chatHistory, setChatHistory] = useState<any[]>([]);

  const handleSpecialistSelect = (specialist: Specialist) => {
    setSelectedSpecialist(specialist);
  };

  const handleNewChat = () => {
    setSelectedSpecialist(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      <ChatSidebar 
        chatHistory={chatHistory}
        onNewChat={handleNewChat}
        selectedSpecialist={selectedSpecialist}
      />
      
      <main className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-primary">PersonaBot</h1>
            <p className="text-gray-600">AI Medical Consultation Platform</p>
          </div>
        </header>

        <div className="flex-1 flex">
          {!selectedSpecialist ? (
            <SpecialistSelector 
              onSpecialistSelect={handleSpecialistSelect}
              behavioralSettings={behavioralSettings}
              setBehavioralSettings={setBehavioralSettings}
            />
          ) : (
            <ChatInterface 
              specialist={selectedSpecialist}
              behavioralSettings={behavioralSettings}
              onBack={() => setSelectedSpecialist(null)}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
