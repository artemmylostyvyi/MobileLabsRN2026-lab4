import React from 'react';

import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

import { formatBytes } from '../utils/fileHelpers';

export default function MemoryInfo({ memoryInfo }) {
    if (!memoryInfo) return null;

    return (
        <View style={styles.box}>
            <Text style={styles.text}>Всього: {formatBytes(memoryInfo.total)}</Text>
            <Text style={styles.text}>Вільно: {formatBytes(memoryInfo.free)}</Text>
            <Text style={styles.text}>Зайнято: {formatBytes(memoryInfo.used)}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    box: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 12,
        marginBottom: 12,
        elevation: 3,
    },

    text: {
        fontSize: 15,
        marginBottom: 4,
    },
});