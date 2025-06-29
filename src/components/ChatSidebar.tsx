
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Plus, MessageSquare, ChevronDown, ChevronRight, Users, X } from 'lucide-react';
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
  selectedSpecialists: Specialist[];
  isOpen: boolean;
  onToggle: () => void;
}

export const ChatSidebar = ({ chatHistory, onNewChat, selectedSpecialists, isOpen, onToggle }: ChatSidebarProps) => {
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
    { id: '1', title: 'Blood pressure concerns', specialists: ['cardio'], date: 'Today' },
    { id: '2', title: 'Annual checkup questions', specialists: ['pcp'], date: 'Yesterday' },
    { id: '3', title: 'Group consultation: Diabetes & Heart', specialists: ['endo', 'cardio'], date: '2 days ago' },
    { id: '4', title: 'Medication interactions', specialists: ['pharm'], date: '1 week ago' },
    { id: '5', title: 'Multi-specialist: Full health review', specialists: ['pcp', 'cardio', 'endo'], date: '1 week ago' },
    { id: '6', title: 'Thyroid levels discussion', specialists: ['endo'], date: '2 weeks ago' }
  ];

  const groupConsultations = sampleChats.filter(chat => chat.specialists.length > 1);
  const singleSpecialistChats = sampleChats.filter(chat => chat.specialists.length === 1);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-y-0 left-0 z-50 w-80 bg-white border-r border-gray-200 shadow-lg transform transition-transform lg:relative lg:translate-x-0 lg:shadow-none">
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">Chat History</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className="p-2"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <Button 
            onClick={onNewChat}
            className="w-full bg-primary hover:bg-primary/90 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Consultation
          </Button>
        </div>

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
                              <div className="flex items-center space-x-2 mb-1">
                                {chat.specialists.length > 1 && (
                                  <Users className="w-3 h-3 text-gray-400" />
                                )}
                                <div className="text-sm font-medium text-gray-900 truncate">
                                  {chat.title}
                                </div>
                              </div>
                              <div className="text-xs text-gray-500">
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

            {/* Group Consultations */}
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => toggleFolder('group-consultations')}
                      className="w-full justify-start"
                    >
                      {expandedFolders.has('group-consultations') ? (
                        <ChevronDown className="w-4 h-4 mr-2 text-gray-500" />
                      ) : (
                        <ChevronRight className="w-4 h-4 mr-2 text-gray-500" />
                      )}
                      <Users className="w-4 h-4 mr-2 text-gray-500" />
                      <span className="font-medium text-gray-900">Group Consultations</span>
                      <Badge variant="secondary" className="ml-auto">
                        {groupConsultations.length}
                      </Badge>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  {expandedFolders.has('group-consultations') && (
                    <>
                      {groupConsultations.map(chat => (
                        <SidebarMenuItem key={chat.id}>
                          <div className="ml-6 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                            <div className="flex items-center space-x-2 mb-1">
                              <Users className="w-3 h-3 text-gray-400" />
                              <div className="text-sm font-medium text-gray-900 truncate">
                                {chat.title}
                              </div>
                            </div>
                            <div className="text-xs text-gray-500">
                              {chat.date} • {chat.specialists.length} specialists
                            </div>
                          </div>
                        </SidebarMenuItem>
                      ))}
                    </>
                  )}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* Individual Specialist Folders */}
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
                        {singleSpecialistChats
                          .filter(chat => chat.specialists.includes(specialist.id))
                          .map(chat => (
                            <SidebarMenuItem key={chat.id}>
                              <div className="ml-8 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                                <div className="text-sm font-medium text-gray-900 truncate">
                                  {chat.title}
                                </div>
                                <div className="text-xs text-gray-500">
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

        {selectedSpecialists.length > 0 && (
          <div className="p-4 border-t">
            <div className="flex items-center space-x-3">
              {selectedSpecialists.length > 1 ? (
                <>
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">
                      Group consultation ({selectedSpecialists.length} specialists)
                    </div>
                    <div className="text-xs text-gray-500">
                      {selectedSpecialists.map(s => s.name).join(', ')}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">
                      Currently with {selectedSpecialists[0].fullName}
                    </div>
                    <div className="text-xs text-gray-500">
                      {selectedSpecialists[0].specialty}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
