const { Ad } = require('./Ad/typeDefs')
const { Pet } = require('./Pet/typeDefs')
const { Order } = require('./Order/typeDefs')
const { Cart } = require('./Cart/typeDefs')
const { Stock } = require('./Stock/typeDefs')
const { Good } = require('./Good/typeDefs')
const { Schedule } = require('./Schedule/typeDefs')
const { Organization } = require('./Organization/typeDefs')
const { User } = require('./User/typeDefs')
const { Admin } = require('./Admin/typeDefs')
const { Upload } = require('./Upload/typeDefs')
const { mergeTypeDefs } = require('@graphql-tools/merge')
const { sdlInputs } = require('@paljs/plugins')

const typeDefs = mergeTypeDefs([
  sdlInputs(),
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
])

module.exports = { typeDefs }
