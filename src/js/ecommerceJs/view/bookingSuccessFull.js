
eCommerceApp.bookingSuccessFull = eCommerceApp.Viewsbase.extend({
    templateId: "template-cartSuccess",

    events: {
        'click .blue' : 'close'
    },

    render: function(){
        console.log(this.model);
        return this.$el.html(this.template(this.model.attributes));
    },

    close: function(){
        thankYouBus.trigger('modal:close');
    }
});