import Metrics from '../helpers/metrics';
import {defaultTheme} from '../helpers/theme';

const {StyleSheet} = require('react-native');

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemsCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: Metrics.rfv(24),
    color: defaultTheme.text100,
    marginVertical: Metrics.rfv(8),
    fontWeight: 'bold',
  },
  title: {
    fontSize: Metrics.rfv(18),
    color: defaultTheme.text100,
    marginVertical: Metrics.rfv(8),
    fontWeight: '600',
  },
  subTitle: {
    fontSize: Metrics.rfv(16),
    color: defaultTheme.text54,
    marginVertical: Metrics.rfv(4),
  },
  itemContainer: {
    marginHorizontal: Metrics.rfv(16),
    marginTop: Metrics.rfv(16),
  },
  itemCardContainer: {
    borderRadius: Metrics.rfv(4),
    borderTopLeftRadius: Metrics.rfv(0),
    borderTopStartRadius: Metrics.rfv(0),
    //borderWidth: 0,
    // borderLeftWidth: Metrics.rfv(4),
    padding: Metrics.rfv(12),
    backgroundColor: defaultTheme.textWhite,
  },
  floatBtnContainer: {
    position: 'absolute',
    width: Metrics.rfv(40),
    height: Metrics.rfv(40),
    borderRadius: Metrics.rfv(20),
    backgroundColor: defaultTheme.seconday,
    bottom: Metrics.rfv(20),
    right: Metrics.rfv(20),
  },
  addEditContainer: {
    marginTop: Metrics.rfv(40),
    marginHorizontal: Metrics.rfv(16),
  },
  addBtnStyle: {
    width: Metrics.width / 2,
    height: Metrics.rfv(50),
    backgroundColor: defaultTheme.seconday,
    borderRadius: Metrics.rfv(10),
    alignSelf: 'center',
  },
});

export default globalStyles;
