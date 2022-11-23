

const successMessage = (res, { message, code = 200, data= null}) => {
  return res.status(code).json({
    status: 'success',
    message,
    data
  });
};


const errorMessage = async (err, req, res, next) => {
  console.log(error);
  return res.status(500).json({ m: 'Something went wrong, please try again' });
};

module.exports = { successMessage, errorMessage };
