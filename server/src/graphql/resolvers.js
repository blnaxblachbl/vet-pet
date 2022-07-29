const { Ad } = require('./Ad/resolvers')
const { Pet } = require('./Pet/resolvers')
const { Order } = require('./Order/resolvers')
const { Cart } = require('./Cart/resolvers')
const { Stock } = require('./Stock/resolvers')
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
  Stock,
  Cart,
  Order,
  Pet,
  Ad,
  Upload,
]

module.exports = { resolvers }
