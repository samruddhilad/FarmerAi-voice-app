import { Colors } from '../theme';

export const getCategoryIcon = (category?: string) => {
  if (!category) return 'business-outline' as const;
  const key = category.toLowerCase();
  if (key.includes('horticulture')) return 'leaf-outline' as const;
  if (key.includes('tribal')) return 'people-outline' as const;
  if (key.includes('agro') || key.includes('processing')) return 'cog-outline' as const;
  if (key.includes('credit') || key.includes('loan') || key.includes('welfare')) return 'card-outline' as const;
  if (key.includes('insurance')) return 'shield-checkmark-outline' as const;
  return 'business-outline' as const;
};

export const getCategoryColor = (category?: string) => {
  if (!category) return Colors.primary[50];
  const key = category.toLowerCase();
  if (key.includes('horticulture')) return Colors.primary[50];
  if (key.includes('tribal')) return Colors.primary[100];
  if (key.includes('agro') || key.includes('processing')) return Colors.primary[200];
  if (key.includes('credit') || key.includes('loan') || key.includes('welfare')) return Colors.primary[50];
  if (key.includes('insurance')) return Colors.primary[100];
  return Colors.primary[50];
};
