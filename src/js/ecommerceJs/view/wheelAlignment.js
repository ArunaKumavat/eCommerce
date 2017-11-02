
eCommerceApp.wheelAlignment = eCommerceApp.Viewsbase.extend({
    templateId: "template-wheelAlignment",

    events: {
        'click #btnAddToCart' : 'addWheelAlignment',
        'click .cart-close' : 'stepBack'
    },

    render: function(){
        return this.$el.html(this.template(this.model.attributes));
    },

    addWheelAlignment: function(){

        if( eCommerceApp.viewItemquantity >= 2 ) {
        
        window.CartModel.AddToCart(
            {
                ProductId:  eCommerceApp.viewItemProduct,
                Qty: eCommerceApp.viewItemquantity
            });

            window.CartModel.confirmWheelAlignment({
                WheelAlignmentSelected: true,
            });

            window.CartModel.AddToCart({
                ProductId: '100SVR',
                Qty: 1,
            });

            eCommerceApp.viewItemquantity = null;
            eCommerceApp.Router.navigate("#cart",{trigger: true});
        } else {
            this.$('.error').remove();
            this.$('.modal-title-container')
                .append('<div class="error" style="margin:10px 0">Sorry, you are not eligible for this service. Add 2 or more items in your cart to activate this service.</div>')
        }
    },

    stepBack: function(){
        
        window.CartModel.AddToCart(
            {
                ProductId:  eCommerceApp.viewItemProduct,
                Qty: eCommerceApp.viewItemquantity
            });
        eCommerceApp.viewItemquantity = null;
        eCommerceApp.Router.navigate("#cart",{trigger: true});

    }
});

