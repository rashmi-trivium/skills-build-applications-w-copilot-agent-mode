import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import octofitLogo from '../../../docs/octofitapp-small.png'
import { API_BASE_URL } from './config/api.js'
import './App.css'

function App() {
  const navItems = [
    { to: '/users', label: 'Users' },
    { to: '/teams', label: 'Teams' },
    { to: '/activities', label: 'Activities' },
    { to: '/leaderboard', label: 'Leaderboard' },
    { to: '/workouts', label: 'Workouts' },
  ]

  return (
    <div className="app-shell">
      <header className="app-header border-bottom">
        <nav className="navbar navbar-expand-lg py-3">
          <div className="container-fluid px-0">
            <NavLink className="navbar-brand d-flex align-items-center gap-2" to="/users">
              <img src={octofitLogo} alt="Octofit Tracker" className="brand-logo" />
              <span>Octofit Tracker</span>
            </NavLink>
            <div className="navbar-nav flex-row flex-wrap gap-2 ms-lg-auto">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) => (
                    `nav-link rounded px-3 py-2 ${isActive ? 'active' : ''}`
                  )}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        </nav>
        <div className="api-status small text-muted">
          API: <span>{API_BASE_URL}</span>
        </div>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
