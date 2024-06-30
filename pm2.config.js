module.exports = {
    apps: [{
    name: 'RECEIPT',
    script: 'NODE_ENV=production ./bin/www',
    instances: 2,
    exec_mode: 'cluster',
    output: '/app/logs/pm2/receipt/out.log',
    error: '/app/logs/pm2/receipt/error.log'
    }]
}