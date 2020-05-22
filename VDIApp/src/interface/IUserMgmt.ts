// data type of user with all attributes
export interface IConnectIngUser {
  readonly id: string; // (internal) id of the user
  username: string; // username
  firstName: string; // first name
  lastName: string; // last name
  location: string; // location of the user
  image: string; // base64 encoded image
  jobTitle: string; // job title of the user
  email: string; // email address of the user
  token: string; // token for API calls
}

// interface for managing users
export interface IUserManagement {
  connectUser(username: string, password: string): IConnectIngUser; // login user
  disconnectUser(user: IConnectIngUser): boolean; // logout user
  registerUser(user: IConnectIngUser, password: string): string; // create user
  unregisterUser(user: IConnectIngUser): boolean; // delete user
  updateUser(user: IConnectIngUser): boolean; // change user data
  getUsers(user: IConnectIngUser): IConnectIngUser[]; // not implemented
  getUser(user: IConnectIngUser): IConnectIngUser; // gets user data of current user
}

// mock class for UI tests
export class MockUserManagement implements IUserManagement {
  private user: IConnectIngUser = {
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

  connectUser(username: string, password: string): IConnectIngUser {
    return this.user;
  }
  disconnectUser(user: IConnectIngUser): boolean {
    return true;
  }
  registerUser(user: IConnectIngUser, password: string): string {
    return '1';
  }
  unregisterUser(user: IConnectIngUser): boolean {
    return true;
  }
  updateUser(user: IConnectIngUser): boolean {
    this.user = user;
    return true;
  }
  getUsers(user: IConnectIngUser): IConnectIngUser[] {
    throw new Error('Method not implemented.');
  }
  getUser(user: IConnectIngUser): IConnectIngUser {
    return this.user;
  }
}
