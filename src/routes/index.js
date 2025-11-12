const express = require('express');
const authRoutes = require('./authroutes');
const profileRoutes = require('./profile');
const requestRouter = require('./request');
const userRouter = require('./user');


const router = express.Router();

router.use('/auth',authRoutes);
router.use('/profile',profileRoutes);
router.use('/request',requestRouter);
router.use('/user',userRouter);

module.exports = router ;