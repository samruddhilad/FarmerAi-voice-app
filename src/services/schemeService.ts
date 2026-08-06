/**
 * Scheme Service
 * Endpoints: GET /schemes, GET /schemes/:id, GET /schemes/categories, GET /schemes/search
 */
/**
 * Scheme Service
 * Endpoints: GET /schemes, GET /schemes/:id, GET /schemes/categories, GET /schemes/search
 */

import apiClient from '../api/client';
import {
  ApiResponse,
  PaginatedResponse,
  Scheme,
  SchemeCategory,
  SchemeFilters,
} from '../types/api.types';

export const MOCK_SCHEMES: Scheme[] = [
  {
    id: 'bhausaheb-fundkar-falbag-lagvad-yojana',
    title: 'Bhausaheb Fundkar Falbag Lagvad Yojana',
    description: 'Subsidy support for orchard plantation and long-term horticulture crops.',
    category: 'Horticulture',
    type: 'State',
    amount: 'Up to 50% subsidy',
    eligibility_criteria: 'Farmers establishing fruit orchards on eligible land parcels.',
    benefits: 'Plantation subsidy, sapling support, and orchard development assistance.',
    application_url: 'https://mahadbt.maharashtra.gov.in',
    is_featured: true,
  },
  {
    id: 'birsa-munda-krishi-kranti-outside-tribal-sub-plan',
    title: 'Birsa Munda Krishi Kranti Yojana (Outside Tribal Sub Plan)',
    description: 'Support for irrigation, horticulture, and farm infrastructure outside tribal areas.',
    category: 'Tribal Development',
    type: 'State',
    amount: 'Project-based subsidy',
    eligibility_criteria: 'Farmers in notified outside tribal sub plan regions.',
    benefits: 'Irrigation, orchard, and farm development assistance.',
    application_url: 'https://mahadbt.maharashtra.gov.in',
  },
  {
    id: 'birsa-munda-krishi-kranti-tribal-sub-plan',
    title: 'Birsa Munda Krishi Kranti Yojana (Tribal Sub Plan)',
    description: 'Special support for farming infrastructure in tribal sub plan regions.',
    category: 'Tribal Development',
    type: 'State',
    amount: 'Project-based subsidy',
    eligibility_criteria: 'Tribal farmers and tribal area beneficiaries.',
    benefits: 'Irrigation and horticulture support for tribal communities.',
    application_url: 'https://mahadbt.maharashtra.gov.in',
    is_featured: true,
  },
  {
    id: 'chief-minister-agro-food-processing-scheme',
    title: 'Chief Minister Agro and Food Processing Scheme',
    description: 'Incentives for value addition, food processing, and agri-based enterprises.',
    category: 'Agro Processing',
    type: 'State',
    amount: 'Capital assistance available',
    eligibility_criteria: 'Farmer producer groups, entrepreneurs, and processors.',
    benefits: 'Processing unit support, value addition, and employment generation.',
    application_url: 'https://mahadbt.maharashtra.gov.in',
  },
  {
    id: 'chief-minister-sustainable-agriculture-irrigation-scheme',
    title: 'Chief Minister Sustainable Agriculture Irrigation Scheme',
    description: 'Promotes efficient water use through micro irrigation and on-farm storage.',
    category: 'Irrigation',
    type: 'State',
    amount: 'Up to 55% subsidy',
    eligibility_criteria: 'Farmers adopting water-saving irrigation infrastructure.',
    benefits: 'Micro irrigation, farm ponds, and sustainable water management support.',
    application_url: 'https://mahadbt.maharashtra.gov.in',
    is_featured: true,
  },
  {
    id: 'dr-babasaheb-ambedkar-krushi-swavalamban-yojana',
    title: 'Dr. Babasaheb Ambedkar Krushi Swavalamban Yojana',
    description: 'Assistance for agriculture assets, wells, pumps, and farm development.',
    category: 'Farmer Welfare',
    type: 'State',
    amount: 'Subsidy on farm assets',
    eligibility_criteria: 'Eligible small and marginal farmers as per scheme norms.',
    benefits: 'Farm development, irrigation assets, and productivity enhancement.',
    application_url: 'https://mahadbt.maharashtra.gov.in',
  },
  {
    id: 'dr-shyamaprasad-mukharji-jan-van-vikas-scheme',
    title: 'Dr. Shyamaprasad Mukharji Jan-Van Vikas Scheme',
    description: 'Livelihood and development support for forest-dependent communities.',
    category: 'Tribal Development',
    type: 'State',
    amount: 'Development assistance',
    eligibility_criteria: 'Forest dwellers and eligible community beneficiaries.',
    benefits: 'Income generation, livelihood strengthening, and community assets.',
    application_url: 'https://mahadbt.maharashtra.gov.in',
  },
  {
    id: 'gopinath-munde-shetkari-apghat-suraksha-anudan-yojana',
    title: 'Gopinath Munde Shetkari Apghat Suraksha Sanugrah Anudan Yojana',
    description: 'Accident relief and financial assistance for farming families.',
    category: 'Safety & Welfare',
    type: 'State',
    amount: 'Accident assistance benefit',
    eligibility_criteria: 'Registered farmers and family members under scheme rules.',
    benefits: 'Support in case of accidental death, disability, or injury.',
    application_url: 'https://mahadbt.maharashtra.gov.in',
  },
  {
    id: 'kaju-kalma-vatap-scheme',
    title: 'Kaju Kalma Vatap Scheme',
    description: 'Distribution of cashew grafts for plantation expansion and income growth.',
    category: 'Horticulture',
    type: 'State',
    amount: 'Planting material support',
    eligibility_criteria: 'Farmers suitable for cashew plantation development.',
    benefits: 'Cashew graft supply and horticulture area expansion.',
    application_url: 'https://mahadbt.maharashtra.gov.in',
  },
  {
    id: 'mission-for-integrated-development-of-horticulture',
    title: 'Mission for Integrated Development of Horticulture (MIDH) - CSS',
    description: 'Central support for horticulture expansion, nurseries, and post-harvest systems.',
    category: 'Horticulture',
    type: 'Central',
    amount: 'Pattern-based subsidy',
    eligibility_criteria: 'Farmers, FPOs, and horticulture entrepreneurs.',
    benefits: 'Nursery development, orchard support, and infrastructure assistance.',
    application_url: 'https://midh.gov.in',
    is_featured: true,
  },
  {
    id: 'nfsm-cotton-css',
    title: 'National Food Security Mission (NFSM) - Cotton - CSS',
    description: 'Improves cotton productivity with seed, input, and demonstration support.',
    category: 'Crop Development',
    type: 'Central',
    amount: 'Input subsidy support',
    eligibility_criteria: 'Cotton growers in NFSM notified areas.',
    benefits: 'Quality seed, demonstrations, and productivity enhancement.',
    application_url: 'https://nfsm.gov.in',
  },
  {
    id: 'nfsm-food-grains-css',
    title: 'NFSM - Food grains (Pulses, Coarse Cereals, Nutri Cereals, Rice, Wheat) - CSS',
    description: 'Productivity and input support for key food grain crops.',
    category: 'Crop Development',
    type: 'Central',
    amount: 'Input subsidy support',
    eligibility_criteria: 'Farmers cultivating notified food grain crops.',
    benefits: 'Seed, demonstrations, and yield improvement support.',
    application_url: 'https://nfsm.gov.in',
  },
  {
    id: 'nfsm-oilseed-oilpalm-css',
    title: 'NFSM - Oilseed and Oilpalm - CSS',
    description: 'Boosts oilseed and oilpalm production through technology and subsidies.',
    category: 'Crop Development',
    type: 'Central',
    amount: 'Input subsidy support',
    eligibility_criteria: 'Oilseed and oilpalm growers in approved clusters.',
    benefits: 'Seed distribution, demonstrations, and area expansion support.',
    application_url: 'https://nfsm.gov.in',
  },
  {
    id: 'nfsm-sugarcane-css',
    title: 'NFSM-Sugarcane - CSS',
    description: 'Support for sugarcane productivity, water management, and inputs.',
    category: 'Crop Development',
    type: 'Central',
    amount: 'Production support',
    eligibility_criteria: 'Sugarcane farmers under scheme norms.',
    benefits: 'Better cane yield, field demonstrations, and technology adoption.',
    application_url: 'https://nfsm.gov.in',
  },
  {
    id: 'pmksy-per-drop-more-crop',
    title: 'PMKSY - Per Drop More Crop (Micro-irrigation Component) - CSS',
    description: 'Micro-irrigation support to improve water efficiency at farm level.',
    category: 'Irrigation',
    type: 'Central',
    amount: 'Up to 55% subsidy',
    eligibility_criteria: 'Farmers adopting drip or sprinkler systems.',
    benefits: 'Water saving, yield improvement, and irrigation modernization.',
    application_url: 'https://pmksy.gov.in',
  },
  {
    id: 'pmrkvy-rainfed-area-development',
    title: 'PMRKVY - Rainfed Area Development',
    description: 'Integrated support for resilient farming in rainfed areas.',
    category: 'Rainfed Development',
    type: 'Central',
    amount: 'Project-based support',
    eligibility_criteria: 'Rainfed farmers and clusters in notified areas.',
    benefits: 'Soil moisture conservation, diversified farming, and resilience support.',
    application_url: 'https://pmrkvy.gov.in',
  },
  {
    id: 'rashtriya-krushi-vikas-yojana-raftaar',
    title: 'Rashtriya Krushi Vikas Yojana (RKVY) - RAFTAAR - CSS',
    description: 'Encourages agri innovation, productivity, and infrastructure projects.',
    category: 'Farmer Welfare',
    type: 'Central',
    amount: 'Project support available',
    eligibility_criteria: 'States, institutions, and eligible farmer collectives.',
    benefits: 'Innovation, infrastructure, and productivity enhancement.',
    application_url: 'https://rkvy.nic.in',
  },
  {
    id: 'rkvy-sugarcane-harvester-subsidy',
    title: 'RKVY - Sugarcane Harvester Subsidy',
    description: 'Subsidy support for sugarcane harvesting equipment and mechanization.',
    category: 'Mechanization',
    type: 'State',
    amount: 'Equipment subsidy',
    eligibility_criteria: 'Eligible farmers, FPOs, and custom hiring groups.',
    benefits: 'Cost reduction for mechanized harvesting and timely operations.',
    application_url: 'https://mahadbt.maharashtra.gov.in',
  },
  {
    id: 'state-sponsored-agriculture-mechanization',
    title: 'State Sponsored Agriculture Mechanization',
    description: 'General mechanization assistance for farm tools, equipment, and implements.',
    category: 'Mechanization',
    type: 'State',
    amount: 'Subsidy on machinery',
    eligibility_criteria: 'Farmers and groups purchasing approved farm equipment.',
    benefits: 'Modern farm tools, reduced labour costs, and improved efficiency.',
    application_url: 'https://mahadbt.maharashtra.gov.in',
  },
  {
    id: 'sub-mission-on-agricultural-mechanization-css',
    title: 'Sub-Mission on Agricultural Mechanization - CSS',
    description: 'Central scheme to promote farm machinery access and custom hiring centres.',
    category: 'Mechanization',
    type: 'Central',
    amount: '50% to 80% subsidy',
    eligibility_criteria: 'Farmers, FPOs, and custom hiring entrepreneurs.',
    benefits: 'Machinery subsidy, custom hiring support, and technology adoption.',
    application_url: 'https://agrimachinery.nic.in',
    is_featured: true,
  },
];

