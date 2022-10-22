import React, {memo, useState} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import globalStyles from '../../styles';
import ImagePicker from 'react-native-image-crop-picker';
import {defaultTheme} from '../../helpers/theme';
import Metrics from '../../helpers/metrics';

const Home = memo(props => {
  const [images, setImages] = useState([]);
  const [displayImage, setDisplayImage] = useState(false);

  const openCamera = async () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      images.push(image);
      setImages(images);
    });
  };

  const renderItem = ({item, index}) => {
    return (
      <View
        key={`${index}`}
        style={{
          width: Metrics.width / 4,
          height: Metrics.rfv(90),
          backgroundColor: defaultTheme.text25,
          borderWidth: 1,
          borderColor: defaultTheme.tertiary,
          margin: Metrics.rfv(12),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          style={{
            width: Metrics.width / 4,
            height: Metrics.rfv(90),
          }}
          source={{uri: item.fileUri || item.path}}
          resizeMode={'cover'}
        />
      </View>
    );
  };

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <View style={[globalStyles.container, globalStyles.itemsCenter]}>
      {displayImage && (
        <View style={{flex: 1}}>
          <FlatList data={images} numColumns={3} renderItem={renderItem} />
        </View>
      )}

      <TouchableOpacity
        style={[globalStyles.addBtnStyle, globalStyles.itemsCenter]}
        onPress={() => openCamera()}>
        <Text
          style={{
            ...globalStyles.subTitle,
            color: defaultTheme.textWhite,
          }}>
          Open Camera
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[globalStyles.addBtnStyle, globalStyles.itemsCenter]}
        onPress={() => setDisplayImage(!displayImage)}>
        <Text
          style={{
            ...globalStyles.subTitle,
            color: defaultTheme.textWhite,
          }}>
          Display Images
        </Text>
      </TouchableOpacity>
    </View>
  );
});

export default Home;
