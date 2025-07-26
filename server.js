const express = require('express');
const path = require('path');
const multer = require('multer');
const mongoose = require('mongoose');
const pdfParse = require('pdf-parse');
const fs = require('fs');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

// Redirect root URL to home page
app.get('/', (req, res) => {
  res.redirect('/home');
});

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/home.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/login.html'));
});

app.get('/shop1', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/shop1.html'));
});

app.get('/shop2', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/shop2.html'));
});

app.get('/shop3', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/shop3.html'));
});

app.get('/shop3b', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/shop3b.html'));
});

app.get('/shop4', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/shop4.html'));
});

app.get('/shop5', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/shop5.html'));
});

app.get('/shop6', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/shop6.html'));
});

app.get('/shop7', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/shop7.html'));
});

app.get('/shop8', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/shop8.html'));
});

app.get('/shop9', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/shop9.html'));
});

app.get('/shop10', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/shop10.html'));
});

app.get('/shop11', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/shop11.html'));
});

app.get('/shop12', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/shop12.html'));
});

//login
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
}));
app.get('/', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/home');
  } else {
    res.redirect('/login.html');
  }
});
const users = [{ username: 'yash', password: '123' }];
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    req.session.loggedIn = true;
    res.sendStatus(200);
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
});
app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login.html');
});
app.get('/home', (req, res) => {
  if (req.session.loggedIn) {
    res.sendFile(__dirname + '/public/home.html');
  } else {
    res.redirect('/login.html');
  }
});

mongoose.connect('mongodb://localhost:27017/pdfLinksDB', { useNewUrlParser: true, useUnifiedTopology: true });

const linkSchema = new mongoose.Schema({
  name: String,
  pdfPath: String,
});

const Shop1Link = mongoose.model('Shop1Link', linkSchema);
const Shop2Link = mongoose.model('Shop2Link', linkSchema);
const Shop3Link = mongoose.model('Shop3Link', linkSchema);
const Shop3bLink = mongoose.model('Shop3bLink', linkSchema);
const Shop4Link = mongoose.model('Shop4Link', linkSchema);
const Shop5Link = mongoose.model('Shop5Link', linkSchema);
const Shop6Link = mongoose.model('Shop6Link', linkSchema);
const Shop7Link = mongoose.model('Shop7Link', linkSchema);
const Shop8Link = mongoose.model('Shop8Link', linkSchema);
const Shop9Link = mongoose.model('Shop9Link', linkSchema);
const Shop10Link = mongoose.model('Shop10Link', linkSchema);
const Shop11Link = mongoose.model('Shop11Link', linkSchema);
const Shop12Link = mongoose.model('Shop12Link', linkSchema);

app.use(express.json());
app.use(express.static('public'));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });


// Shop3 page routes
app.get('/shop3/links', async (req, res) => {
  const links = await Shop3Link.find();
  res.json(links);
});

app.post('/shop3/add-link', async (req, res) => {
  const { name } = req.body;
  const newLink = new Shop3Link({ name });
  await newLink.save();
  res.json(newLink);
});

app.post('/shop3/upload-pdf/:id', upload.single('pdf'), async (req, res) => {
  const link = await Shop3Link.findById(req.params.id);
  link.pdfPath = req.file.path;
  await link.save();
  res.redirect('/shop3'); // Redirect to shop3 after upload
});

app.post('/shop3/remove-pdf/:id', async (req, res) => {
  const link = await Shop3Link.findById(req.params.id);
  link.pdfPath = null;
  await link.save();
  res.redirect('/shop3'); // Redirect to shop3 after removal
});

