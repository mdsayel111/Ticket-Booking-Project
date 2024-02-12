import { strict } from "assert";

const mongoose = require('mongoose');
const { Schema } = mongoose;

// Schemas
export const movieSchema = new Schema({
    title: {
        type: String,
        required: [true, "Some Property is missing"]
    },
    description: {
        type: String,
        required: [true, "Some Property is missing"]
    },
    img: {
        type: String,
        required: [true, "Some Property is missing"]
    },
    bgImg: {
        type: String,
        required: [true, "Some Property is missing"]
    },
    language: {
        type: Array,
        required: [true, "Some Property is missing"]
    },
    date: {
        type: Date,
        default: Date.now
    },
    duration: {
        type: Number,
        required: [true, "Some Property is missing"]
    },
    rating: {
        type: Number,
        default: 0,
        max: 5
    },
    photos: {
        type: Array,
        required: [true, "Some Property is missing"]
    },
    price: {
        type: Number,
        required: [true, "Some Property is missing"]
    },
    category: {
        type: String,
        default: "movie"
    },
    hostName: {
        type: String,
        required: [true, "Some Property is missing"]
    },
    hostEmail: {
        type: String,
        required: [true, "Some Property is missing"]
    },
    location: {
        type: String,
        required: [true, "Some Property is missing"]
    }
});

export const event_And_sports_Schema = new Schema({
    title: {
        type: String,
        required: [true, "Some Property is missing"]
    },
    description: {
        type: String,
        required: [true, "Some Property is missing"]
    },
    date: {
        type: Date,
        default: Date.now
    },
    // availableTicket: {
    //     type: Number,
    //     required: [true, "Some Property is missing"]
    // },
    stats: {
        type: Object,
        default: { ticketBooked: { type: Number, default: 0 }, usefulSession: { type: Number, default: 0 }, talentSpeaker: { type: Number, default: 0 } }
    },
    category: {
        type: String,
        required: [true, "Some Property is missing"]
    },

    // sponsor: {
    //     type: Object,
    //     default: { platinum: { type: Array, default: [] }, silver: { type: Array, default: [] }, gold: { type: Array, default: [] } }
    // },
    img: {
        type: String,
        required: [true, "Some Property is missing"]
    },
    bgImg: {
        type: String,
        required: [true, "Some Property is missing"]
    },
    hostName: {
        type: String,
        required: [true, "Some Property is missing"]
    },
    hostEmail: {
        type: String,
        required: [true, "Some Property is missing"]
    },
    price: {
        type: Number,
        required: [true, "Some Property is missing"]
    },
    location: {
        type: String,
        required: [true, "Some Property is missing"]
    }
});

export const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Some Property is missing"]
    },
    email: {
        unique: true,
        type: String,
        required: [true, "Some Property is missing"]
    },
    password: {
        type: String,
        required: [true, "Some Property is missing"]
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "host", "admin"]
    },
    status: {
        type: String,
        default: "none",
        enum: ["none", "pending", "complete"]
    },
    reqRole: {
        type: String,
        default: "none",
        enum: ["host", "none"]
    },
});

export const bookingSchema = new Schema({
    userName: {
        type: String,
        required: [true, "Some Property is missing"]
    },
    userEmail: {
        type: String,
        required: [true, "Some Property is missing"]
    },
    hostName: {
        type: String,
        required: [true, "Some Property is missing"]
    },
    hostEmail: {
        type: String,
        required: [true, "Some Property is missing"]
    },
    bookingsId: {
        type: Array,
        required: [true, "Some Property is missing"]
    },
    status: { type: String, default: "pending", enum: ["pending", "complete"] },
    date: {
        type: Date,
        default: Date.now
    }
});