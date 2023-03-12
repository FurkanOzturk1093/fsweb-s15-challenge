const db = require("../../data/dbConfig");

async function getById(id) {
  const user = await db("users").where("id", id).first();
  return user;
}

async function create(user) {
  const createdUserId = await db("users").insert(user);
  const createdUser = await getById(createdUserId);
  return createdUser;
}
async function getByFilter(filter) {
  let filteredUser = await db("users").where(filter).first();
  return filteredUser;
}
module.exports = {
  getById,
  create,
  getByFilter,
};
