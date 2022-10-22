import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigation, {navigationRef} from './src/navigation';
import {Linking, SafeAreaView} from 'react-native';
import {RootSiblingParent} from 'react-native-root-siblings';
import globalStyles from './src/styles';
import FriendTable from './src/service/friendTable';
import NetInfo from '@react-native-community/netinfo';
import Loader from './src/components/Loader';
import {saveFriends} from './src/service/apiService';
import {showToast} from './src/helpers/appHelper';
import {ADD_FRIEND} from './src/navigation/navigationConst';

const prefixes = [
  'friend://',
  'https://rnapp-mock-developer-edition.ap24.force.com',
];

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isConnected: true,
      loading: false,
    };
    this.friendTable = new FriendTable();
  }

  handleDeepLinkingRequests = () => {
    Linking.getInitialURL()
      .then(url => {
        if (url) {
          this.handleOpenURL(url);
        }
      })
      .catch(error => {});
  };

  handleOpenURL = async url => {
    let friendId;
    url = typeof url == 'string' ? url : url.url;
    if (url.startsWith(prefixes[0]) || url.startsWith(prefixes[1])) {
      friendId = url.split('/');
      friendId = friendId[friendId.length - 1];
    }
    const localFriends = await this.friendTable.get();
    navigationRef.current.navigate(ADD_FRIEND, {
      friend: localFriends.find(f => f.Id === friendId),
      isEdit: true,
    });
  };

  updateOfflineRecord = async () => {
    const {isConnected, loading} = this.state;
    if (loading) return;
    if (isConnected) {
      const offlineRecordUnsave = await this.friendTable.getOfflineSaveRecord();
      if (offlineRecordUnsave.length === 0) return;
      this.setState({
        loading: true,
      });
      const res = await saveFriends(offlineRecordUnsave);
      console.log(
        'offlineRecordUnsave : ',
        JSON.stringify(offlineRecordUnsave),
      );
      if (Array.isArray(res) && res.length > 0) {
        showToast(`${res.length} Friends record sync to server successfully`);
        const serverRes = res.map((r, i) => ({
          ...r,
          fid: offlineRecordUnsave[i].fid,
        }));
        this.friendTable.update(serverRes);
      }
      this.setState({
        loading: false,
      });
    }
  };

  async componentDidMount() {
    this.friendTable.createTable();
    this.linking = Linking.addEventListener('url', this.handleOpenURL);
    this.handleDeepLinkingRequests();
    this.unsubscribeNet = NetInfo.addEventListener(stateNet => {
      if (stateNet) {
        console.log('Connection type', stateNet.type);
        console.log('Is connected?', stateNet.isConnected);
        this.setState(
          {
            isConnected: stateNet.isConnected,
          },
          () => {
            this.updateOfflineRecord();
          },
        );
      }
    });
  }

  componentWillUnmount() {
    try {
      if (this.unsubscribeNet) {
        this.unsubscribeNet();
      }
      if (this.linking) {
        this.linking.remove();
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const {loading} = this.state;
    return (
      <RootSiblingParent>
        <SafeAreaView style={globalStyles.container}>
          {loading && <Loader loading={loading} />}
          <NavigationContainer ref={navigationRef}>
            <RootNavigation />
          </NavigationContainer>
        </SafeAreaView>
      </RootSiblingParent>
    );
  }
}
