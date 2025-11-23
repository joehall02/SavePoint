interface GameCover {
    id: number;
    image_id: string;
}

export interface IGDBGame {
    id: number;
    cover: GameCover;
    name: string;
}