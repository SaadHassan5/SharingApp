import React, {useRef, useState} from 'react';
import {StyleSheet,TouchableOpacity,View,Dimensions,ImageBackground} from 'react-native';
import Carousel from 'react-native-anchor-carousel';
import { colors } from '../theme';
import AppText from './AppText';
import PaginationBullet from './PaginationBullet';
import data from '../data/homeSliderData';

const {width: windowWidth} = Dimensions.get('window');

const INITIAL_INDEX = 0;
export default function HomeSlider(props) {
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(INITIAL_INDEX);

  function handleCarouselScrollEnd(item, index) {
    setCurrentIndex(index);
  }

  function renderItem({item, index}) {
    // const {uri, title, content} = item;
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.item}
        onPress={() => {
          carouselRef.current.scrollToIndex(index);
        }}>
         <View
              style={{ width: "100%", height: "100%", overflow: "hidden" }}
            >
              <ImageBackground
                source={item.image}
                resizeMode="cover"
                style={styles.image}
              >
                <View style={{ paddingLeft: 25, top: 80 }}>
                  <AppText preset="bold" style={{ color: item.color }}>
                    {item.title}
                  </AppText>

                  <View style={styles.discount}>
                    <AppText style={styles.discountText}>
                      {item.percentage}
                    </AppText>
                  </View>
                </View>
              </ImageBackground>
            </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <Carousel
        style={styles.carousel}
        data={data}
        renderItem={renderItem}
        itemWidth={windowWidth}
        inActiveOpacity={0.3}
        containerWidth={windowWidth}
        onScrollEnd={handleCarouselScrollEnd}
        ref={carouselRef}
      />
      <PaginationBullet currentIndex={currentIndex} length={data.length} />
    </View>
  );
}

const styles = StyleSheet.create({
  carousel: {
    aspectRatio: 1.6,
    flexGrow: 1,
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: "100%",
    bottom: 0,
    overflow: "hidden",
    position: "relative",
  },
  item: {
    backgroundColor: 'white',
    flex:1,
    elevation: 3,
  },
  discount: {
    width: 60,
    height: 30,
    backgroundColor: colors.red,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  discountText: {
    color: colors.white,
    fontWeight: "700",
  },
});
