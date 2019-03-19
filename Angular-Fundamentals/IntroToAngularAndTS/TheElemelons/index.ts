abstract class Melon {
    public weight: number;
    public melonSort: string;

    constructor(weight: number, melonSort: string) {
        this.weight = weight;
        this.melonSort = melonSort;
    }
}

class Watermelon extends Melon {
    public element: string = "Water";

    constructor(weight: number, melonSort: string) {
        super(weight, melonSort);
    }

    get elementIndex(): number {
        return this.weight * this.melonSort.length;
    }

    toString() {
        return `Element: ${this.element}\n
        Sort: ${this.melonSort}\n
        Element Index: ${this.elementIndex}\n
        `
    }
}

class Firemelon extends Melon {
    public element: string = "Fire";

    constructor(weight: number, melonSort: string) {
        super(weight, melonSort);
    }

    get elementIndex(): number {
        return this.weight * this.melonSort.length;
    }

    toString() {
        return `Element: ${this.element}\n
        Sort: ${this.melonSort}\n
        Element Index: ${this.elementIndex}\n
        `
    }
}

class Earthmelon extends Melon {
    public element: string = "Fire";

    constructor(weight: number, melonSort: string) {
        super(weight, melonSort);
    }

    get elementIndex(): number {
        return this.weight * this.melonSort.length;
    }

    toString() {
        return `Element: ${this.element}\n
        Sort: ${this.melonSort}\n
        Element Index: ${this.elementIndex}\n
        `
    }
}

class Airmelon extends Melon {
    public element: string = "Fire";

    constructor(weight: number, melonSort: string) {
        super(weight, melonSort);
    }

    get elementIndex(): number {
        return this.weight * this.melonSort.length;
    }

    toString() {
        return `Element: ${this.element} Sort: ${this.melonSort}Element Index: ${this.elementIndex}`
    }
}


let watermelon: Watermelon = new Watermelon(12.5, "Kingsize");
console.log(watermelon.toString());

// Element: Water
// Sort: Kingsize
// Element Index: 100
