import { deleteCookie, getCookie } from "cookies-next"
import { jwtDecode } from "jwt-decode"

interface JWTPayload {
  username: string;
  // Add other JWT payload fields you expect
}

export const getUsernameFromToken = (): string | null => {
  const token = getCookie('accessToken');
  if (token) {
    try {
      const decoded = jwtDecode<JWTPayload>(token as string);
      const uname = decoded.username;
      console.log('uname', uname); // Log the username to the console for debugging purposes
      return uname;
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  }
  return null;
};

export const handleLogout = (router: any, setUsername: (username: string | null) => void) => {
  deleteCookie('accessToken');
  router.push('/');
  setUsername(null);
};