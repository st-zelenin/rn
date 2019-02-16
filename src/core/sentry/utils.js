import DeviceInfo from 'react-native-device-info';
import { Sentry, SentrySeverity } from 'react-native-sentry';

import { dsn } from '../../../config.json';

export const initializeSentry = () => {
  Sentry.config(dsn).install();
  Sentry.setTagsContext({
    appVersion: DeviceInfo.getVersion(),
    buildNumber: DeviceInfo.getBuildNumber(),
    deviceInfo: {
      systemName: DeviceInfo.getSystemName(),
      systemVersion: DeviceInfo.getSystemVersion(),
      deviceName: DeviceInfo.getDeviceName(),
    },
  });
};

export const captureException = (ex, extra, tags) => {
  Sentry.captureException(ex, { extra, tags });
};

export const setUserContext = (user, extra) => {
  Sentry.setUserContext(user, { extra });
  Sentry.captureMessage('logged in', {
    level: SentrySeverity.Info,
    extra: { user, userExtra: extra },
  });
};

export const captureWarning = (message, extra, tags) => {
  Sentry.captureMessage(message, {
    level: SentrySeverity.Warning,
    extra,
    tags,
  });
};

export const captureBreadcrumb = (message, data) => {
  Sentry.captureBreadcrumb({
    message,
    data,
    level: SentrySeverity.Info,
  });
};
