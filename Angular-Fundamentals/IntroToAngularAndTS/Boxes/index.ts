class Box<T> {
    private boxes = [];

    public add(el: T | T[]) {
        this.boxes = this.boxes.concat(el);
    }

    public remove() {
        this.boxes.shift();
    }

    get count(): number {
        return this.boxes.length;
    }
}

let box = new Box<String>();
box.add("Pesho");
box.add("Gosho");
console.log(box.count);
box.remove();
console.log(box.count);

