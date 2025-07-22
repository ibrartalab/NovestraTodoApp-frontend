import { BrowserRouter,Routes,Route } from 'react-router'
import { lazy, Suspense} from 'react'
// This is the main application file where we set up routing and lazy loading of components
// The Suspense component is used to handle loading states for lazy-loaded components

const HomePage = lazy(() => import("./pages/Home"));
const LoginPage = lazy(() => import("./pages/Login"));
const SignupPage = lazy(() => import("./pages/Signup"));
const UserDashbaord = lazy(() => import("./pages/Dashboard"));

function App() {

  return (
    <>
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/signup" element={<SignupPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/dashboard/:activeTab" element={<UserDashbaord/>} />
      </Routes>
      </Suspense>
    </BrowserRouter>
    </>
  )
}

export default App
