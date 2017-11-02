

eCommerceApp.pageOne = eCommerceApp.Viewsbase.extend({
    templateId: "template-cartQuantity",

    initialize: function(){
        _.bindAll(
            this,
            'render'
        );
        this.listenTo(this.model, "change:models", this.render);
    },

    events: {
        'click .orange' : 'updateToNextPage',
        'click #applyCode': 'applyPromoCode',
        'click .cart-close' : 'close'
    },

    render: function(){
        this.$el.html(this.template(this.model.attributes));
        var subElement = [];
        var serviceElem = [];

        if(_.isEmpty(this.model.get('OrderItems')) && _.isEmpty(this.model.get('ServiceItems'))) {
            subElement.push('<div class="error">Your shopping cart is currently empty.</div>');
            this.$('.cart-table').html(subElement);
            this.$('.btn.orange').hide();

        } else {
            _.each(this.model.get('OrderItems'), function (item) {
                var cartItem = new Backbone.Model(item);
                subElement.push(new eCommerceApp.pageOneChild({model: cartItem}).render().el);
            }, this);
            this.$('.table-row').html(subElement);
        }

        if(this.model.get('ServiceItems')){
            _.each(this.model.get('ServiceItems'), function (item) {
                var serviceItem = new Backbone.Model(item);
                serviceElem.push(new eCommerceApp.pageOneserviceChild({model:serviceItem}).render());
            }, this);

            this.$('.service').html(serviceElem);
        }

        return this;
    },

    updateToNextPage: function(){
        var self = this;
        window.CheckCustomerModel.fetch({
            success: function (response) {
                var session = response;
                if( session.get('ExpiryCustomerDetail') === false) {
                    if(_.isEmpty(self.model.get('OrderItems')) && _.isEmpty(self.model.get('ServiceItems'))) {
                        cartBus.trigger('modal:close');
                    } else {
                        cartBus.trigger('footer:step2');
                    }
                } else {
                    window.CartModel.fetch({
                        success: function(){
                            if(_.isEmpty(self.model.get('OrderItems')) && _.isEmpty(self.model.get('ServiceItems'))) {
                                cartBus.trigger('modal:close');
                            } else {
                                cartBus.trigger('footer:step2');
                            }
                        }
                    });
                }
            }
        });
    },

    close:function(){
        cartBus.trigger('modal:close');
    },

    applyPromoCode: function(){
        if(this.$('.promocode').val()){
            window.CartModel.applyDiscount({
                    PromoCode: this.$('.promocode').val(),
                });
        }
    }
});