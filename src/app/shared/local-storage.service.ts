export class LocalStorageService {
  constructor() { }

  saveToLocalStorage(objectName: string, data: any) {
    localStorage.setItem(objectName, JSON.stringify(data));
  }

  clearLocalStorage() {
    localStorage.clear();
  }

  removeFromLocalStorage(objectName: string) {
    localStorage.removeItem(objectName);
  }

  getFromLocalStorage(objectName: string) {
    const storedData = JSON.parse(localStorage.getItem(objectName));
    return storedData ? storedData : [];
  }
}
