import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import Slider from "@react-native-community/slider";

const DEFAULT_VALUE = 15;
const containerWidth = 280; 
const trackHeight = 10;
const thumbHeight = 40;
const thumbWidth = thumbHeight;
const outerCircleSize = 260;

export default function App() {
  const [value, setValue] = useState(DEFAULT_VALUE);
  const [color, setColor] = useState("#ccc");
  const [isYellow, setIsYellow] = useState(false);
  const prevValue = useRef(DEFAULT_VALUE);

  useEffect(() => {
    setColor("#ccc");
    setIsYellow(false);
    setValue(DEFAULT_VALUE);
    prevValue.current = DEFAULT_VALUE;
  }, []);

  const toggleColor = () => {
    const newColor = isYellow ? "#ccc" : "#ffe082";
    setColor(newColor);
    setIsYellow(!isYellow);
  };

  const handleSliderChange = (newValue) => {
    if (newValue > prevValue.current) {
      setColor("#ffe082");
      setIsYellow(true);
    }
    setValue(newValue);
    prevValue.current = newValue;
  };

  const handleScroll = () => {
    setValue(DEFAULT_VALUE);
    prevValue.current = DEFAULT_VALUE;
    setColor("#ccc");
    setIsYellow(false);
  };

  const innerCircleSize = (value / 100) * outerCircleSize;
  const sliderTotalWidth = containerWidth + thumbWidth-10;
  const visibleTrackWidth = containerWidth;
  const filledTrackWidth = (value / 100) * visibleTrackWidth;
  const sliderHeight = thumbHeight + 20;

  return (
    <ScrollView
      style={styles.container}
      onScrollBeginDrag={handleScroll}
      contentContainerStyle={styles.scrollContent}
      scrollEventThrottle={16}
    >
  <TouchableOpacity onPress={toggleColor} activeOpacity={0.8}>
    <View
      style={[
        styles.outerCircle,
        {
          width: outerCircleSize,
          height: outerCircleSize,
          borderRadius: outerCircleSize / 2,
        },
      ]}
    >
      <View
        style={[
          styles.innerCircle,
          {
            backgroundColor: color,
            width: innerCircleSize,
            height: innerCircleSize,
            borderRadius: innerCircleSize / 2,
          },
        ]}
      >
        <Text style={styles.percentageText}>{value}%</Text>
      </View>
    </View>
  </TouchableOpacity>
     <View style={styles.circleLabelRow}>
      <Text style={styles.labelLeftAligned}>Intensidad</Text>
     </View>


      <View style={[styles.sliderWrapper, { width: sliderTotalWidth, height: sliderHeight }]}>
        <View
          style={[
            styles.trackBackground,
            {
              height: trackHeight,
              borderRadius: trackHeight / 2,
              width: visibleTrackWidth,
              marginLeft: thumbWidth / 2, // Center track inside slider width
            },
          ]}
        />

        <View
          style={[
            styles.trackFill,
            {
              width: filledTrackWidth,
              height: trackHeight,
              borderRadius: trackHeight / 2,
              backgroundColor: color,
              marginLeft: thumbWidth / 2, 
            },
          ]}
        />

        <Slider
          style={{ width: sliderTotalWidth, height: sliderHeight }}
          minimumValue={0}
          maximumValue={100}
          step={1}
          value={value}
          onValueChange={handleSliderChange}
          minimumTrackTintColor="transparent"
          maximumTrackTintColor="transparent"
          thumbTintColor="#fff"
          thumbStyle={styles.thumb}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffffa",
    marginTop: 100,
  },
  scrollContent: {
    paddingTop:80,
    alignItems: "center",
    minHeight: Dimensions.get("window").height + 100,
  },
  outerCircle: {
    backgroundColor: "#f5f3f1",
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircle: {
    justifyContent: "center",
    alignItems: "center",
  },
  percentageText: {
    fontSize: 28,
    fontWeight: "600",
  },
  label: {
    marginVertical: 0,
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
  },
  sliderWrapper: {
    position: "relative",
    justifyContent: "center",
  },
  trackBackground: {
    position: "absolute",
    backgroundColor: "#f2f0ed",
  },
  trackFill: {
    position: "absolute",
  },
   thumb: {
    height: thumbHeight,
    width: thumbWidth,
    borderRadius: thumbWidth / 2,
    backgroundColor: "#fff",
    borderWidth: 3,
    borderColor: "#000",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
    marginTop: -(thumbHeight - trackHeight) / 2,
  },
  circleLabelRow: {
  width: containerWidth + thumbWidth,  // match slider container width for alignment
},

labelLeftAligned: {
  fontSize: 20,
  marginLeft:25,
  marginTop:60
},


});
