import Image from 'next/image';
import Link from 'next/link';
import type { Camper } from '@/lib/campersApi';
import css from './CatalogList.module.css';

interface CatalogListProps {
  campers: Camper[];
}

const amenityLabels: Record<string, string> = {
  ac: 'AC',
  bathroom: 'Bathroom',
  gas: 'Gas',
  kitchen: 'Kitchen',
  microwave: 'Microwave',
  radio: 'Radio',
  refrigerator: 'Refrigerator',
  tv: 'TV',
  water: 'Water',
};

const formatPrice = (price: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
  }).format(price);

const formatFeature = (feature: string) =>
  amenityLabels[feature] ??
  feature
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

const CatalogList = ({ campers }: CatalogListProps) => {
  if (campers.length === 0) {
    return (
      <div className={css.catalog_container}>
        <p className={css.empty}>No campers found.</p>
      </div>
    );
  }

  return (
    <div className={css.catalog_container}>
      {campers.map((camper, index) => {
        const features = [
          camper.transmission,
          camper.engine,
          camper.form,
        ].slice(0, 6);

        return (
          <article className={css.card} key={camper.id}>
            <div className={css.imageWrap}>
              <Image
                src={camper.coverImage}
                alt={camper.name}
                width={292}
                height={320}
                loading={index === 0 ? 'eager' : 'lazy'}
                sizes="292px"
                className={css.image}
              />
            </div>
            <div className={css.content}>
              <div className={css.content_container}>
                <div className={css.cardHeader}>
                  <h2 className={css.name}>{camper.name}</h2>
                  <p className={css.price}>{formatPrice(camper.price)}</p>
                </div>

                <div className={css.meta}>
                  <span className={css.metaItem}>
                    <span className={css.star} aria-hidden="true">
                      &#9733;
                    </span>
                    {camper.rating} ({camper.totalReviews} Reviews)
                  </span>
                  <span className={css.metaItem}>
                    <svg className={css.mapIcon} aria-hidden="true">
                      <use href="/icons/icons.svg/#icon-map" />
                    </svg>
                    {camper.location}
                  </span>
                </div>
              </div>
              <p className={css.description}>{camper.description}</p>

              <ul className={css.features}>
                {features.map(feature => (
                  <li className={css.feature} key={feature}>
                    {feature === camper.engine && (
                      <svg className={css.featureIcon} aria-hidden="true">
                        <use href="/icons/icons.svg/#icon-petrol" />
                      </svg>
                    )}
                    {formatFeature(feature)}
                  </li>
                ))}
              </ul>

              <Link href={`/catalog/${camper.id}`} className={css.moreLink}>
                Show more
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default CatalogList;
