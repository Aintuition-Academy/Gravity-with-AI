import React from 'react';
import { Sparkles } from 'lucide-react';

export default function TutorTip({ tip }) {
  return (
    <div className="tutor-tip-box">
      <div className="tutor-icon">
        <Sparkles size={20} />
      </div>
      <div className="tutor-content">
        <h4>AI Tutor Tip</h4>
        <p>“{tip}”</p>
      </div>
    </div>
  );
}
