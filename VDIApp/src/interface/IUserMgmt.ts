// data type of user with all attributes
export class ConnectingUser {
  id!: string; // (internal) id of the user
  firstName!: string; // first name
  lastName!: string; // last name
  location!: string; // location of the user
  image!: string; // base64 encoded image
  jobTitle!: string; // job title of the user
  email!: string; // email address of the user
}

// interface for managing users
export interface IUserManagement {
  connectUser(email: string, password: string): string; // login user
  disconnectUser(): boolean; // logout user
  registerUser(user: ConnectingUser, password: string): string; // create user
  unregisterUser(email: string): boolean; // delete user
  updateUser(user: ConnectingUser): boolean; // change user data
  getUsers(): ConnectingUser[];
  getUser(): ConnectingUser; // gets user data of current user
}
