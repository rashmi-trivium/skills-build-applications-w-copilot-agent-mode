import { useEffect, useState } from 'react'
import { fetchCollection } from '../config/api.js'

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
})

function formatDate(value) {
  const date = new Date(value)

  return Number.isNaN(date.getTime()) ? 'Not scheduled' : dateFormatter.format(date)
}

function Activities() {
  const [activities, setActivities] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    fetchCollection('activities')
      .then((data) => {
        if (isMounted) {
          setActivities(data)
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
        <span className="eyebrow">Logs</span>
        <h1>Activities</h1>
        <p>Recent workouts captured by athletes across the program.</p>
      </div>

      {status === 'loading' && <div className="alert alert-info">Loading activities...</div>}
      {status === 'error' && <div className="alert alert-danger">Unable to load activities: {error}</div>}
      {status === 'ready' && activities.length === 0 && <div className="alert alert-secondary">No activities found.</div>}

      {activities.length > 0 && (
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th>Type</th>
                <th>Date</th>
                <th>Duration</th>
                <th>Calories</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity._id ?? activity.id ?? `${activity.type}-${activity.activityDate}`}>
                  <td className="fw-semibold">{activity.type}</td>
                  <td>{formatDate(activity.activityDate)}</td>
                  <td>{activity.durationMinutes ?? 0} min</td>
                  <td>{activity.caloriesBurned ?? 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Activities