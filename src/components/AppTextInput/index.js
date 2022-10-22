import React, {memo} from 'react';
import Metrics from '../../helpers/metrics';
import {TextInput, View, StyleSheet, Text} from 'react-native';
import {defaultTheme} from '../../helpers/theme';
import globalStyles from '../../styles';

const AppTextInput = memo(props => {
  const {
    value,
    onChangeText,
    placeholder,
    label,
    textInputProps = {},
    containerStyle,
    textInputStyle,
    maxLength,
    disable,
    color,
    inputStyle = {},
  } = props;

  return (
    <View>
      <Text
        style={[globalStyles.subTitle, {marginHorizontal: Metrics.rfv(16)}]}>
        {label}
      </Text>
      <View
        style={[
          styles.containerStyle,
          {
            borderColor: defaultTheme.text24,
          },
          containerStyle,
        ]}>
        <View style={[styles.textInputStyle, textInputStyle]}>
          <TextInput
            value={value}
            onChangeText={onChangeText}
            placeholder={`${placeholder ? placeholder : ''} `}
            style={[
              styles.input,
              {color: disable ? defaultTheme.text54 : defaultTheme.text100},
              inputStyle,
            ]}
            {...textInputProps}
            editable={!disable}
            selectTextOnFocus={!disable}
            maxLength={maxLength}
          />
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  containerStyle: {
    //flexDirection: 'row',
    marginHorizontal: Metrics.rfv(16),
    marginTop: Metrics.rfv(10),
    marginBottom: Metrics.rfv(20),
    height: Metrics.rfv(52),
    borderWidth: 1,
    borderRadius: Metrics.rfv(4),
  },

  textInputStyle: {
    flex: 1,
    marginLeft: Metrics.rfv(12),
    justifyContent: 'center',
  },

  input: {
    fontSize: Metrics.rfv(17),
    fontWeight: '400',
    lineHeight: Metrics.rfv(20),
    letterSpacing: Metrics.rfv(0.200833),
  },
});

export default AppTextInput;
