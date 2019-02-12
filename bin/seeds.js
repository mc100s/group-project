// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const ManagedBy = require("../models/ManagedBy");
const Holiday = require("../models/Holiday");

const bcryptSalt = 10;

mongoose
  .connect('mongodb://localhost/group-project', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

let users = [
  {
    name: "Super",
    username: "super",
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt)),
    email: 'super@gmail.com',
    role: 'ADMIN',
    linkedinUrl: 'https://www.linkedin.com/in/super/',
    githubUrl: 'https://github.com/super',
    holidayAllowance: 15,
    startDate: new Date(2019, 02, 11),
    jobTitle: 'super',
    holidayBooked: 1
  },
  {
    name: "Alec",
    username: "abudd1094",
    password: bcrypt.hashSync("password", bcrypt.genSaltSync(bcryptSalt)),
    email: 'abudd1094@gmail.com',
    role: 'ADMIN',
    linkedinUrl: 'https://www.linkedin.com/in/alecbudd/',
    githubUrl: 'https://github.com/abudd1094',
    holidayAllowance: 15,
    startDate: new Date(2019, 02, 11),
    jobTitle: 'boss',
    holidayBooked: 1
  },
  {
    name: "Jamie",
    username: "jamie",
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt)),
    email: 'jamie@gmail.com',
    role: 'ADMIN',
    linkedinUrl: 'https://www.linkedin.com/',
    githubUrl: 'https://github.com/',
    holidayAllowance: 15,
    startDate: new Date(2019, 02, 11),
    jobTitle: '?',
    holidayBooked: 1
  },
  {
    name: "test",
    username: "test",
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt)),
    email: 'test@gmail.com',
    role: 'EMPLOYEE',
    linkedinUrl: 'https://www.linkedin.com/',
    githubUrl: 'https://github.com/',
    holidayAllowance: 15,
    startDate: new Date(2019, 02, 11),
    jobTitle: 'testjob',
    holidayBooked: 1
  },
  {
    name: "Sinan",
    username: "snntylan",
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt)),
    email: 'sinan.tylan@gmail.com',
    role: 'ADMIN',
    linkedinUrl: 'https://www.linkedin.com/in/sinantaylan/',
    githubUrl: 'https://github.com/abudd1094',
    holidayAllowance: 15,
    startDate: new Date(2019, 02, 11),
    jobTitle: 'boss',
    holidayBooked: 1
  } 
]

Promise.all([
  Holiday.deleteMany(),
  User.deleteMany(),
  ManagedBy.deleteMany()
])
.then(() => {
  return User.create(users)
})
.then(usersCreated => {
  console.log(`Users created: ${usersCreated}`);
  const superUser = usersCreated[0]._id;
  const managerRelationships = usersCreated.map((u) => ({_userId: u._id, _manager: superUser}) );
  return ManagedBy.create(managerRelationships);
})
.then(() => {
  // Close properly the connection to Mongoose
  mongoose.disconnect()
})
.catch(err => {
  mongoose.disconnect()
  throw err
})