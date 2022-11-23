const express = require('express')
const app = express();
const dotenv = require('dotenv')
const blog = require('./src/routes/blog_routes.js')
const user = require('./src/routes/user_routes.js')
const connectDB = require('./src/config/connext.js');
const fileupload = require('express-fileupload');
const errorHandler = require('./src/middleware/errorHandler')
const logger = require('./src/config/logger/index')

app.use(fileupload({ useTempFiles: true }));

dotenv.config()
port = process.env.PORT

connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use((req, res, next) => {
  logger.info(req.body);
  let oldSend = res.send;
  res.send = function (data) {
    logger.info(JSON.parse(data));
    oldSend.apply(res, arguments);
  };
  next();
});

app.use(blog)
app.use(user)
app.use(errorHandler)




app.listen(port, () => logger.http(`app is running on port ${port}`)) 