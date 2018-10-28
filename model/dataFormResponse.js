'use ctrict';
 class responseData {


     constructor() {
         this.dataComponent = {};
     };

     setDataComponent(key, value) {
         this.dataComponent[key] = value;
     }
 }
module.exports = responseData;