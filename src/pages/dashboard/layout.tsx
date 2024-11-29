import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const MyComponent = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const [activeDashboard, setActiveDashboard] = useState('group');

  useEffect(() => {
    if (pathname.includes('/club')) {
      setActiveDashboard('club');
    } else if (pathname.includes('/player')) {
      setActiveDashboard('player');
    } else {
      setActiveDashboard('group');
    }
  }, [pathname]);

  // rest of the component code
  return (
    <div>
      <h1>Active Dashboard: {activeDashboard}</h1>
      {/* Rest of your component JSX */}
    </div>
  );
};

export default MyComponent;

