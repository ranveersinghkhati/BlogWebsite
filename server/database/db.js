import mongoose from 'mongoose';

const Connection = async () => {
    try {
        const URL = 'mongodb://Uzumaki_Naruto:Uzumaki_Naruto1234@blog-shard-00-00.dtndh.mongodb.net:27017,blog-shard-00-01.dtndh.mongodb.net:27017,blog-shard-00-02.dtndh.mongodb.net:27017/BLOG?ssl=true&replicaSet=atlas-44p62i-shard-0&authSource=admin&retryWrites=true&w=majority';
        await mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Database connected successfully');
    } catch (error) {
        console.log(`connection with mongodb failed .Error ${error}`);
    }
}

export default Connection;