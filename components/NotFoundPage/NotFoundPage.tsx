import Link from 'next/link';
import css from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <section className={css.container} aria-labelledby="not-found-title">
      <div className={css.illustration} aria-hidden="true">
        <svg
          className={css.scene}
          viewBox="0 0 430 230"
          role="img"
          focusable="false"
        >
          <path
            className={css.faintLine}
            d="M54 45c8-23 39-25 49-2 16 0 28 10 28 23H43c0-11 5-18 11-21Z"
          />
          <path
            className={css.faintLine}
            d="M333 63c6-18 30-20 38-2 12 0 21 8 21 18h-68c0-8 4-13 9-16Z"
          />
          <path
            className={css.line}
            d="m92 120 78-69 74 66 61-47 73 57"
          />
          <path className={css.line} d="m177 61 25 22 15-14" />
          <path className={css.line} d="m304 78 17 15 12-10" />
          <path className={css.line} d="M70 177h222" />
          <path
            className={css.line}
            d="M101 175c4-28 5-58 9-87 2-10 8-14 18-13l119 8c19 2 28 9 28 18 0 6-5 10-14 10l-126-8"
          />
          <path
            className={css.line}
            d="M111 111h119c38 0 66 22 69 52"
          />
          <path className={css.line} d="M117 127h34l-2 22h-34z" />
          <path className={css.line} d="M166 127h34l-2 22h-34z" />
          <path className={css.line} d="M214 132h28l-1 44h-31z" />
          <path className={css.line} d="M251 137h28l1 24h-29z" />
          <path className={css.line} d="M108 164h75" />
          <path className={css.line} d="M244 171h67" />
          <path className={css.line} d="M126 91h30" />
          <path className={css.line} d="M130 78h20" />
          <circle className={css.line} cx="143" cy="178" r="15" />
          <circle className={css.line} cx="285" cy="178" r="15" />
          <path
            className={css.line}
            d="M44 157c-11-7-13-21-4-32-7-12-1-24 10-27-4-15 3-36 15-45 9 10 15 25 12 38 11 5 17 19 10 31 10 7 8 24-3 32"
          />
          <path className={css.line} d="M63 115v64" />
          <path className={css.line} d="M50 137c9 5 17 4 25-3" />
          <path className={css.line} d="M60 90c7 8 11 16 12 25" />
          <path className={css.faintLine} d="M39 179h51" />
          <path className={css.faintLine} d="M59 180c-5-15 9-24 22-16" />
        </svg>
        <span className={css.searchBadge}>
          <svg className={css.searchIcon} aria-hidden="true">
            <use href="/icons/icons.svg/#icon-search" />
          </svg>
        </span>
      </div>

      <h2 id="not-found-title" className={css.title}>
        No campers found
      </h2>
      <p className={css.text}>
        We couldn't find any campers that match your filters.
        <br />
        Try adjusting your search or clearing some filters.
      </p>
      <div className={css.actions}>
        <Link href="/catalog" className={css.clearLink}>
          <svg className={css.clearIcon} aria-hidden="true">
            <use href="/icons/icons.svg/#icon-close" />
          </svg>
          Clear filters
        </Link>
        <Link href="/catalog" className={css.primaryLink}>
          View all campers
        </Link>
      </div>
    </section>
  );
};

export default NotFoundPage;
