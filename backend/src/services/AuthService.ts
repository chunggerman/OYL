export class AuthService {
  async login(email: string, password: string) {
    return { token: "dummy-token", user: { email } };
  }

  async register(email: string, password: string, name: string) {
    return { id: "user-1", email, name };
  }

  async me(req: any) {
    return { id: "user-1", email: "test@example.com" };
  }
}