app.get('/shop3/view-pdf-content/:id', async (req, res) => {
  const link = await Shop3Link.findById(req.params.id);
  if (link.pdfPath) {
    const dataBuffer = fs.readFileSync(link.pdfPath);
    pdfParse(dataBuffer).then(function(data) {
      res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>PDF Content</title>
          <link rel="stylesheet" href="/styles.css">
        </head>
        <body style="padding:20px; font-size:20px;">
          <pre>${data.text}</pre>
        </body>
        </html>
      `);
    });
  } else {
    res.status(404).send('PDF not found');
  }
});

// Shop3b page routes
app.get('/shop3b/links', async (req, res) => {
  const links = await Shop3bLink.find();
  res.json(links);
});

app.post('/shop3b/add-link', async (req, res) => {
  const { name } = req.body;
  const newLink = new Shop3bLink({ name });
  await newLink.save();
  res.json(newLink);
});

app.post('/shop3b/upload-pdf/:id', upload.single('pdf'), async (req, res) => {
  const link = await Shop3bLink.findById(req.params.id);
  link.pdfPath = req.file.path;
  await link.save();
  res.redirect('/shop3b'); // Redirect to shop3 after upload
});

app.post('/shop3b/remove-pdf/:id', async (req, res) => {
  const link = await Shop3bLink.findById(req.params.id);
  link.pdfPath = null;
  await link.save();
  res.redirect('/shop3b'); // Redirect to shop3 after removal
});

app.get('/shop3b/view-pdf-content/:id', async (req, res) => {
  const link = await Shop3bLink.findById(req.params.id);
  if (link.pdfPath) {
    const dataBuffer = fs.readFileSync(link.pdfPath);
    pdfParse(dataBuffer).then(function(data) {
      res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>PDF Content</title>
          <link rel="stylesheet" href="/styles.css">
        </head>
        <body style="padding:20px; font-size:20px;">
          <pre>${data.text}</pre>
        </body>
        </html>
      `);
    });
  } else {
    res.status(404).send('PDF not found');
  }
});

// Shop1 page routes
app.get('/shop1/links', async (req, res) => {
  const links = await Shop1Link.find();
  res.json(links);
});

app.post('/shop1/add-link', async (req, res) => {
  const { name } = req.body;
  const newLink = new Shop1Link({ name });
  await newLink.save();
  res.json(newLink);
});

app.post('/shop1/upload-pdf/:id', upload.single('pdf'), async (req, res) => {
  const link = await Shop1Link.findById(req.params.id);
  link.pdfPath = req.file.path;
  await link.save();
  res.redirect('/shop1'); // Redirect to shop1 after upload
});

app.post('/shop1/remove-pdf/:id', async (req, res) => {
  const link = await Shop1Link.findById(req.params.id);
  link.pdfPath = null;
  await link.save();
  res.redirect('/shop1'); // Redirect to shop1 after removal
});

app.get('/shop1/view-pdf-content/:id', async (req, res) => {
  const link = await Shop1Link.findById(req.params.id);
  if (link.pdfPath) {
    const dataBuffer = fs.readFileSync(link.pdfPath);
    pdfParse(dataBuffer).then(function(data) {
      res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>PDF Content</title>
          <link rel="stylesheet" href="/styles.css">
        </head>
        <body style="padding:20px; font-size:20px;">
          <pre>${data.text}</pre>
        </body>
        </html>
      `);
    });
  } else {
    res.status(404).send('PDF not found');
  }
});

// Shop2 page routes
app.get('/shop2/links', async (req, res) => {
  const links = await Shop2Link.find();
  res.json(links);
});

app.post('/shop2/add-link', async (req, res) => {
  const { name } = req.body;
  const newLink = new Shop2Link({ name });
  await newLink.save();
  res.json(newLink);
});

app.post('/shop2/upload-pdf/:id', upload.single('pdf'), async (req, res) => {
  const link = await Shop2Link.findById(req.params.id);
  link.pdfPath = req.file.path;
  await link.save();
  res.redirect('/shop2'); // Redirect to shop2 after upload
});

app.post('/shop2/remove-pdf/:id', async (req, res) => {
  const link = await Shop2Link.findById(req.params.id);
  link.pdfPath = null;
  await link.save();
  res.redirect('/shop2'); // Redirect to shop2 after removal
});

app.get('/shop2/view-pdf-content/:id', async (req, res) => {
  const link = await Shop2Link.findById(req.params.id);
  if (link.pdfPath) {
    const dataBuffer = fs.readFileSync(link.pdfPath);
    pdfParse(dataBuffer).then(function(data) {
      res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>PDF Content</title>
          <link rel="stylesheet" href="/styles.css">
        </head>
        <body style="padding:20px; font-size:20px;">
          <pre>${data.text}</pre>
        </body>
        </html>
      `);
    });
  } else {
    res.status(404).send('PDF not found');
  }
});

