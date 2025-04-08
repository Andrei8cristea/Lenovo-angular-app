var hi = "Hello";
console.log(hi);
var car = /** @class */ (function () {
    function car(name) {
        this.name = name;
    }
    return car;
}());
var mycar = new car("Dacia");
