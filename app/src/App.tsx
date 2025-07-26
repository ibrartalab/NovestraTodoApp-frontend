import { BrowserRouter,Routes,Route } from 'react-router'
import { lazy, Suspense} from 'react'
import TodosProvider  from './context/TodosContext';
import { Loader } from './components/Loader';
import UserProvider from './context/UserContext';
import SearchContextProvider from './context/SearchContext';

// This is the main application file where we set up routing and lazy loading of components
// The Suspense component is used to handle loading states for lazy-loaded components

const HomePage = lazy(() => import("./pages/Home"));
const LoginPage = lazy(() => import("./pages/Login"));
const SignupPage = lazy(() => import("./pages/Signup"));
const UserDashbaord = lazy(() => import("./pages/Dashboard"));

function App() {

  // const [todos,SetTodos] = useState<[]>([]);
 

  return (
    <>
    <SearchContextProvider>
    <UserProvider>
    <TodosProvider>
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/signup" element={<SignupPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/dashboard/:username" element={<UserDashbaord/>} />
      </Routes>
      </Suspense>
    </BrowserRouter>
    </TodosProvider>
    </UserProvider>
    </SearchContextProvider>
    </>
  )
}

export default App
