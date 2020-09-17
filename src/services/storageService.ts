class StorageService {
    set<T>(key:string, value: T): void {
        localStorage.setItem(key, JSON.stringify(value))
    }

    get<T>(key: string): T|null {
        const savedStr = localStorage.getItem(key)
        if(savedStr && savedStr.length > 0) {
            return JSON.parse(savedStr) as T
        }
        return null
    }
}


export default new StorageService()