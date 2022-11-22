require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require("crypto");
const User = require('../models/user')
const nodemailer = require('nodemailer');
//const  {v4: uuidv4} = require('uuid');
const sendEmail = require("../helper/email.js");
const Verify = require("../models/verify");
const Token = require("../models/forgot");