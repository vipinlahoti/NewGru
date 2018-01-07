module.exports = {
  servers: {
    one: {
      host: '139.59.29.29',
      username: 'root',
      // pem:
      password: 'minniel@h0t!'
      // or leave blank for authenticate from ssh-agent
    }
  },

  "setupMongo": false,

  meteor: {
    name: 'Grudr',
    path: '../.',
    servers: {
      one: {}
    },
    buildOptions: {
      serverOnly: true,
      debug: false,
      cleanAfterBuild: true, // default
      server: 'https://www.grudr.com',
    },
    env: {
      ROOT_URL: 'https://www.grudr.com',
      MONGO_URL: 'mongodb://10.139.32.222:27017/Grudr'
    },
    ssl: {
      // Enables let's encrypt (optional)
      // "pem": "./ssl.pem"
      autogenerate: {
        email: 'vipi.nsl2787@gmail.com',
        domains: 'grudr.com,www.grudr.com' // comma seperated list of domains
      }
    },
    dockerImage: 'abernix/meteord:base',
    deployCheckWaitTime: 120,
    enableUploadProgressBar: true
  },

  mongo: {
    oplog: true,
    port: 27017,
    servers: {
      one: {
        host: '10.139.32.222',
        username: 'vipinlahoti',
        // pem:
        password: 'minnieV!p!n'
      },
    },
  },
  
};
