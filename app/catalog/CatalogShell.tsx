'use client';

import { Suspense } from 'react';

import Navigation from '@/components/NavBar/Navigation';
import { usePathname } from 'next/navigation';
import css from './CatalogLayout.module.css';

export default function CatalogShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDetailsPage = pathname.startsWith('/catalog/');

  return (
    <div
      className={`${css.wrapper} ${isDetailsPage ? css.detailsWrapper : ''}`}
    >
      {!isDetailsPage && (
        <Suspense fallback={null}>
          <Navigation />
        </Suspense>
      )}
      <section className={isDetailsPage ? css.detailsSection : undefined}>
        {children}
      </section>
    </div>
  );
}
