module.exports = {
    apps: [
        {
            name: 'rig-wizard-api',
            script: 'bin/www',
            instances: 1,
            autorestart: true,
            watch: true,
            cron_restart: '0 */6 * * *',
            env: {
                NODE_ENV: 'production',
            },
        },
    ],
};
