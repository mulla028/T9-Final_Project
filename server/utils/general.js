const CALLBACK_URL = process.env.CALLBACK_URL || 'http://localhost:8080/api';
const REDIRECT_URL = process.env.REDIRECT_URL || 'http://localhost:3000';

module.exports = { CALLBACK_URL, REDIRECT_URL };