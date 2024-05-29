const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const upload = multer({ dest: 'files/' });

// Serve static files from the "files" folder
app.use('/files', express.static(path.join(__dirname, 'files')));

// Handle file uploads
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded');
    }

    const { originalname } = req.file;
    const { filename } = req.body;

    if (!filename) {
        return res.status(400).send('No filename provided');
    }

    // Rename the uploaded file
    const renamedFile = `${filename}${path.extname(originalname)}`;
    console.log(renamedFile);
    fs.renameSync(req.file.path, path.join(req.file.destination, renamedFile));

    res.send('File uploaded successfully');
});

// Start the server
const port = 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});