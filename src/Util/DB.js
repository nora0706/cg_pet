const STORE_NAME = 'CG_PET';
class DB{
    constructor(databaseName, version){
        this.db = null;
        this.dbName = databaseName;
        this.version = version;
    }
    open() {
        const request = window.indexedDB.open(this.dbName, this.version);
        request.onupgradeneeded = e => {
            let db = e.target.result;
            let objectStore = db.createObjectStore(STORE_NAME, {keyPath: "name"});
            objectStore.createIndex('name', 'name', { unique: true });
        };
        request.onsuccess = e => {
            this.db = request.result;
        }
    }
    save(data, setMsg) {
        const request = this.db.transaction([STORE_NAME], 'readwrite')
                            .objectStore(STORE_NAME)
                            .add(data);
        request.onsuccess = e => {
            setMsg('儲存成功');
        };

        request.onerror = e => {
            setMsg(`儲存失敗 ${e.target.error}`);
        }
    }

    load(key, callback, setMsg) {
        const request = this.db.transaction([STORE_NAME])
                            .objectStore(STORE_NAME)
                            .get(key);

        request.onsuccess = e => {
            if (request.result?.length > 0) {
                callback(request.result);
            } else {
                setMsg('並無數據');
            }
        };

        request.onerror = e => {
            setMsg(`讀取失敗 ${e.target.error}`);
        };
    }

    update(data, setMsg) {
        const request = this.db.transaction([STORE_NAME], 'readwrite')
                            .objectStore(STORE_NAME)
                            .put(data);

        request.onsuccess = e => {
            setMsg('更新成功');
        };

        request.onerror = e => {
            setMsg(`更新失敗 ${e.target.error}`);
        };
    }

    delete(key, setMsg) {
        const request = this.db.transaction([STORE_NAME], 'readwrite')
                            .objectStore(STORE_NAME)
                            .delete(key);
        request.onsuccess = e => {
            setMsg('刪除成功');
        };

        request.onerror = e => {
            setMsg(`刪除失敗 ${e.target.error}`);
        }
    }

    getList(callback, setMsg) {
        const request = this.db.transaction([STORE_NAME])
                            .objectStore(STORE_NAME)
                            .getAll()

        request.onsuccess = e => {
            if (request.result?.length > 0) {
                callback(request.result);
            } else {
                setMsg('並無數據');
            }
        };

        request.onerror = e => {
            setMsg(`讀取失敗 ${e.target.error}`);
        };
    }
}

export default DB;