import Monster from "@/entities/Monster";

export default interface IMonsterRepository {
  list(): Promise<Monster[]>
}
