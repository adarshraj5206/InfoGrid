const express = require('express'); 
const app = express();
const path = require('path');
const userModel = require('./models/user');


app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/read', async (req, res) => {
        const users = await userModel.find({});
        res.render('read', { users });
});

app.post('/create', async (req, res) => {
    const { name, email, image } = req.body;

   let createdUser = await userModel.create({
        name,
        email,
        image
    });

    res.redirect('/read');
});

app.get('/edit/:id', async (req, res) => {
    const user = await userModel.findOne({ _id: req.params.id });
    if (!user) {
        return res.status(404).send('User not found');
    }
    res.render('edit', { user });
});

app.post('/update/:id', async (req, res) => {
    const { name, email, image } = req.body;
    let updatedUser = await userModel.findOneAndUpdate({ _id: req.params.id }, { name,email, image }, { new: true });
    res.redirect("/read");

});

app.get('/delete/:id', async (req, res) => {
    try {
        await userModel.findByIdAndDelete(req.params.id);
        res.redirect('/read');
    } catch (err) {
        console.error(err);
        return res.status(500).send('Error deleting user');
    }
});



app.listen(3000);