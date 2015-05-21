ContactManager.module("ContactsApp.List", function(
  List,ContactManager, Backbone, Marionette, $, _) {

    List.Contact = Marionette.ItemView.extend({
      template: "#contact-list-item",
      tagName: "tr",
      events :{
        'click': 'highlightName',
        'click button.js-delete': 'deleteClicked',
        'click td a.js-show': 'showClicked'
      },
      highlightName: function(e) {
        this.$el.toggleClass("warning")
      },
      deleteClicked: function(e) {
        e.stopPropagation();
        this.trigger("contact:delete", this.model);
      },
      showClicked: function(e) {
        e.preventDefault();
        e.stopPropagation();
        this.trigger("contact:show", this.model);
      },
      remove: function(e) {
        var self = this;
        this.$el.fadeOut(function() {
          Marionette.ItemView.prototype.remove.call(self);
        });
      }
    });

    List.Contacts = Marionette.CompositeView.extend({
      tagName: "table",
      className: "table table-hover",
      childView: List.Contact,
      template: "#contact-list",
      childViewContainer: "tbody",
      onChildviewContactDelete: function() {
        this.$el.fadeOut(1000, function() {
          $(this).fadeIn(1000);
        });
      }
    })

})
