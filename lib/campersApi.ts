const CAMPERS_API_URL = 'https://campers-api.goit.study';

export interface Camper {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  description: string;
  form: string;
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  transmission: string;
  engine: string;
  amenities: string[];
  createdAt: string;
  updatedAt: string;
  coverImage: string;
  totalReviews: number;
}

export interface CamperGalleryItem {
  id: string;
  camperId: string;
  thumb: string;
  original: string;
  order: number;
}

export type CamperDetails = Omit<Camper, 'coverImage'> & {
  coverImage?: string;
  gallery: CamperGalleryItem[];
};

export interface CampersResponse {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  campers: Camper[];
}

export async function getCampers(): Promise<CampersResponse> {
  const response = await fetch(`${CAMPERS_API_URL}/campers`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch campers: ${response.status}`);
  }

  const data = (await response.json()) as CampersResponse;

  if (!Array.isArray(data.campers)) {
    throw new Error('Campers API returned an invalid response');
  }

  return data;
}

export async function getCamperById(
  camperId: string
): Promise<CamperDetails | null> {
  const response = await fetch(`${CAMPERS_API_URL}/campers/${camperId}`, {
    cache: 'no-store',
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch camper: ${response.status}`);
  }

  const data = (await response.json()) as CamperDetails;

  if (!data.id || !Array.isArray(data.gallery)) {
    throw new Error('Campers API returned an invalid camper response');
  }

  return data;
}
