/* eslint-disable camelcase */
interface DomainListProps {
  name: string;
  estimated: string;
}

interface PersistenceListProps {
  id: string;
  name: string;
  estimated: number;
  total: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  user_id: string;
}

class ListMapper {
  toPersistence(domainList: DomainListProps) {
    return {
      name: domainList.name,
      estimated: Number(domainList.estimated),
    };
  }

  toDomain(persistenceList: PersistenceListProps) {
    return {
      id: persistenceList.id,
      name: persistenceList.name,
      estimated: persistenceList.estimated,
      total: persistenceList.total,
      createdAt: persistenceList.created_at,
      updatedAt: persistenceList.updated_at,
      deletedAt: persistenceList.deleted_at,
      userId: persistenceList.user_id,
    };
  }
}

export default new ListMapper();
