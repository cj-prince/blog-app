const Blog = require('../models/blog');
const cloudinary = require('../config/cloudinary.js');
const { successMessage, errorMessage } = require('../helpers/response');

const postBlog = async (req, res) => {
  let { title, description, content,image} = req.body;
   console.log('body>>', req.body);
//   let {image} = req.files
   const file = req.files.image;
   console.log(file)
  try {
   const cloudImage = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: 'enyata',
      resource_type: "auto",
   });
   image = cloudImage.secure_url;
   
    const savePost = await new Blog(title, description, content, image);
    const savedPost = await savePost.save();
    return successMessage({
      status: 200,
      message: 'Blog Created',
      data: savedPost,
    });
  } catch (error) {
    next({ status: 500, message: '' });
  }
};

const editPost = async (req, res) => {
  let { id } = req.params;
  let { title, description, content, image } = req.body;
  try {
    const post = await Blog.findById(id);
    if (post._id === id) {
      await Blog.updateOne({ title, description, content, image });
      return successMessage({
        status: 200,
        message: 'Post updated',
        data: post,
      });
    }
  } catch (error) {
    next({ status: 500, message: '' });
  }
};

const deletePost = async (req, res) => {
  let { id } = req.params;
  try {
    const post = await Blog.findById(id);
    if (post._id === id) {
      await Blog.delete();
    }
  } catch (error) {
   next({ status: 500, message: '' });
  }
};

const getAll = async (req, res) => {
  try {
    const post = await Blog.find();
    return successMessage({
      status: 200,
      data: post,
    });
  } catch (error) {
    next({ status: 500, message: '' });
  }
};

const getOnePost = async (req, res) => {
  let { id } = req.params;
  try {
    const post = await Blog.findById(id);
    successMessage({data:post});
  } catch (error) {
    next({ status: 500, message: '' });
  }
};

module.exports = {
  postBlog,
  editPost,
  deletePost,
  getAll,
  getOnePost,
};
