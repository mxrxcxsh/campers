import CatalogShell from './CatalogShell';

export default function CatalogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CatalogShell>{children}</CatalogShell>;
}
