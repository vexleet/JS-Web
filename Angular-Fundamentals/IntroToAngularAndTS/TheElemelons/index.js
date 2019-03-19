var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Melon = /** @class */ (function () {
    function Melon(weight, melonSort) {
        this.weight = weight;
        this.melonSort = melonSort;
    }
    return Melon;
}());
var Watermelon = /** @class */ (function (_super) {
    __extends(Watermelon, _super);
    function Watermelon(weight, melonSort) {
        var _this = _super.call(this, weight, melonSort) || this;
        _this.element = "Water";
        return _this;
    }
    Object.defineProperty(Watermelon.prototype, "elementIndex", {
        get: function () {
            return this.weight * this.melonSort.length;
        },
        enumerable: true,
        configurable: true
    });
    Watermelon.prototype.toString = function () {
        return "Element: " + this.element + "\n\n        Sort: " + this.melonSort + "\n\n        Element Index: " + this.elementIndex + "\n\n        ";
    };
    return Watermelon;
}(Melon));
var Firemelon = /** @class */ (function (_super) {
    __extends(Firemelon, _super);
    function Firemelon(weight, melonSort) {
        var _this = _super.call(this, weight, melonSort) || this;
        _this.element = "Fire";
        return _this;
    }
    Object.defineProperty(Firemelon.prototype, "elementIndex", {
        get: function () {
            return this.weight * this.melonSort.length;
        },
        enumerable: true,
        configurable: true
    });
    Firemelon.prototype.toString = function () {
        return "Element: " + this.element + "\n\n        Sort: " + this.melonSort + "\n\n        Element Index: " + this.elementIndex + "\n\n        ";
    };
    return Firemelon;
}(Melon));
var Earthmelon = /** @class */ (function (_super) {
    __extends(Earthmelon, _super);
    function Earthmelon(weight, melonSort) {
        var _this = _super.call(this, weight, melonSort) || this;
        _this.element = "Fire";
        return _this;
    }
    Object.defineProperty(Earthmelon.prototype, "elementIndex", {
        get: function () {
            return this.weight * this.melonSort.length;
        },
        enumerable: true,
        configurable: true
    });
    Earthmelon.prototype.toString = function () {
        return "Element: " + this.element + "\n\n        Sort: " + this.melonSort + "\n\n        Element Index: " + this.elementIndex + "\n\n        ";
    };
    return Earthmelon;
}(Melon));
var Airmelon = /** @class */ (function (_super) {
    __extends(Airmelon, _super);
    function Airmelon(weight, melonSort) {
        var _this = _super.call(this, weight, melonSort) || this;
        _this.element = "Fire";
        return _this;
    }
    Object.defineProperty(Airmelon.prototype, "elementIndex", {
        get: function () {
            return this.weight * this.melonSort.length;
        },
        enumerable: true,
        configurable: true
    });
    Airmelon.prototype.toString = function () {
        return "Element: " + this.element + " Sort: " + this.melonSort + "Element Index: " + this.elementIndex;
    };
    return Airmelon;
}(Melon));
var watermelon = new Watermelon(12.5, "Kingsize");
console.log(watermelon.toString());
// Element: Water
// Sort: Kingsize
// Element Index: 100
