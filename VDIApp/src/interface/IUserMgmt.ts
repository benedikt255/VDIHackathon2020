// data type of user with all attributes
export class ConnectIngUser {
  readonly id!: string; // (internal) id of the user
  username!: string; // username
  firstName!: string; // first name
  lastName!: string; // last name
  location!: string; // location of the user
  image!: string; // base64 encoded image
  jobTitle!: string; // job title of the user
  email!: string; // email address of the user
  token!: string; // token for API calls
}

// interface for managing users
export interface IUserManagement {
  connectUser(username: string, password: string): ConnectIngUser; // login user
  disconnectUser(user: ConnectIngUser): boolean; // logout user
  registerUser(user: ConnectIngUser, password: string): string; // create user
  unregisterUser(user: ConnectIngUser): boolean; // delete user
  updateUser(user: ConnectIngUser): boolean; // change user data
  getUsers(user: ConnectIngUser): ConnectIngUser[]; // not implemented
  getUser(user: ConnectIngUser): ConnectIngUser; // gets user data of current user
}

// mock class for UI tests
export class MockUserManagement implements IUserManagement {
  private user: ConnectIngUser = {
      id: '1',
      firstName: 'Mustermann',
      lastName: 'Max',
      location: 'Berlin',
      image: '',
      jobTitle: 'Ingenieur',
      email: 'Max.Mustermann@example.com',
      username: 'user1',
      token: 'Basic 12345'
  };

  connectUser(username: string, password: string): ConnectIngUser {
    return this.user;
  }
  disconnectUser(user: ConnectIngUser): boolean {
    return true;
  }
  registerUser(user: ConnectIngUser, password: string): string {
    return '1';
  }
  unregisterUser(user: ConnectIngUser): boolean {
    return true;
  }
  updateUser(user: ConnectIngUser): boolean {
    this.user = user;
    return true;
  }
  getUsers(user: ConnectIngUser): ConnectIngUser[] {
    throw new Error('Method not implemented.');
  }
  getUser(user: ConnectIngUser): ConnectIngUser {
    return this.user;
  }
}
