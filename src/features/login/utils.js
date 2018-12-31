import { authTokenUrl } from '../../../config.json';
import { UnauthorizedError } from '../../core/errors';
import { secondaryColors } from '../../shared/styles';

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

export const getLoginButtonConfig = (error, loading) => {
  let backgroundColor = secondaryColors.brightBlue;
  let buttonText = 'login';
  if (error) {
    backgroundColor = secondaryColors.coral;
    buttonText = 'error';
  } else if (loading) {
    backgroundColor = secondaryColors.lightGray;
    buttonText = 'loading';
  }

  return { backgroundColor, buttonText };
};
