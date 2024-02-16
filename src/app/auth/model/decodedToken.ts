export interface decodedToken {
  sub: string;
  roles: Array<string>;
  exp: number;
  iat: number;
}
