import Map from "@/entities/Map";

export default interface IMapRepository {
  getById(mapId: string): Promise<Map | null>;
}
