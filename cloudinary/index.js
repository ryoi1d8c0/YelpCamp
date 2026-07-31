const cloudinary = require('cloudinary');
const { Readable } = require('stream');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

const uploadImage = (buffer, options = {}) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            (result) => {
                if (result.error) return reject(result.error);
                resolve(result);
            },
            { folder: 'YelpCamp', allowed_formats: ['jpeg', 'jpg', 'png'], ...options },
        );
        Readable.from(buffer).pipe(uploadStream);
    });
};

module.exports = {
    cloudinary,
    uploadImage,
};
