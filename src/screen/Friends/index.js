import React, {memo, useEffect, useState} from 'react';
import {View, FlatList, Text, TouchableOpacity} from 'react-native';
import {getFriends} from '../../service/apiService';
import globalStyles from '../../styles';
import Loader from '../../components/Loader';
import {useNavigation} from '@react-navigation/native';
import {ADD_FRIEND, FRIEND_DETAIL} from '../../navigation/navigationConst';
import FriendItem from '../../components/FriendItem';
import Metrics from '../../helpers/metrics';
import {defaultTheme} from '../../helpers/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
const Friends = memo(props => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(false);
  const {navigate} = useNavigation();

  const getFriendsList = async () => {
    setLoading(true);
    const resFriends = await getFriends();
    setFriends(resFriends);
    setLoading(false);
  };

  const onViewDetailClicked = id => {
    const friend = friends.find(f => f.Id === id);
    navigate(ADD_FRIEND, {
      friend: friend,
      isEdit: friend ? true : false,
    });
  };

  const renderItem = ({item}) => (
    <FriendItem
      id={item.Id}
      name={`${item.First_Name__c} ${item.Last_Name__c}`}
      age={item.Age__c}
      onPress={id => onViewDetailClicked(id)}
    />
  );

  useEffect(() => {
    getFriendsList();
  }, []);

  return (
    <View style={globalStyles.container}>
      {loading && <Loader loading={loading} />}
      <FlatList
        data={friends}
        renderItem={renderItem}
        keyExtractor={item => item.Id}
      />
      <TouchableOpacity
        style={[globalStyles.floatBtnContainer, globalStyles.itemsCenter]}
        onPress={() => onViewDetailClicked()}>
        <Ionicons
          color={defaultTheme.textWhite}
          size={Metrics.rfv(20)}
          name={'add'}
        />
      </TouchableOpacity>
    </View>
  );
});

export default Friends;
