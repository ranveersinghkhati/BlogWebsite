import { Typography, Box, makeStyles } from "@material-ui/core";
// Typography is <p>  BOx is <div>
import { Delete } from '@material-ui/icons';
import { deleteComment } from "../../service/api.js";

const useStyles = makeStyles({
    component: {
        marginTop: 30,
        background: '#f5f5f5',
        padding: 10
    },
    container: {
        display: 'flex',
        // justifyContent: 'space-between',
        marginBottom: 5
    },
    name: {
        fontSize: 18,
        fontWeight: 600,
        marginRight: 30
    },
    date: {
        color: '#878787'
    },
    delete: {
        marginLeft: 'auto',
        cursor: 'pointer'
    }
})
const Comment = ({ comment, setToggle }) => {
    const classes = useStyles();
    const removeComment = async () => {
        await deleteComment(comment._id);
        setToggle(prev => !prev)
    }
    return (
        <Box className={classes.component}>
            <Box className={classes.container}>
                <Typography className={classes.name}>{comment.name}</Typography>
                <Typography className={classes.date}>{new Date(comment.date).toDateString()}</Typography>
                <Delete onClick={() => removeComment()} className={classes.delete} />
            </Box>
            <Typography>{comment.comments}</Typography>
        </Box>
    )
}
export default Comment;