const CATEGORY_ORDER = [
  'Horticulture',
  'Tribal Development',
  'Agro Processing',
  'Irrigation',
  'Farmer Welfare',
  'Safety & Welfare',
  'Crop Development',
  'Rainfed Development',
  'Mechanization',
];

const getFilteredSchemes = (filters?: SchemeFilters) => {
  const search = (filters?.search || '').trim().toLowerCase();

  return MOCK_SCHEMES.filter((scheme) => {
    const matchesCategory = !filters?.category || scheme.category === filters.category;
    const matchesSearch =
      !search ||
      [scheme.title, scheme.description, scheme.category, scheme.benefits, scheme.amount]
        .filter(Boolean)
        .some((field) => field!.toLowerCase().includes(search));

    return matchesCategory && matchesSearch;
  });
};

const getPagedSchemes = (filters?: SchemeFilters) => {
  const page = filters?.page || 1;
  const limit = filters?.limit || 10;
  const filtered = getFilteredSchemes(filters);
  const start = (page - 1) * limit;
  const items = filtered.slice(start, start + limit);

  return {
    items,
    total: filtered.length,
    page,
    limit,
    totalPages: Math.max(1, Math.ceil(filtered.length / limit)),
  };
};

const buildCategories = (): SchemeCategory[] => {
  const counts = MOCK_SCHEMES.reduce<Record<string, number>>((acc, scheme) => {
    acc[scheme.category] = (acc[scheme.category] || 0) + 1;
    return acc;
  }, {});

  return CATEGORY_ORDER.filter((name) => counts[name]).map((name, index) => ({
    id: String(index + 1),
    name,
    count: counts[name],
  }));
};

