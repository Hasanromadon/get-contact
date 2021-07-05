const express = require('express');
const app = express();
const auth = require('./routers/auth');
const users = require('./routers/users');
const contacts = require('./routers/contacts');

app.use('/api/auth', auth);
app.use('/api/users', users);
app.use('/api/contacts', contacts);

const PORT = process.env.PORT || '5000';

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
