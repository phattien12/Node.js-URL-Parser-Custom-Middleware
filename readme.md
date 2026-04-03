<!-- README.md -->

<h1 align="center">🚀 Node.js URL Parser & Custom Middleware</h1>

<p align="center">
  <b>Practical Assignment using Node.js Core APIs</b><br/>
  URL Parsing • File System • Custom Middleware (No Express)
</p>

<hr/>

<h2>📌 Overview</h2>

<p>
This project focuses on working with <b>pure Node.js</b> (no frameworks) to:
</p>

<ul>
  <li>🔍 Parse URL and extract query parameters</li>
  <li>📂 Dynamically create folders based on user input</li>
  <li>📄 Generate files with custom naming rules</li>
  <li>⚙️ Build middleware system similar to Express</li>
</ul>

<hr/>

<h2>📁 Project Structure</h2>

<pre>
project/
│── parseURL.js
│── index.js
│
├── middlewares/
│   ├── my_json.js
│   ├── logger.js
│   └── app.js
</pre>

<hr/>

<h2>🧠 URL Parsing Logic</h2>

<h3>🎯 Input Example</h3>

<pre>
http://localhost:3000/document/introduction.txt?user=admin&year=2020
http://localhost:8080/document/tutorial.txt?user=manager&year=2021
</pre>

<h3>⚙️ What the program does</h3>

<ul>
  <li>Extract <b>user</b> → create folder</li>
  <li>Extract <b>year</b> + filename → create file</li>
  <li>Write <b>host (domain + port)</b> into file</li>
</ul>

<h3>📄 Output Example</h3>

<pre>
admin/
 └── introduction_2020.txt  (content: localhost:3000)

manager/
 └── tutorial_2021.txt      (content: localhost:8080)
</pre>

<hr/>

<h2>🚀 How to Run</h2>

<h3>1. Run URL Parser</h3>

<pre><code class="language-bash">
node index.js
</code></pre>

<p>✔ Result: folders + files will be created automatically.</p>

<hr/>

<h2>🧩 Custom Middleware System</h2>

<p>
Instead of using Express, this project builds a <b>mini middleware engine</b>.
</p>

<hr/>

<h3>📌 Middleware 1: JSON Parser</h3>

<p><b>File:</b> <code>middlewares/my_json.js</code></p>

<ul>
  <li>Reads request body using <code>stream (data, end)</code></li>
  <li>Parses JSON → assigns to <code>req.body</code></li>
</ul>

<hr/>

<h3>📌 Middleware 2: Logger</h3>

<p><b>File:</b> <code>middlewares/logger.js</code></p>

<ul>
  <li>Logs HTTP method and URL</li>
</ul>

<hr/>

<h3>📌 Middleware Chain Engine</h3>

<p><b>File:</b> <code>middlewares/app.js</code></p>

<ul>
  <li>Implements <code>applyMiddleware()</code></li>
  <li>Executes middleware sequentially using <code>next()</code></li>
</ul>

<hr/>

<h2>⚙️ Run Server</h2>

<pre><code class="language-bash">
node middlewares/app.js
</code></pre>

<p>Server will start at:</p>

<pre>
http://localhost:3000
</pre>

<hr/>

<h2>🧪 Test API</h2>

<h3>Example using Postman / curl:</h3>

<pre><code class="language-bash">
curl -X POST http://localhost:3000 \
-H "Content-Type: application/json" \
-d '{"name":"Phat","age":21}'
</code></pre>

<h3>📥 Response:</h3>

<pre>
{
  "message": "OK",
  "body": {
    "name": "Phat",
    "age": 21
  }
}
</pre>

<hr/>

<h2>💡 Key Concepts Learned</h2>

<ul>
  <li>✅ URL parsing with <code>new URL()</code></li>
  <li>✅ File system operations (<code>fs</code>, <code>path</code>)</li>
  <li>✅ Streams in Node.js (<code>data</code>, <code>end</code>)</li>
  <li>✅ Middleware architecture (<code>req, res, next</code>)</li>
  <li>✅ Building backend without frameworks</li>
</ul>

<hr/>

<h2>✨ Highlights</h2>

<ul>
  <li>🚫 No Express used</li>
  <li>⚡ Lightweight & easy to understand</li>
  <li>📚 Good practice for backend fundamentals</li>
</ul>

<hr/>

<h2 align="center">👨‍💻 Author</h2>

<p align="center">
  Made with ❤️ using Node.js Core APIs
</p>
