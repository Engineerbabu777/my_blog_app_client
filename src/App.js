import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './Layout'
import Login from './components/Login';
import Register from './components/Register';
import Index from './components/Index';
import CreatePost from './components/CreatePost';
import EditPost from './components/EditPost';
import {UsercontextProvider}  from './UserContext';
import ViewPost from './components/ViewPost';



// ads

function App() {
  return (
    <UsercontextProvider>
     <Routes>
     <Route path="/" element={<Layout/>}>

     <Route path="/login" element={<Login/>} />
     <Route path="/register" element={<Register/>} />
     <Route index element={<Index/>} />
     <Route path="/post/create" element={<CreatePost/>} />
     <Route path="/post/:id" element={<ViewPost/>} />
     <Route path="/post/edit/:id" element={<EditPost/>} />

     </Route>

     </Routes>


    </UsercontextProvider>
  );
}

export default App;
