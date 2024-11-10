"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Address {
    constructor(street, nr) {
        this.street = street;
        this.nr = nr;
    }
    setStreet(street) {
        this.street = street;
    }
    getStreet() {
        return this.street;
    }
    setNr(nr) {
        this.nr = nr;
    }
    getNr() {
        return this.nr;
    }
}
exports.default = Address;
