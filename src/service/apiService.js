import {API_URL} from '.';
import DeviceHelper from '../helpers/DeviceHelper';
import FriendTable from './friendTable';

export const getFriends = async () => {
  try {
    const friendTable = new FriendTable();
    const localFriends = await friendTable.get();
    if (DeviceHelper.isConnectedToInternet) {
      const response = await fetch(`${API_URL}/services/apexrest/apiservice`);
      const json = await response.json();
      if (localFriends.length === 0) {
        await friendTable.insert(json);
      } else {
        const newRecords = json.filter(
          f => !localFriends.some(i => i.Id === f.Id),
        );
        await friendTable.insert(newRecords);
      }
      return json;
    } else {
      const response = await friendTable.get();
      return response;
    }
  } catch (error) {
    console.error(error);
  }
};

export const saveFriends = async body => {
  try {
    console.log(JSON.stringify(body));
    const response = await fetch(`${API_URL}/services/apexrest/apiservice`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const json = await response.json();
    console.log(JSON.stringify(json));

    return json;
  } catch (error) {
    console.error(error);
  }
};
