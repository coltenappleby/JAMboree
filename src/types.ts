export type ListenRaw = {
    endTime : string
    artistName : string
    trackName : string
    msPlayed : number
}

export type ListenHistoryRaw = ListenRaw[]; // Array of listens

export type Listen = {
    endTime : Date
    startTime : Date
    artistName : string
    trackName : string
    seconds : number
}

export type ListenHistory = Listen[]; // Array of listens
      