
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Specialist, BehavioralSettings } from '@/types/specialist';
import { Check } from 'lucide-react';

const specialists: Specialist[] = [
  {
    id: 'pcp',
    name: 'Patricia',
    fullName: 'PCP Patricia',
    specialty: 'Primary Care Physician',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=faces',
    color: 'bg-medical-blue',
    description: 'General health assessments, preventive care, and health maintenance'
  },
  {
    id: 'cardio',
    name: 'Carlos',
    fullName: 'Cardio Carlos',
    specialty: 'Cardiologist',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=faces',
    color: 'bg-medical-red',
    description: 'Heart conditions, cardiovascular health, and cardiac interventions'
  },
  {
    id: 'endo',
    name: 'Emma',
    fullName: 'Endo Emma',
    specialty: 'Endocrinologist',
    avatar: 'https://images.unsplash.com/photo-1594824405077-c7db9639b50d?w=150&h=150&fit=crop&crop=faces',
    color: 'bg-medical-green',
    description: 'Hormone disorders, diabetes, thyroid, and metabolic conditions'
  },
  {
    id: 'nephro',
    name: 'Nathan',
    fullName: 'Nephro Nathan',
    specialty: 'Nephrologist',
    avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=faces',
    color: 'bg-medical-teal',
    description: 'Kidney diseases, dialysis, and renal transplantation'
  },
  {
    id: 'pharm',
    name: 'Philip',
    fullName: 'Pharm Philip',
    specialty: 'Pharmacist',
    avatar: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=150&h=150&fit=crop&crop=faces',
    color: 'bg-medical-amber',
    description: 'Medication management, drug interactions, and pharmaceutical care'
  }
];

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
  const isSelected = (specialist: Specialist) => 
    selectedSpecialists.some(s => s.id === specialist.id);

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
        <Card className="mb-8 animate-fade-in">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">Specialist Persona Settings (Optional)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-3">
                <Label htmlFor="location" className="text-sm font-medium">Hospital Setting</Label>
                <Select 
                  value={behavioralSettings.location} 
                  onValueChange={(value: 'city' | 'rural' | '') => 
                    setBehavioralSettings({...behavioralSettings, location: value})
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select setting" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="city">City Hospital</SelectItem>
                    <SelectItem value="rural">Rural Hospital</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label htmlFor="approach" className="text-sm font-medium">Medical Approach</Label>
                <Select 
                  value={behavioralSettings.approach} 
                  onValueChange={(value: 'science' | 'conservative' | '') => 
                    setBehavioralSettings({...behavioralSettings, approach: value})
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select approach" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="science">Evidence-Based</SelectItem>
                    <SelectItem value="conservative">Conservative</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label htmlFor="experience" className="text-sm font-medium">Experience Level</Label>
                <Select 
                  value={behavioralSettings.experience} 
                  onValueChange={(value: 'young' | 'old' | '') => 
                    setBehavioralSettings({...behavioralSettings, experience: value})
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="young">Early Career</SelectItem>
                    <SelectItem value="old">Veteran</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label htmlFor="continent" className="text-sm font-medium">Geographic Region</Label>
                <Select 
                  value={behavioralSettings.continent} 
                  onValueChange={(value) => 
                    setBehavioralSettings({...behavioralSettings, continent: value as any})
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="North America">North America</SelectItem>
                    <SelectItem value="Europe">Europe</SelectItem>
                    <SelectItem value="Asia">Asia</SelectItem>
                    <SelectItem value="South America">South America</SelectItem>
                    <SelectItem value="Africa">Africa</SelectItem>
                    <SelectItem value="Australia">Australia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

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
