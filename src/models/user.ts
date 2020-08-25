import { useState, useCallback } from 'react';
import { queryMe } from '@/services/user';
export default function useUserModel() {
  const [user, setUser] = useState({});

  return {
    user,
  };
}