// Shop4 page routes
app.get('/shop4/links', async (req, res) => {
  const links = await Shop4Link.find();
  res.json(links);
});

app.post('/shop4/add-link', async (req, res) => {
  const { name } = req.body;
  const newLink = new Shop4Link({ name });
  await newLink.save();
  res.json(newLink);
});

app.post('/shop4/upload-pdf/:id', upload.single('pdf'), async (req, res) => {
  const link = await Shop4Link.findById(req.params.id);
  link.pdfPath = req.file.path;
  await link.save();
  res.redirect('/shop4'); // Redirect to shop1 after upload
});

app.post('/shop4/remove-pdf/:id', async (req, res) => {
  const link = await Shop4Link.findById(req.params.id);
  link.pdfPath = null;
  await link.save();
  res.redirect('/shop4'); // Redirect to shop1 after removal
});

app.get('/shop4/view-pdf-content/:id', async (req, res) => {
  const link = await Shop4Link.findById(req.params.id);
  if (link.pdfPath) {
    const dataBuffer = fs.readFileSync(link.pdfPath);
    pdfParse(dataBuffer).then(function(data) {
      res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>PDF Content</title>
          <link rel="stylesheet" href="/styles.css">
        </head>
        <body style="padding:20px; font-size:20px;">
          <pre>${data.text}</pre>
        </body>
        </html>
      `);
    });
  } else {
    res.status(404).send('PDF not found');
  }
});

// Shop5 page routes
app.get('/shop5/links', async (req, res) => {
  const links = await Shop5Link.find();
  res.json(links);
});

app.post('/shop5/add-link', async (req, res) => {
  const { name } = req.body;
  const newLink = new Shop5Link({ name });
  await newLink.save();
  res.json(newLink);
});

app.post('/shop5/upload-pdf/:id', upload.single('pdf'), async (req, res) => {
  const link = await Shop5Link.findById(req.params.id);
  link.pdfPath = req.file.path;
  await link.save();
  res.redirect('/shop5'); // Redirect to shop1 after upload
});

app.post('/shop5/remove-pdf/:id', async (req, res) => {
  const link = await Shop5Link.findById(req.params.id);
  link.pdfPath = null;
  await link.save();
  res.redirect('/shop5'); // Redirect to shop1 after removal
});

app.get('/shop5/view-pdf-content/:id', async (req, res) => {
  const link = await Shop5Link.findById(req.params.id);
  if (link.pdfPath) {
    const dataBuffer = fs.readFileSync(link.pdfPath);
    pdfParse(dataBuffer).then(function(data) {
      res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>PDF Content</title>
          <link rel="stylesheet" href="/styles.css">
        </head>
        <body style="padding:20px; font-size:20px;">
          <pre>${data.text}</pre>
        </body>
        </html>
      `);
    });
  } else {
    res.status(404).send('PDF not found');
  }
});

// Shop6 page routes
app.get('/shop6/links', async (req, res) => {
  const links = await Shop6Link.find();
  res.json(links);
});

app.post('/shop6/add-link', async (req, res) => {
  const { name } = req.body;
  const newLink = new Shop6Link({ name });
  await newLink.save();
  res.json(newLink);
});

app.post('/shop6/upload-pdf/:id', upload.single('pdf'), async (req, res) => {
  const link = await Shop6Link.findById(req.params.id);
  link.pdfPath = req.file.path;
  await link.save();
  res.redirect('/shop6'); // Redirect to shop1 after upload
});

app.post('/shop6/remove-pdf/:id', async (req, res) => {
  const link = await Shop6Link.findById(req.params.id);
  link.pdfPath = null;
  await link.save();
  res.redirect('/shop6'); // Redirect to shop1 after removal
});

