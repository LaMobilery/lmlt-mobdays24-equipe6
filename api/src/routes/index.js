const express = require('express');
const gardenRoute = require('./garden.router');
const aiRoute = require('./ai.router');
const weatherRoute = require('./weather.router');
const planningRoute = require('./planning.router');
const actionRoute = require('./action.router');

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
    },
    {
        path: '/planning',
        route: planningRoute
    },
    {
        path: '/action',
        route: actionRoute
    }
]

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;