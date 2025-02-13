const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

app.post('/api/submit-form', (req, res) => {
    try {
        console.log('Form data received:', req.body);

        setTimeout(() => {
            res.json({
                success: true,
                message: 'Form submitted successfully',
                data: req.body
            });
        }, 1000);
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error processing form submission',
            error: error.message
        });
    }
});

app.get('/', (req, res) => {
    console.log("hiii");
    res.render("index", { title: 'My EJS App', user: 'Kamil' });
});

app.listen(3000);