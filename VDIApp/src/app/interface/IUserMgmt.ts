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
  connectUserAsync(username: string, password: string, callback: (user: IUser) => void): void; // login user
  disconnectUserAsync(user: IUser, callback: (disconnected: boolean) => void): void; // logout user

  registerUserAsync(user: IUser, password: string, callback: (registered: boolean) => void): void; // create user
  unregisterUserAsync(user: IUser, callback: (unregistered: boolean) => void): void; // delete user

  updateUserAsync(user: IUser, callback: (user: IUser) => void): void; // change user data
  getUsersAsync(user: IUser, callback: (users: IUser[]) => void): void; // not implemented
}

// mock class for UI tests
export class MockUserMgmt implements IUserMgmt {
  private user: IUser = {
      id: '1',
      lastName: 'Mustermann',
      firstName: 'Max',
      location: 'Berlin',
      image: '',
      jobTitle: 'Ingenieur',
      email: 'Max.Mustermann@example.com',
      username: 'user1',
      token: 'Basic 12345'
  };

  connectUserAsync(username: string, password: string, callback: (user: IUser) => void): void{
    callback(this.user);
  }
  disconnectUserAsync(user: IUser, callback: (disconnected: boolean) => void): void {
    callback(true);
  }
  registerUserAsync(user: IUser, password: string, callback: (registered: boolean) => void): void{
    callback(true);
  }
  unregisterUserAsync(user: IUser, callback: (unregistered: boolean) => void): void{
    callback(true);
  }
  updateUserAsync(user: IUser, callback: (user: IUser) => void): void{
    this.user = user;
    callback(this.user);
  }
  getUsersAsync(user: IUser, callback: (users: IUser[]) => void): void{
    callback([
      this.user,
      {
        id: '2',
        lastName: 'Musterfrau',
        firstName: 'Melanie',
        location: 'Busenbach',
        image: '',
        jobTitle: 'Ingenieurin',
        email: 'melanie.musterfrau@example.com',
        username: 'user2',
        token: 'Advanced 12345'
    },
    {
      id: '3',
      lastName: 'Mustermensch',
      firstName: 'Max-Sophie',
      location: 'Köln',
      image: '',
      jobTitle: 'Ingenieurende',
      email: 'max-sophie.mustermensch@example.com',
      username: 'user3',
      token: 'Divers 12345'
  }
    ]);
  }

}
