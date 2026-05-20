import React from 'react';

import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Modal,
    StyleSheet,
} from 'react-native';

export default function EditorModal({
                                        file,
                                        text,
                                        setText,
                                        onSave,
                                        onClose,
                                    }) {
    return (
        <Modal visible={!!file} animationType="slide">
            <View style={styles.container}>
                <Text style={styles.title}>
                    {file?.name}
                </Text>

                <TextInput
                    style={styles.input}
                    value={text}
                    onChangeText={setText}
                    multiline
                    textAlignVertical="top"
                />

                <TouchableOpacity style={styles.button} onPress={onSave}>
                    <Text style={styles.buttonText}>Зберегти</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                    <Text style={styles.buttonText}>Закрити</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 50,
        backgroundColor: '#f5f5f5',
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 15,
    },

    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 12,
        padding: 12,
        backgroundColor: '#fff',
        fontSize: 16,
    },

    button: {
        backgroundColor: '#007bff',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 15,
    },

    cancelButton: {
        backgroundColor: '#555',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },

    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});