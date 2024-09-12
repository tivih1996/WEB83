// console.log("Hello world from SERVER!")

// // Phiên bản ES6
// import { formatPhoneNumber } from "./utils.js"

// const format = formatPhoneNumber('2345678900');
// console.log(format);

import http from 'http';
import { users } from './data.js';

// createServer là phương thức giúp chúng ta khởi tạo 1 Server với giao thức http
// và sẽ giúp xử lý các request và response cho client
const app = http.createServer((req, res) => {
    const urlParams = new URLSearchParams(req.url)
    console.log(urlParams.get("userName"));
    console.log(urlParams.get("email"));

    switch (req.url) {
        case "/users":
            res.end(JSON.stringify(users))
            break
        case "/users/old":
            res.end(JSON.stringify(users.filter((item)=> item.age >= 50)))
            break
        default:
            res.end("Page not found")
            break
    }
});
// để lăng nghe được, ta cần sử dụng phương thức listen
// và có 2 tham số truyền vào
// app.listen(Cổng khởi tạo, callback Function)
// callback Function sẽ được thực thi sau khi server được khởi tạo thành công

app.listen(8080, () => {
    console.log('Server is running!');
})