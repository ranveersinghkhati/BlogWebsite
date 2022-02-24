import { Box, Typography, makeStyles } from '@material-ui/core';
const useStyle = makeStyles({
    container: {
        height: 350,
        margin: 10,
        borderRadius: 10,
        border: '1px solid #d3cede',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        // width: '20%'
        '& > *': {
            padding: '0 5px 5px 5px'
        }

    },
    img: {
        height: 150,
        width: '100%',
        objectFit: 'cover',
        borderRadius: '10px 10px 0 0'
        //            top-left t-r bottom-left b-r
    },
    text: {
        color: '#878787',
        fontSize: 12  // default 16
    },
    heading: {
        fontSize: 18,
        fontWeight: 600,
        textAlign: 'center'
    },
    detail: {
        fontSize: 14,
        wordBreak: 'break-word'
    }
});
const Post = ({ post }) => {
    const classes = useStyle();
    const url = post.picture || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80';

    const addElipsis = (str, limit) => {
        return str.length > limit ? str.substring(0, limit) + ' ...' : str;
    }

    return (
        <Box className={classes.container}>
            <img src={url} alt="wrapper" className={classes.img} />
            <Typography className={classes.text}>{post.categories}</Typography>
            <Typography className={classes.heading}>{addElipsis(post.title, 30)}</Typography>
            <Typography className={classes.text}>{post.username}</Typography>
            <Typography className={classes.detail}>{addElipsis(post.description, 100)}</Typography>
        </Box>
    )
}
export default Post;