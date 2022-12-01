const userSeeder = {
  signUp: {
    name: 'zeno123',
    email: 'zeno123@gmail.com',
    password: 'password',
  },
  existingUsername: {
    name: 'zeno123',
    email: 'zeno123@gmail.com',
    password: 'password',
  },
  existingEmail: {
    name: 'zeno123',
    email: 'zeno123@gmail.com',
    password: 'password',
  },
  login: {
    email: 'zeno123@gmail.com',
    password: 'password',
  },
  invalidLoginDetails: {
    email: 'zeno123gmail.com',
    password: 'password',
  },
  missingPassword: {
    email: 'zeno123@gmail.com',
  },
  validRegisterDetails: {
    name: 'zeno123',
    email: 'zeno123@gmail.com',
    password: 'password',
  },
};

module.exports = userSeeder;
