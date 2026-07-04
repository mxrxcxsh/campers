import css from './Header.module.css';
import Link from 'next/link';
import HeaderNav from './HeaderNav';

const Header = () => {
  return (
    <>
      <header className={css.header}>
        <div className={css.header_container}>
          <Link href="/" aria-label="Campers — home" className={css.logoLink}>
            <svg className={css.logo}>
              <use href="/icons/icons.svg/#icon-logo" />
            </svg>
          </Link>
          <HeaderNav />
        </div>
      </header>
    </>
  );
};
export default Header;
