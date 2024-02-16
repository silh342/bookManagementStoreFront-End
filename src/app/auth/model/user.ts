export class User {
  username: string;
  password: string;
  role: Array<string>;

  constructor(username: string, role: Array<string>) {
    this.username = username;
    this.role = role;
  }
}
