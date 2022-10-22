import React, {memo, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import AppTextInput from '../../components/AppTextInput';
import Metrics from '../../helpers/metrics';
import {defaultTheme} from '../../helpers/theme';
import globalStyles from '../../styles';
import {showToast} from '../../helpers/appHelper';
import {saveFriends} from '../../service/apiService';
import {useNavigation, useRoute} from '@react-navigation/native';
import Loader from '../../components/Loader';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FriendTable from '../../service/friendTable';
import DeviceHelper from '../../helpers/DeviceHelper';

const AddEditFriend = memo(props => {
  const {params} = useRoute();
  const {friend: mFriend, isEdit} = params;
  const [friend, setFriend] = useState({
    First_Name__c: isEdit ? mFriend.First_Name__c : '',
    Last_Name__c: isEdit ? mFriend.Last_Name__c : '',
    Age__c: isEdit ? `${mFriend.Age__c}` : '',
  });
  const [loading, setLoading] = useState(false);
  const {goBack} = useNavigation();
  const [enableEdit, setEnableEdit] = useState(isEdit ? false : true);
  const isValid = () => {
    return (
      friend.First_Name__c != '' &&
      friend.Last_Name__c != '' &&
      friend.Age__c != '' &&
      friend.Age__c > 1
    );
  };

  const onAdd = async () => {
    if (loading) return;
    if (!isValid()) {
      showToast('Please enter all the details');
      return;
    }
    if (isEdit) {
      alert('Opps Edit api is in deployment');
      return;
    }
    const payload = [
      {
        //...mFriend,
        ...friend,
      },
    ];
    if (DeviceHelper.isConnectedToInternet()) {
      setLoading(true);
      const res = await saveFriends(payload);
      if (Array.isArray(res) && res.length > 0) {
        const friendTable = new FriendTable();
        await friendTable.insert(res);
        showToast(
          `${res.length} Friend ${isEdit ? 'Updated' : 'Add'} successfully`,
        );
        setTimeout(() => {
          goBack();
        }, 2000);
      } else {
        showToast('Unable to add friend. Try Again');
      }
      setLoading(false);
    } else {
      const friendTable = new FriendTable();
      friendTable.insert(payload);
      showToast(`No Internet!! ${payload.length} Friends save offline.`);
      setTimeout(() => {
        goBack();
      }, 1000);
    }
  };

  return (
    <View style={[globalStyles.container, globalStyles.addEditContainer]}>
      {loading && <Loader loading={loading} />}
      {isEdit && (
        <TouchableOpacity
          style={{
            alignSelf: 'flex-end',
            marginHorizontal: Metrics.rfv(16),
          }}
          onPress={() => {
            setEnableEdit(!enableEdit);
          }}>
          <AntDesign
            name={'edit'}
            color={enableEdit ? defaultTheme.text54 : defaultTheme.text100}
            size={Metrics.rfv(24)}
          />
        </TouchableOpacity>
      )}
      <AppTextInput
        label={'First Name'}
        placeholder={'Enter First Name'}
        value={friend.First_Name__c}
        onChangeText={text => setFriend({...friend, First_Name__c: text})}
        maxLength={40}
        disable={!enableEdit}
      />
      <AppTextInput
        label={'Last Name'}
        placeholder={'Enter Last Name'}
        value={friend.Last_Name__c}
        onChangeText={text => setFriend({...friend, Last_Name__c: text})}
        maxLength={40}
        disable={!enableEdit}
      />
      <AppTextInput
        label={'Age'}
        placeholder={'Enter Age'}
        value={friend.Age__c.replace(/[^0-9]/g, '')}
        onChangeText={text => setFriend({...friend, Age__c: text})}
        maxLength={2}
        disable={!enableEdit}
      />
      {enableEdit && (
        <TouchableOpacity
          style={[globalStyles.addBtnStyle, globalStyles.itemsCenter]}
          onPress={onAdd}>
          <Text
            style={{
              ...globalStyles.subTitle,
              color: defaultTheme.textWhite,
            }}>
            {isEdit ? 'Edit' : 'Add'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
});

export default AddEditFriend;
