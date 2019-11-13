const path = require('path');
module.exports = {
    entry: {
        stats: './src/app/stats.js',
        levels: './src/app/levels.js',
        variables: './src/app/variables.js',
        objects: './src/app/objects.js',
        main: './src/app/main.js',
        multiplayer: './src/app/multiplayer.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    }
}