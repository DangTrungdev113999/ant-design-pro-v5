import { useModel } from 'umi';
import { InitialStateTypes } from '@/app';

const useInitialState = () => {
  const { initialState, setInitialState, refresh } = useModel('@@initialState');
  const { token, user }: InitialStateTypes = initialState || {};

  return {
    initialState,
    token,
    user,
    setInitialState,
    refresh,
  };
};

export default useInitialState;
