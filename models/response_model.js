module.exports = class ResponseModel {
    constructor({ statusCode, data, error, message }) {
       this.statusCode = statusCode;
       this.data = data;
       this.error = error;
       this.message = message;
     }
   
     toJson() {
       return {
         statusCode: this.statusCode,
         error: this.error,
         message: this.message,
         data: this.data,
       };
     }
   };
   