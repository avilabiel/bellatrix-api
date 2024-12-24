import Monster from "@/entities/Monster";

export default interface IMonsterRepository {
  list(): Promise<Monster[]>;

  getById(id: string): Promise<Monster | null>;
}
