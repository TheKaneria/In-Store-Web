import { useEffect } from 'react';

const usePreventBackNavigation = (blockedPath) => {
    useEffect(() => {
        // Push initial state to history
        window.history.pushState(null, '', window.location.href);
    
        const handlePopstate = () => {
          if (window.location.pathname === blockedPath) {
            window.history.pushState(null, '', window.location.href);
          }
        };
    
        window.addEventListener('popstate', handlePopstate);
    
        return () => {
          window.removeEventListener('popstate', handlePopstate);
        };
      }, [blockedPath])
};

export default usePreventBackNavigation;
