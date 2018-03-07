class Storage {

    constructor(storageKey) {
        this.storageKey = storageKey || 'items';
    }

    setItems(items) {
        localStorage.setItem(this.storageKey, JSON.stringify(items));
    }

    setItem(item) {
        const savedItem = this.getItem(item.id);
        let items = this.getItems();

        if (savedItem) {
            let index = items.map((it, ix) => {
                if (savedItem.id === it.id) {
                    return ix;
                }
            }).filter(it => {
                return Number.isFinite(it);
            }).pop();

            if (Number.isFinite(index)) {
                items[index] = item;
            }

        } else {
            items.push(item);
        }

        localStorage.setItem(this.storageKey, JSON.stringify(items));
    }

    getItem(id) {
        const items = this.getItems();
        let filtereditems = items.filter((it, index) => {
            return it.id == id;
        });

        let item = null;

        if (filtereditems.length !== 0) {
            item = filtereditems[0]
        }

        return item;
    }

    removeItem(id) {
        const savedItem = this.getItem(id);

        if (savedItem) {
            let items = this.getItems();
            let index = items.map((it, ix) => {
                if (savedItem.id === it.id) {
                    return ix;
                }
            }).filter(it => {
                return Number.isFinite(it);
            }).pop();

            if (items[index]) {
                items.splice(index, 1);
            }

            localStorage.setItem(this.storageKey, JSON.stringify(items));
        }
    }

    getItems() {
        let items = [];
        let itemsStr = localStorage.getItem(this.storageKey);

        if (itemsStr !== null) {
            items = JSON.parse(itemsStr);
        }

        return items;
    }
}

export default Storage;