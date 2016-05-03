import List from './list.js';
import {Observer, Int, String, BaseType} from 'typed_observer';
import isFinite from 'lodash/isFinite';


class Match extends BaseType {
    constructor(name, parentObserver) {
        super(name, parentObserver);

        this.observer = new Observer()
            .define('author', String)
            .define('duration', String)
            .define('year', String)
            .define('name', String)
            .define('genre', String);

        this.observer.onUpdate(() => {
            this.notify();
        });

    }

    get(name) {
        return this.observer.get(name);
    }

    getPureValue() {
        return this.observer.serialize();
    }
}

var sortType = {
    isValid(value) {
        return isFinite(value);
    },

    getValue(value) {
        return value;
    },

    getPureValue(value) {
        return value >= 0 ? 1 : -1;
    }
};

class Sort extends BaseType {
    constructor(name, parentObserver) {
        super(name, parentObserver);

        this.observer = new Observer()
            .define('author', sortType)
            .define('duration', sortType)
            .define('year', sortType)
            .define('name', sortType)
            .define('genre', sortType);

        this.observer.onUpdate(() => {
            this.notify();
        });

    }

    get(name) {
        return this.observer.get(name);
    }

    getPureValue() {
        return this.observer.serialize();
    }

}



var Filter = new Observer()
    .define('limit', Int)
    .define('page', Int, {defaultValue:0}).lock('page')
    .define('match', Match)
    .define('sort', Sort);

Filter.onUpdate('match', () => {
    Filter.set('page', 0);
});

Filter.onUpdate('sort', () => {
    Filter.set('page', 0);
});


Filter.nextPage = function() {
    Filter.set('page', Filter.get('page') + 1);
};

export default Filter;