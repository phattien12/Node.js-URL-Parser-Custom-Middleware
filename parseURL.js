const fs = require('fs');
const path = require('path');

function parseURL(urlString) {
    try {
        // 1. Parse URL
        const url = new URL(urlString);

        // 2. Lấy query params
        const user = url.searchParams.get('user');
        const year = url.searchParams.get('year');

        // 3. Lấy filename từ pathname
        // /document/introduction.txt → introduction.txt
        const fileName = path.basename(url.pathname);

        // bỏ .txt → introduction
        const nameWithoutExt = fileName.split('.')[0];

        // 4. Tạo folder theo user
        const dirPath = path.join(__dirname, user);

        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath);
        }

        // 5. Tạo file: introduction_2020.txt
        const newFileName = `${nameWithoutExt}_${year}.txt`;
        const filePath = path.join(dirPath, newFileName);

        // 6. Nội dung file = host
        const content = url.host; // localhost:3000

        fs.writeFileSync(filePath, content);

        console.log("✔ Done:", filePath);

    } catch (err) {
        console.error("Error:", err.message);
    }
}

module.exports = parseURL;