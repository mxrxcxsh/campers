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

export interface CamperReview {
  id: string;
  camperId: string;
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
  createdAt: string;
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

interface GetCampersOptions {
  page?: number;
  perPage?: number;
}

export async function getCampers({
  page = 1,
  perPage = 5,
}: GetCampersOptions = {}): Promise<CampersResponse> {
  const params = new URLSearchParams({
    page: String(page),
    perPage: String(perPage),
  });
  const response = await fetch(`${CAMPERS_API_URL}/campers?${params}`, {
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

export async function getAllCampers(): Promise<Camper[]> {
  const firstPage = await getCampers({ page: 1, perPage: 10 });

  if (firstPage.totalPages <= 1) {
    return firstPage.campers;
  }

  const restPages = await Promise.all(
    Array.from({ length: firstPage.totalPages - 1 }, (_, index) =>
      getCampers({ page: index + 2, perPage: 10 })
    )
  );

  return [
    ...firstPage.campers,
    ...restPages.flatMap(response => response.campers),
  ];
}

export async function getCamperReviews(
  camperId: string
): Promise<CamperReview[]> {
  const response = await fetch(`${CAMPERS_API_URL}/campers/${camperId}/reviews`, {
    cache: 'no-store',
  });

  if (response.status === 404) {
    return [];
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch camper reviews: ${response.status}`);
  }

  const data = (await response.json()) as CamperReview[];

  if (!Array.isArray(data)) {
    throw new Error('Campers API returned an invalid reviews response');
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
