
export interface SettingsOption {
  id: string;
  label: string;
  category: 'location' | 'approach' | 'experience' | 'continent';
  value: string;
}

export interface SettingsConfig {
  location: SettingsOption[];
  approach: SettingsOption[];
  experience: SettingsOption[];
  continent: SettingsOption[];
}

export const fetchSettingsConfig = async (): Promise<SettingsConfig> => {
  try {
    const response = await fetch('/api/settings');
    if (!response.ok) {
      throw new Error('Failed to fetch settings');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching settings:', error);
    // Return mock data as fallback for now
    return {
      location: [
        { id: 'city', label: 'City Hospital', category: 'location', value: 'city' },
        { id: 'rural', label: 'Rural Hospital', category: 'location', value: 'rural' }
      ],
      approach: [
        { id: 'science', label: 'Evidence-Based', category: 'approach', value: 'science' },
        { id: 'conservative', label: 'Conservative', category: 'approach', value: 'conservative' }
      ],
      experience: [
        { id: 'young', label: 'Early Career', category: 'experience', value: 'young' },
        { id: 'old', label: 'Veteran', category: 'experience', value: 'old' }
      ],
      continent: [
        { id: 'na', label: 'North America', category: 'continent', value: 'North America' },
        { id: 'eu', label: 'Europe', category: 'continent', value: 'Europe' },
        { id: 'as', label: 'Asia', category: 'continent', value: 'Asia' },
        { id: 'sa', label: 'South America', category: 'continent', value: 'South America' },
        { id: 'af', label: 'Africa', category: 'continent', value: 'Africa' },
        { id: 'au', label: 'Australia', category: 'continent', value: 'Australia' }
      ]
    };
  }
};
