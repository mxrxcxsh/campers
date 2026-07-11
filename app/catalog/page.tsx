import CatalogList from '@/components/CatalogList/CatalogList';
import { getCampers } from '@/lib/campersApi';

const Catalog = async () => {
  const { campers } = await getCampers();

  return <CatalogList campers={campers} />;
};

export default Catalog;
