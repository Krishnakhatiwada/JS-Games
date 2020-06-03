// let userOne = {
//   name: "krishna",
//   email: "krishna.khati@gmail.com",
//   logout() {
//     console.log(this.email, "Has logged out");
//   },
//   login() {
//     console.log(this.email, "has logged in ");
//   },
//

// class User {
//   constructor(email, name) {
//     this.email = email;
//     this.name = name;
//     this.score = 0;
//   }

//   login() {
//     console.log(this.email, "loggedin user");
//     return this;
//   }
//   logout() {
//     console.log(this.email, "logged out");
//     return this;
//   }
//   updateScore() {
//     this.score++;
//     console.log(this.email, "Score is", this.score);
//     return this;
//   }
// }

function User(email, username) {
  this.email = email;
  this.name = username;
  this.online = false;

  // this.login = function () {
  //   console.log("logged in");
  // };
}

User.prototype.login = function () {
  this.online = true;
  console.log("logged in");
};
User.prototype.logout = function () {
  this.online = false;
  console.log("logged out");
};

let un = new User("abc@gmail.com", "ABC");
let un1 = new User("bcd@gmail.com", "BCD");

function Admin(...args) {
  User.apply(this, args);
  this.role = "super admin";
}
Admin.prototype = Object.create(User.prototype); //inheritance from prototype
Admin.prototype.deleteUser = function (usr) {
  user = user.filter((user) => {
    return user.email != usr.email;
  });
};

var ad = new Admin("admin@gmail.com", "admin");
var user = [un, un1, ad];
// un.login().updateScore().updateScore().logout(); //method CHaining

// class Admin extends User {
//   checkScore() {
//     console.log("your score is:", this.score);
//   }
// }

// class SuperAdmin extends Admin {
//   deleteUser() {}
// } //mutli inheritance

// let su = new SuperAdmin("super@gmail.com", "SUper Admin");

// let ad = new Admin("admin@gmail.com", "admin");
