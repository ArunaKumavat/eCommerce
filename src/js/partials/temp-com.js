 $(document).ready(function () {

        // Empty object to store SKUs, previous value and new value.
        var cartValues = {};
        var currentOrderId = $.cookie("yokohama_cart_key");

        if (currentOrderId !== undefined){
			
			// var updateFlgsRequest = {
				// StoreSelected:true,
				// WheelAlignmentSelected:true			
			// };
			
            GetCurrentOrderAjexCall();
        }
        
        $("#btnAddToCart").click(function () {
			
            var productIdValue = $('#productId').val();
            var qtyValue = $('#Qty').val();

            var productRequest = {
                ProductId: productIdValue,
                Qty: qtyValue
            };

            AddToCartAjexCall(productRequest);

        });

        $("#btnApplyDiscount").click(function () {
           
            var promoValue = $('#promoCode').val();
            var discountRequest = {
                PromoCode: promoValue
            };

            ApplyDiscountAjexCall(discountRequest);
        });
		
		$("#btnAddCustomer").click(function () {
			
			var fNameValue = $('#fName').val();
			var lNameValue = $('#lName').val();
			var emailValue = $('#email').val();
			var phoneValue = $('#phone').val();
			var addressValue = $('#address').val();
			var cityValue = $('#city').val();
			var stateValue = $('#state').val();
			var postCodeValue = $('#postCode').val();
			var emailSubcription = true;
			
			var customerRequest = {				
				FirstName : fNameValue,
				LastName : lNameValue,
				Email : emailValue,
				Phone : phoneValue,
				AltPhone : phoneValue,
				Address : addressValue,
				City : cityValue,
				State : stateValue,
				PostCode : postCodeValue,
				EmailSubcription : emailSubcription
			};
			
			
			AddCustomerAjexCall(customerRequest);
			
			
		});
		
		$("#btnGetProductDetails").click(function () {
           
            var productCode = $('#productCode').val();            

            GetProductDetailsAjexCall(productCode);
        });
		
		function GetProductDetailsAjexCall(productCode) {
            
            var request = $.ajax({
                url: "/shopapi/ShopCart/GetProductDetails/" + productCode,
                type: "GET",
                dataType: "json",
                contentType: 'application/json; charset=utf-8'
            });
            request.done(function (order) {                
                if (order !== undefined) {
                    DisplayProduct(order);
                }
            });
            request.fail(function (jqXHR, error) {
                DisplayErrorMessage(jqXHR);
            });
        }
        
        $('#cart').on('click', 'tr .btnDelete', function (event) {
           
            var row = $(this).closest("tr");
            var sku = row.find(".sku").text();

            var qty = row.find(".txtQty").val();
            var deleteRequest = {
                ProductId: sku,
                Qty: qty
            };

            DeleteItemAjexCall(deleteRequest);

        });

        $('#cart').on('change paste keyup', 'tr .txtQty', function (event) {
            
            var row = $(this).closest("tr");            
            var sku = row.find(".sku").text();
            var updateValues = UpdateValues(row, sku);
            var qty = updateValues.Qty;
            var direction = updateValues.Direction;

            console.log(" Qty -: " + qty + ", Direction -: " + direction);

            var updateRequest = {
                ProductId: sku,
                Qty: qty
            };

            UpdateCartAjexCall(updateRequest);
        });
        
		$("#btnUpdateStoreSelectedFlag").click(function () {
			
            var selectedStoreRequest = {
                StoreSelected: true
            };

            UpdateCurrentStoreSelected(selectedStoreRequest);

        });
		
		$("#btnUpdateWheelAlignmentSelectedFlag").click(function () {
			
            var selectedWheelAlignmentRequest = {
                WheelAlignmentSelected: true
            };

            UpdateWheelAlignmentSelected(selectedWheelAlignmentRequest);

        });
		
        function AddToCartAjexCall(productRequest) {
            
            var request = $.ajax({
                url: "/shopapi/ShopCart/AddToCart",
                type: "POST",
                data: JSON.stringify(productRequest),
                dataType: "json",
                contentType: 'application/json; charset=utf-8'
            });
            request.done(function (order) {

                if (order !== undefined) {
					
                    DisplayCart(order);

                    $('#productId').val('');
                    $('#Qty').val('');
                }
            });
            request.fail(function (jqXHR, error) {
                DisplayErrorMessage(jqXHR);
            });
        }

        function ApplyDiscountAjexCall(discountRequest) {
            
            var request = $.ajax({
                url: "/shopapi/shopcart/applyDiscount",
                type: "POST",
                data: JSON.stringify(discountRequest),
                dataType: "json",
                contentType: 'application/json; charset=utf-8'
            });
            request.done(function (order) {
                if (order !== undefined) {

                    DisplayCart(order);
                    $('#promoCode').val('');
                }
            });
            request.fail(function (jqXHR, error) {
                DisplayErrorMessage(jqXHR);
            });
        }

        function UpdateCartAjexCall(updateRequest) {

            $('#messages').text("");

            var request = $.ajax({
                url: "/shopapi/shopcart/UpdateCart",
                type: "POST",
                data: JSON.stringify(updateRequest),
                dataType: "json",
                contentType: 'application/json; charset=utf-8'
            });
            request.done(function (order) {
                if (order !== undefined) {
                    DisplayCart(order);
                }
            });
            request.fail(function (jqXHR, error) {
                DisplayErrorMessage(jqXHR);
            });
        }

        function DeleteItemAjexCall(deleteRequest) {

            var request = $.ajax({
                url: "/shopapi/shopcart/deleteFromCart",
                type: "POST",
                data: JSON.stringify(deleteRequest),
                dataType: "json",
                contentType: 'application/json; charset=utf-8'
            });
            request.done(function (order) {
                if (order !== undefined) {
                    DisplayCart(order);
                }
            });
            request.fail(function (jqXHR, error) {
                DisplayErrorMessage(jqXHR);
            });
        }

        function GetCurrentOrderAjexCall() {
            
            var request = $.ajax({
                url: "/shopapi/ShopCart/GetCurrentOrder",
                type: "GET",
                dataType: "json",
                contentType: 'application/json; charset=utf-8'
            });
            request.done(function (order) {                
                if (order !== undefined) {

                    DisplayCart(order);
                }
            });
            request.fail(function (jqXHR, error) {
                DisplayErrorMessage(jqXHR);
            });
        }
		
		function AddCustomerAjexCall(customerRequest) {
			
			var request = $.ajax({
                url: "/shopapi/ShopCart/AddCustomer",
                type: "POST",
				data: JSON.stringify(customerRequest),
                dataType: "json",
                contentType: 'application/json; charset=utf-8'
            });
            request.done(function (order) {                
                if (order !== undefined) {

                    DisplayCart(order);
                }
            });
            request.fail(function (jqXHR, error) {
                DisplayErrorMessage(jqXHR);
            });
		}
		
		function UpdateCurrentStoreSelected(selectedStoreRequest) {
            
            var request = $.ajax({
                url: "/shopapi/ShopCart/UpdateCurrentStoreSelected",
                type: "POST",
                data: JSON.stringify(selectedStoreRequest),
                dataType: "json",
                contentType: 'application/json; charset=utf-8'
            });
            request.done(function () {
                alert("Updated!");
            });
            request.fail(function (jqXHR, error) {
                DisplayErrorMessage(jqXHR);
            });
        }
		
		function UpdateWheelAlignmentSelected(selectedWheelAlignmentRequest) {
            
            var request = $.ajax({
                url: "/shopapi/ShopCart/UpdateWheelAlignmentSelected",
                type: "POST",
                data: JSON.stringify(selectedWheelAlignmentRequest),
                dataType: "json",
                contentType: 'application/json; charset=utf-8'
            });
            request.done(function () {
                alert("Updated!");
            });
            request.fail(function (jqXHR, error) {
                DisplayErrorMessage(jqXHR);
            });
        }
		
        function DisplayCart(currentOrder) {
		
            $('#cart tr').not(function () { if ($(this).has('th').length) { return true } }).remove();
            
            for (var key in currentOrder.OrderItems) {
                if (Object.prototype.hasOwnProperty.call(currentOrder.OrderItems, key)) {
                    var orderItem = currentOrder.OrderItems[key];

                    cartValues[orderItem.ProductSku] = {};
                    cartValues[orderItem.ProductSku].sku = orderItem.ProductSku;
                    cartValues[orderItem.ProductSku].oldValue = orderItem.QuantityOrdered;
                    cartValues[orderItem.ProductSku].newValue = orderItem.QuantityOrdered;
                    //console.log(cartValues);

                    var newRow = '<tr>' +                                        
                                        '<td class="sku">' + orderItem.ProductSku + '</td>' +
                                        '<td class="name">' + orderItem.ProductName +  '</td>' +
										'<td>' + displaystockavailabilitydetails(orderItem.StockAlert, orderItem.LowStockWarning) + '</td>' +
                                        '<td>' + orderItem.ListedPriceExGst.format(3) + '</td>' +
                                        '<td>' + '<input class="txtQty" onfocus="this.oldValue = this.value; return true;"  type="number" value=' + orderItem.QuantityOrdered + ' style="width: 50px;" >' + '</td>' +
                                        '<td>' + orderItem.BillableQuantity + '</td>' +
                                        '<td>' + orderItem.BillablePriceExGst.format(3) + '<p>' + orderItem.DisplayBillablePriceTemp + '</p>' + '</td>' +
                                        '<td>' + orderItem.GstAmount.format(3) + '<p>' + orderItem.DisplayGstAmountTemp + '</p>' + '</td>' +
                                        '<td>' + (orderItem.BillablePriceExGst + orderItem.GstAmount).format(3) + '<p>' + orderItem.DisplayTotalBillablePrice + '</p>' + '</td>' +
                                        '<td> <button class="btnDelete btn blue">x</button> </td>' +
                                  '</tr>';
                    $('#cart').append(newRow);
                }
            }
			
			for (var key in currentOrder.ServiceItems) {
				if (Object.prototype.hasOwnProperty.call(currentOrder.ServiceItems, key)) {
					var serviceItem = currentOrder.ServiceItems[key];
					
					var newRow = '<tr>' +                                        
                                        '<td class="sku">' + serviceItem.ServiceSku + '<p> <img style="width: 50%; height: 50%" src="' + serviceItem.ServiceDetails.ImageUrl + '" /> </p>' + '</td>' +
                                        '<td class="name" colspan="6">' + serviceItem.ServiceDetails.Name + '<p style="font-size:10px">' + serviceItem.ServiceDetails.Content + '</p>' +  '</td>' +										
                                        '<td>' + serviceItem.GstAmount.format(3) + '</td>' +
										'<td>' + serviceItem.ListedPriceIncGst.format(3) + '</td>' +
                                        '<td> <button class="btnDelete btn blue">x</button> </td>' +
                                  '</tr>';
					$('#cart').append(newRow);
					
				}
			}
			
			
            var currentOrderId = $.cookie("yokohama_cart_key");
            if (currentOrderId === undefined) { currentOrderId = 0; }

            $('.text_orderid').text("Order Id -: " + currentOrderId);
            $('.text_order_total_value').text("Order total value -: " + currentOrder.TotalOrderValue.format(3));
            $('.text_order_total_gst').text("Order total gst value -: " + currentOrder.TotalOrderGstValue.format(3));
			
			var customer = currentOrder.Customer;			
			if(!IsCustomerExists(customer))
			{
				// $('.add-customer').show();
				// $('.display-customer').hide();
			}
			else
			{
				// $('.add-customer').hide();
				// $('.display-customer').show();
				$('#display-name').text(customer.FirstName + " " + customer.LastName);
				$('#display-email').text(customer.EmailAddress);
				$('#display-phone').text(customer.Phone);
				$('#display-address').text(customer.Address.StreetAddress1 + ", " + customer.Address.Suburb + ", " + customer.Address.State + ", " + customer.Address.PostCode);
			}
        }
		
		function IsCustomerExists(customer){
			var retValue = false;
			if(customer === undefined || customer === null){
				retValue = false;
			}else{
				if(customer.hasOwnProperty('FirstName') && customer.FirstName !== null && customer.hasOwnProperty('LastName') && customer.LastName !== null){
					retValue = true;
				}
			}
			
			return retValue;
		} 

        function displaystockavailabilitydetails(StockAlert, lowStockWarning) {
            
             if (StockAlert !== undefined) {
				 if(lowStockWarning){
					return '<p style="color: red; font-size:small;">' + StockAlert + '</p>' ; 
				 }else{
					return '<p style="color: green; font-size:small;">' + StockAlert + '</p>' ; 
				 }                 
            }

             return undefined;
        }

        function DisplayErrorMessage(jqXHR) {

            var errorValue = jQuery.parseJSON(jqXHR.responseText);

            if (jqXHR.status && jqXHR.status === 500) {
                $('#messages').text(errorValue.ExceptionMessage);
                console.log(errorValue.ExceptionMessage);
            }

            console.log("Request failed: " + errorValue.Message);
        }
		
		function DisplayProduct(currentOrder) {

			var product = currentOrder.ItemDetails;
			
			$('#display-product-sku').text(product.ProductSku);
			$('#display-product-product-name').text(product.ProductName);
			$('#display-product-price').text(product.ListedPriceIncludingGst);
			$('#display-product-stocks').text(product.StockAvailabilityDetails);
			$('#display-product-description').text(product.ProductDescription);
			$('#display-product-promotions').text(product.Promotions);
		}
        
        var UpdateValues =  function (row, sku) {

            var qty = row.find(".txtQty").val();          
			
			return { Qty: qty };
        }

        Number.prototype.format = function (n, x) {
            var re = '(\\d)(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
            return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$1,');
        };

    });