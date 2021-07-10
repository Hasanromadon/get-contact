import { useReducer } from 'react';
import AlertContext from './alertContext';
import AlertReducer from './alertReducer';

const AlertState = (props) => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    error: null,
    user: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  return (
    <AlertContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
