module.exports = {
    development: {
        port: process.env.PORT || 3000,
        dbPath: 'mongodb://admin:db123456@ds127545.mlab.com:27545/test-1'
        //TODO: Test with local database
    },
    production: {}
};