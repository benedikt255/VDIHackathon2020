// data type of user with all attributes
export interface IUser {
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
export interface IUserMgmt {
  connectUser(username: string, password: string): IUser; // login user
  disconnectUser(user: IUser): boolean; // logout user
  registerUser(user: IUser, password: string): string; // create user
  unregisterUser(user: IUser): boolean; // delete user
  updateUser(user: IUser): boolean; // change user data
  getUsers(user: IUser): IUser[]; // not implemented
  getUser(user: IUser): IUser; // gets user data of current user
}

// mock class for UI tests
export class MockUserMgmt implements IUserMgmt {
  private user: IUser = {
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

  connectUser(username: string, password: string): IUser {
    return this.user;
  }
  disconnectUser(user: IUser): boolean {
    return true;
  }
  registerUser(user: IUser, password: string): string {
    return '1';
  }
  unregisterUser(user: IUser): boolean {
    return true;
  }
  updateUser(user: IUser): boolean {
    this.user = user;
    return true;
  }
  getUsers(user: IUser): IUser[] {
    throw new Error('Method not implemented.');
  }
  getUser(user: IUser): IUser {
    return this.user;
  }
}
