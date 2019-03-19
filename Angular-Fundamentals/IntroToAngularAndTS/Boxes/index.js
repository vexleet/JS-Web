var Box = /** @class */ (function () {
    function Box() {
        this.boxes = [];
    }
    Box.prototype.add = function (el) {
        this.boxes = this.boxes.concat(el);
    };
    Box.prototype.remove = function () {
        this.boxes.shift();
    };
    Object.defineProperty(Box.prototype, "count", {
        get: function () {
            return this.boxes.length;
        },
        enumerable: true,
        configurable: true
    });
    return Box;
}());
var box = new Box();
box.add("Pesho");
box.add("Gosho");
console.log(box.count);
box.remove();
console.log(box.count);
