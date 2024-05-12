import React,{useEffect,useState,useContext} from 'react'
import {useParams,Link,Navigate} from 'react-router-dom';
import axios from 'axios';
import {formatISO9075} from 'date-fns';
import UserContext from '../UserContext'
const ViewPost = () => {
  const {userInfo} = useContext(UserContext);
  const {id} = useParams();
  const [singlepost, setsinglepost] = useState(null);
  const [time,settime] = useState("");
  const [owner,setowner] = useState("");
  const [redirect,setredirect] = useState(false);
  
const Callback = () =>  {
    const {userInfo} = useContext(UserContext);
  }
  useEffect(() => {
      axios.get(`http://localhost:7544/post/${id}`)
          .then(({ data }) => {
              setsinglepost(data.blogs);
              settime(formatISO9075(new Date(data.blogs.createdAt)));
              setowner(data.blogs.ownerId.username);
              // console.log(data.blogs.detail)
              // console.log(data.blogs);
              // Callback();
          })
          .catch((err) => console.log(err));
  }, [id]);

  const deletePost = () => {
    axios.delete( `http://localhost:7544/delete/${id}`)
    setredirect(true);
  }
  if(redirect){
    return <Navigate to="/" />
  }
  
  if(!singlepost) return '';

  return (
    <>
    <div className="viewpost">
      <h2 className="viewpost-heading">{singlepost.title}</h2>
      <time className="viewpost-time">{time}</time>
      <span className="viewpost-owner">by @{owner}</span>
{ 

 (userInfo?.username === owner) && (
    <div className="edit-row">
    <Link className="edit-btn" to={`/post/edit/${id}`}>
      <span>Edit Post</span>
    </Link>
    <Link className="edit-btn-red" onClick={deletePost}>
      <span>Delete Post</span>
    </Link>
    </div>
  )

}

      <div className="viewpost-img-box"><img className="viewpost-img" src={`http://localhost:7544/${singlepost?.file}`} alt="img"/></div>
      <div className="viewpost-details" dangerouslySetInnerHTML={{ __html: singlepost?.details }} />
    </div>
    </>
  )
}

export default ViewPost
