import {useRoute} from '@react-navigation/native';
import React, {memo} from 'react';
import {View} from 'react-native';
import FriendItem from '../../components/FriendItem';
import Metrics from '../../helpers/metrics';
import globalStyles from '../../styles';

const FriendDetail = memo(props => {
  const {params} = useRoute();
  const {friend} = params;
  return (
    <View style={(globalStyles.container, {marginTop: Metrics.rfv(40)})}>
      <FriendItem
        id={friend.Id}
        name={`${friend.First_Name__c} ${friend.Last_Name__c}`}
        age={friend.Age__c}
      />
    </View>
  );
});

export default FriendDetail;
