/* eslint-disable camelcase */

interface PersistenceMeasureProps {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

class MeasureMapper {
  // toPersistence(domainMeasure: DomainMeasureProps) {
  //   return {
  //   };
  // }

  toDomain(persistenceMeasure: PersistenceMeasureProps) {
    return {
      id: persistenceMeasure.id,
      name: persistenceMeasure.name,
      createdAt: persistenceMeasure.created_at,
      updatedAt: persistenceMeasure.updated_at,
      deletedAt: persistenceMeasure.deleted_at,
    };
  }
}

export default new MeasureMapper();
