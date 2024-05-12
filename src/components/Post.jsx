import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import {formatISO9075} from 'date-fns';
const Post = () => {
    const [posts, setposts] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:7544/posts')
            .then(({ data }) => {
                setposts(data.blogs);
            })
            .catch((err) => console.log(err));
    }, []);
    if (!posts) return '';

    return (
        <>
            {
                posts?.length > 0 && posts.map((post, ind) => (
                    <div className="index-box" key={ind}>
                        <Link to={`/post/${post._id}`} className='img-box'>
                            <img src={`http://localhost:7544/${post?.file}`} alt="img" />
                        </Link>
                        <div className="info-box">
                            <h2 className="index-heading">{post.title}</h2>
                            <div className="author-box">
                                <p>@{post.ownerId.username}</p>
                                <span>{formatISO9075(new Date(post.createdAt))}</span>
                            </div>
                            <summary className="summary">{post.summary}</summary>
                        </div>
                    </div>
                ))
            }
        </>


    )
}
export default Post
