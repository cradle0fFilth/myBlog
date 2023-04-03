import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatISO9075 } from 'date-fns';


export default function PostPage() {
    const [postInfo, setPostInfo] = useState()
    const { id } = useParams();
    useEffect(() => {
        fetch(`http://127.0.0.1:4000/post/${id}`)
            .then(response => response.json()).
             then(postInfo => setPostInfo(postInfo))
    }, []);

    if (!postInfo) {
        return null;
    }

    return (
        <div className="post-page">
            <div className="image">
                <img src={`https://127.0.0.1:4000/${(postInfo).cover}`} alt="" />
            </div>
            <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
            <div className="author">by @{postInfo.author.username}</div> 
            <h1>{postInfo.title}</h1> 
            <div className="content" dangerouslySetInnerHTML={{ __html: postInfo.content }} />
        </div>
    );
}
