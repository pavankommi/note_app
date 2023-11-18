import React from 'react';
import {
    StyleProp,
    ViewStyle,
    Animated,
    StyleSheet,
    Platform,
    ScrollView,
    Text,
    SafeAreaView,
    I18nManager,
} from 'react-native';
import { AnimatedFAB } from 'react-native-paper';
import ScreenNames from '../navigation/Constants.js'
import { MaterialCommunityIcons } from '@expo/vector-icons';

const AnimatedFab = ({
    navigation,
    animatedValue,
    visible,
    extended,
    label,
    animateFrom,
    style,
    iconMode,
}) => {
    const isIOS = Platform.OS === 'ios';

    const fabStyle = { [animateFrom]: 16 };

    return (
        <AnimatedFAB
            icon={() => <MaterialCommunityIcons name="plus" size={24} />}
            label={'Add Note'}
            extended={extended}
            onPress={() => navigation.navigate(ScreenNames.AddNoteScreen, {
                item: null
            })}
            visible={visible}
            animateFrom={'right'}
            iconMode={'dynamic'}
            style={[styles.fabStyle, style, fabStyle]}
        />
    );
};

export default AnimatedFab;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    },
    fabStyle: {
        bottom: 16,
        right: 16,
        position: 'absolute',
    },
});