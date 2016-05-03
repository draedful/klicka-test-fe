import Http from './http.js';
import Model from './list_model.js';
import isFunction from 'lodash/isFunction';
import each from 'lodash/each';

var List = {
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
            return Http('find', Model.serialize());
        }
        return Promise.reject('Params invalid');
    },
    update() {
        return this.load().then((data)=>{

            this.data = data;
            this.extendUpdate();
            return this.data;
        }).catch(function(e) {
            console.log('Failed update', e);
        })
    },
    next() {
        Model.nextPage();
        return this.load(Model.serialize()).then((data)=>{

            Array.prototype.push.apply(this.data, data); // concat without loss links

            this.extendUpdate();
            return this.data;
        }).catch(function(e) {
            console.log('Failed next', e);
        })
    }
};

Model.onUpdate(function() {
    // Тут потенциальная возможность для утечки, ибо завязываем скоуп колбека на модель,
    // в итоге сборщик мусора не сможет удалить функцию пока жива модель, а модель не удалится пока жива функиця
   List.update();
});

export default List;