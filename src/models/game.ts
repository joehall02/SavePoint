export interface Game {
  id: number;
  title: string;
  condition: string;
  notes: string;
  rating: number;
  igdb_id: number;
  console_id: number;
}

export let games: Game[] = [];
