
var CartModel = new eCommerceApp.AppModel;
var StoreModel = new eCommerceApp.AppStoreModel;
var CheckCustomerModel = new eCommerceApp.AppCheckCustomerModel;
var cartBus = _.extend({}, Backbone.Events);
var quantityBus = _.extend({}, Backbone.Events);
var thankYouBus = _.extend({}, Backbone.Events);

eCommerceApp.mylocation = false;
eCommerceApp.myselectStore = false;
eCommerceApp.myservice = false;
eCommerceApp.viewItemProduct = null;
eCommerceApp.viewItemquantity = null;


eCommerceApp.AppConfirm = eCommerceApp.Viewsbase.extend({
    templateId: "template-cart",
    $loader: $(".loader"),
    model: CartModel,

    initialize: function(){
        _.bindAll(
            this,
            'render'
        );
        this.listenTo(this.model, "change", this.render);
        this.listenTo(this.model, "sync", this.render);
        this.listenTo(quantityBus, 'footer:location', this.stepNext);
        this.listenTo(quantityBus, 'footer:selectStore', this.stepNextStore);
        this.listenTo(quantityBus, 'footer:alignment', this.stepPrev);
        this.listenTo(quantityBus, 'modal:close', this.closeModal);
    },

    render: function(){
        var elem;

        elem = this.$el.html(this.template());
        
        this.locationSelector = new eCommerceApp.locationSelectorView({model : this.model});
        this.storeSelector = new eCommerceApp.storeSelectorView({model: StoreModel});
        this.serviceSelector = new eCommerceApp.wheelAlignment({model : this.model});
        this.pageOne = new eCommerceApp.confirmQuantity({model : this.model});

        if(eCommerceApp.mylocation){
            if(this.model.get("WheelAlignmentSelected")){
                this.$('.order-now-modal').append(this.pageOne.render().el);
            } else if(this.model.get("WheelAlignmentSelected") !== true){
                if(eCommerceApp.viewItemquantity === null){
                    this.$('.order-now-modal').append(this.pageOne.render().el);
                } else {
                    this.$('.order-now-modal').append(this.serviceSelector.render());
                }
            }  else {
                this.$('.order-now-modal').append(this.pageOne.render().el);
            }

        } else if(eCommerceApp.mylocation && this.model.get("StoreSelected") === true) {
            this.$('.order-now-modal').append(this.pageOne.render().el);
        } else if ( eCommerceApp.myselectStore){
            this.$('.order-now-modal').append(this.storeSelector.render());
        } else {
            this.$('.order-now-modal').append(this.locationSelector.render());
        }

        return elem;
    },

    closeModal: function() {
        this.remove();
        eCommerceApp.Router.navigate("",{trigger: true});
    },

    stepNext: function(){
        eCommerceApp.mylocation = true;
        this.render();
    },

    stepPrev: function(){
        this.render();
    },

    stepNextStore: function() {
        eCommerceApp.myselectStore = true;
        this.render();
    },

    viewLoading: function() {
        this.$loader.css({
            display: ""
        });

        console.log('loading');
        var a = this;
        setTimeout(function() {
            a.$loader.addClass("show")
        }, 10)
    },

    viewLoaded: function() {
        this.$loader.removeClass("show");
        var a = this;
        setTimeout(function() {
            a.$loader.css({
                display: "none"
            })
        }, 500)
    }
});

eCommerceApp.AppCart = eCommerceApp.Viewsbase.extend({
    templateId: "template-cart",
    $loader: $(".loader"),
    contentView: null,
    footerView: null,
    model: CartModel,
    myDetails: false,
    mypayments: false,
    cartElem: null,

    initialize: function(){
        _.bindAll(
            this,
            'render'
        );
        this.listenTo(this.model, "change", this.render);
        this.listenTo(this.model, "sync", this.render);
        this.listenTo(cartBus, 'footer:step2', this.moveStep2);
        this.listenTo(cartBus, 'footer:step3', this.moveStep3);
        this.listenTo(cartBus, 'modal:close', this.closeModal);
        $('.cart-amount').html('('+ this.objectLenght(CartModel.get('OrderItems')) +')');
    },

    render: function(){
        var elem;
        elem = this.$el.html(this.template());

        $('.cart-amount').html('('+ this.objectLenght(CartModel.get('OrderItems')) +')');

        if(this.myDetails && this.payments){
            this.pageOne = new eCommerceApp.bookingCompletion({model : this.model});
            this.cartElem = this.pageOne.render();
        } else if(this.myDetails) {
            this.pageOne = new eCommerceApp.pageTwo({model : this.model});
            this.cartElem = this.pageOne.render();
        } else {
            this.pageOne = new eCommerceApp.pageOne({model : this.model});
            this.cartElem = this.pageOne.render().el;
        }

        this.$('.order-now-modal').append(this.cartElem);
        return elem;
    },

    objectLenght: function(obj){
        var count = 0;
        for (var property in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, property)) {
                count++;
            }
        }
        return count;
    },

    moveStep2: function(){
        this.myDetails = true;
        this.render();
    },

    moveStep3: function(){
        this.payments = true;
        this.render();
    },

    closeModal: function() {
        this.remove();
        eCommerceApp.Router.navigate("",{trigger: true});
    }
});

eCommerceApp.AppThankYou = eCommerceApp.Viewsbase.extend({
    templateId: "template-cart",
    cartElem: null,
    model: CartModel,

    initialize: function(){
        _.bindAll(
            this,
            'render'
        );
        this.listenTo(this.model, "change", this.render);
        this.listenTo(this.model, "sync", this.render);
        this.listenTo(thankYouBus, 'modal:close', this.closeModal);
    },

    render: function() {
        var elem;
        elem = this.$el.html(this.template());
        this.cartElem = new eCommerceApp.bookingSuccessFull({model: this.model});
        this.$('.order-now-modal').append(this.cartElem.render());
        return elem;
    },

    closeModal: function() {
        this.remove();
        eCommerceApp.Router.navigate("",{trigger: true});
    }
});



eCommerceApp.Header = eCommerceApp.Viewsbase.extend({
    model: CartModel,

    initialize: function(){
        _.bindAll(
            this,
            'render'
        );
        this.listenTo(this.model, "sync", this.render);
        this.listenTo(this.model, "change", this.render);
    },

    render: function() {
        var storename = CartModel.get('Store');
        $('.cart-amount').html('('+ objectLenght(CartModel.get('OrderItems')) +')');
        if(storename){
            $('.store-name').html(storename.StoreName);
            $('.phone-number').html(storename.StoreDetails.Phone);
            $('.store-name').prop("href", CartModel.get('StoreSelectedUrl'));
            $('.phone-number').prop("href", "tel:"+ storename.StoreDetails.Phone);
        }
    }
});


function objectLenght(obj){
    var count = 0;
    for (var property in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, property)) {
            count++;
        }
    }
    return count;
}
