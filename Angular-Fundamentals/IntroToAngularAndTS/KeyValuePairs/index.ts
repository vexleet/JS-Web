class KeyValuePair<T, U>{
    private key: T;
    private value: U;

    setKeyValue(key: T, value: U) {
        this.key = key;
        this.value = value;
    }

    display() {
        console.log(`key = ${this.key}, value = ${this.value}`);
    }
}

let kvp = new KeyValuePair<string, number>();
kvp.setKeyValue("Pesho", 1);
kvp.display();
