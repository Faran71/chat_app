const toSnakeCaseKey = (key: string) => {
    return key.replace(/([A-Z])/g, "_$1").toLowerCase();
}

const snakeCaseObjectKeys = (obj: any) => {
    if (obj && typeof obj === "object" && !Array.isArray(obj)) {
        for (const key of Object.keys(obj)) {
        const snakeKey = toSnakeCaseKey(key);
        if (snakeKey !== key) {
            obj[snakeKey] = obj[key];
            delete obj[key];
        }
        snakeCaseObjectKeys(obj[snakeKey]);
        }
    } else if (Array.isArray(obj)) {
        for (const item of obj) {
        snakeCaseObjectKeys(item);
        }
    }
    return obj;
}

export default snakeCaseObjectKeys