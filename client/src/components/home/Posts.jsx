import { useState, useEffect } from 'react';
import { Grid, Box } from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';

import { getAllPosts } from '../../service/api.js';

import Post from './Post.jsx'

const Posts = () => {
    //storing data from db 
    const [posts, setPosts] = useState([]);
    // let posts = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    // i want home page hotey hi api call ho to get data from db
    const { search } = useLocation();
    useEffect(() => {
        const fetchData = async () => {
            let data = await getAllPosts(search);
            console.log(data);
            setPosts(data);
        }
        fetchData();
    }, [search]);
    return (
        <>
            {
                posts.length ? posts.map(post => (
                    <Grid item lg={3} sm={4} xs={12}>
                        <Link to={`/details/${post._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Post post={post} />
                        </Link>
                    </Grid>
                )) : <Box style={{ color: '878787', margin: '30px 80px', fontSize: 18 }}>
                    No data is available for selected category
                </Box>
            }
        </>
    )
}

export default Posts;