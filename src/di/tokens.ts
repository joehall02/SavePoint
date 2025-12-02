export const TOKENS = {
    GameService: Symbol.for('services.GameService'),
    PlatformService: Symbol.for('services.PlatformService'),
    GameRepository: Symbol.for('repos.GameRepository'),
    PlatformRepository: Symbol.for('repos.PlatformRepository'),
    IGDBClient: Symbol.for('apis.IGDBClient')
} as const;
export type Token = typeof TOKENS[keyof typeof TOKENS];