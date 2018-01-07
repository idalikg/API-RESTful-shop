const config = require('./config');

const app = require('./app');

app.listen(config.port, () => {
    console.log(`${app.get('nameAPI')} running on port ${config.port}`);
})
