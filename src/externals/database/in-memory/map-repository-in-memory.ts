import IMapRepository from "@/app/contracts/i-map-repository";

import Map from "@/entities/Map";
export default class MapRepositoryInMemory implements IMapRepository {
  private maps: Map[] = [ {
      id: '1',
      name: 'Mapa 1',
      image: 'mapa1.jpg',
      monsters:  [
        {
          id: "1234-token",
          name: "Aranha gigante",
          image: "https://cdn.vectorstock.com/i/1000v/01/10/rat-vector-2370110.jpg",
          level: 20,
          hp: 50,
          mp: 0,
          maxHp: 50,
          maxMp: 0,
          xp: 100,
          atk: {
            min: 70,
            max: 80,
          },
          spawnChance: 0.01,
          createdAt: new Date(),
        },
        {
          id: "1234-token",
          name: "Rei Goblin",
          image: "https://cdn.vectorstock.com/i/1000v/01/10/rat-vector-2370110.jpg",
          level: 15,
          hp: 100,
          mp: 0,
          maxHp: 100,
          maxMp: 0,
          xp: 70,
          atk: {
            min: 11,
            max: 13,
          },
          spawnChance: 0.1,
          createdAt: new Date(),
        },
      ],
      createdAt: new Date()
    },
    
     {
      id: '2',
      name: 'Mapa 2',
      image: 'mapa2.jpg',
      monsters:  [
        {
          id: "1234-token",
          name: "Rat líder",
          image: "https://cdn.vectorstock.com/i/1000v/01/10/rat-vector-2370110.jpg",
          level: 1,
          hp: 40,
          mp: 0,
          maxHp: 40,
          maxMp: 0,
          xp: 20,
          atk: {
            min: 5,
            max: 7,
          },
          spawnChance: 0.5,
          createdAt: new Date(),
        },
        {
          id: "1234-token",
          name: "Goblin líder",
          image: "https://cdn.vectorstock.com/i/1000v/01/10/rat-vector-2370110.jpg",
          level: 10,
          hp: 80,
          mp: 0,
          maxHp: 80,
          maxMp: 0,
          xp: 40,
          atk: {
            min: 9,
            max: 11,
          },
          spawnChance: 0.1,
          createdAt: new Date(),
        },
      ],
      createdAt: new Date('2022-01-15T14:00:00.000Z')
    },
    
     {
      id: '3',
      name: 'Mapa 3',
      image: 'mapa3.jpg',
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
