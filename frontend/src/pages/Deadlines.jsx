import React from 'react';
import DeadlineList from '../components/DeadlineList.jsx';

export default function Deadlines({ deadlines }) {
  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div>
          <h1 className="page-title">Statutory & Procedural Deadlines</h1>
          <p className="page-subtitle">Track compliance dates, disclosure limits, and evidentiary hearing schedules.</p>
        </div>
      </div>

      <DeadlineList deadlines={deadlines} />
    </div>
  );
}
