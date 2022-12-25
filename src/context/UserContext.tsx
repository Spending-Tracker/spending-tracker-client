import React, { createContext, useState } from "react";

interface UserContextInterface {
  email: string;
  id: string;
  name: string;
  role: string;
  token: string;
  login: ({}: UserContextInterface) => void;
  logout: ({}) => void;
}

interface Props {
  children: React.ReactNode;
}

export const UserContext = createContext({} as UserContextInterface);

const initialState: UserContextInterface = {
  email: "",
  id: "",
  name: "",
  role: "",
  token: "",
  login: (user: UserContextInterface) => {},
  logout: () => {},
};

const UserContextProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState(initialState);

  const login = (user: UserContextInterface) => {
    setUser({
      email: user.email,
      id: user.id,
      name: user.name,
      role: user.role,
      token: user.token,
      login: () => {},
      logout: () => {},
    });

    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    setUser(initialState);

    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider
      value={{
        ...user,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;