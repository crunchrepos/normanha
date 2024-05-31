import {useEffect, useState} from 'react';
import {UserSession} from '~/types/user.types';

export const useUserSession = () => {
  const [userSession, setUserSession] = useState<UserSession>();
  function getUserSession() {
    const response = localStorage.getItem('userSession');
    if (response) {
      const parsedResponse = JSON.parse(response);

      setUserSession(parsedResponse as unknown as UserSession);
    }
  }

  useEffect(() => {
    getUserSession();
  }, []);

  return {
    userSession,
  };
};
