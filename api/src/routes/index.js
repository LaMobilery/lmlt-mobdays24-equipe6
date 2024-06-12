const express = require('express');
const gardenRoute = require('./garden.router');
const aiRoute = require('./ai.router')

const router = express.Router();

const defaultRoutes = [
    {
        path: '/garden',
        route: gardenRoute
    },
    {
        path: '/ai',
        route: aiRoute
    }
]

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;