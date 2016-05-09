import Http from './../helpers/http.js';
import Model from './list_model.js';
import isFunction from 'lodash/isFunction';
import each from 'lodash/each';

var List = {
    length: 0,
    data: [],
    cbs:[],
    get pages() {
        return Math.round(this.length / Model.get('limit'));
    },

    get currentPage() {
        return Model.get('page');
    },
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
    allowNext() {
        return this.pages >= this.currentPage;
    },
    allowPrev() {
        return this.currentPage >= 0;
    },
    next() {
        Model.nextPage();
    },
    prev() {
        Model.prevPage();
    },
    toPage(page) {
        if(page <= this.pages) {
            Model.set('page', page)
        }
    }
};

Model.onUpdate(function() {
   List.update();
});

export default List;