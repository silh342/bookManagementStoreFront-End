export interface decodedToken {
  sub: string;
  roles: Array<string>;
  email: string;
  exp: number;
  iat: number;
}
