
export interface BehavioralSettings {
  id: string;
  category: string;
  values: string[];
}

export interface SettingsConfig {
  behavioralSettings: BehavioralSettings[];
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
      behavioralSettings: [
        {
          id: 'location',
          category: 'Hospital Setting',
          values: ['City Hospital', 'Rural Hospital']
        },
        {
          id: 'approach',
          category: 'Medical Approach',
          values: ['Evidence-Based', 'Conservative']
        },
        {
          id: 'experience',
          category: 'Experience Level',
          values: ['Early Career', 'Veteran']
        },
        {
          id: 'continent',
          category: 'Geographic Region',
          values: ['North America', 'Europe', 'Asia', 'South America', 'Africa', 'Australia']
        }
      ]
    };
  }
};