app.get('/shop6/view-pdf-content/:id', async (req, res) => {
  const link = await Shop6Link.findById(req.params.id);
  if (link.pdfPath) {
    const dataBuffer = fs.readFileSync(link.pdfPath);
    pdfParse(dataBuffer).then(function(data) {
      res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>PDF Content</title>
          <link rel="stylesheet" href="/styles.css">
        </head>
        <body style="padding:20px; font-size:20px;">
          <pre>${data.text}</pre>
        </body>
        </html>
      `);
    });
  } else {
    res.status(404).send('PDF not found');
  }
});

// Shop7 page routes
app.get('/shop7/links', async (req, res) => {
  const links = await Shop7Link.find();
  res.json(links);
});

app.post('/shop7/add-link', async (req, res) => {
  const { name } = req.body;
  const newLink = new Shop7Link({ name });
  await newLink.save();
  res.json(newLink);
});

app.post('/shop7/upload-pdf/:id', upload.single('pdf'), async (req, res) => {
  const link = await Shop7Link.findById(req.params.id);
  link.pdfPath = req.file.path;
  await link.save();
  res.redirect('/shop7'); // Redirect to shop1 after upload
});

app.post('/shop7/remove-pdf/:id', async (req, res) => {
  const link = await Shop7Link.findById(req.params.id);
  link.pdfPath = null;
  await link.save();
  res.redirect('/shop7'); // Redirect to shop1 after removal
});

app.get('/shop7/view-pdf-content/:id', async (req, res) => {
  const link = await Shop7Link.findById(req.params.id);
  if (link.pdfPath) {
    const dataBuffer = fs.readFileSync(link.pdfPath);
    pdfParse(dataBuffer).then(function(data) {
      res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>PDF Content</title>
          <link rel="stylesheet" href="/styles.css">
        </head>
        <body style="padding:20px; font-size:20px;">
          <pre>${data.text}</pre>
        </body>
        </html>
      `);
    });
  } else {
    res.status(404).send('PDF not found');
  }
});

// Shop8 page routes
app.get('/shop8/links', async (req, res) => {
  const links = await Shop8Link.find();
  res.json(links);
});

app.post('/shop8/add-link', async (req, res) => {
  const { name } = req.body;
  const newLink = new Shop8Link({ name });
  await newLink.save();
  res.json(newLink);
});

app.post('/shop8/upload-pdf/:id', upload.single('pdf'), async (req, res) => {
  const link = await Shop8Link.findById(req.params.id);
  link.pdfPath = req.file.path;
  await link.save();
  res.redirect('/shop8'); // Redirect to shop1 after upload
});

app.post('/shop8/remove-pdf/:id', async (req, res) => {
  const link = await Shop8Link.findById(req.params.id);
  link.pdfPath = null;
  await link.save();
  res.redirect('/shop8'); // Redirect to shop1 after removal
});

app.get('/shop8/view-pdf-content/:id', async (req, res) => {
  const link = await Shop8Link.findById(req.params.id);
  if (link.pdfPath) {
    const dataBuffer = fs.readFileSync(link.pdfPath);
    pdfParse(dataBuffer).then(function(data) {
      res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>PDF Content</title>
          <link rel="stylesheet" href="/styles.css">
        </head>
        <body style="padding:20px; font-size:20px;">
          <pre>${data.text}</pre>
        </body>
        </html>
      `);
    });
  } else {
    res.status(404).send('PDF not found');
  }
});

// Shop9 page routes
app.get('/shop9/links', async (req, res) => {
  const links = await Shop9Link.find();
  res.json(links);
});

app.post('/shop9/add-link', async (req, res) => {
  const { name } = req.body;
  const newLink = new Shop9Link({ name });
  await newLink.save();
  res.json(newLink);
});

app.post('/shop9/upload-pdf/:id', upload.single('pdf'), async (req, res) => {
  const link = await Shop9Link.findById(req.params.id);
  link.pdfPath = req.file.path;
  await link.save();
  res.redirect('/shop9'); // Redirect to shop1 after upload
});

app.post('/shop9/remove-pdf/:id', async (req, res) => {
  const link = await Shop9Link.findById(req.params.id);
  link.pdfPath = null;
  await link.save();
  res.redirect('/shop9'); // Redirect to shop1 after removal
});

app.get('/shop9/view-pdf-content/:id', async (req, res) => {
  const link = await Shop9Link.findById(req.params.id);
  if (link.pdfPath) {
    const dataBuffer = fs.readFileSync(link.pdfPath);
    pdfParse(dataBuffer).then(function(data) {
      res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>PDF Content</title>
          <link rel="stylesheet" href="/styles.css">
        </head>
        <body style="padding:20px; font-size:20px;">
          <pre>${data.text}</pre>
        </body>
        </html>
      `);
    });
  } else {
    res.status(404).send('PDF not found');
  }
});

