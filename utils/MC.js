const Rcon = require('rcon')
const mc = Rcon('localhost', '19132', 'JSoXoPQIUrQ=')

module.exports = {
  connect() {
    mc.on('auth', () => {
      console.log('Minecraft RCON is connected!')
      
    })
    .on('response', (str) => {
      console.log('response:', str)
    })
    .on('error', (err) => {
      console.log(err)
    })
    
    mc.connect()
  },
  getRCON() {
    return mc
  }
};