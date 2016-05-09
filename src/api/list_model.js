import List from './list.js';
import {Observer, Int, String, BaseType} from 'typed_observer';
import isFinite from 'lodash/isFinite';
import extend from 'lodash/extend';


class Match extends BaseType {
    constructor(name, parentObserver) {
        super(name, parentObserver);

        this.observer = new Observer()
        this.observer
            .define('author', String)
            .define('duration', String)
            .define('year', String)
            .define('name', String)
            .define('genre', String);

        this.observer.onUpdate(() => {
            this.notify();
        });

    }

    set(name, value) {
        return this.observer.set(name, value);
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
        return isFinite(+value);
    },

    getValue(value) {
        return +value;
    },

    getPureValue(value) {
        return value;
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

    sortBy(name, value) {
        if(!value) {
            value = Filter.get('sort').get(name);
            if(!value) {
                value = 1
            } else if(value == 1){
                value *= -1;
            } else {
                value = null;
            }
        }
        this.observer.set(name, value);
    }

    get(name) {
        return this.observer.get(name);
    }

    getPureValue() {
        return this.observer.serialize();
    }

}

var IntAboveZero = {
    isValid(value) {
        if(!value) {
            return true;
        }
        return isFinite(+value) && value >= 0;
    },

    getValue(value) {
        return value || 0;
    },

    getPureValue(value) {
        return value || 0;
    }
}

var Filter = new Observer()
    .define('limit', IntAboveZero, {defaultValue: 20})
    .define('page', {
        isValid(value) {
            return isFinite(value) && value > 0;
        },

        getValue(value) {
            return value;
        },
        getPureValue(value) {
            return value - 1;
        }
    }, {defaultValue: 1})/*.lockUpdate('page')*/
    .define('match', Match)
    .define('sort', Sort);

Filter.onUpdate('match', () => {
    Filter.reset('page');
});

Filter.onUpdate('sort', () => {
    Filter.reset('page');
});

Filter.sortBy = function(name, value) {
    Filter.get('sort').sortBy(name, value);
};

Filter.nextPage = function() {
    Filter.set('page', Filter.get('page') + 1);
};

Filter.prevPage = function() {
    Filter.set('page', Filter.get('page') - 1);
};

export default Filter;