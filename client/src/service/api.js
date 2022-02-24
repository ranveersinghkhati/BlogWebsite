import axios from 'axios';

const URL = 'http://localhost:9000';

// here create function that call the api via axios

export const createPost = async (post) => {
    //post api call
    try {
        return await axios.post(`${URL}/create`, post);
    } catch (error) {
        console.log('Error while calling createPost API', error);
    }
}

export const getAllPosts = async (param) => {
    try {
        let response = await axios.get(`${URL}/posts/${param}`);
        return response.data;
    } catch (error) {
        console.log('Error while calling getAllPosts', error);
    }
}

export const getPost = async (id) => {
    try {
        let response = await axios.get(`${URL}/post/${id}`);
        return response.data;
    } catch (error) {
        console.log('Error while calling getPost', error);
    }
}

export const updatePost = async (id, post) => {
    try {
        await axios.post(`${URL}/update/${id}`, post);
    } catch (error) {
        console.log('Error while calling updatePost', error);
    }
}

export const deletePost = async (id) => {
    try {
        await axios.delete(`${URL}/delete/${id}`);
    } catch (error) {
        console.log('Error while calling deletePost', error);
    }
}

export const uploadFile = async (data) => {
    try {
        return await axios.post(`${URL}/file/upload`, data);

    } catch (error) {
        console.log('Error while calling uploadFile', error);
    }
}

export const newComment = async (data) => {
    try {
        return await axios.post(`${URL}/comment/new`, data);
        // returns a promise

    } catch (error) {
        console.log('Error while calling newComment API', error);
    }
}

export const getComments = async (id) => {
    try {
        let response = await axios.get(`${URL}/comments/${id}`);
        return response.data;
        // get api ka data response key andar aata hai response ek object hota uskey ander data field main data hota hai 

    } catch (error) {
        console.log('Error while calling getComments API', error);
    }
}
export const deleteComment = async (id) => {
    try {
        return await axios.delete(`${URL}/comment/delete/${id}`);

    } catch (error) {
        console.log('Error while calling deleteComment API', error);
    }
}