import Toast from 'react-native-root-toast';

export const showToast = (msg, duration = Toast.durations.LONG) => {
  // Add a Toast on screen.
  let toast = Toast.show(msg, {
    duration: duration,
  });

  // You can manually hide the Toast, or it will automatically disappear after a `duration` ms timeout.
  setTimeout(function hideToast() {
    Toast.hide(toast);
  }, 500);
};
