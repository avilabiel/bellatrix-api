import IMapRepository from "@/app/contracts/i-map-repository";

import Map from "@/entities/Map";
export default class MapRepositoryInMemory implements IMapRepository {
  private maps: Map[] = [ 
     {
      id: '1',
      name: 'Mapa 1',
      image: 'mapa1.jpg',
      monsters:  [
        {
          id: "1234-token",
          name: "Rat",
          image: "https://cdn.vectorstock.com/i/1000v/01/10/rat-vector-2370110.jpg",
          level: 1,
          hp: 20,
          mp: 0,
          maxHp: 20,
          maxMp: 0,
          xp: 10,
          atk: {
            min: 1,
            max: 3,
          },
          spawnChance: 0.5,
          createdAt: new Date(),
        },
        {
          id: "1234-token",
          name: "Goblin",
          image: "https://cdn.vectorstock.com/i/1000v/01/10/rat-vector-2370110.jpg",
          level: 5,
          hp: 60,
          mp: 0,
          maxHp: 60,
          maxMp: 0,
          xp: 40,
          atk: {
            min: 5,
            max: 7,
          },
          spawnChance: 0.2,
          createdAt: new Date(),
        },
      ],
      createdAt: new Date()
    },
  ];

  getById(mapId: string): Promise<Map> {
    const map = this.maps.find((map) => map.id === mapId);

    if (map) {
      return Promise.resolve(new Map(map));
    }

    return Promise.resolve(null);
  }
}
