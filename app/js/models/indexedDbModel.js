/**
 * Application model
 */

var app = window.app || {};

(function (global) {

   /**
    * Prefixes of implementation
    */
   global.indexedDB = global.indexedDB || global.mozIndexedDB || global.webkitIndexedDB || global.msIndexedDB;

   /**
    * Prefixes of window.IDB objects
    */
   global.IDBTransaction = global.IDBTransaction || global.webkitIDBTransaction || global.msIDBTransaction;
   global.IDBKeyRange = global.IDBKeyRange || global.webkitIDBKeyRange || global.msIDBKeyRange;

   if (!global.indexedDB) {
      global.alert("Your browser doesn't support a stable version of IndexedDB.");
   }

   var db;
   var request= global.indexedDB.open("Presets", 1);
   var presetsData = [
      {
         id:'123',
         scaled : {
            width :  0 ,
            height : 0
         },
         translated: {
            x : 0,
            y : 0,
            z : 0 //
         },
         rotated : 0,
         fliped : {
            horizontal: 0,
            vertical : 0,
         },
         moved : {
            x : 0,
            y : 0,
            z : 0
         }
      }
   ];

   request.onSuccess= function(event) {
      db = request.result;
      console.log("success: "+ db);
   };

   /**
    * Updating  IndexedDb : name of table "presets" , keys : "id"-values
    * @param  {Event} event
    * @return
    */
   request.onUpgradeNeeded= function(event) {
      var db = event.target.result;
      var objectStore = db.createObjectStore("presets", {keyPath: "id"});

      for (var i in presetsData) {
         objectStore.add(presetsData[i]);
      }
   };

   request.onError= function(event) {
      console.log("error: ");
   };

   app.model = {

       /**
        * Model object - keeps image properties
        * @type {Object}
        */
      defaults: {
         id:'',

         scaled : {
            width :  0 ,
            height :  0
         },
         translated: {
            x : 0,
            y : 0,
            z : 0 //
         },
         rotated : 0,
         fliped : {
            horizontal: 0,
            vertical : 0,
         },
         moved : {
            x : 0,
            y : 0,
            z : 0
         }
      },

      /**
       * Adds item to DB
       * @param {Object} obj
       */
      add: function(obj) {
         var request = db.transaction(["presets"], "readwrite")
         .objectStore("presets")
         .add({ id: obj.id, scaled: obj.scaled, translated: obj.translated, rotated: obj.rotated, fliped:obj.fliped, moved:obj.moved });

         request.onSuccess = function(event) {
            console.log("Presets has been added to your database.");
         };

         request.onError = function(event) {
            console.log("Unable to add data\r\nPresets is aready exist in your database! ");
         };
      },

      /**
       * Retrieves data from IndexedDb by its id
       * @param  {String} id
       * @return
       */
      read: function(id) {
         var transaction = db.transaction(["presets"]);
         var objectStore = transaction.objectStore("presets");
         var request = objectStore.get(id);

         request.onError = function(event) {
            console.log("Unable to retrieve presets from database!");
         };

         request.onSuccess = function(event) {
            // Do something with the request.result!
            if(request.result) {
               console.log("scaled: " + request.result.scaled + ", translated: " + request.result.translated + ", rotated: " + request.result.rotated+ ", fliped: "+ request.result.fliped +", moved: " + request.result.moved);
            }

            else {
               console.log("Presets couldn't be found in your database!");
            }
         };
      },

      /**
       * Retrieves all the data in IndexedDb
       * @return {}
       */
      readAll: function() {
         var objectStore = db.transaction("presets").objectStore("presets");

         objectStore.openCursor().onSuccess = function(event) {
            var cursor = event.target.result;

            if (cursor) {
               console.log("scaled: " + request.result.scaled + ", translated: " + request.result.translated + ", rotated: " + request.result.rotated+ ", fliped: "+ request.result.fliped +", moved: " + request.result.moved);
               cursor.continue();
            }

            else {
               console.log("No more entries!");
            }
         };
      },

      /**
       * Removes an item in IndexedDb by id
       * @param  {String} id
       * @return {}
       */
      remove: function(id) {
         var request = db.transaction(["presets"], "readwrite")
         .objectStore("presets")
         .delete("id");

         request.onSuccess = function(event) {
            console.log("Presets entry has been removed from your database.");
         };
      }

   };

})(window);
