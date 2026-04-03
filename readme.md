<!-- README.md -->

<h1 align="center">🚀 Node.js URL Parser & Custom Middleware</h1>

<p align="center">
  <b>Assignment Project</b><br/>
  Parse URLs, manipulate filesystem, and build custom middleware similar to <code>express.json()</code>.
</p>

<hr/>

<h2>📌 Project Overview</h2>

<p>
This project demonstrates:
</p>

<ul>
  <li>🔍 Parsing URL strings in Node.js</li>
  <li>📂 Creating directories dynamically based on query parameters</li>
  <li>📄 Generating files with dynamic names and content</li>
  <li>⚙️ Building custom middleware using Node.js Streams</li>
</ul>

<hr/>

<h2>🧠 Requirements</h2>

<h3>1. URL Parsing Function</h3>

<p>Given URLs like:</p>

<pre>
http://localhost:3000/document/introduction.txt?user=admin&year=2020
http://localhost:8080/document/tutorial.txt?user=manager&year=2021
</pre>

<p>The function <code>parseURL()</code> must:</p>

<ul>
  <li>Extract <b>user</b> from query → create directory with that name</li>
  <li>Extract <b>year</b> and filename → create file: <code>filename_year.txt</code></li>
  <li>Write <b>host (domain + port)</b> into the file</li>
</ul>

<hr/>

<h2>⚙️ Implementation</h2>

<h3>📌 parseURL Function</h3>

<pre><code class="language-js">
const fs = require('fs');
const path = require('path');
const url = require('url');

function parseURL(link) {
    const parsed = new URL(link);

    const user = parsed.searchParams.get('user');
    const year = parsed.searchParams.get('year');

    // Extract filename
    const fileName = path.basename(parsed.pathname, '.txt');

    // Create directory
    const dirPath = path.join(__dirname, user);
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
    }

    // Create new file name
    const newFileName = `${fileName}_${year}.txt`;
    const filePath = path.join(dirPath, newFileName);

    // Write host into file
    fs.writeFileSync(filePath, parsed.host);

    console.log(`✅ Created: ${filePath}`);
}

// Example usage
parseURL('http://localhost:3000/document/introduction.txt?user=admin&year=2020');
parseURL('http://localhost:8080/document/tutorial.txt?user=manager&year=2021');
</code></pre>

<hr/>

<h2>🧩 Custom Middleware</h2>

<p>
You will implement <b>2 middleware</b> similar to <code>express.json()</code>, using Streams.
</p>

<h3>📁 File Structure</h3>

<pre>
project/
│── my_json.js
│── my_json2.js
│── app.js
</pre>

<hr/>

<h3>📌 Middleware 1 (my_json.js)</h3>

<pre><code class="language-js">
module.exports = function (req, res, next) {
    let data = '';

    req.on('data', chunk => {
        data += chunk;
    });

    req.on('end', () => {
        try {
            req.body = JSON.parse(data);
        } catch (err) {
            req.body = {};
        }
        next();
    });
};
</code></pre>

<hr/>

<h3>📌 Middleware 2 (my_json2.js)</h3>

<pre><code class="language-js">
module.exports = function (req, res, next) {
    let body = [];

    req.on('data', chunk => {
        body.push(chunk);
    });

    req.on('end', () => {
        const raw = Buffer.concat(body).toString();

        try {
            req.body = JSON.parse(raw);
        } catch (e) {
            req.body = {};
        }

        next();
    });
};
</code></pre>

<hr/>

<h3>📌 Usage Example (app.js)</h3>

<pre><code class="language-js">
const express = require('express');
const app = express();

const myJson = require('./my_json');
const myJson2 = require('./my_json2');

app.use(myJson); // or myJson2

app.post('/', (req, res) => {
    res.json({
        message: "Data received",
        data: req.body
    });
});

app.listen(3000, () => console.log("Server running on port 3000"));
</code></pre>

<hr/>

<h2>🎯 Key Concepts</h2>

<ul>
  <li>✅ URL Parsing using <code>URL</code> API</li>
  <li>✅ File System (fs module)</li>
  <li>✅ Streams (<code>data</code>, <code>end</code> events)</li>
  <li>✅ Middleware flow (<code>req, res, next</code>)</li>
</ul>

<hr/>

<h2>✨ Result</h2>

<ul>
  <li>Directories created based on <b>user</b></li>
  <li>Files created with format: <b>filename_year.txt</b></li>
  <li>File content = <b>host:port</b></li>
  <li>Custom middleware processes JSON body like Express</li>
</ul>

<hr/>

<h2 align="center">💡 Author</h2>

<p align="center">
  Made with ❤️ using Node.js
</p>