// Shop10 page routes
app.get('/shop10/links', async (req, res) => {
  const links = await Shop10Link.find();
  res.json(links);
});

app.post('/shop10/add-link', async (req, res) => {
  const { name } = req.body;
  const newLink = new Shop10Link({ name });
  await newLink.save();
  res.json(newLink);
});

app.post('/shop10/upload-pdf/:id', upload.single('pdf'), async (req, res) => {
  const link = await Shop10Link.findById(req.params.id);
  link.pdfPath = req.file.path;
  await link.save();
  res.redirect('/shop10'); // Redirect to shop1 after upload
});

app.post('/shop10/remove-pdf/:id', async (req, res) => {
  const link = await Shop10Link.findById(req.params.id);
  link.pdfPath = null;
  await link.save();
  res.redirect('/shop10'); // Redirect to shop1 after removal
});

app.get('/shop10/view-pdf-content/:id', async (req, res) => {
  const link = await Shop10Link.findById(req.params.id);
  if (link.pdfPath) {
    const dataBuffer = fs.readFileSync(link.pdfPath);
    pdfParse(dataBuffer).then(function(data) {
      res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>PDF Content</title>
          <link rel="stylesheet" href="/styles.css">
        </head>
        <body style="padding:20px; font-size:20px;">
          <pre>${data.text}</pre>
        </body>
        </html>
      `);
    });
  } else {
    res.status(404).send('PDF not found');
  }
});

// Shop11 page routes
app.get('/shop11/links', async (req, res) => {
  const links = await Shop11Link.find();
  res.json(links);
});

app.post('/shop11/add-link', async (req, res) => {
  const { name } = req.body;
  const newLink = new Shop11Link({ name });
  await newLink.save();
  res.json(newLink);
});

app.post('/shop11/upload-pdf/:id', upload.single('pdf'), async (req, res) => {
  const link = await Shop11Link.findById(req.params.id);
  link.pdfPath = req.file.path;
  await link.save();
  res.redirect('/shop11'); // Redirect to shop1 after upload
});

app.post('/shop11/remove-pdf/:id', async (req, res) => {
  const link = await Shop11Link.findById(req.params.id);
  link.pdfPath = null;
  await link.save();
  res.redirect('/shop11'); // Redirect to shop1 after removal
});

app.get('/shop11/view-pdf-content/:id', async (req, res) => {
  const link = await Shop11Link.findById(req.params.id);
  if (link.pdfPath) {
    const dataBuffer = fs.readFileSync(link.pdfPath);
    pdfParse(dataBuffer).then(function(data) {
      res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>PDF Content</title>
          <link rel="stylesheet" href="/styles.css">
        </head>
        <body style="padding:20px; font-size:20px;">
          <pre>${data.text}</pre>
        </body>
        </html>
      `);
    });
  } else {
    res.status(404).send('PDF not found');
  }
});

// Shop12 page routes
app.get('/shop12/links', async (req, res) => {
  const links = await Shop12Link.find();
  res.json(links);
});

app.post('/shop12/add-link', async (req, res) => {
  const { name } = req.body;
  const newLink = new Shop12Link({ name });
  await newLink.save();
  res.json(newLink);
});

app.post('/shop12/upload-pdf/:id', upload.single('pdf'), async (req, res) => {
  const link = await Shop12Link.findById(req.params.id);
  link.pdfPath = req.file.path;
  await link.save();
  res.redirect('/shop12'); // Redirect to shop1 after upload
});

app.post('/shop12/remove-pdf/:id', async (req, res) => {
  const link = await Shop12Link.findById(req.params.id);
  link.pdfPath = null;
  await link.save();
  res.redirect('/shop12'); // Redirect to shop1 after removal
});

app.get('/shop12/view-pdf-content/:id', async (req, res) => {
  const link = await Shop12Link.findById(req.params.id);
  if (link.pdfPath) {
    const dataBuffer = fs.readFileSync(link.pdfPath);
    pdfParse(dataBuffer).then(function(data) {
      res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>PDF Content</title>
          <link rel="stylesheet" href="/styles.css">
        </head>
        <body style="padding:20px; font-size:20px;">
          <pre>${data.text}</pre>
        </body>
        </html>
      `);
    });
  } else {
    res.status(404).send('PDF not found');
  }
});



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
