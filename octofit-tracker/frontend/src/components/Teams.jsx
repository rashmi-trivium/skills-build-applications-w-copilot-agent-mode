import { useEffect, useState } from 'react'
import { fetchCollection } from '../config/api.js'

function Teams() {
  const [teams, setTeams] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    fetchCollection('teams')
      .then((data) => {
        if (isMounted) {
          setTeams(data)
          setStatus('ready')
        }
      })
      .catch((requestError) => {
        if (isMounted) {
          setError(requestError.message)
          setStatus('error')
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section className="page-section">
      <div className="page-heading">
        <span className="eyebrow">Groups</span>
        <h1>Teams</h1>
        <p>Team rosters and mascots for Octofit challenges.</p>
      </div>

      {status === 'loading' && <div className="alert alert-info">Loading teams...</div>}
      {status === 'error' && <div className="alert alert-danger">Unable to load teams: {error}</div>}
      {status === 'ready' && teams.length === 0 && <div className="alert alert-secondary">No teams found.</div>}

      {teams.length > 0 && (
        <div className="row g-3">
          {teams.map((team) => (
            <div className="col-md-6" key={team._id ?? team.id ?? team.name}>
              <article className="content-card h-100">
                <div className="d-flex justify-content-between gap-3">
                  <h2>{team.name}</h2>
                  <span className="badge text-bg-success align-self-start">{team.mascot || 'No mascot'}</span>
                </div>
                <p className="text-muted mb-2">Members</p>
                <ul className="member-list">
                  {(team.members ?? []).map((member) => (
                    <li key={member}>{member}</li>
                  ))}
                </ul>
              </article>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default Teams