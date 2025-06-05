
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Send, User } from 'lucide-react';
import { Specialist, BehavioralSettings, ChatMessage } from '@/types/specialist';

interface ChatInterfaceProps {
  specialist: Specialist;
  behavioralSettings: BehavioralSettings;
  onBack: () => void;
}

export const ChatInterface = ({ specialist, behavioralSettings, onBack }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: `Hello! I'm ${specialist.fullName}, your ${specialist.specialty.toLowerCase()}. I'm working at a ${behavioralSettings.location} hospital in ${behavioralSettings.continent}, and I take a ${behavioralSettings.approach}-based approach to medicine. As a ${behavioralSettings.experience} professional, I'm here to help with your health concerns. What brings you in today?`,
      sender: 'specialist',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Simulate specialist response
    setTimeout(() => {
      const responses = [
        "Thank you for sharing that information. Based on what you've described, I'd like to ask a few more questions to better understand your condition.",
        "That's a very good question. Let me explain this from my clinical experience and current medical guidelines.",
        "I understand your concerns. In my practice, I often see similar cases, and here's what I typically recommend...",
        "Based on the symptoms you're describing, there are several possibilities we should consider. Let me walk you through the differential diagnosis."
      ];
      
      const specialistResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: responses[Math.floor(Math.random() * responses.length)],
        sender: 'specialist',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, specialistResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Filter out empty behavioral settings for display
  const activeSettings = Object.entries(behavioralSettings)
    .filter(([_, value]) => value && value.trim() !== '')
    .map(([key, value]) => ({ key, value }));

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Chat Header */}
      <div className="bg-white border-b border-gray-200 p-4 flex-shrink-0">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onBack}
            className="p-2 md:hidden"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          
          <div className={`w-10 h-10 ${specialist.color} rounded-full p-0.5 flex-shrink-0`}>
            <img 
              src={specialist.avatar} 
              alt={specialist.fullName}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-semibold text-gray-900 truncate">
              {specialist.fullName}
            </h2>
            <p className="text-sm text-gray-600 truncate">
              {specialist.specialty}
            </p>
          </div>
          
          {activeSettings.length > 0 && (
            <div className="hidden md:flex flex-wrap gap-1">
              {activeSettings.map(({ key, value }) => (
                <Badge key={key} variant="outline" className="text-xs">
                  {value}
                </Badge>
              ))}
            </div>
          )}
        </div>
        
        {/* Mobile settings display */}
        {activeSettings.length > 0 && (
          <div className="md:hidden mt-2 flex flex-wrap gap-1">
            {activeSettings.map(({ key, value }) => (
              <Badge key={key} variant="outline" className="text-xs">
                {value}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Messages with inner scroll */}
      <div className="flex-1 min-h-0 flex flex-col">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4 max-w-4xl mx-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
              >
                <div className={`flex max-w-[85%] md:max-w-[70%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'} space-x-2`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.sender === 'user' 
                      ? 'bg-primary text-white ml-2' 
                      : `${specialist.color} mr-2`
                  }`}>
                    {message.sender === 'user' ? (
                      <User className="w-4 h-4" />
                    ) : (
                      <img 
                        src={specialist.avatar} 
                        alt={specialist.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    )}
                  </div>
                  
                  <div className={`p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-primary text-white rounded-br-sm'
                      : 'bg-gray-100 text-gray-900 rounded-bl-sm'
                  }`}>
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    <p className={`text-xs mt-2 ${
                      message.sender === 'user' ? 'text-primary-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Message Input - Always visible at bottom */}
      <div className="bg-white border-t border-gray-200 p-4 flex-shrink-0">
        <div className="max-w-4xl mx-auto">
          <div className="flex space-x-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={`Ask ${specialist.name} anything...`}
              className="flex-1"
            />
            <Button 
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
              className="bg-primary hover:bg-primary/90 text-white"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            PersonaBot AI provides general information and should not replace professional medical advice.
          </p>
        </div>
      </div>
    </div>
  );
};
