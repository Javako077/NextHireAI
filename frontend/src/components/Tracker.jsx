import React from 'react';

const Tracker = ({
  trackerList,
  handleTrackerStatusChange
}) => {
  return (
    <section id="panel-tracker">
      <div className="page-header">
        <div>
          <h1 className="page-title">Application Tracker Agent</h1>
          <p className="page-subtitle">Schedules reminders and updates your master tracking spreadsheet.</p>
        </div>
      </div>

      <div className="glass-card">
        <h3 className="card-title">📅 Master Application Tracker</h3>
        <p className="card-text" style={{ marginBottom: '1rem' }}>
          Active vacancies you have applied to or are preparation-focused for.
        </p>

        <div className="tracker-container">
          <table className="tracker-table">
            <thead>
              <tr>
                <th className="tracker-th">Job Role</th>
                <th className="tracker-th">Company</th>
                <th className="tracker-th">Applied Date</th>
                <th className="tracker-th">Follow-up Milestone</th>
                <th className="tracker-th">Status</th>
                <th className="tracker-th">Calendar Alert</th>
              </tr>
            </thead>
            <tbody>
              {trackerList.map((item) => (
                <tr key={item.id} className="tracker-tr">
                  <td className="tracker-td" style={{ fontWeight: '600', color: 'var(--text-bright)' }}>{item.title}</td>
                  <td className="tracker-td">{item.company}</td>
                  <td className="tracker-td">{item.appliedDate}</td>
                  <td className="tracker-td" style={{ color: 'var(--warning)' }}>{item.followUpDate}</td>
                  <td className="tracker-td">
                    <select 
                      className="tracker-select" 
                      value={item.status} 
                      onChange={(e) => handleTrackerStatusChange(item.id, e.target.value)}
                    >
                      <option value="Applied">Applied</option>
                      <option value="Interviewing">Interviewing</option>
                      <option value="Offered">Offered</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>
                  <td className="tracker-td">
                    <span className={`tracker-badge ${item.status.toLowerCase()}`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Tracker;