const MOCK_CATEGORIES = buildCategories();

export const schemeService = {
  getSchemes: async (filters?: SchemeFilters): Promise<PaginatedResponse<Scheme>> => {
    try {
      const response = await apiClient.get('/schemes', { params: filters });
      return response.data;
    } catch {
      const paged = getPagedSchemes(filters);

      return {
        success: true,
        data: {
          items: paged.items,
          total: paged.total,
          page: paged.page,
          limit: paged.limit,
          totalPages: paged.totalPages,
        },
      };
    }
  },

  getSchemeById: async (id: string): Promise<ApiResponse<Scheme>> => {
    try {
      const response = await apiClient.get(`/schemes/${id}`);
      return response.data;
    } catch {
      const found = MOCK_SCHEMES.find((s) => s.id === id) || MOCK_SCHEMES[0];
      return { success: true, data: found };
    }
  },

  getCategories: async (): Promise<SchemeCategory[]> => {
    try {
      const response = await apiClient.get('/schemes/categories');
      return response.data;
    } catch {
      return MOCK_CATEGORIES;
    }
  },

  searchSchemes: async (query: string): Promise<ApiResponse<Scheme[]>> => {
    try {
      const response = await apiClient.get('/schemes/search', {
        params: { q: query },
      });
      return response.data;
    } catch {
      const normalizedQuery = query.toLowerCase();
      const filtered = MOCK_SCHEMES.filter(
        (s) =>
          s.title.toLowerCase().includes(normalizedQuery) ||
          s.description.toLowerCase().includes(normalizedQuery) ||
          s.category.toLowerCase().includes(normalizedQuery)
      );
      return { success: true, data: filtered };
    }
  },
};
