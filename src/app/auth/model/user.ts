export class User {
  username: string;
  email: string;
  password: string;
  role: Array<string>;

  constructor(username: string, role: Array<string>, email?: string) {
    this.username = username;
    this.role = role;
    this.email = email;
  }
}
