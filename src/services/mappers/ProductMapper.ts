/* eslint-disable camelcase */
interface DomainProductProps {
  name: string;
  value?: string;
  amount?: string
  measureId?: string;
  image?: string;
  listId: string;
}

interface PersistenceProductProps {
  id: string;
  name: string;
  value: number;
  amount: number;
  image: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  measure_name: string;
  measure_id: string;
  list_id: string;
}

class ProductMapper {
  toPersistence(domainProduct: DomainProductProps) {
    return {
      name: domainProduct.name,
      value: Number(domainProduct.value) || '',
      amount: Number(domainProduct.amount) || '',
      measure_id: domainProduct.measureId || '',
      image: domainProduct.image || '',
      list_id: domainProduct.listId,
    };
  }

  toDomain(persistenceProduct: PersistenceProductProps) {
    return {
      id: persistenceProduct.id,
      name: persistenceProduct.name,
      value: persistenceProduct.value.toString(),
      amount: persistenceProduct.amount.toString(),
      image: persistenceProduct.image,
      createdAt: persistenceProduct.created_at,
      updatedAt: persistenceProduct.updated_at,
      deletedAt: persistenceProduct.deleted_at,
      measureName: persistenceProduct.measure_name,
      measureId: persistenceProduct.measure_id,
      listId: persistenceProduct.list_id,
    };
  }
}

export default new ProductMapper();
