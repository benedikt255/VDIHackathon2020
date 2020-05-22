export class ConnectingUser {
  id!: string;
  firstName!: string;
  lastName!: string;
  location!: string;
  image!: string; // base64 encoded image
  jobTitle!: string;
  email!: string;
}

export interface IUserManagement {
  connectUser(email: string, password: string): string; // login
  disconnectUser(): boolean; // logout
  registerUser(user: ConnectingUser, password: string): string; // create user
  unregisterUser(email: string): boolean; // delete user
  updateUser(user: ConnectingUser): boolean; // change user data
  getUsers(): ConnectingUser[];
  getUser(id: string): ConnectingUser;
}
