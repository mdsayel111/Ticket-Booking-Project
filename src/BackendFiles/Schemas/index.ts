const mongoose = require('mongoose');
const { Schema } = mongoose;

// Schemas
export const movieSchema = new Schema({
    title: String,
    description: String,
    img: String,
    bgImg: String,
    language: Array,
    date: Date,
    duration: Number,
    rating: Number,
    photos: Array,
    price: Number,
    category: String,
    hostName: String,
    hostEmail: String

});

export const userSchema = new Schema({
    email: String,
    role: {
        type: String,
        default: "user"
    },
    status: {
        type: Boolean,
        default: false
    },
    reqRole: {
        type: String,
        default: "none"
    },
});

export const event_And_sports_Schema = new Schema({
    title: String,
    description: String,
    date: {
        type: Date,
        default: Date.now
    },
    availableTicket: Number,
    stats: { ticketBooked: Number, usefulSession: Number, talentSpeaker: Number },
    category: String,
    sponsor: { platinum: Array, silver: Array, gold: Array },
    img: String,
    bgImg: String,
    hostName: String,
    hostEmail: String,
    price: Number
});