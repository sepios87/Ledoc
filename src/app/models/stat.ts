export enum Period {
    day = "day",
    week = "week",
    month = "month"
}

export interface Stat {
    meeting: number,
    emergencies: number,
    videoMeeting: number,
    availablesAssits: number,
    orders: number,
    missingCalls: number
}
