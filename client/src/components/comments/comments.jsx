import { useState, useEffect } from "react";
import { Box, TextareaAutosize, Button, makeStyles } from "@material-ui/core";
import { getComments, newComment } from "../../service/api";

//components
import Comment from "./Comment.jsx";

const useStyle = makeStyles({
    component: {
        marginTop: 100,
        display: 'flex'
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: '50%'
    },
    textArea: {
        width: '100%',
        margin: '0 20px'
    },
    button: {
        height: 40
    }
})

const initialValues = {
    name: '',
    postId: '',
    date: new Date(),
    comments: ''
}

const Comments = ({ post }) => {
    const classes = useStyle();
    const [comment, setComment] = useState(initialValues);

    const [comments, setComments] = useState([]);
    const [toggle, setToggle] = useState(false);
    useEffect(() => {
        const getData = async () => {
            let response = await getComments(post._id);
            setComments(response);
        }
        getData();
    }, [post, toggle])

    const handleChange = (e) => {
        setComment({
            ...comment,
            name: post.username,
            postId: post._id,
            comments: e.target.value

        });
    }

    const postComment = async () => {
        await newComment(comment);
        setToggle(prev => !prev)
    }
    const url = 'https://static.thenounproject.com/png/12017-200.png';
    return (
        <Box>
            <Box className={classes.component}>
                <img src={url} alt='dp' className={classes.image} />
                <TextareaAutosize
                    className={classes.textArea}
                    rowsMin={5}
                    onChange={(e) => handleChange(e)}

                />
                <Button
                    variant='contained'
                    color='primary'
                    size='medium'
                    className={classes.button}
                    onClick={() => postComment()}

                >Post</Button>
            </Box>
            {
                //{}=> because this is javascript expression
                comments && comments.map(comment => (
                    <Comment comment={comment} setToggle={setToggle} />
                ))
            }
        </Box >
    )
}

export default Comments;