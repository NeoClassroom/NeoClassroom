import type { ReactNode } from 'react'

type LayoutProps = {
  title: string
  children: ReactNode
}

export function Layout({ title, children }: LayoutProps) {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Classroom</p>
          <h1>{title}</h1>
        </div>

        <nav aria-label="Main navigation" className="nav">
          <a href="#overview">Overview</a>
          <a href="#courses">Courses</a>
          <a href="#schedule">Schedule</a>
        </nav>
      </header>

      {children}
    </div>
  )
}
