export class User {
  username: string;
  password: string;
  role: 'USER' | 'ADMIN';

  constructor(username: string, password: string, role: 'USER' | 'ADMIN') {
    this.username = username;
    this.password = password;
    this.role = role;
  }
}
