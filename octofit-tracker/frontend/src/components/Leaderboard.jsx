import { useEffect, useState } from 'react'
import { fetchCollection } from '../config/api.js'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    fetchCollection('leaderboard')
      .then((data) => {
        if (isMounted) {
          setEntries(data)
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
        <span className="eyebrow">Competition</span>
        <h1>Leaderboard</h1>
        <p>Top performers ranked by current Octofit score.</p>
      </div>

      {status === 'loading' && <div className="alert alert-info">Loading leaderboard...</div>}
      {status === 'error' && <div className="alert alert-danger">Unable to load leaderboard: {error}</div>}
      {status === 'ready' && entries.length === 0 && <div className="alert alert-secondary">No leaderboard entries found.</div>}

      {entries.length > 0 && (
        <div className="leaderboard-list">
          {entries.map((entry, index) => (
            <article className="leaderboard-row" key={entry._id ?? entry.id ?? entry.userName}>
              <div className="rank">#{index + 1}</div>
              <div>
                <h2>{entry.userName}</h2>
                <p>{entry.teamName || 'Independent'}</p>
              </div>
              <strong>{entry.score ?? 0}</strong>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Leaderboard