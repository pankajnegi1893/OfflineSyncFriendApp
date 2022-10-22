import React, {memo} from 'react';
import {Text, View} from 'react-native';
import globalStyles from '../../styles';

const Settings = memo(props => {
  return (
    <View style={[globalStyles.container, globalStyles.itemsCenter]}>
      <Text style={globalStyles.title}>Settings</Text>
    </View>
  );
});

export default Settings;
