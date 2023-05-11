import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";

import DateTimePicker from "@react-native-community/datetimepicker";
import { Calendar } from "react-native-calendars";

import { useNavigation } from "@react-navigation/native";

import {
  setIsBtnAmisAndDateOn,
  setTimeEvent,
  setDateEvent,
} from "../slices/navSlice";
import { useDispatch } from "react-redux";

const AddDateToEvent = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  };

  const onChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setTime(currentTime);
  };
  const [selectedDate, setSelectedDate] = useState(getCurrentDate());

  const onDateChange = (date) => {
    setSelectedDate(date.dateString);
  };

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      dispatch(setIsBtnAmisAndDateOn(true));
      
    });
    const subscribe = navigation.addListener("blur", () => {
      setTimeout(() => {
        dispatch(setIsBtnAmisAndDateOn(false));
      }, 270);

      
    });

    return () => {
      //demontage des composants
      unsubscribe();
      subscribe();
    };
  }, [navigation]);

  const RegisterDateAndTimeInfo = (time) => {
    const hours = ("0" + time.getHours()).slice(-2);
    const minutes = ("0" + time.getMinutes()).slice(-2);
    dispatch(setDateEvent(selectedDate));
    dispatch(setTimeEvent(`${hours}:${minutes}`));
  };

  const renderDay = ({ date, state, marking }) => {
    const isToday = state === "today";
    const isSelected = marking.selected;

    const textColor = isSelected ? "#52C234" : isToday ? "#8AC926" : "#000";

    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: textColor }}>{date.day}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#ffffff",
      }}
    >
      <View>
        <Calendar
          style={styles.calendar}
          onDayPress={onDateChange}
          markedDates={{
            [selectedDate]: { selected: true },
          }}
          theme={{
            todayTextColor: "#52C234",
            selectedDayBackgroundColor: "#52C234",
            arrowColor: "#52C234",
          }}
          renderDay={renderDay}
        />

        <View style={styles.containerTimeAndResult}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 20,
              }}
            >
              Date sélectionnée :
            </Text>
            {selectedDate !== "" && (
              <Text
                style={{
                  fontSize: 20,
                }}
              >
                {selectedDate}
              </Text>
            )}
          </View>
          <View
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                fontSize: 20,
              }}
            >
              Horaire :
            </Text>
            <DateTimePicker
              value={time}
              mode="time"
              display="default"
              onChange={onChange}
            />
          </View>
        </View>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("CreateEventLegende");
            RegisterDateAndTimeInfo(time);
          }}
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
            marginLeft: 10,
            marginRight: 10,
            marginBottom: 10,
            marginTop: 30,
            borderRadius: 10,
            backgroundColor: "#52C234",
          }}
        >
          <Text style={{ color: "#ffffff", fontSize: 20 }}>Valider</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddDateToEvent;

const styles = StyleSheet.create({
  calendar: {
    width: "100%",
    borderBottomWidth: 0.5,
    borderColor: "#00000010",
    paddingBottom: 30,
  },
  containerTimeAndResult: {
    padding: 30,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    marginTop: 30,
    borderRadius: 10,
    backgroundColor: "#00000010",
    gap: 30,
  },
});
