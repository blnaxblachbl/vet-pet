const { Stock } = require('./Stock/resolvers')
const { Adopt } = require('./Adopt/resolvers')
const { Branch } = require('./Branch/resolvers')
const { Ad } = require('./Ad/resolvers')
const { Pet } = require('./Pet/resolvers')
const { Order } = require('./Order/resolvers')
const { Cart } = require('./Cart/resolvers')
const { Good } = require('./Good/resolvers')
const { Schedule } = require('./Schedule/resolvers')
const { Organization } = require('./Organization/resolvers')
const { User } = require('./User/resolvers')
const { Admin } = require('./Admin/resolvers')
const { Upload } = require('./Upload/resolvers')
const resolvers = [
  Admin,
  User,
  Organization,
  Schedule,
  Good,
  Cart,
  Order,
  Pet,
  Ad,
  Upload,
  Branch,
  ,
  Adopt,
  ,
  Stock,
]

module.exports = { resolvers }
