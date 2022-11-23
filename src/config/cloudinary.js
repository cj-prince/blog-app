const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
dotenv.config();

// console.log(
//   process.env.CLOUDINARY_API_KEY
// );
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

module.exports = cloudinary;

// exports.uploads = (file, folder) => new Promise((resolve) => {
//   cloudinary.uploader.upload(
//     file,
//     (result) => {
//       resolve({
//         imageUrl: result.url,
//         imageId: result.public_id,
//       });
//     },
//     {
//       resource_type: 'auto',
//       folder,
//     }
//   );
// });
