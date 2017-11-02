eCommerceApp.pageOneserviceChild = eCommerceApp.Viewsbase.extend({
    templateId: "template-wheelAlignmentChild",
    events: {
        'click .delete' : 'deleteItem'
    },

    render: function(){
        return this.$el.html(this.template(this.model.attributes));
    },

    deleteItem: function(){
        window.CartModel.DeletefromCart(
            {
                ProductId: this.model.get('ServiceSku'),
            });
    },


});
