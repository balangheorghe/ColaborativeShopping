import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {useSafeArea} from "react-native-safe-area-context";

const GroupsScreen = () => {
    const insets = useSafeArea();
    return (
        <View style={{paddingTop: insets.top}}>
            <Text style={styles.text}>Groups Screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 48
    }
});

export default GroupsScreen;
