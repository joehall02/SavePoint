# API Endpoints

## Games

| Name                         | Method | Path                      |
|------------------------------|--------|---------------------------|
| Get all games                | GET    | `/api/games`              |
| Create game                  | POST   | `/api/games`              |
| Get game details             | GET    | `/api/games/{id}`         |
| Edit game                    | PUT    | `/api/games/{id}`         |
| Delete game                  | DELETE | `/api/games/{id}`         |
| Search game by title         | GET    | `/api/games/search`       |
| Search game (home page)      | POST   | `/api/games/search`       |
| Search game (results page)   | POST   | `/api/games/result`       |
| Get game details (Igdb)      | POST   | `/api/games/game-details` |

## Platforms

| Name          | Method | Path             |
|---------------|--------|------------------|
| Get platforms | GET    | `/api/platforms` |
