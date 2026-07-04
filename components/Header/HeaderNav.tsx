import Link from 'next/link';
import css from './HeaderNav.module.css';

const HeaderNav = () => {
  return (
    <>
      <ul className={css.header_navigation}>
        <li>
          <Link href="/" className={css.nav_item}>
            Home
          </Link>
        </li>
        <li>
          <Link href="/catalog" className={css.nav_item}>
            Catalog
          </Link>
        </li>
      </ul>
    </>
  );
};

export default HeaderNav;
