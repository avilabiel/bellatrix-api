import IMapRepository from "@/app/contracts/i-map-repository";
import Map from "@/entities/Map";

export default class MapRepositoryInMemory implements IMapRepository {
  private maps: Map[] = [];

  getById(mapId: string): Promise<Map> {
    const map = this.maps.find((map) => map.id === mapId);

    if (map) {
      return Promise.resolve(new Map(map));
    }

    return Promise.resolve(null);
  }
}
