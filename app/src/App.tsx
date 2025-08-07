import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Loader } from "./components/Loader";
// import UserProvider, { UserContext } from './context/UserContext';
import SearchContextProvider from "./context/SearchContext";
import ThemeContextProvider from "./context/ThemeContext";
import { Provider } from "react-redux";
import { store } from "./store/store";
import UserProvider from "./context/UserContext";
import { useAppSelector } from "./hooks/redux/reduxHooks";
import { Navigate } from "react-router-dom";
// This is the main application file where we set up routing and lazy loading of components
// The Suspense component is used to handle loading states for lazy-loaded components

const HomePage = lazy(() => import("./pages/Home"));
const LoginPage = lazy(() => import("./pages/Login"));
const SignupPage = lazy(() => import("./pages/Signup"));
const UserDashbaord = lazy(() => import("./pages/Dashboard"));

function App() {
  
  const PrivateRoutes = ({ children }: { children: React.ReactNode }) => {
    const userName = useAppSelector((state) => state.auth.userName);
    console.log("PrivateRoutes userName:", userName);
    if (!userName) {
      return <Navigate to="/" replace />;
    } 

    return <>{children}</>;
  };

  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          {" "}
          {/* ✅ Move this up */}
          <ThemeContextProvider>
            <SearchContextProvider>
              <UserProvider>
                  <Suspense fallback={<Loader />}>
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/signup" element={<SignupPage />} />
                      <Route path="/login" element={<LoginPage />} />
                      <Route
                        path="/dashboard/:username"
                        element={
                          <PrivateRoutes>
                            <UserDashbaord />
                          </PrivateRoutes>
                        }
                      />
                    </Routes>
                  </Suspense>
              </UserProvider>
            </SearchContextProvider>
          </ThemeContextProvider>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
