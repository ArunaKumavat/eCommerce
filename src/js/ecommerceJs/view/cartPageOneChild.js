

eCommerceApp.pageOneChild = eCommerceApp.Viewsbase.extend({
    templateId: "template-cartQuantityChild",
    quantity: null,
    productSku: null,

    initialize: function(){
        _.bindAll(
            this,
            'render'
        );
        this.listenTo(this.model, "change", this.render);
        this.quantity = this.model.get('QuantityOrdered');
    },

    events: {
        'click .quantity-input-decrease' : 'updateQuantityDec',
        'click .quantity-input-increase' : 'updateQuantityInc',
        'click .delete' : 'deleteItem'
    },

    render: function(){
        this.$el.html(this.template(this.model.attributes));
        return this;
    },
    
    updateQuantityDec: function(){
        if(this.quantity > 1){
            this.quantity--;
            window.CartModel.UpdateCart(
                {
                    ProductId: this.model.get('ProductSku'),
                    Qty: this.quantity
                });
        }
    },

    updateQuantityInc: function(){
        if(this.quantity  >= 1){
            this.quantity++;
            window.CartModel.UpdateCart(
                {
                    ProductId: this.model.get('ProductSku'),
                    Qty: this.quantity
                });
        }
    },

    deleteItem: function(){
        window.CartModel.DeletefromCart(
            {
                ProductId: this.model.get('ProductSku'),
            });
    },

});
