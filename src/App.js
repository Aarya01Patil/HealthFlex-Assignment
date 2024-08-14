import React, { useState } from 'react';
import CommentSection from './components/CommentSection';
import AnimatedBackground from './components/AnimatedBackground';

function App() {
  const [feeling, setFeeling] = useState(1);
  const handleThemeChange = (e) => {
    setFeeling(Number(e.target.value));
  };

  return (
    <div className={`App`}>
      <AnimatedBackground feeling={feeling} />
      <div className="theme-selector">
        <select onChange={handleThemeChange} value={feeling}>
          <option value="" disabled>Themes</option>
          <option value={1}>Theme 1</option>
          <option value={2}>Theme 2</option>
          <option value={3}>Theme 3</option>
        </select>
      </div>
      <CommentSection />
    </div>
  );
}

export default App;