import axios from "axios";

export class AuthService {
  baseUrl = "http://localhost:3000";
  /* api_url = process.env.VUE_APP_ROOT_API; */

  constructor() {}

  async logout() {
    try {
      localStorage.clear();
      localStorage.setItem("isLoggedUser", false);
    } catch (e) {
      console.log(e);
    }
  }

  async register(registerForm) {
    return await axios.post(`${this.baseUrl}/user/register`, registerForm);
  }

  async login(loginForm) {
    return await axios.post(`${this.baseUrl}/user/login`, loginForm);
  }
}
export default AuthService;
