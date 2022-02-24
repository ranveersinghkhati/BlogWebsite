import { Box, makeStyles, Typography } from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';
import { Link, useHistory } from 'react-router-dom'
import { useState } from 'react';
import { useEffect, useContext } from 'react';
import { getPost, deletePost } from '../../service/api.js';
//components
import Comments from '../comments/comments';

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
    icons: {
        float: 'right'
    },
    icon: {
        margin: 5,
        padding: 5,
        border: '1px solid #878787',
        borderRadius: 10,
    },
    heading: {
        fontSize: 38,
        fontWeight: 600,
        textAlign: 'center',
        margin: '50px 0 10px 0'
    },
    subheading: {
        color: '#878787',
        display: 'flex',
        justifyContent: 'space-between',
        margin: '20px 0',
        [theme.breakpoints.down('sm')]: {
            display: 'block' // display by-default bloack hota hai mean ek key neechey ek 
        }
    },
    link: {
        textDecoration: 'none',
        color: 'inherit'
    }
}));
const DetailView = ({ match }) => {
    const classes = useStyle();
    const url = 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80'

    const [post, setPost] = useState({});
    // const { id } = useParams();
    const navigate = useHistory();
    useEffect(() => {
        const fetchData = async () => {
            //api call
            let data = await getPost(match.params.id);
            console.log(data);
            setPost(data);
        }
        fetchData();
    }, []);
    const deleteBlog = async () => {
        await deletePost(post._id);
        navigate.push('/');
    }
    return (
        <Box className={classes.container}>
            <img src={post.picture || url} alt="banner-img" className={classes.img}></img>
            <Box className={classes.icons}>
                <Link to={`/update/${post._id}`}><Edit className={classes.icon} color="primary" /></Link>
                <Delete onClick={() => deleteBlog()} className={classes.icon} color="error" />
            </Box>
            <Typography className={classes.heading}>{post.title}</Typography>
            <Box className={classes.subheading}>
                <Link to={`/?username=${post.username}`} className={classes.link}>
                    <Typography>Author:<span style={{ fontWeight: 600 }}>{post.username}</span></Typography>
                </Link>
                <Typography>{new Date(post.createdDate).toDateString()}</Typography>
            </Box>
            <Typography>{post.description}</Typography>
            <Comments post={post} />
            {/* passing post as a prop */}
        </Box>
    )
}

export default DetailView;