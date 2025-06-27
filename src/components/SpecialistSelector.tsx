
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Specialist, BehavioralSettings } from '@/types/specialist';
import { Check, Loader2 } from 'lucide-react';
import { useSpecialists } from '@/hooks/useSpecialists';

interface SpecialistSelectorProps {
  selectedSpecialists: Specialist[];
  onSpecialistToggle: (specialist: Specialist) => void;
  onStartConsultation: () => void;
  behavioralSettings: BehavioralSettings;
  setBehavioralSettings: (settings: BehavioralSettings) => void;
}

export const SpecialistSelector = ({ 
  selectedSpecialists,
  onSpecialistToggle,
  onStartConsultation,
  behavioralSettings, 
  setBehavioralSettings 
}: SpecialistSelectorProps) => {
  const { specialists, settingsConfig, isLoading, error } = useSpecialists();

  const isSelected = (specialist: Specialist) => 
    selectedSpecialists.some(s => s.id === specialist.id);

  const handleSettingChange = (settingId: string, value: string) => {
    setBehavioralSettings({
      ...behavioralSettings,
      [settingId]: value
    });
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span className="text-lg text-gray-600">Loading specialists...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-red-600 mb-2">Error loading data</p>
          <p className="text-sm text-gray-600">Please try refreshing the page</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-8 overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 animate-fade-in">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Choose Your Medical Specialist
          </h2>
          <p className="text-lg text-gray-600">
            Select a specialist and customize their background
          </p>
        </div>

        {/* Behavioral Settings */}
        {settingsConfig && (
          <Card className="mb-8 animate-fade-in">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Specialist Persona Settings (Optional)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {settingsConfig.behavioralSettings.map((setting) => (
                  <div key={setting.id} className="space-y-3">
                    <Label htmlFor={setting.id} className="text-sm font-medium">{setting.category}</Label>
                    <Select 
                      value={behavioralSettings[setting.id] || ''} 
                      onValueChange={(value) => handleSettingChange(setting.id, value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={`Select ${setting.category.toLowerCase()}`} />
                      </SelectTrigger>
                      <SelectContent>
                        {setting.values.map((value) => (
                          <SelectItem key={value} value={value}>
                            {value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Specialists Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {specialists.map((specialist, index) => (
            <Card 
              key={specialist.id} 
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in ${
                isSelected(specialist) ? 'ring-2 ring-primary bg-primary/5' : ''
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => onSpecialistToggle(specialist)}
            >
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className={`w-16 h-16 ${specialist.color} rounded-full p-0.5 relative`}>
                    <img 
                      src={specialist.avatar} 
                      alt={specialist.fullName}
                      className="w-full h-full rounded-full object-cover"
                    />
                    {isSelected(specialist) && (
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {specialist.name}
                    </h3>
                    <Badge variant="secondary" className="text-xs">
                      {specialist.specialty}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Start Consultation Button */}
        {selectedSpecialists.length > 0 && (
          <div className="flex justify-center">
            <Button 
              onClick={onStartConsultation}
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-lg"
              size="lg"
            >
              Start Consultation with {selectedSpecialists.length} Specialist{selectedSpecialists.length > 1 ? 's' : ''}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
