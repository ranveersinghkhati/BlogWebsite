import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';

const storage = new GridFsStorage({
    url: 'mongodb://Uzumaki_Naruto:Uzumaki_Naruto1234@blog-shard-00-00.dtndh.mongodb.net:27017,blog-shard-00-01.dtndh.mongodb.net:27017,blog-shard-00-02.dtndh.mongodb.net:27017/BLOG?ssl=true&replicaSet=atlas-44p62i-shard-0&authSource=admin&retryWrites=true&w=majority',
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (request, file) => {
        const match = ["image/png", "image/jpg", "image/jpeg"];
        if (match.indexOf(file.memeType) === -1)
            return `${Date.now()}-blog-${file.originalname}`;
        return {
            bucketname: 'photos',
            filename: `${Date.now()}-blog-${file.originalname}`
        }
    }
});
export default multer({ storage });