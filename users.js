const users = [];

const addUser = ({ id, name, room, pass }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingUser = users.find((user) => user.room === room && user.name === name);

  if(!pass || !room ) return { error: 'Room name & password required.' };
  if(existingUser) return { error: 'Username taken.' };

  const user = { id, name, room, pass };
  var temp = getUsersInRoom(room);
  if(temp.length) {
    if(temp[0].pass !== pass) return{error: 'Wrong passowrd'};
  }
 

  users.push(user);

  return { user };
}

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if(index !== -1) return users.splice(index, 1)[0];
}

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };