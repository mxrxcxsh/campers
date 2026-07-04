import Navigation from '@/components/NavBar/Navigation';
import css from './CatalogLayout.module.css';

export default function CatalogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={css.wrapper}>
      <Navigation />
      <section>{children}</section>
    </div>
  );
}
