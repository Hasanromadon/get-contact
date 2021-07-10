import { useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './AuthReducer';

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    error: null,
    user: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
