export interface decodedToken {
  sub: string;
  roles: Set<string>;
  exp: number;
  iat: number;
}
