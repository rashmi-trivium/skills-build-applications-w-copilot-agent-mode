"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workout = exports.LeaderboardEntry = exports.Activity = exports.Team = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    team: String,
}, { timestamps: true });
const teamSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    mascot: String,
    members: [String],
}, { timestamps: true });
const activitySchema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true, min: 0 },
    caloriesBurned: { type: Number, default: 0, min: 0 },
    activityDate: { type: Date, default: Date.now },
}, { timestamps: true });
const leaderboardSchema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' },
    userName: { type: String, required: true },
    teamName: String,
    score: { type: Number, required: true, min: 0 },
}, { timestamps: true });
const workoutSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    description: String,
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
    durationMinutes: { type: Number, required: true, min: 0 },
}, { timestamps: true });
exports.User = mongoose_1.default.model('User', userSchema);
exports.Team = mongoose_1.default.model('Team', teamSchema);
exports.Activity = mongoose_1.default.model('Activity', activitySchema);
exports.LeaderboardEntry = mongoose_1.default.model('LeaderboardEntry', leaderboardSchema);
exports.Workout = mongoose_1.default.model('Workout', workoutSchema);
