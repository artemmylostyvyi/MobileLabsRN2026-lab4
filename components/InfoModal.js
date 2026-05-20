import React from 'react';

import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    StyleSheet,
} from 'react-native';

import {
    formatBytes,
    getFileType,
} from '../utils/fileHelpers';

export default function InfoModal({ item, onClose }) {
    return (
        <Modal visible={!!item} transparent animationType="fade">
            <View style={styles.wrapper}>
                <View style={styles.modal}>
                    <Text style={styles.title}>Інформація</Text>

                    <Text style={styles.text}>Назва: {item?.name}</Text>
                    <Text style={styles.text}>Тип: {getFileType(item)}</Text>
                    <Text style={styles.text}>Розмір: {formatBytes(item?.size)}</Text>

                    <Text style={styles.text}>
                        Дата зміни:{' '}
                        {item?.modificationTime
                            ? new Date(item.modificationTime * 1000).toLocaleString()
                            : 'Невідомо'}
                    </Text>

                    <TouchableOpacity style={styles.button} onPress={onClose}>
                        <Text style={styles.buttonText}>Ок</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        padding: 20,
    },

    modal: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 16,
    },

    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },

    text: {
        fontSize: 16,
        marginBottom: 8,
    },

    button: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 15,
    },

    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});