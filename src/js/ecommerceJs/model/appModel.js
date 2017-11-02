
eCommerceApp.AppModel = Backbone.Model.extend({
    url: "/shopapi/ShopCart/GetCurrentOrder",
    urlSave: "/shopapi/ShopCart/AddToCart",
    urlUpdate: "/shopapi/ShopCart/UpdateCart",
    urlDelete: "/shopapi/ShopCart/deleteFromCart",
    urlConfirmStore: "/shopapi/ShopCart/UpdateCurrentStoreSelected",
    urlConfirmWheelAlignment: "/shopapi/ShopCart/UpdateWheelAlignmentSelected",
    urlAddCustomer: "/shopapi/ShopCart/AddCustomer",
    urlItemDetail: "/shopapi/ShopCart/GetProductDetails",
    urlApplyDiscount: "/shopapi/ShopCart/applyDiscount",
    urlCheckExpiryCustomer: "/shopapi/shopcart/CheckExpiryCustomer",

    defaults: {
        "OrderId":null,
        "OrderNumber":null,
        "Status":0,
        "CustomerType":null,
        "OrderTotalValue":null,
        "TotalGstAmount":null,
        "TotalSurchargeAmount":0,
        "PaymentAttempted":false,
        "OrderDate":null,
        "PaymentFinalised":false,
        "DateCompleted":null,
        "Remarks":null,
        "LowStockAlert":null,
        "QuantityDiscounted":0,
        "QuantityDiscountedOrderLastNumber":0,
        "HasQtyDiscountApplied":false,
        "PromotionCode":null,
        "HasDollarDiscountApplied":false,
        "StoreId":2,
        "Customer":null,
        "userSelectedStore": false,
        "Store":null,
        "TenderItem":null,
        "Promotions":null,
        "ErrorMessage": null,
        "ItemDetails":{
            "CanAddToCart":true,
            "CataloguePriceIncludingGst":0,
            "ListedPriceIncludingGst":126.5,
            "ProductDescription":"YOKOHAMA's expert engineers utilise extensive research and development with a driving desire to continue improving and breaking new ground in the tyre industry. YOKOHAMA tyres have been adopted worldwide as original equipment in the automotive industry in a wide range of vehicle categories.  The ADVAN A349 is factory fitted to a Chrysler Voyager.",
            "ProductName":"175/65R14",
            "ProductSku":null,
            "StockAvailabilityDetails": null,
            "Promotions":[

            ]
        },
        "ServiceDetails":{
            "ImgUrl":"/-/media/images/yokohama/tyres/tyre.ashx",
            "ListedPriceIncludingGst":165,
            "ProductDescription":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce urna tellus, pulvinar luctus erat sed, pharetra cursus nisl. Curabitur malesuada sem at est pretium, in aliquet risus commodo.",
            "ProductName":"Wheel Alignment",
            "ProductSku":"100SVR",
            "VideoUrl":null
        },
        "OrderItems":[
            {
                "BillablePriceExGst":null,
                "DisplayRetailPrice":null,
                "DisplayTotalRetailPrice":null,
                "BillableQuantity":null,
                "CataloguePriceExGst":0,
                "DiscountGstAmount":0,
                "DiscountPriceExGst":0,
                "GstAmount":92,
                "GstCode":"S1",
                "GstRate":10,
                "ListedPriceExGst":"115",
                "ListedPriceIncGst":0,
                "LowStockWarning":false,
                "OrderId":13,
                "OrderItemId":14,
                "ProductDetails":{

                },
                "ProductName":"175/65R14",
                "ProductSku":"1756514A349",
                "QuantityDiscounted":0,
                "QuantityDiscountedOrder":0,
                "QuantityOrdered":8,
                "Remarks":"175/65R14",
                "StockAvailabilityDetails":null,
                "SurchargeAmount":0,
                "DisplayTotalBillablePrice":0,
                "DisplayItemRetailPrice":null,
                "DisplayBillablePriceTemp":0,
                "SurchargeCode":null,
                "SurchargeRate":0,
                "StockAlert":null,
                "Promotions":[

                ]
            }
        ],
        "StoreSelected": false,
        "WheelAlignmentSelected": false,
        "DisplayTotalRetailValueIncludingGst": null,
        "DisplayTotalDiscountValueIncludingGst": null,
        "DisplayTotalBillableValueIncludingGst": null,
        "TotalOrderValue": null
    },

    validation: {
        'Customer.FirstName': {
            required: true,
            msg: 'Please enter your First Name'
        },
        'Customer.LastName': {
            required: true,
            msg: 'Please enter your Last Name'
        },
        'Customer.EmailAddress': {
            required: true,
            pattern: 'email',
            msg: 'Please enter a valid email'
        },
        'Customer.Phone': {
            required: true,
            length: 10,
            pattern: 'digits',
            msg: 'Please enter a valid phone number'
        },
        'Customer.Address.StreetAddress1': {
            required: true,
            msg: 'Please enter a Street Address'
        },
        'Customer.Address.Suburb': {
            required: true,
            msg: 'Please enter a Suburb'
        },
        'Customer.Address.PostCode': {
            required: true,
            length: 4,
            msg: 'Please enter a valid PostCode'
        }

    },

    initialize: function(){
        this.fetch();
    },

    AddToCart: function(data){
        this.fetch({
            data: data,
            type: 'POST',
            url: this.urlSave,
            success: this.fetchSuccess,
            error: this.fetchError
        });
    },

    DeletefromCart: function(data){
        this.fetch({
            data: data,
            type: 'POST',
            url: this.urlDelete,
            success: this.fetchSuccess,
            error: this.fetchError
        });
    },

    UpdateCart: function(data){
        this.fetch({
            data: data,
            type: 'POST',
            url: this.urlUpdate,
            success: this.fetchSuccess,
            error: this.fetchError
        });
    },

    confirmStore: function(data){
        this.fetch({
            data: data,
            type: 'POST',
            url: this.urlConfirmStore
        });
    },

    confirmWheelAlignment: function(data){
        this.fetch({
            data: data,
            type: 'POST',
            url: this.urlConfirmWheelAlignment
        });
    },

    addCustomer: function(data){
        this.fetch({
            data: data,
            type: 'POST',
            dataType: 'json',
            url: this.urlAddCustomer,
            success: this.fetchSuccess,
            error: this.fetchError
        });
    },
    
    getItemDetails: function(id){
        this.fetch({
            type: 'GET',
            url: this.urlItemDetail + '/' + id,
            success: this.fetchSuccess,
            error: this.fetchError
        });
    },

    applyDiscount: function(data){
        this.fetch({
            data: data,
            type: 'POST',
            url: this.urlApplyDiscount,
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
