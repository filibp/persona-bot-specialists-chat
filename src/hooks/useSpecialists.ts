
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Specialist } from '@/types/specialist';
import { fetchSpecialists } from '@/api/specialists';
import { fetchSettingsConfig, SettingsConfig } from '@/api/settings';

export const useSpecialists = () => {
  const { 
    data: specialists = [], 
    isLoading: specialistsLoading, 
    error: specialistsError 
  } = useQuery({
    queryKey: ['specialists'],
    queryFn: fetchSpecialists,
  });

  const { 
    data: settingsConfig, 
    isLoading: settingsLoading, 
    error: settingsError 
  } = useQuery({
    queryKey: ['settings'],
    queryFn: fetchSettingsConfig,
  });

  return {
    specialists,
    settingsConfig,
    isLoading: specialistsLoading || settingsLoading,
    error: specialistsError || settingsError
  };
};
