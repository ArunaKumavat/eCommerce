
eCommerceApp.bookingCompletion = eCommerceApp.Viewsbase.extend({
    templateId: "template-cartOrderSummary",

    events: {
        'click .btn' : 'updateToNextPage',
        'click .cart-close' : 'close'
    },


    render: function(){
        return this.$el.html(this.template(this.model.attributes));
    },

    close: function(){
        cartBus.trigger('modal:close');
    },
});