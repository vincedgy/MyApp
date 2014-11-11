/**
 * Created by Vincent on 08/11/2014.
 */
function Pet(newName) {
    var sex = '';
    var name = newName;

    if (newName && typeof newName === 'string') name = newName;

    this.setName = function (newName) {
        name = newName;
    };

    this.getName = function () {
        return name;
    };

    this.getSex = function () {
        return sex;
    };

    this.setSex = function (newSex) {
        if (typeof newSex == 'string' && (newSex.toLowerCase() == 'male' || newSex.toLowerCase() == 'female')) {
            sex = newSex;
        }
    };

    this.toString = function () {
        var result = '';
        result = sex;
        result += ', ';
        result += name;
        return result;
    };

    this.toCSV = function (car) {
        var result = '';
        if (car == undefined) car = ',';
        result = sex + car + name;
        return result;
    };
}

Pet.prototype.toCSV = function (car) {
    var self = this;
    var result = '';
    if (car == undefined) car = ',';
    for ( var key in self ) {
        if (typeof self[key] !== 'function') {
            if (result.length > 0) result += car;
            result += self[key];
        }
    }
    return result;
};

var pet = new Pet('Luc');

console.log('- 1 :' + pet.toString());                  // Oliver

pet.setName('Oliver');
pet.setSex('male');

console.log(pet.toCSV());

console.log('- 2 :' + pet.toString());


