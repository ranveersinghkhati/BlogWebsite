import Post from "../schema/post-schema.js";

// controller is nothing but business logic

export const createPost = async (request, response) => {
    console.log(request.body);
    try {
        // frontend sey jo data aya hau usey pheley validate karna pdhega
        const post = await new Post(request.body);
        await post.save();

        response.status(200).json('blog saved successfully');
    } catch (error) {
        response.status(500).json(error);
    }
}
//  request is from user
export const getAllPosts = async (request, response) => {
    let username = request.query.username;
    let category = request.query.category;
    console.log(request.body);
    let posts;
    try {
        if (username)
            posts = await Post.find({ username: username });
        else if (category)
            posts = Post.find({ categories: category });
        else
            posts = await Post.find({});
        response.status(200).json(posts);

    } catch (error) {
        response.status(500).json(error);
    }
}

export const getPost = async (request, response) => {
    try {
        let post = await Post.findById(request.params.id);
        response.status(200).json(post);
    } catch (error) {
        response.status(500).json(error);
    }
}

export const updatePost = async (request, response) => {
    try {
        await Post.findByIdAndUpdate(request.params.id, { $set: request.body }); //$set $push $addToSet
        response.status(200).response('Blog updated successfully');
    } catch (error) {
        response.status(500).json(error);
    }
}

export const deletePost = async (request, response) => {
    try {
        let post = await Post.findByIdAndUpdate(request.params.id);
        await post.delete();
        response.status(200).response('Blog updated successfully');
    } catch (error) {
        response.status(500).json(error);
    }
}