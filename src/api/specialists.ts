
import { Specialist } from '@/types/specialist';

export const fetchSpecialists = async (): Promise<Specialist[]> => {
  try {
    const response = await fetch('/api/specialists');
    if (!response.ok) {
      throw new Error('Failed to fetch specialists');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching specialists:', error);
    // Return mock data as fallback for now
    return [
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
  }
};
