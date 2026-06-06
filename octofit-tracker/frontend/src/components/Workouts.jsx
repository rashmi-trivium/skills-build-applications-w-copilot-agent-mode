import { useEffect, useState } from 'react'
import { buildApiUrl, fetchCollection } from '../config/api.js'

const workoutsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : buildApiUrl('workouts')

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    fetchCollection(workoutsEndpoint)
      .then((data) => {
        if (isMounted) {
          setWorkouts(data)
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
        <span className="eyebrow">Suggestions</span>
        <h1>Workouts</h1>
        <p>Personalized sessions athletes can add to their weekly plan.</p>
      </div>

      {status === 'loading' && <div className="alert alert-info">Loading workouts...</div>}
      {status === 'error' && <div className="alert alert-danger">Unable to load workouts: {error}</div>}
      {status === 'ready' && workouts.length === 0 && <div className="alert alert-secondary">No workouts found.</div>}

      {workouts.length > 0 && (
        <div className="row g-3">
          {workouts.map((workout) => (
            <div className="col-lg-4 col-md-6" key={workout._id ?? workout.id ?? workout.title}>
              <article className="content-card h-100">
                <span className="badge text-bg-primary text-capitalize mb-3">{workout.difficulty}</span>
                <h2>{workout.title}</h2>
                <p>{workout.description}</p>
                <div className="duration">{workout.durationMinutes ?? 0} min</div>
              </article>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default Workouts