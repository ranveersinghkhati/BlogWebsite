import { Box, makeStyles, FormControl, InputBase, Button, TextareaAutosize } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
//component
import { createPost, uploadFile } from '../../service/api';
const useStyle = makeStyles((theme) => ({
    container: {
        padding: "0 100px",
        [theme.breakpoints.down('md')]: {
            padding: 0
        }
    },
    img: {
        width: "100%",
        height: "50vh",
        objectFit: "cover"
    },
    form: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 10
    },
    textField: {
        flex: 1,
        margin: '0 30px',
        fontSize: 25
    },
    textarea: {
        width: '100%',
        marginTop: 50,
        border: 'none',
        '&:focus-visible': {
            outline: 'none'
        }
    }
}))

const initialValues = {
    title: '',
    description: '',
    picture: '',
    username: 'Uzumaki_Naruto',
    categories: 'All',
    createdDate: new Date(),

};
const CreateView = () => {
    const [post, setPost] = useState(initialValues);
    const [file, setFile] = useState('');
    const [image, setImage] = useState('');

    useEffect(() => {
        //get request
        const getImage = async () => {
            // console.log(file);
            if (file) {
                // useeffect yeh firsttime bhi call hota hai tab yeh componentdidmount key equaul hotah ai
                // but i have to call it on componenet did update
                const data = new FormData();
                data.append("name", file.name);
                data.append("file", file);

                const image = await uploadFile(data);
                post.picture = image.data;
                setImage(image.data);
            }
        }
        getImage();
    }, [file]);

    const navigate = useHistory();
    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    }

    const savePost = async () => {
        await createPost(post);
        navigate.push('/');
    }

    const classes = useStyle();
    // const url = post.picture || 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';
    // or    
    const url = post.picture ? post.picture : 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';
    return (
        <Box className={classes.container}>
            <img src={url} alt='banner-img' className={classes.img}></img>
            <FormControl className={classes.form}>
                <label htmlFor='fileInput'>
                    <AddCircleIcon fontSize='large' color='action' />
                </label>
                <input
                    type='file'
                    id='fileInput'
                    style={{ display: 'none' }}
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <InputBase
                    placeholder='Title'
                    onChange={(e) => handleChange(e)}
                    className={classes.textField}
                    name='title' >
                </InputBase>
                <Button variant='contained' color='primary' onClick={() => savePost()} >Publish</Button>
                {/* <Link to={'/'}><Button variant='contained' color='primary' onClick={() => savePost()} >Publish</Button></Link> */}
            </FormControl>
            <TextareaAutosize
                minRows={5}
                placeholder='Tell your story..................'
                className={classes.textarea}
                onChange={(e) => handleChange(e)}
                name='description'
            />
        </Box >
    )
}
export default CreateView;