import express from 'express';
import { users } from './data.js';
const app = express();

app.listen(8080, () => {
    console.log('Server is running!');
});

// Request -> Route -> Response
// Request -> Middleware -> Route -> Response

app.use(express.json()); // middleware

// Restful API

// GET
app.get("/users", (req, res) => {

    // 200: OK,
    // 400: Bad Request 
    // 404: Not Found
    // 401: Unauthorized
    // 500: Internal Server Error
    res.status(200).send(users)
})

// query: Lấy dữ liệu từ ? &
// app.get("/users/*", (req, res) => {
//     console.log(req.query);
// })

// params: Lấy dữ liệu từ :
// // app.get("/users/:old", (req, res) => {
// //     const { old } = req.params

// //     const filterUsers = users.filter((user) => user.age >= old)

// //     res.status(200).send(filterUsers)
// })
//Bài tập 1
app.get("/users/:id", (req,res) => {
    res.send(users.filter(item => item.id === req.params.id))
})
//Bài tập 2

// // POST
// // body: Gửi dữ liệu phức tạp hơn
// app.post("/users/add-random", (req, res) => {
//     console.log(req.body);
// })

// // PUT/PATCH
// app.put("users/update-user", (req, res) => {

// })

// // DELETE
// app.delete("/user", (req, res) => {

// })


