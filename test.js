const bcrypt = require('bcrypt');
const  {v4: uuidv4} = require('uuid');

const userId = "eed292914edm3034034";
console.log(userId)
const hashPass =  bcrypt.hash(userId, uuidv4());

console.log(hashPass)



// set view engine
//Path.join(__dirname, "view")
// app.set("view engine", "ejs")

// //app.use(express.static(path.join(__dirname, "public")))

// app.use(
//    cookieSession({
//      maxAge: 24 * 60 * 60 * 1000,
//      keys: [keys.session.cookieKey],
//    })
//  );
 