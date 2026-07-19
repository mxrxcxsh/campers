'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import NotFoundPage from '@/components/NotFoundPage/NotFoundPage';
import type { Camper } from '@/lib/campersApi';
import css from './CatalogList.module.css';

interface CatalogListProps {
  campers: Camper[];
}

const LOAD_MORE_STEP = 5;

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
  const [visibleCount, setVisibleCount] = useState(LOAD_MORE_STEP);

  if (campers.length === 0) {
    return <NotFoundPage />;
  }

  const visibleCampers = campers.slice(0, visibleCount);
  const hasMoreCampers = visibleCount < campers.length;

  const handleLoadMore = () => {
    setVisibleCount(currentCount =>
      Math.min(currentCount + LOAD_MORE_STEP, campers.length)
    );
  };

  return (
    <div className={css.catalog_container}>
      {visibleCampers.map((camper, index) => {
        const features = [
          camper.engine,
          camper.transmission,
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
                    {feature === camper.transmission && (
                      <svg className={css.featureIcon} aria-hidden="true">
                        <use href="/icons/icons.svg/#icon-gear" />
                      </svg>
                    )}
                    {feature === camper.form && (
                      <svg className={css.featureIcon} aria-hidden="true">
                        <use href="/icons/icons.svg/#icon-camper-form" />
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

      {hasMoreCampers && (
        <div className={css.loadMoreWrap}>
          <button
            className={css.loadMoreButton}
            onClick={handleLoadMore}
            type="button"
          >
            Load more
          </button>
        </div>
      )}
    </div>
  );
};

export default CatalogList;
