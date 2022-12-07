const userModel = require("../models/userModel").userModel;

const getUserByEmailIdAndPassword = (email, password) => {
  let user = userModel.findOne(email);
  if (user) {
    if (isUserValid(user, password)) {
      return user;
    }
  }
  return null;
};
const getUserById = (id) => {
  let user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};

const getUserByGithubId = (githubId) => {
    let user = userModel.findByGithubId(githubId);
    if (user) {
        return user;
    }
    return null;
};

const createUserByGithubId = (githubId) => {
    let user = userModel.createUserByGithubId(githubId);
    if (user) {
        return user;
    }
    return null;
};



function isUserValid(user, password) {
  return user.password === password;
}

module.exports = {
    getUserByEmailIdAndPassword,
    getUserById,
    getUserByGithubId,
    createUserByGithubId
};
