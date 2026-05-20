import React from 'react';

import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Modal,
    StyleSheet,
} from 'react-native';

export default function CreateModal({
                                        visible,
                                        type,
                                        name,
                                        setName,
                                        content,
                                        setContent,
                                        onCreate,
                                        onClose,
                                    }) {
    return (
        <Modal visible={visible} transparent animationType="slide">
            <View style={styles.wrapper}>
                <View style={styles.modal}>
                    <Text style={styles.title}>
                        {type === 'folder' ? 'Нова папка' : 'Новий txt файл'}
                    </Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Назва"
                        value={name}
                        onChangeText={setName}
                    />

                    {type === 'file' && (
                        <TextInput
                            style={[styles.input, styles.textArea]}
                            placeholder="Початковий текст"
                            value={content}
                            onChangeText={setContent}
                            multiline
                        />
                    )}

                    <TouchableOpacity style={styles.button} onPress={onCreate}>
                        <Text style={styles.buttonText}>Створити</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                        <Text style={styles.buttonText}>Скасувати</Text>
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

    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#fff',
    },

    textArea: {
        height: 120,
        textAlignVertical: 'top',
    },

    button: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },

    cancelButton: {
        backgroundColor: '#555',
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },

    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});