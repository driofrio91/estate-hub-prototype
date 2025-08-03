import EstateForm from '@/components/EstateForm';

export default function Page({ params }: { params: { estateId: string } }) {
  return <EstateForm estateId={params.estateId} />;
}