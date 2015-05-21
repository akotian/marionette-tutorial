ContactManager.module("Entities", function(
  Entities, ContactManager, Backbone, Marionette, $, _) {

   Entities.Contact = Backbone.Model.extend({
     urlRoot: "contacts"
   });
   Entities.ContactCollection = Backbone.Collection.extend({
     url: "contacts",
     model: Entities.Contact,
     comparator: "firstName"
   });

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
   };
   var API = {
     getContactEntities : function() {
       if (contacts === undefined) {
         initializeContacts();
       }
       return contacts;
     }
   };
  ContactManager.reqres.setHandler("contact:entities", function() {
    return API.getContactEntities();
  });
});
