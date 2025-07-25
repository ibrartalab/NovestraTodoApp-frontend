import { createContext, useState, type ReactNode } from "react";

interface UserContextType {
  user: string;
  setUser: React.Dispatch<React.SetStateAction<string>>;
  // logout: () => void,
}

// Create the context with a default empty value
const UserContext = createContext<UserContextType>({
  user: "",
  setUser: () => {}, // Placeholder function, will be overridden by the Provider
  // logout: () => {}
});

// Define the props for UserProvider, including children
interface UserProviderProps {
  children: ReactNode; // ReactNode is the correct type for children prop
}

/**
 * UserProvider component to manage and provide user state throughout the app.
 * It handles loading user from localStorage on initial load and saving to localStorage on change.
 */
const UserProvider = ({ children }: UserProviderProps) => {
  // Corrected: The 'user' state should be of type 'string', matching UserContextType's 'user' property.
  const [user, setUser] = useState<string>(() => {
    try {
      const storedUser = localStorage.getItem("username");
      // Ensure that if storedUser is not null, it's parsed. If it's just a string, JSON.parse is still safe.
      return storedUser ? storedUser : "";
    } catch (error) {
      console.error("Failed to retrieve user from localStorage:", error);
      return "";
    }
  });

    // const logout = useCallback(() => {
    //   setUser("")
    // },[setUser]);

  //    useEffect(() => {
  //   try {
  //     if (user) {
  //       localStorage.setItem('username', user);
  //     } else {
  //       localStorage.removeItem('username'); // Clear localStorage on logout
  //     }
  //   } catch (error) {
  //     console.error("Failed to save user to localStorage:", error);
  //   }
  // }, [user]);

  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        {children}
      </UserContext.Provider>
    </>
  );
};

export {UserContext};

export default UserProvider;
