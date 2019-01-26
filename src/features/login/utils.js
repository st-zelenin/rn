import { authTokenUrl } from '../../../config.json';
import { UnauthorizedError } from '../../core/errors';

export const signIn = async (username, password) => {
  const response = await fetch(authTokenUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (response.status === 401) {
    const error = await response.json();
    throw new UnauthorizedError(error.message);
  }

  if (!response.ok) {
    throw new Error('unexpected error');
  }

  return response.json();
};
