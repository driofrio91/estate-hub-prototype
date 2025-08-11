import EstateView from '@/components/EstateView';

export default function Page({ params }: { params: { estateId: string } }) {
  return <EstateView estateId={params.estateId} />;
}