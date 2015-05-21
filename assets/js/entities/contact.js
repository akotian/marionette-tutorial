ContactManager.module("Entities", function(
  Entities, ContactManager, Backbone, Marionette, $, _) {

   Entities.Contact = Backbone.Model.extend({
     urlRoot: "contacts"
   });
   Entities.configureStorage("ContactManager.Entities.Contact");

   Entities.ContactCollection = Backbone.Collection.extend({
     url: "contacts",
     model: Entities.Contact,
     comparator: "firstName"
   });
   Entities.configureStorage("ContactManager.Entities.ContactCollection");

   var contacts;

   var initializeContacts = function(){
     contacts = new Entities.ContactCollection([
            {
              id: 1,
              firstName: "Megaice",
              lastName: "Cambell",
              phoneNumber: "777-666-7876"
            },
            {
              id: 2,
              firstName: "Talice 1",
              lastName: "Cambell",
              phoneNumber: "777-666-7876"
            },
            {
              id: 3,
              firstName: "Alice 2",
              lastName: "Cambell",
              phoneNumber: "777-666-7876"
            },
       ])
       contacts.forEach(function(contact) {
         contact.save();
       });
   };
   var API = {
     getContactEntities : function() {
       var contacts = new Entities.ContactCollection();
       contacts.fetch();
       if (contacts.length === 0) {
         return initializeContacts();
       }
       return contacts;
     },
     getContactEntity: function(id) {
       var contact = new Entities.Contact({'id':id})
       var defer = $.Deferred();
       setTimeout(function(){
         contact.fetch({
           success: function(data) {
             defer.resolve(data);
           },
           error: function(data) {
             defer.resolve(undefined);
           }
         });
       }, 2000);
       return defer.promise();
     }
   };
  ContactManager.reqres.setHandler("contact:entities", function() {
    return API.getContactEntities();
  });
  ContactManager.reqres.setHandler("contact:entity", function(id) {
    return API.getContactEntity(id);
  });
});
