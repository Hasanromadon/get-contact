const express = require('express');
const app = express();
const connectDB = require('./config/db');
const auth = require('./routers/auth');
const users = require('./routers/users');
const contacts = require('./routers/contacts');

connectDB();
//body parser
app.use(express.json({ extended: false }));

//parent route
app.use('/api/auth', auth);
app.use('/api/users', users);
app.use('/api/contacts', contacts);

const PORT = process.env.PORT || '5000';

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
