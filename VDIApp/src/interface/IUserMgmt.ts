// data type of user with all attributes
export class ConnectingUser {
  readonly id!: string; // (internal) id of the user
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
  getUsers(): ConnectingUser[]; // not implemented
  getUser(): ConnectingUser; // gets user data of current user
}

// mock class for UI tests
export class MockUserManagement implements IUserManagement {
  private user: ConnectingUser = {
      id: '1',
      firstName: 'Mustermann',
      lastName: 'Max',
      location: 'Berlin',
      image: '',
      jobTitle: 'Ingenieur',
      email: 'Max.Mustermann@example.com'
  };

  connectUser(email: string, password: string): string {
    return 'Basic 12345';
  }
  disconnectUser(): boolean {
    return true;
  }
  registerUser(user: ConnectingUser, password: string): string {
    return '1';
  }
  unregisterUser(email: string): boolean {
    return true;
  }
  updateUser(user: ConnectingUser): boolean {
    this.user = user;
    return true;
  }
  getUsers(): ConnectingUser[] {
    throw new Error('Method not implemented.');
  }
  getUser(): ConnectingUser {
    return this.user;
  }
}
