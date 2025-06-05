
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Plus, MessageSquare, ChevronDown, ChevronRight } from 'lucide-react';
import { Specialist } from '@/types/specialist';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from '@/components/ui/sidebar';

interface ChatSidebarProps {
  chatHistory: any[];
  onNewChat: () => void;
  selectedSpecialist: Specialist | null;
}

export const ChatSidebar = ({ chatHistory, onNewChat, selectedSpecialist }: ChatSidebarProps) => {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['recent']));

  const toggleFolder = (folderId: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId);
    } else {
      newExpanded.add(folderId);
    }
    setExpandedFolders(newExpanded);
  };

  const specialists = [
    { 
      id: 'pcp', 
      name: 'PCP Patricia', 
      count: 3,
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=faces',
      color: 'bg-medical-blue'
    },
    { 
      id: 'cardio', 
      name: 'Cardio Carlos', 
      count: 1,
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=faces',
      color: 'bg-medical-red'
    },
    { 
      id: 'endo', 
      name: 'Endo Emma', 
      count: 2,
      avatar: 'https://images.unsplash.com/photo-1594824405077-c7db9639b50d?w=150&h=150&fit=crop&crop=faces',
      color: 'bg-medical-green'
    },
    { 
      id: 'nephro', 
      name: 'Nephro Nathan', 
      count: 0,
      avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=faces',
      color: 'bg-medical-teal'
    },
    { 
      id: 'pharm', 
      name: 'Pharm Philip', 
      count: 1,
      avatar: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=150&h=150&fit=crop&crop=faces',
      color: 'bg-medical-amber'
    }
  ];

  const sampleChats = [
    { id: '1', title: 'Blood pressure concerns', specialist: 'cardio', date: 'Today' },
    { id: '2', title: 'Annual checkup questions', specialist: 'pcp', date: 'Yesterday' },
    { id: '3', title: 'Diabetes management', specialist: 'endo', date: '2 days ago' },
    { id: '4', title: 'Medication interactions', specialist: 'pharm', date: '1 week ago' },
    { id: '5', title: 'General health advice', specialist: 'pcp', date: '1 week ago' },
    { id: '6', title: 'Thyroid levels discussion', specialist: 'endo', date: '2 weeks ago' }
  ];

  return (
    <Sidebar className="w-80">
      <SidebarHeader className="p-4">
        <Button 
          onClick={onNewChat}
          className="w-full bg-primary hover:bg-primary/90 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Consultation
        </Button>
      </SidebarHeader>

      <SidebarContent>
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-4">
            {/* Recent Chats */}
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => toggleFolder('recent')}
                      className="w-full justify-start"
                    >
                      {expandedFolders.has('recent') ? (
                        <ChevronDown className="w-4 h-4 mr-2 text-gray-500" />
                      ) : (
                        <ChevronRight className="w-4 h-4 mr-2 text-gray-500" />
                      )}
                      <MessageSquare className="w-4 h-4 mr-2 text-gray-500" />
                      <span className="font-medium text-gray-900">Recent</span>
                      <Badge variant="secondary" className="ml-auto">
                        {sampleChats.filter(chat => ['Today', 'Yesterday'].includes(chat.date)).length}
                      </Badge>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  {expandedFolders.has('recent') && (
                    <>
                      {sampleChats
                        .filter(chat => ['Today', 'Yesterday'].includes(chat.date))
                        .map(chat => (
                          <SidebarMenuItem key={chat.id}>
                            <div className="ml-6 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                              <div className="text-sm font-medium text-gray-900 truncate">
                                {chat.title}
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                {chat.date}
                              </div>
                            </div>
                          </SidebarMenuItem>
                        ))}
                    </>
                  )}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* Specialist Folders */}
            {specialists.map(specialist => (
              <SidebarGroup key={specialist.id}>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        onClick={() => toggleFolder(specialist.id)}
                        className="w-full justify-start"
                      >
                        {expandedFolders.has(specialist.id) ? (
                          <ChevronDown className="w-4 h-4 mr-2 text-gray-500" />
                        ) : (
                          <ChevronRight className="w-4 h-4 mr-2 text-gray-500" />
                        )}
                        <div className={`w-6 h-6 ${specialist.color} rounded-full p-0.5 mr-2 flex-shrink-0`}>
                          <img 
                            src={specialist.avatar} 
                            alt={specialist.name}
                            className="w-full h-full rounded-full object-cover"
                          />
                        </div>
                        <span className="font-medium text-gray-900 truncate">
                          {specialist.name}
                        </span>
                        {specialist.count > 0 && (
                          <Badge variant="secondary" className="ml-auto">
                            {specialist.count}
                          </Badge>
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    {expandedFolders.has(specialist.id) && specialist.count > 0 && (
                      <>
                        {sampleChats
                          .filter(chat => chat.specialist === specialist.id)
                          .map(chat => (
                            <SidebarMenuItem key={chat.id}>
                              <div className="ml-8 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                                <div className="text-sm font-medium text-gray-900 truncate">
                                  {chat.title}
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                  {chat.date}
                                </div>
                              </div>
                            </SidebarMenuItem>
                          ))}
                      </>
                    )}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
          </div>
        </ScrollArea>
      </SidebarContent>

      {selectedSpecialist && (
        <SidebarFooter className="p-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary-100 rounded-full flex-shrink-0"></div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-900 truncate">
                Currently with {selectedSpecialist.fullName}
              </div>
              <div className="text-xs text-gray-500">
                {selectedSpecialist.specialty}
              </div>
            </div>
          </div>
        </SidebarFooter>
      )}
    </Sidebar>
  );
};
