import './App.css';
import Header from "./Header.js";
import Layout from "./Layout.js";
import { Route, Routes } from "react-router-dom";
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CreatePost from './pages/CreatePost';
import { UserContextProvider } from './UserContext';


function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/create' element={<CreatePost/>}/>
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
