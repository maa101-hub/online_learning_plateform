const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');



const Teacher = require('./routes/teacher')
const Student = require('./routes/student');
const Logout = require('./routes/logout');
const Auth = require('./routes/Auth');
const Payment = require('./routes/payment');
const ErrorHandler = require('./middlewares/ErrorHandler');
const captcha = require('./routes/captcha');
const sendOTP = require('./routes/sendOTP');
const allCourse = require('./routes/course');


const app = express();
dotenv.config();


app.use(cors({
  origin: ['https://edu-verse-blush.vercel.app', 'http://localhost:3000'],
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser())



app.use('/teacher',Teacher);
app.use('/student', Student);
app.use('/logout', Logout);
app.use('/auth', Auth);
app.use('/payment', Payment);
app.use('/captcha', captcha);
app.use('/otp', sendOTP);
app.use('/allcourse', allCourse);


app.get('/', (req, res)=>{
    res.send('<p>this is server</p>')
});
app.post('/', (req, res)=>{
    res.send('<p>this is server</p>')
});


app.use((req, res) => {
    res.status(404).send({message:'404 Not Found correct your path'});
});

// for error handling

app.use(ErrorHandler);

app.listen(process.env.PORT,()=>{
    console.log(`server is running on ${(process.env.PORT)}`);  
})