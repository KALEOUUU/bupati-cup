export interface TeamStats {
    matches: number
    wins: number
    losses: number
    points: number
  }
  
  export interface Team {
    id: string
    name: string
    group: string
    stats: TeamStats
  }
  
  export interface Match {
    id: string
    homeTeam: Team
    awayTeam: Team
    score?: {
      home: number
      away: number
    }
    date: string
  }
  
  export interface PlayerStats {
    goals: number
    assists: number
  }
  
  export interface Player {
    id: number
    name: string
    number: number
    position: string
    stats: {
      goals: number
      assists: number
    }
    imageUrl: string
  }
  
  export interface PlayerData {
    id: string
    name: string
    position: string
    number: number
    photo: string
    stats: {
      goals: number
      assists: number
    }
  }
  