import { authTokenUrl } from '../../../config.json';

export const signIn = async (username, password) => {
  const response = await fetch(authTokenUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw Error('failed to sign in');
  }

  return response.json();
};
