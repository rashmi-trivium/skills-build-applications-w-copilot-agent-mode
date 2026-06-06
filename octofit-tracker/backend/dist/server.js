"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const database_js_1 = require("./config/database.js");
const models_js_1 = require("./models.js");
const app = (0, express_1.default)();
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${port}`;
const frontendBaseUrl = codespaceName
    ? `https://${codespaceName}-5173.app.github.dev`
    : 'http://localhost:5173';
const asyncHandler = (handler) => (req, res, next) => {
    Promise.resolve(handler(req, res, next)).catch(next);
};
app.use((0, cors_1.default)({ origin: frontendBaseUrl }));
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    res.json({
        status: 'ok',
        apiPort: port,
        apiBaseUrl,
        frontendBaseUrl,
        mongoUri: database_js_1.mongoUri,
    });
});
app.get('/api/users/', asyncHandler(async (_req, res) => {
    const users = await models_js_1.User.find().sort({ name: 1 });
    res.json(users);
}));
app.post('/api/users/', asyncHandler(async (req, res) => {
    const user = await models_js_1.User.create(req.body);
    res.status(201).json(user);
}));
app.get('/api/teams/', asyncHandler(async (_req, res) => {
    const teams = await models_js_1.Team.find().sort({ name: 1 });
    res.json(teams);
}));
app.post('/api/teams/', asyncHandler(async (req, res) => {
    const team = await models_js_1.Team.create(req.body);
    res.status(201).json(team);
}));
app.get('/api/activities/', asyncHandler(async (_req, res) => {
    const activities = await models_js_1.Activity.find().sort({ activityDate: -1 });
    res.json(activities);
}));
app.post('/api/activities/', asyncHandler(async (req, res) => {
    const activity = await models_js_1.Activity.create(req.body);
    res.status(201).json(activity);
}));
app.get('/api/leaderboard/', asyncHandler(async (_req, res) => {
    const leaderboard = await models_js_1.LeaderboardEntry.find().sort({ score: -1, userName: 1 });
    res.json(leaderboard);
}));
app.post('/api/leaderboard/', asyncHandler(async (req, res) => {
    const leaderboardEntry = await models_js_1.LeaderboardEntry.create(req.body);
    res.status(201).json(leaderboardEntry);
}));
app.get('/api/workouts/', asyncHandler(async (_req, res) => {
    const workouts = await models_js_1.Workout.find().sort({ difficulty: 1, title: 1 });
    res.json(workouts);
}));
app.post('/api/workouts/', asyncHandler(async (req, res) => {
    const workout = await models_js_1.Workout.create(req.body);
    res.status(201).json(workout);
}));
app.use((error, _req, res, _next) => {
    console.error('API request failed:', error);
    res.status(500).json({ message: 'API request failed' });
});
(0, database_js_1.connectToDatabase)()
    .then(() => {
    app.listen(port, () => {
        console.log(`OctoFit backend running on ${apiBaseUrl}`);
        console.log(`Allowing frontend origin ${frontendBaseUrl}`);
    });
})
    .catch((error) => {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
});
