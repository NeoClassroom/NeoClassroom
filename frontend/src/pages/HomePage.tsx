const highlights = [
  { label: 'Active courses', value: '06' },
  { label: 'Assignments due', value: '03' },
  { label: 'Attendance', value: '94%' },
]

const modules = [
  { title: 'Mathematics', detail: 'Algebra workshop · Today, 10:00 AM' },
  { title: 'Biology', detail: 'Lab review · Tomorrow, 1:30 PM' },
  { title: 'Design Thinking', detail: 'Project sprint · Friday, 9:00 AM' },
]

export function HomePage() {
  return (
    <main className="page-grid" id="overview">
      <section className="panel hero-panel">
        <div>
          <p className="eyebrow">Welcome back</p>
          <h2>Keep your learning schedule on track.</h2>
          <p className="lead">
            Review your upcoming sessions, monitor assignments, and stay focused on your goals.
          </p>
        </div>

        <button type="button" className="primary-button">
          View timetable
        </button>
      </section>

      <section className="stats-grid" aria-label="Overview statistics">
        {highlights.map((item) => (
          <article className="stat-card" key={item.label}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </article>
        ))}
      </section>

      <section className="panel" id="courses">
        <div className="section-header">
          <h3>Upcoming modules</h3>
          <a href="#schedule">View all</a>
        </div>

        <ul className="module-list">
          {modules.map((module) => (
            <li key={module.title}>
              <div>
                <h4>{module.title}</h4>
                <p>{module.detail}</p>
              </div>
              <span className="status-pill">On track</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
