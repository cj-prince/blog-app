const Blog = require('../models/blog');
const cloudinary = require('../config/cloudinary.js');
// const redis = require('../config/redis');
const redis = require('redis');
const client = redis.createClient(6379);
const { successMessage, errorMessage } = require('../helpers/response');
const Queue = require('../helpers/queue');
const rabbitmq = new Queue();
client.connect();

const getAll = async (req, res, next) => {
  try {
    const post = await Blog.find();
     client.set(post, 3600);
     client.get(post);
    return successMessage(res, {
      status: 200,
      data: post,
    });
  } catch (error) {
    console.log(error)
    return res.json({ status: 500, message: error });
  }
};

const postBlog = async (req, res, next) => {
  let { title, description, content} = req.body;
   console.log('body>>', req.body);
  let {image} = req.files
   const file = req.files.image;
   console.log(file)
  try {
   const cloudImage = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: 'enyata',
      resource_type: "auto",
   });
   image = cloudImage.secure_url;
   
    const savePost = await  Blog.create({title, description, content,image});
    rabbitmq.consumeMessages();
    rabbitmq.publishMessage('product created');
    const savedPost = await savePost.save();
    return successMessage(res, {
      status: 200,
      message: 'Blog Created',
      data: savedPost,
    });
  } catch (error) {
    console.log(error)
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
