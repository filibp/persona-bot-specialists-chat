
export interface Specialist {
  id: string;
  name: string;
  fullName: string;
  specialty: string;
  avatar: string;
  color: string;
  description: string;
}

export interface BehavioralSettings {
  location: 'city' | 'rural';
  approach: 'science' | 'conservative';
  experience: 'young' | 'old';
  continent: 'North America' | 'Europe' | 'Asia' | 'South America' | 'Africa' | 'Australia';
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'specialist';
  timestamp: Date;
}

export interface ChatSession {
  id: string;
  specialistId: string;
  title: string;
  messages: ChatMessage[];
  createdAt: Date;
  behavioralSettings: BehavioralSettings;
}
