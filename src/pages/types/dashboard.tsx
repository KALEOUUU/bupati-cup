
  
  export interface Team {
    id: number,
    main: number,
    club_nama: string,
    photo: string,
    menang: number,
    seri: number,
    kalah: number,
    kebobolan: number,
    goal: number,
    selisih: number,
    poin: number
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
  