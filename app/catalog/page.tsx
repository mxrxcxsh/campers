import CatalogList from '@/components/CatalogList/CatalogList';
import { type Camper, getAllCampers } from '@/lib/campersApi';

interface CatalogProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

interface CatalogFilters {
  location: string;
  camperForm: string;
  engine: string;
  transmission: string;
}

const formAliases: Record<string, string[]> = {
  alcove: ['alcove'],
  panelvan: ['panelvan', 'paneltruck'],
  integrated: ['integrated', 'fullyintegrated'],
  semiintegrated: ['semiintegrated'],
};

const normalize = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]/g, '');

const getSearchValue = (value: string | string[] | undefined) => {
  if (Array.isArray(value)) {
    return value[0] ?? '';
  }

  return value ?? '';
};

const matchesForm = (camperForm: string, selectedForm: string) => {
  if (!selectedForm) {
    return true;
  }

  const normalizedSelectedForm = normalize(selectedForm);
  const allowedForms = formAliases[normalizedSelectedForm] ?? [
    normalizedSelectedForm,
  ];

  return allowedForms.includes(normalize(camperForm));
};

const filterCampers = (campers: Camper[], filters: CatalogFilters) => {
  return campers.filter(camper => {
    const locationMatches =
      !filters.location ||
      normalize(camper.location).includes(normalize(filters.location));
    const formMatches = matchesForm(camper.form, filters.camperForm);
    const engineMatches =
      !filters.engine || normalize(camper.engine) === normalize(filters.engine);
    const transmissionMatches =
      !filters.transmission ||
      normalize(camper.transmission) === normalize(filters.transmission);

    return (
      locationMatches && formMatches && engineMatches && transmissionMatches
    );
  });
};

const Catalog = async ({ searchParams }: CatalogProps) => {
  const campers = await getAllCampers();
  const params = await searchParams;
  const filters: CatalogFilters = {
    location: getSearchValue(params.location),
    camperForm: getSearchValue(params.camperForm),
    engine: getSearchValue(params.engine),
    transmission: getSearchValue(params.transmission),
  };
  const hasActiveFilters = Object.values(filters).some(Boolean);
  const visibleCampers = hasActiveFilters
    ? filterCampers(campers, filters)
    : campers;

  return <CatalogList campers={visibleCampers} />;
};

export default Catalog;
