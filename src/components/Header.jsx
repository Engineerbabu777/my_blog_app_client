import React, { useContext,useEffect,useState} from 'react'
import { Link,Navigate } from 'react-router-dom';
import UserContext from '../UserContext';
import axios from 'axios';
const Header = () => {

  const [redirect,setredirect] = useState(false);
  const {userInfo,setuserInfo} = useContext(UserContext);

  useEffect(() => {
    axios.get("http://localhost:7544/profile")
        .then(({ data }) => {
          setuserInfo(data.username)
        })
        .catch(e => console.log(e.message))
},[setuserInfo]);

const Logout  = (e) => {
  e.preventDefault();
  axios.get("http://localhost:7544/logout");
  setuserInfo(null);
}

const username = userInfo?.username;

return (
    <>
      <header className='header'>
        <Link to="/" className="logo"><h1>SoloBlogger</h1></Link>
    

          <nav className="auth-btn">
        {username && (
          
            <>
            <Link to="/post/create" className="main-btn">Create Post +</Link>
            <a onClick={Logout} className="main-btn" href="http://localhost:3000">Logout <span>({userInfo.username})</span> </a>
            </>
        
        )

      }
        {!username && (
          <>
            <Link to="/login" className="main-btn">Login</Link>
            <Link to="/register" className="main-btn">Register</Link>
          </>
            )
          }
          </nav>
    
      </header>

    </>
  )
}

export default Header
