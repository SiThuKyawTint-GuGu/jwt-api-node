require("dotenv").config();
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());


const users = [
    {
        id: 1,
        username: 'gugu',
        password: 'guguskyler007',
    },
];

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        const token = jwt.sign({ id: user.id, username: user.username }, process.env.SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

app.get('/is-auth', (req, res) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({message:"No Token Provide!"})
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({message:"Token Invalid!"})
        }
        res.json({message:"This is a auth route",user:decoded})
    })
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
