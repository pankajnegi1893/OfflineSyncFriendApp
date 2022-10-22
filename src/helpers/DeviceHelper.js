import NetInfo from '@react-native-community/netinfo';

const DeviceHelper = {
  isConnectedToInternet: async function () {
    try {
      let state = await NetInfo.fetch();
      console.log('state.isConnected :- ', state.isConnected);
      return state.isConnected;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
};

export default DeviceHelper;
