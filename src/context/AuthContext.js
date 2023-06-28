import { useEffect } from "react";
import { createContext, useState } from "react";

export const AuthContext = createContext()

const initialState = {
   user: null
}
const getInitialState = () => {
   const user = localStorage.getItem('user');
   return user ? JSON.parse(user) : initialState;
}

export const AuthProvider = ({ children }) => {
   const [isAuthenticated, setIsAuthenticated] = useState(false);
   const [loading, setLoading] = useState(false);
   const [user, setUser] = useState(getInitialState);

   useEffect(() => {
      localStorage.setItem('user', JSON.stringify(user));
   }, [user])

   return (
      <AuthContext.Provider
         value={{
            isAuthenticated,
            setIsAuthenticated,
            loading,
            setLoading,
            user,
            setUser
         }}
      >
         {children}
      </AuthContext.Provider>
   )
}

// export const useAuth = useContext(AuthContext);