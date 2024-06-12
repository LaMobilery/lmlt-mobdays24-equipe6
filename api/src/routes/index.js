const express = require('express');
const gardenRoute = require('./garden.router');

const router = express.Router();

const defaultRoutes = [
    {
        path: '/garden',
        route: gardenRoute
    }
]

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;