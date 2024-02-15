export class User {
  username: string;
  password: string;
  role: Set<string>;

  constructor(username: string, role: Set<string>) {
    this.username = username;
    this.role = role;
  }
}
