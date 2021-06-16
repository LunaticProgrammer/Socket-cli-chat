module.exports = {
  apps : [{
    name: 'Server',
    script: 'server.js',
    watch: '/server.js',
    instances:1
  },
  {
    name: 'Client 1',
    script:'client.js varnit',
    instances:1
  }
],

  deploy : {
    production : {
      user : 'SSH_USERNAME',
      host : 'SSH_HOSTMACHINE',
      ref  : 'origin/master',
      repo : 'GIT_REPOSITORY',
      path : 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
