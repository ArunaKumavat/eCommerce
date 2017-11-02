
eCommerceApp.storeSelectorView = eCommerceApp.Viewsbase.extend({
    templateId: "template-selectStore",
    model: eCommerceApp.AppStoreModel,
    postcode:null,
    storeID:null,
    storeList:null,
    events: {
        'click .search-Store' : 'searchStore',
        'click .select-me' : 'selectStore',
        'click .modal-footer .btn' : 'stepNext',
        'click .cart-close' : 'closeModal'
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
        this.storeList = {"storeList": this.model.attributes};
        return this.$el.html(this.template(this.storeList));
    },

    searchStore: function(){
        this.postcode = this.$('#postcode-modal').val();

        this.model.searchStore({
            postcode: this.postcode
        });
    },

    selectStore :function(event){
        this.storeID = $(event.target).data('id');

        this.model.updateStore({
            storeID: this.storeID,
        });

        setTimeout(function() {
            window.CartModel.fetch({
                success: function(){
                    window.CartModel.confirmStore(
                        {
                            StoreSelected: true,
                        });
                    window.CartModel.getItemDetails(eCommerceApp.itemView);
                    quantityBus.trigger('footer:location');
                }
            });

        }, 200);

    },

    closeModal:function(){
        quantityBus.trigger('modal:close');
    },

    close: function(){
        this.remove();
    }
});
