import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models.js';

const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';

async function seedDatabase() {
  console.log('Seed the octofit_db database with test data');

  await mongoose.connect(mongoUri);

  await Promise.all([
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Team.deleteMany({}),
    User.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  const teams = await Team.insertMany([
    {
      name: 'Trail Blazers',
      mascot: 'Comet',
      members: ['Maya Chen', 'Jordan Brooks'],
    },
    {
      name: 'Core Crushers',
      mascot: 'Atlas',
      members: ['Priya Patel', 'Sam Rivera'],
    },
  ]);

  const users = await User.insertMany([
    {
      name: 'Maya Chen',
      email: 'maya.chen@example.com',
      team: teams[0].name,
    },
    {
      name: 'Jordan Brooks',
      email: 'jordan.brooks@example.com',
      team: teams[0].name,
    },
    {
      name: 'Priya Patel',
      email: 'priya.patel@example.com',
      team: teams[1].name,
    },
    {
      name: 'Sam Rivera',
      email: 'sam.rivera@example.com',
      team: teams[1].name,
    },
  ]);

  await Activity.insertMany([
    {
      userId: users[0]._id,
      type: 'Trail Run',
      durationMinutes: 42,
      caloriesBurned: 430,
      activityDate: new Date('2026-06-01T14:30:00Z'),
    },
    {
      userId: users[1]._id,
      type: 'Cycling',
      durationMinutes: 55,
      caloriesBurned: 510,
      activityDate: new Date('2026-06-02T12:00:00Z'),
    },
    {
      userId: users[2]._id,
      type: 'Strength Training',
      durationMinutes: 38,
      caloriesBurned: 320,
      activityDate: new Date('2026-06-03T18:15:00Z'),
    },
    {
      userId: users[3]._id,
      type: 'Rowing',
      durationMinutes: 30,
      caloriesBurned: 280,
      activityDate: new Date('2026-06-04T09:45:00Z'),
    },
  ]);

  await LeaderboardEntry.insertMany([
    {
      userId: users[0]._id,
      userName: users[0].name,
      teamName: users[0].team,
      score: 1280,
    },
    {
      userId: users[1]._id,
      userName: users[1].name,
      teamName: users[1].team,
      score: 1195,
    },
    {
      userId: users[2]._id,
      userName: users[2].name,
      teamName: users[2].team,
      score: 1110,
    },
    {
      userId: users[3]._id,
      userName: users[3].name,
      teamName: users[3].team,
      score: 1045,
    },
  ]);

  await Workout.insertMany([
    {
      title: 'Morning Mobility Reset',
      description: 'A gentle full-body session for flexibility and joint health.',
      difficulty: 'beginner',
      durationMinutes: 20,
    },
    {
      title: 'Tempo Run Builder',
      description: 'Structured intervals for improving sustainable running pace.',
      difficulty: 'intermediate',
      durationMinutes: 35,
    },
    {
      title: 'Power Circuit Challenge',
      description: 'Fast-paced strength circuit with compound lifts and conditioning.',
      difficulty: 'advanced',
      durationMinutes: 45,
    },
  ]);

  console.log('Seeded users, teams, activities, leaderboard, and workouts.');
}

seedDatabase()
  .catch((error: unknown) => {
    console.error('Failed to seed octofit_db:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.connection.close();
  });