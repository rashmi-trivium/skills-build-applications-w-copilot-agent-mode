import express from 'express';
import { connectToDatabase, mongoUri } from './config/database.js';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models.js';

const app = express();
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

const asyncHandler = (
  handler: express.RequestHandler,
): express.RequestHandler => (req, res, next) => {
  Promise.resolve(handler(req, res, next)).catch(next);
};

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    apiPort: port,
    apiBaseUrl,
    mongoUri,
  });
});

app.get(
  '/api/users/',
  asyncHandler(async (_req, res) => {
    const users = await User.find().sort({ name: 1 });
    res.json(users);
  }),
);

app.post(
  '/api/users/',
  asyncHandler(async (req, res) => {
    const user = await User.create(req.body);
    res.status(201).json(user);
  }),
);

app.get(
  '/api/teams/',
  asyncHandler(async (_req, res) => {
    const teams = await Team.find().sort({ name: 1 });
    res.json(teams);
  }),
);

app.post(
  '/api/teams/',
  asyncHandler(async (req, res) => {
    const team = await Team.create(req.body);
    res.status(201).json(team);
  }),
);

app.get(
  '/api/activities/',
  asyncHandler(async (_req, res) => {
    const activities = await Activity.find().sort({ activityDate: -1 });
    res.json(activities);
  }),
);

app.post(
  '/api/activities/',
  asyncHandler(async (req, res) => {
    const activity = await Activity.create(req.body);
    res.status(201).json(activity);
  }),
);

app.get(
  '/api/leaderboard/',
  asyncHandler(async (_req, res) => {
    const leaderboard = await LeaderboardEntry.find().sort({ score: -1, userName: 1 });
    res.json(leaderboard);
  }),
);

app.post(
  '/api/leaderboard/',
  asyncHandler(async (req, res) => {
    const leaderboardEntry = await LeaderboardEntry.create(req.body);
    res.status(201).json(leaderboardEntry);
  }),
);

app.get(
  '/api/workouts/',
  asyncHandler(async (_req, res) => {
    const workouts = await Workout.find().sort({ difficulty: 1, title: 1 });
    res.json(workouts);
  }),
);

app.post(
  '/api/workouts/',
  asyncHandler(async (req, res) => {
    const workout = await Workout.create(req.body);
    res.status(201).json(workout);
  }),
);

app.use((error: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('API request failed:', error);
  res.status(500).json({ message: 'API request failed' });
});

connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`OctoFit backend running on ${apiBaseUrl}`);
    });
  })
  .catch((error: unknown) => {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  });
