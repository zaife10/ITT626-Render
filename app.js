const express =  require('express');
const path    =  require('path');
const bodyParser = require('body-parser');
const session = require('cookie-session');
const MemoryStore = require('memorystore')(session)

const app = express();
const port = process.env.PORT || 3000

app.set('view engine', 'ejs');
app.set('views', 'views');

//own module
const userRouter = require('./routes/user');
const adminRouter = require('./routes/admin');

app.use(
    session({
      cookie: {maxAge:86400000},
      store: new MemoryStore({
        checkPeriod:86400000
      }),
      secret: 'secret',
      resave: false,
      saveUninitialized: true
    })
  );

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public')));

app.use(userRouter);
app.use("/admin" ,adminRouter);

app.listen(3000, () => console.log("Server is Running..."));