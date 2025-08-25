
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
  [key: string]: string | string[];
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
