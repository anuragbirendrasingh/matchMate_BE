const express = require('express');
const authRoutes = require('./authroutes');
const profileRoutes = require('./profile');
const requestRouter = require('./request');


const router = express.Router();

router.use('/auth',authRoutes);
router.use('/profile',profileRoutes);
router.use('/request',requestRouter);

module.exports = router ;