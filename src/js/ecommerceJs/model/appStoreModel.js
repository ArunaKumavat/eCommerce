eCommerceApp.AppStoreModel = Backbone.Model.extend({
    url: "/webapi/StoreLocations/GetSearchStore",
    urlStore: "/webapi/StoreLocations/SelectedStore",

    searchStore: function(data){
        this.fetch({
            data: data,
            type: 'POST',
            url: this.url,
            success: this.fetchSuccess,
            error: this.fetchError
        });
    },

    updateStore: function(data){
        this.fetch({
            data: data,
            type: 'POST',
            url: this.urlStore,
            success: this.fetchSuccess,
            error: this.fetchError
        });
    },

    fetchSuccess: function (response) {
        return response;
    },

    fetchError: function (collection, response) {
        quantityBus.trigger('modal:close');
        alert(response.responseJSON.ExceptionMessage);
        throw new Error(response.responseJSON.ExceptionMessage);
    }
});