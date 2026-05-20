export const formatBytes = (bytes) => {
    if (!bytes) return '0 B';

    const kb = bytes / 1024;
    const mb = kb / 1024;
    const gb = mb / 1024;

    if (gb >= 1) return `${gb.toFixed(2)} GB`;
    if (mb >= 1) return `${mb.toFixed(2)} MB`;
    if (kb >= 1) return `${kb.toFixed(2)} KB`;

    return `${bytes} B`;
};

export const getFileType = (item) => {
    if (!item) return 'Невідомо';
    if (item.isDirectory) return 'Папка';

    const parts = item.name.split('.');
    return parts.length > 1 ? parts.pop() : 'Файл';
};

export const getShortPath = (path, rootPath) => {
    if (!path) {
        return 'root/';
    }

    if (!rootPath) {
        return path;
    }

    return path.replace(rootPath, 'root/');
};