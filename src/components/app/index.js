import appDev from './app.dev'
import appProd from './app.prod'

if (process.env.NODE_ENV === 'production') {
  module.exports = appProd
} else {
  module.exports = appDev
}
