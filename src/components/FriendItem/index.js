import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {defaultTheme} from '../../helpers/theme';
import globalStyles from '../../styles';

const FriendItem = ({id, name, age, onPress}) => (
  <View
    key={id}
    style={[globalStyles.itemCardContainer, globalStyles.itemContainer]}>
    <Text style={globalStyles.title}>Name: {name}</Text>
    <Text style={globalStyles.subTitle}>Age: {age}</Text>
    {onPress && (
      <TouchableOpacity
        onPress={() => onPress(id)}
        style={globalStyles.itemsCenter}>
        <Text style={[globalStyles.subTitle, {color: defaultTheme.accent1}]}>
          View Details
        </Text>
      </TouchableOpacity>
    )}
  </View>
);

export default FriendItem;
