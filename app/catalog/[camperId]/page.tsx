import Image from 'next/image';
import Link from 'next/link';
import {
  getCamperById,
  getCamperReviews,
  type CamperDetails,
} from '@/lib/campersApi';
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
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);

const featureLabels: Record<string, string> = {
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

const specLabels: Record<string, string> = {
  form: 'Form',
  length: 'Length',
  width: 'Width',
  height: 'Height',
  tank: 'Tank',
  consumption: 'Consumption',
};

const toReadableLabel = (value: string) =>
  value
    .replace(/_/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

const formatFeature = (feature: string) =>
  featureLabels[feature] ?? toReadableLabel(feature);

const formatSpecValue = (value: string) =>
  value
    .replace(/(\d)(kWh)$/i, '$1 $2')
    .replace(/(\d)(m|l)$/i, '$1 $2')
    .replace(/(\d)(kWh|l)\/100km/i, '$1 $2 / 100km');

const getVehicleFeatures = (camper: CamperDetails) => {
  const orderedFeatures = [
    camper.transmission,
    camper.amenities.includes('ac') ? 'ac' : null,
    camper.engine,
    camper.amenities.includes('kitchen') ? 'kitchen' : null,
    camper.amenities.includes('radio') ? 'radio' : null,
    camper.form,
  ].filter(Boolean) as string[];

  return [...new Set(orderedFeatures)];
};

const getReviewerInitial = (name: string) =>
  name.trim().charAt(0).toUpperCase() || '?';

async function bookCamper(formData: FormData) {
  'use server';

  const camperId = formData.get('camperId');
  const name = formData.get('name');
  const email = formData.get('email');

  if (!camperId || !name || !email) {
    return;
  }
}

const CamperDetailsPage = async ({ params }: CamperDetailsPageProps) => {
  const { camperId } = await params;
  const [camper, reviews] = await Promise.all([
    getCamperById(camperId),
    getCamperReviews(camperId),
  ]);

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

  const gallery = [...camper.gallery].sort((firstImage, secondImage) => {
    return firstImage.order - secondImage.order;
  });
  const mainImage = gallery[0];
  const features = getVehicleFeatures(camper);
  const specifications = [
    ['form', formatFeature(camper.form)],
    ['length', formatSpecValue(camper.length)],
    ['width', formatSpecValue(camper.width)],
    ['height', formatSpecValue(camper.height)],
    ['tank', formatSpecValue(camper.tank)],
    ['consumption', formatSpecValue(camper.consumption)],
  ];

  return (
    <article className={css.details}>
      <div className={css.overview}>
        <div className={css.mediaColumn}>
          {mainImage && (
            <div className={css.mainImageWrap}>
              <Image
                src={mainImage.original}
                alt={camper.name}
                fill
                priority
                sizes="(max-width: 900px) 100vw, 600px"
                className={css.mainImage}
              />
            </div>
          )}

          <ul className={css.thumbnails}>
            {gallery.map((image, index) => (
              <li className={css.thumbnailItem} key={image.id}>
                <Image
                  src={image.thumb}
                  alt={`${camper.name} photo ${image.order}`}
                  fill
                  sizes="(max-width: 640px) 50vw, 130px"
                  className={css.thumbnailImage}
                />
                {index === 0 && <span className={css.activeThumb} />}
              </li>
            ))}
          </ul>
        </div>

        <div className={css.infoColumn}>
          <section className={css.summaryCard} aria-labelledby="camper-title">
            <h1 className={css.title} id="camper-title">
              {camper.name}
            </h1>

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

            <p className={css.price}>{formatPrice(camper.price)}</p>
            <p className={css.description}>{camper.description}</p>
          </section>

          <section
            className={css.vehicleCard}
            aria-labelledby="vehicle-details-title"
          >
            <h2 className={css.sectionTitle} id="vehicle-details-title">
              Vehicle details
            </h2>

            <ul className={css.features}>
              {features.map(feature => (
                <li className={css.feature} key={feature}>
                  {formatFeature(feature)}
                </li>
              ))}
            </ul>

            <dl className={css.specs}>
              {specifications.map(([label, value]) => (
                <div className={css.specRow} key={label}>
                  <dt>{specLabels[label]}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
      </div>

      <section className={css.reviewsSection} aria-labelledby="reviews-title">
        <h2 className={css.reviewsTitle} id="reviews-title">
          Reviews
        </h2>

        <div className={css.bottomGrid}>
          <div className={css.reviewsList}>
            {reviews.length > 0 ? (
              reviews.map(review => (
                <article className={css.reviewCard} key={review.id}>
                  <div className={css.reviewHeader}>
                    <div className={css.avatar} aria-hidden="true">
                      {getReviewerInitial(review.reviewer_name)}
                    </div>
                    <div>
                      <h3 className={css.reviewerName}>
                        {review.reviewer_name}
                      </h3>
                      <div
                        className={css.ratingStars}
                        aria-label={`${review.reviewer_rating} out of 5 stars`}
                      >
                        {Array.from({ length: 5 }, (_, index) => (
                          <span
                            className={
                              index < review.reviewer_rating
                                ? css.starFilled
                                : css.starMuted
                            }
                            key={index}
                          >
                            &#9733;
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className={css.reviewComment}>{review.comment}</p>
                </article>
              ))
            ) : (
              <p className={css.empty}>No reviews yet.</p>
            )}
          </div>

          <form className={css.bookingCard} action={bookCamper}>
            <input type="hidden" name="camperId" value={camper.id} />
            <div className={css.bookingIntro}>
              <h2 className={css.bookingTitle}>Book your campervan now</h2>
              <p className={css.bookingText}>
                Stay connected! We are always ready to help you.
              </p>
            </div>

            <label className={css.visuallyHidden} htmlFor="booking-name">
              Name
            </label>
            <input
              className={css.bookingInput}
              id="booking-name"
              name="name"
              placeholder="Name*"
              required
              type="text"
            />

            <label className={css.visuallyHidden} htmlFor="booking-email">
              Email
            </label>
            <input
              className={css.bookingInput}
              id="booking-email"
              name="email"
              placeholder="Email*"
              required
              type="email"
            />

            <button className={css.sendButton} type="submit">
              Send
            </button>
          </form>
        </div>
      </section>
    </article>
  );
};

export default CamperDetailsPage;
