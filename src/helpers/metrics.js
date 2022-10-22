import {Dimensions, Platform, StatusBar} from 'react-native';
import {isIphoneX, isTablet} from './iphoneX';

const {width, height} = Dimensions.get('window');

const standardLength = width > height ? width : height;
const offset =
  width > height ? 0 : Platform.OS === 'ios' ? 78 : StatusBar.currentHeight; // iPhone X style SafeAreaView size in portrait
const deviceHeight =
  isIphoneX() || Platform.OS === 'android'
    ? standardLength - offset
    : standardLength;

function rfp(percent) {
  const heightPercent = (percent * deviceHeight) / 100;
  return Math.round(heightPercent);
}

function RFValue(fontSize: number, standardScreenHeight: number = 667) {
  const size = 375;
  const wid = width < height ? width : height;
  const heightPercent = (fontSize * deviceHeight) / standardScreenHeight;
  let res = isTablet() ? heightPercent.toFixed(2) : wid / (size / fontSize);
  return Number(res);
}

const Metrics = {
  width: width < height ? width : height,
  height: height < width ? width : height,
  rfp: rfp,
  rfv: RFValue,
};

export default Metrics;
