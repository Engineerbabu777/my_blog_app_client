import React,{useState,useEffect} from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {Navigate,Link,useParams} from 'react-router-dom';

const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean']
    ]
  }
  
  
  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image']

const EditPost = () => {
    const {id} = useParams();
    const [postData,setPostData] = useState(null);
  const [title, settitle] = useState("");
  const [summary, setsummary] = useState("");
  const [files, setfile] = useState("");
  const [detail, setdetail] = useState("");
  const [redirect, setredirect] = useState(false);
 useEffect(()=> {
  axios.get(`http://localhost:7544/post/${id}`)
  .then(({data})=>{
    settitle(data.blogs.title);
    setsummary(data.blogs.summary);
    setdetail(data.blogs.details);
    console.log(data);
  } )
 },[])

  const UpdateData = (ev) => {
    ev.preventDefault();
    const data = new FormData();
  if(files){
    data.set("file", files[0]);
   }
    data.set("summary", summary);
    data.set("title", title);
    data.set("detail", detail);
    axios.put( `http://localhost:7544/post/${id}`, data, { credentials: 'include' });
    setredirect(true);
  }

  if (redirect) {
    return <Navigate to="/" />
  }
  return (
    <div className='box-form-create'>

      <form className='create-form-blog'>
        <input type="text" placeholder="Title" value={title} onChange={e => settitle(e.target.value)} />
        <input type="text" placeholder="Summary" value={summary} onChange={e => setsummary(e.target.value)} />
        <input type="file" onChange={(e) => setfile(e.target.files)} />
        <ReactQuill className='quill-text-editor' value={detail} onChange={(val) => setdetail(val)} modules={modules} formats={formats} />
        <button className='btn-form' type='submit' onClick={UpdateData} >Let's Post it  ? 😀🥳😎</button>
      </form>

    </div>
  )
}

export default EditPost;