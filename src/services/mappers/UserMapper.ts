/* eslint-disable camelcase */
interface PersistenceUserProps {
  name: string;
  email: string;
  password: string;
}

interface DomainUserProps {
  id: string;
  name: string;
  email: string;
  password: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

class UserMapper {
  toPersistence(domainUser: PersistenceUserProps) {
    return {
      name: domainUser.name,
      email: domainUser.email,
      password: domainUser.password,
    };
  }

  toDomain(persistenceContact: DomainUserProps) {
    return {
      id: persistenceContact.id,
      name: persistenceContact.name,
      email: persistenceContact.email,
      password: persistenceContact.password,
      createdAt: persistenceContact.created_at,
      updatedAt: persistenceContact.updated_at,
      deletedAt: persistenceContact.deleted_at,
    };
  }
}

export default new UserMapper();
