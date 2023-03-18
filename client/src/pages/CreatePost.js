import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
import { Navigate } from 'react-router-dom';

const modules = {
    toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image'],
        ['clean']
    ],
}

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
]


export default function CreatePost() {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState('');
    const [redirect,setRedirect] = useState(false);

    async function createNewPost(ev) {
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('file',file[0]);
       // console.log(files);
        ev.preventDefault();
        const response = await fetch('http://localhost:4000/post', {
            method: 'POST',
            body: data,
            credentials: 'include',
        })
        if(response.ok){
            setRedirect(true);
        }
    }

    if(redirect){
        return <Navigate to ="/"/>
    }

    return (
        <form onSubmit={createNewPost}>
            <input type="title"
                placeholder="title"
                value={title}
                onChange={ev => setTitle(ev.target.value)} />
            <input type="summary"
                placeholder="summary"
                value={summary}
                onChange={ev => setSummary(ev.target.value)} />
            <input type="file"
                onChange={ev => setFile(ev.target.files)} />
            <ReactQuill value={content}
                onChange={newValue => setContent(newValue)}
                modules={modules}
                formats={formats} />
            <button style={{ marginTop: '5px' }}>Create post</button>
        </form>
    )
}