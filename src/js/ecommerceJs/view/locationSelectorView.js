
eCommerceApp.locationSelectorView = eCommerceApp.Viewsbase.extend({
    templateId: "template-confirmStore",

    events: {
        'click .btn' : 'stepNext',
        'click .change-location' : 'selectStore'
    },

    initialize: function(){
        _.bindAll(
            this,
            'render'
        );
        this.listenTo(this.model, "change", this.render);
        this.listenTo(quantityBus, 'modal:close', this.close);
    }, 

    render: function(){
        return this.$el.html(this.template(this.model.attributes));
    },
    
    stepNext: function(){
        window.CartModel.confirmStore(
            {
                StoreSelected: true,
            });
        quantityBus.trigger('footer:location');
    },

    selectStore: function () {
        quantityBus.trigger('footer:selectStore');
    },

    close: function(){
        this.remove();
    }
});
