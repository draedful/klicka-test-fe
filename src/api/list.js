import Http from './http.js';
import Model from './list_model.js';
import isFunction from 'lodash/isFunction';
import each from 'lodash/each';

var List = {
    length: 0,
    data: [],
    cbs:[],
    getData() {
        return this.data;
    },
    onUpdate(cb) {
          if(isFunction(cb)) {
              this.cbs.push(cb);
          }
    },
    extendUpdate() {
          each(this.cbs, (cb) => {
             cb();
          });
    },
    load() {
        if(Model.isValid()) {
            return Http('find', Model.serialize(),{method: 'POST'});
        }
        return Promise.reject('Params invalid');
    },
    update() {
        return this.load().then((data)=>{
            this.length = data.count;
            this.data = data.tracks;
            this.extendUpdate();
            return this.data;
        }).catch(function(e) {
            console.log('Failed update', e);
        })
    },
    next() {
        Model.nextPage();
        return this.load(Model.serialize()).then((data)=>{

            // слияние массива без потери ссылки
            Array.prototype.push.apply(this.data, data);

            this.extendUpdate();

            return this.data;
        }).catch(function(e) {
            console.log('Failed next', e);
        })
    }
};

Model.onUpdate(function() {
   List.update();
});

export default List;