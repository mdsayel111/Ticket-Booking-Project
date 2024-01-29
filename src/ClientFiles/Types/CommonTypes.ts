import { event_And_sports_Schema } from './../../CLient-And-Server-Shared-Files/Schemas/index';
export type movie = {
    _id: string,
    title: string,
    description: string,
    img: string,
    bgImg: string,
    language: [],
    date: Date,
    duration: number,
    rating: number,
    photos: [],
    price: number,
    category: string,
    hostName: string,
    hostEmail: string,
    location: string
}
export type event_And_Sports = {
    _id?: string,
    title: string,
    description: string,
    date: Date,
    availableTicket: number,
    stats: { ticketBooked: number, usefulSession: number, talentSpeaker: number }
    ,
    category: string,

    sponsor: {
        platinum: [], silver: [], gold: []
    },
    img: string,
    bgImg: string,
    hostName: string,
    hostEmail: string,
    price: number,
    location: string
}