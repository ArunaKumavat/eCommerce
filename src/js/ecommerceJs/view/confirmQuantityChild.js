

eCommerceApp.confirmQuantityChild = eCommerceApp.Viewsbase.extend({
    templateId: "template-confirmQuantityChild",
    quantity: 1,
    productSku: null,
    
    initialize: function(){
        _.bindAll(
            this,
            'render'
        );
        this.listenTo(this.model, "change", this.render);
        this.listenTo(quantityBus, 'modal:close', this.close);
        this.model.set("QuantityOrdered",1);
    },

    events: {
        'click #btnAddToCart': 'addToCart',
        'click .quantity-input-decrease' : 'updateQuantityDec',
        'click .quantity-input-increase' : 'updateQuantityInc'
    },

    render: function(){
        this.$el.html(this.template(this.model.attributes));
        return this;
    },
    
    addToCart: function (){

        eCommerceApp.viewItemProduct = this.model.get('ProductSku');
        eCommerceApp.viewItemquantity = this.quantity;

        if(window.CartModel.get("WheelAlignmentSelected") === true){
            window.CartModel.AddToCart(
                {
                    ProductId: this.model.get('ProductSku'),
                    Qty: this.quantity
                });
            eCommerceApp.viewItemquantity = null;


            if( this.model.get('CanAddToCart')){
                eCommerceApp.Router.navigate("#cart",{trigger: true});
            }
        }

        quantityBus.trigger('footer:alignment');
    },

    updateQuantityDec: function(){
        if(this.quantity > 1) {
            this.quantity--;
        }
        this.model.set('QuantityOrdered',this.quantity);
    },

    updateQuantityInc: function(){
        if(this.quantity >= 1) {
            this.quantity++;
        }
        this.model.set('QuantityOrdered',this.quantity);
    },

    close: function(){
        this.remove();
    }

});
