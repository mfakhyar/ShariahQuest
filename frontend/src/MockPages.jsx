export function Learn() {
  return (
    <div className="page-container">
      <h2>📚 Fiqh Academy</h2>
      <div className="grid-3">
        {["Murabaha Basics", "Tawarruq Risks", "AAOIFI Standards"].map((course, i) => (
          <div key={i} className="card course-card">
            <div className="course-img" />
            <h3>{course}</h3>
            <p>5 Modules • 3 Hours</p>
            <button className="btn-outline">Start Learning</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Connect() {
  return (
    <div className="page-container">
      <h2>👳 Shariah Advisors</h2>
      <div className="grid-3">
        {["Dr. Abdullah", "Sheikh Omar", "Ustadh Sarah"].map((expert, i) => (
          <div key={i} className="card expert-card">
            <h3>{expert}</h3>
            <p className="highlight">Certified Shariah Auditor</p>
            <button className="btn-primary">Book Consultation</button>
          </div>
        ))}
      </div>
    </div>
  );
}