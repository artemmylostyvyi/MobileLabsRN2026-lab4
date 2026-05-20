import React, { useEffect, useState } from 'react';

import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from 'react-native';

import * as FileSystem from 'expo-file-system/legacy';

import FileItem from '../components/FileItem';
import CreateModal from '../components/CreateModal';
import InfoModal from '../components/InfoModal';
import EditorModal from '../components/EditorModal';
import MemoryInfo from '../components/MemoryInfo';

import { getShortPath } from '../utils/fileHelpers';

const ROOT_DIR = `${FileSystem.documentDirectory}FileManager/`;

export default function FileManagerScreen() {
    const [currentPath, setCurrentPath] = useState(ROOT_DIR);
    const [items, setItems] = useState([]);
    const [memoryInfo, setMemoryInfo] = useState(null);

    const [createModalVisible, setCreateModalVisible] = useState(false);
    const [createType, setCreateType] = useState('');
    const [name, setName] = useState('');
    const [content, setContent] = useState('');

    const [openedFile, setOpenedFile] = useState(null);
    const [fileText, setFileText] = useState('');

    const [infoItem, setInfoItem] = useState(null);


    useEffect(() => {
        prepareRoot();
        loadMemoryInfo();
    }, []);

    useEffect(() => {
        loadDirectory();
    }, [currentPath]);

    const prepareRoot = async () => {
        try {
            const info = await FileSystem.getInfoAsync(ROOT_DIR);

            if (!info.exists) {
                await FileSystem.makeDirectoryAsync(ROOT_DIR, {
                    intermediates: true,
                });
            }

            setCurrentPath(ROOT_DIR);
        } catch (error) {
            Alert.alert('Помилка', 'Не вдалося підготувати робочу папку');
        }
    };

    const loadDirectory = async () => {
        try {
            const result = await FileSystem.readDirectoryAsync(currentPath);

            const data = await Promise.all(
                result.map(async (item) => {
                    const path = currentPath + item;
                    const info = await FileSystem.getInfoAsync(path);

                    return {
                        name: item,
                        path,
                        isDirectory: info.isDirectory,
                        size: info.size || 0,
                        modificationTime: info.modificationTime,
                    };
                })
            );

            data.sort((a, b) => {
                if (a.isDirectory && !b.isDirectory) return -1;
                if (!a.isDirectory && b.isDirectory) return 1;
                return a.name.localeCompare(b.name);
            });

            setItems(data);
        } catch (error) {
            Alert.alert('Помилка', 'Не вдалося прочитати директорію');
        }
    };

    const loadMemoryInfo = async () => {
        try {
            const free = await FileSystem.getFreeDiskStorageAsync();
            const total = await FileSystem.getTotalDiskCapacityAsync();

            setMemoryInfo({
                free,
                total,
                used: total - free,
            });
        } catch (error) {
            setMemoryInfo(null);
        }
    };

    const openCreateModal = (type) => {
        setCreateType(type);
        setName('');
        setContent('');
        setCreateModalVisible(true);
    };

    const createItem = async () => {
        if (!name.trim()) {
            Alert.alert('Помилка', 'Введіть назву');
            return;
        }

        try {
            if (createType === 'folder') {
                await FileSystem.makeDirectoryAsync(
                    `${currentPath}${name.trim()}`,
                    {
                        intermediates: true,
                    }
                );
            }

            if (createType === 'file') {
                const fileName = name.endsWith('.txt')
                    ? name
                    : name + '.txt';

                await FileSystem.writeAsStringAsync(
                    currentPath + fileName,
                    content
                );
            }

            setCreateModalVisible(false);
            loadDirectory();
            loadMemoryInfo();
        } catch (error) {
            Alert.alert('Помилка', 'Не вдалося створити об’єкт');
        }
    };

    const openItem = async (item) => {
        if (item.isDirectory) {
            setCurrentPath(item.path + '/');
            return;
        }

        if (!item.name.endsWith('.txt')) {
            Alert.alert('Файл', 'Можна відкривати тільки .txt файли');
            return;
        }

        try {
            const text = await FileSystem.readAsStringAsync(item.path);

            setOpenedFile(item);
            setFileText(text);
        } catch (error) {
            Alert.alert('Помилка', 'Не вдалося відкрити файл');
        }
    };

    const saveFile = async () => {
        try {
            await FileSystem.writeAsStringAsync(
                openedFile.path,
                fileText
            );

            Alert.alert('Успішно', 'Файл збережено');
            setOpenedFile(null);
            loadDirectory();
            loadMemoryInfo();
        } catch (error) {
            Alert.alert('Помилка', 'Не вдалося зберегти файл');
        }
    };

    const deleteItem = (item) => {
        Alert.alert(
            'Видалення',
            `Видалити "${item.name}"?`,
            [
                {
                    text: 'Скасувати',
                    style: 'cancel',
                },
                {
                    text: 'Видалити',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await FileSystem.deleteAsync(
                                item.path,
                                {
                                    idempotent: true,
                                }
                            );

                            loadDirectory();
                            loadMemoryInfo();
                        } catch (error) {
                            Alert.alert('Помилка', 'Не вдалося видалити');
                        }
                    },
                },
            ]
        );
    };

    const goBack = () => {
        if (currentPath === ROOT_DIR) {
            return;
        }

        const path = currentPath.endsWith('/')
            ? currentPath.slice(0, -1)
            : currentPath;

        const parts = path.split('/');
        parts.pop();

        setCurrentPath(parts.join('/') + '/');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                File Manager
            </Text>

            <MemoryInfo memoryInfo={memoryInfo} />

            <Text style={styles.path}>
                Поточний шлях: {getShortPath(currentPath, ROOT_DIR)}
            </Text>

            <View style={styles.buttons}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={goBack}
                >
                    <Text style={styles.buttonText}>Вгору</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => openCreateModal('folder')}
                >
                    <Text style={styles.buttonText}>+ Папка</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => openCreateModal('file')}
                >
                    <Text style={styles.buttonText}>+ Файл</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={items}
                keyExtractor={(item) => item.path}
                renderItem={({ item }) => (
                    <FileItem
                        item={item}
                        onOpen={openItem}
                        onInfo={setInfoItem}
                        onDelete={deleteItem}
                    />
                )}
                ListEmptyComponent={
                    <Text style={styles.empty}>
                        Папка порожня
                    </Text>
                }
            />

            <CreateModal
                visible={createModalVisible}
                type={createType}
                name={name}
                setName={setName}
                content={content}
                setContent={setContent}
                onCreate={createItem}
                onClose={() => setCreateModalVisible(false)}
            />

            <EditorModal
                file={openedFile}
                text={fileText}
                setText={setFileText}
                onSave={saveFile}
                onClose={() => setOpenedFile(null)}
            />

            <InfoModal
                item={infoItem}
                onClose={() => setInfoItem(null)}
            />
        </View>
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
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 15,
    },

    path: {
        fontSize: 14,
        marginBottom: 12,
        color: '#333',
    },

    buttons: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 15,
    },

    button: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 10,
        alignItems: 'center',
    },

    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },

    empty: {
        textAlign: 'center',
        marginTop: 30,
        color: '#777',
    },
});