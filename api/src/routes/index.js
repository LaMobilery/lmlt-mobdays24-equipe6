const express = require('express');
const gardenRoute = require('./garden.router');
const aiRoute = require('./ai.router');
const weatherRoute = require('./weather.router');

const router = express.Router();

const defaultRoutes = [
    {
        path: '/garden',
        route: gardenRoute
    },
    {
        path: '/ai',
        route: aiRoute
    },
    {
        path: '/weather',
        route: weatherRoute
    }
]

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;