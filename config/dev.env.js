module.exports = {
    port: 3003,
    hostName: 'localhost',
    proxy:[
        ['/portal-api', 'http://192.168.3.116:56001', ''],
        ['/portal-user', 'http://192.168.3.116:56002', '']
    ]
};