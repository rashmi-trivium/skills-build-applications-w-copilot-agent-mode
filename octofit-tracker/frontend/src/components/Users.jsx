import { useEffect, useState } from 'react'
import { buildApiUrl, fetchCollection } from '../config/api.js'

const usersEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : buildApiUrl('users')

function Users() {
  const [users, setUsers] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    fetchCollection(usersEndpoint)
      .then((data) => {
        if (isMounted) {
          setUsers(data)
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
        <span className="eyebrow">Profiles</span>
        <h1>Users</h1>
        <p>Registered athletes and their team assignments.</p>
      </div>

      {status === 'loading' && <div className="alert alert-info">Loading users...</div>}
      {status === 'error' && <div className="alert alert-danger">Unable to load users: {error}</div>}
      {status === 'ready' && users.length === 0 && <div className="alert alert-secondary">No users found.</div>}

      {users.length > 0 && (
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Team</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id ?? user.id ?? user.email}>
                  <td className="fw-semibold">{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.team || 'Unassigned'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Users