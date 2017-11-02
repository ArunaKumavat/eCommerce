
eCommerceApp.confirmQuantity = eCommerceApp.Viewsbase.extend({
    templateId: "template-confirmQuantity",
    events:  {
        'click #btnAddToCart' : 'addWheelAlignment',
        'click .orange' : 'viewCart',
        'click .cart-close' : 'closeModal'
    },

    initialize: function(){
        _.bindAll(
            this,
            'render'
        );
        this.listenTo(this.model, "change", this.render);
        this.listenTo(quantityBus, 'modal:close', this.close);
        this.render();
    },
    
    render: function(){
        this.$el.html(this.template(this.model.attributes));

        var subElement = [];
        if(this.model.get('ItemDetails')){
            var cartItem = new Backbone.Model(this.model.get('ItemDetails'));
            subElement.push(new eCommerceApp.confirmQuantityChild({model:cartItem}).render().el);
            this.$('.table-body').html(subElement);
        }

        return this;
    },

    viewCart:function(){
        eCommerceApp.Router.navigate("#cart",{trigger: true});
    },

    addWheelAlignment: function(){
        quantityBus.trigger('footer:alignment');
    },

    closeModal:function(){
        quantityBus.trigger('modal:close');
    },

    close: function(){
        this.remove();
    }

});
