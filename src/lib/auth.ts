import { deleteCookie, getCookie } from "cookies-next"


export const getUsernameFromToken = (): string | null => {
  const email = getCookie('email');
  if (email) {
    console.log('Retrieved email from cookie:', email); // Log the email
    return email as string;
  }
  console.log('No email cookie found');
  return null;
};

export const handleLogout = (router: { push: (path: string) => void }, setUsername: (username: string | null) => void) => {
  deleteCookie('email'); // Updated to delete 'email' cookie
  router.push('/')
  setUsername(null)
}