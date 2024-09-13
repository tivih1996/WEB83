import express from 'express';
import { users } from './data.js';
import validator from 'validator';
import { v4 as uuidv4 } from 'uuid';
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
app.get("/users/:id", (req, res) => {
    res.send(users.filter(item => item.id === req.params.id))
})
//Bài tập 2
app.post("/users/create", (req, res) => {
    const { userName, email, age, avatar } = req.body

    // kiểm tra user
    if (!userName) {
        var messageUser = "Please enter a username"
    } else {
        //kiểm tra user name đã tồn tại
        const isUserNameExit = users.some(user => user.userName === userName)
        isUserNameExit ? messageUser = "User đã tồn tại" : messageUser = "ok"
    }


    // kiểm tra email
    if (!email) {
        var messageEmail = "Please enter email"
    }else{
        validator.isEmail(email) === false ? messageEmail = "Email không đúng định dạng" : messageEmail = "ok"
    }


    // gửi  message
   
    const message = { messageUser, messageEmail }
    const isMessageOk = Object.values(message).every((value => value ==="ok"))
     if(isMessageOk){
        var stt =  200
        let newUser = { 
            id: uuidv4(),
            userName, email, age, avatar
        }
        users.push(newUser)
     }else{
        stt = 400
     }

     const data = {message, users}
    res.status(stt).send( data)

    // if (validator.isEmail(email) === false){
    //     res.status(400).send({
    //         message: "Invalid email address"
    //     })
    // }
})
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


