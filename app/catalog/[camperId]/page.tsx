import Image from 'next/image';
import Link from 'next/link';
import { getCamperById } from '@/lib/campersApi';
import css from './CamperDetailsPage.module.css';

interface CamperDetailsPageProps {
  params: Promise<{
    camperId: string;
  }>;
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
  }).format(price);

const CamperDetailsPage = async ({ params }: CamperDetailsPageProps) => {
  const { camperId } = await params;
  const camper = await getCamperById(camperId);

  if (!camper) {
    return (
      <div className={css.details}>
        <p className={css.empty}>Camper not found.</p>
        <Link href="/catalog" className={css.backLink}>
          Back to catalog
        </Link>
      </div>
    );
  }

  return (
    <article className={css.details}>
      <Link href="/catalog" className={css.backLink}>
        Back to catalog
      </Link>

      <div className={css.header}>
        <h1 className={css.title}>{camper.name}</h1>
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

      <ul className={css.gallery}>
        {camper.gallery.map(image => (
          <li className={css.galleryItem} key={image.id}>
            <Image
              src={image.thumb}
              alt={`${camper.name} photo ${image.order}`}
              width={280}
              height={200}
              sizes="(max-width: 1200px) 33vw, 280px"
              className={css.galleryImage}
            />
          </li>
        ))}
      </ul>

      <p className={css.description}>{camper.description}</p>
    </article>
  );
};

export default CamperDetailsPage;
