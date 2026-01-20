# API Endpoints

## Games

| Id | Name                         | Method | Path                      |
|----|------------------------------|--------|---------------------------|
| 1  | Fetch from collection        | GET    | `/api/games`              |
| 2  | Create game                  | POST   | `/api/games`              |
| 3  | Get game details             | GET    | `/api/games/{id}`         |
| 4  | Edit game                    | PUT    | `/api/games/{id}`         |
| 5  | Delete game                  | DELETE | `/api/games/{id}`         |
| 6  | Search game (home page)      | POST   | `/api/games/search`       |
| 7  | Search game (results page)   | POST   | `/api/games/result`       |
| 8  | Get game details (IGDB)      | POST   | `/api/games/game-details` |

## Platforms

| Id | Name          | Method | Path             |
|----|---------------|--------|------------------|
| 1  | Get platforms | GET    | `/api/platforms` |

---

## Query Parameters

#### Fetch from collection
- `GET /api/games?search=&platform=&page=&limit=`
  - `search` (string, required)
  - `platform` (string, optional; platform name, e.g. `original_xbox`)
  - `page` (number, optional; default: `1`)
  - `limit` (number, optional; default: `6`, max: `30`)

#### Search game (results page)
- `POST /api/games/result?search=&platform=&page=&limit=`
  - `search` (string, required)
  - `platform` (string, optional; platform name, e.g. `pc`)
  - `page` (number, optional; default: `1`)
  - `limit` (number, optional; default: `6`, max: `30`)

#### Get game details (IGDB)
- `POST /api/games/game-details/:igdbId`

#### Edit game
- `PUT /api/games/:id`