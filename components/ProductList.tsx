import useSWR from 'swr';
import { ProductWithCount } from '@pages';
import Link from 'next/link';
import Items from '@components/items';

interface ProductListProps {
  kind: 'favorites' | 'sales' | 'purchases';
}

interface Record {
  id: number;
  product: ProductWithCount;
}

interface ProductListResponse {
  [key: string]: Record[];
}

export default function ProductList({ kind }: ProductListProps) {
  const { data } = useSWR<ProductListResponse>(`/api/user/me/${kind}`);

  return data ? (
    <>
      {data[kind]?.map((record) => (
        <Link key={record.id} href={`/items/${record.product.id}`} legacyBehavior>
          <Items
            id={record.product.id}
            title={record.product.name}
            price={record.product.price}
            hearts={record.product._count.favorite}
          />
        </Link>
      ))}
    </>
  ) : null;
}
