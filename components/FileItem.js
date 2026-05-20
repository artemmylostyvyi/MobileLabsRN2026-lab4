import React from 'react';

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

export default function FileItem({ item, onOpen, onInfo, onDelete }) {
    return (
        <View style={styles.item}>
            <TouchableOpacity
                style={styles.main}
                onPress={() => onOpen(item)}
            >
                <Text style={styles.name}>
                    {item.isDirectory ? '📁' : '📄'} {item.name}
                </Text>

                <Text style={styles.type}>
                    {item.isDirectory ? 'Папка' : 'Файл'}
                </Text>
            </TouchableOpacity>

            <View style={styles.actions}>
                <TouchableOpacity
                    style={styles.info}
                    onPress={() => onInfo(item)}
                >
                    <Text style={styles.actionText}>Info</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.delete}
                    onPress={() => onDelete(item)}
                >
                    <Text style={styles.actionText}>Del</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 12,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        elevation: 2,
    },

    main: {
        flex: 1,
    },

    name: {
        fontSize: 17,
        fontWeight: 'bold',
    },

    type: {
        fontSize: 13,
        color: '#666',
        marginTop: 4,
    },

    actions: {
        flexDirection: 'row',
        gap: 8,
    },

    info: {
        backgroundColor: '#28a745',
        padding: 8,
        borderRadius: 8,
    },

    delete: {
        backgroundColor: '#dc3545',
        padding: 8,
        borderRadius: 8,
    },

    actionText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});