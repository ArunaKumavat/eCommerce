
eCommerceApp.pageTwo = eCommerceApp.Viewsbase.extend({
    templateId: "template-cartDetails",
    customerDetails: null,
    
    events: {
        'click .btn' : 'updateToNextPage',
        'click .cart-close' : 'close'
    },

    initialize: function(){
        Backbone.Validation.bind(this,{
            invalid: function(view, attr, error) {
                var $el = view.$('[name="' + attr + '"]');
                    $el.parent().find('.error').remove();
                    $el.addClass('has-error');
                    $el.after("<span class='error'>"+ error +"</span>");
            },
            model: this.model
        });
    },

    render: function(){
        return this.$el.html(this.template(this.model.attributes));
    },

    updateToNextPage: function(){
        
        this.customerDetails = {
            Username : this.$('#uName').val(),
            Password : this.$('#password').val(),
            FirstName : this.$('#fName').val(),
            LastName : this.$('#lName').val(),
            Email : this.$('#email').val(),
            Phone : this.$('#phone').val(),
            EmailSubcription : true,
            AltPhone: this.$('#alt-phone').val(),
            Address : this.$('#address').val().trim(),
            City : this.$('#city').val(),
            State : this.$('#state').val(),
            PostCode : this.$('#postcode').val()
        };

        this.customerSet = {
            "Username" : this.customerDetails.Username,
            "Password" : this.customerDetails.Password,
            "FirstName" : this.customerDetails.FirstName,
            "LastName" : this.customerDetails.LastName,
            "EmailAddress" : this.customerDetails.Email,
            "Phone": this.customerDetails.Phone,
            "AltPhone": this.customerDetails.AltPhone,
            "Address" : {
                "StreetAddress1": this.customerDetails.Address,
                "Suburb": this.customerDetails.City,
                "PostCode": this.customerDetails.PostCode
            }
        };

        this.model.set("Customer",this.customerSet);

        var isValid = this.model.isValid(['Customer.FirstName','Customer.LastName',
                                          'Customer.EmailAddress','Customer.Phone',
                                          'Customer.AltPhone','Customer.Address.StreetAddress1',
                                          'Customer.Address.Suburb','Customer.Address.PostCode']);

        if(isValid){

            var self = this;
            window.CheckCustomerModel.fetch({
                success: function (response) {
                    var session = response;
                    if( session.get('ExpiryCustomerDetail') === false) {
                        self.model.addCustomer(self.customerDetails);
                        cartBus.trigger('footer:step3');
                    } else {
                        window.CartModel.fetch({
                            success: function(){
                                cartBus.trigger('footer:step2');
                            }
                        });
                    }
                }
            });

        }
    },

    close: function(){
        cartBus.trigger('modal:close');
    },
});