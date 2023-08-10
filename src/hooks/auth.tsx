import { ReactNode, createContext, useContext } from 'react';

import { IUser } from '@/types/auth';

import useLocalStorageState from './useLocalStorageState';

interface AuthContextType {
  user?: IUser;
  signin?: (user: IUser) => void;
  signout?: () => void;
}

const AuthContext = createContext<AuthContextType>({});

const defaultValue = {
  user: { id: 0, name: '', username: '' },
  access_token: '',
  pos_session: { id: 0, name: '' },
};

function AuthProvider({ children }: { children: ReactNode }): JSX.Element {
  const [user, setUser] = useLocalStorageState<IUser>('auth_token', defaultValue);

  const signin = (newUser: IUser): void => {
    setUser(newUser);
  };

  const signout = (): void => {
    setUser(defaultValue);
  };

  const value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth(): AuthContextType {
  return useContext(AuthContext);
}

export { useAuth, AuthProvider };
