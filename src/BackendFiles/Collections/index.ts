import { event_And_sports_Schema, movieSchema, userSchema } from "../Schemas";
const mongoose = require('mongoose');

// collections
export const movieCollection = mongoose.models.movies || mongoose.model('movies', movieSchema)
export const sportCollection = mongoose.models.sports || mongoose.model('sports', event_And_sports_Schema)
export const eventCollection = mongoose.models.events || mongoose.model('events', event_And_sports_Schema)
export const userCollection = mongoose.models.users || mongoose.model('users', userSchema)