let id = 0;

export default class UserModel {
  constructor(name, email, password) {
    this.id = ++id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  static db = [new UserModel("John Doe", "john.doe@gmail.com", "Password1")];

  static create(name, email, password) {
    const newUser = new UserModel(name, email, password);
    UserModel.db.push(newUser);
    return newUser;
  }

  static check(email, password) {
    const result = UserModel.db.find(
      (data) => data.email == email && data.password == password
    );
    return result;
  }

  static getAll() {
    return UserModel.db;
  }
}
