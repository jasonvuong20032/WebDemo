window.insider_object = {
	"user": {
		"email": "",
		"email_optin": true,
		"gdpr_optin": true,
		"name": "",
		"surname": ""
	}
}
var vuongQuangTuan = {
	init: function() {
		this.Main.init();
		this.Collection.init();
		//if(window.shop.template == 'index'){
		//	this.Index.init();
		//}
	},

	addToCard: function (item) {
		var Items = localStorage.getItem("cart");
		if (Items != null) {
			var Orders = JSON.parse(Items)
			var hasItem = Orders.some((o) => { return (o.Id == item.Id) })
			if (hasItem == false) {
				Orders.push(item)
			}
			else {
				$.each(Orders, function (index, _item) {
					if (_item.Id === item.Id) {
						_item.Qty = parseInt(_item.Qty) + parseInt(item.Qty)
					}
				});
			}
			localStorage.removeItem("cart")

			var Json = JSON.stringify(Orders)
			localStorage.setItem("cart", Json);
		} else {
			/*** Created new localStorage ***/
			var _Items = []
			_Items.push(item)
			var Json = JSON.stringify(_Items)
			localStorage.setItem("cart", Json);
		}
		/*** UPDATE NUMBER SHOPPING CART ***/
		this.countOrder()
	},
	getListOrder: function () {
		var Items = localStorage.getItem("cart");
		var Orders = null
		if (Items != null) {
			Orders = JSON.parse(Items)
		}
		return Orders
	},
	countOrder: function () {
		var Items = localStorage.getItem("cart");
		var Total = 0
		if (Items != null) {
			var Orders = JSON.parse(Items)
			$.each(Orders, function (index, _item) {
				Total = Total + parseInt(_item.Qty)
			});

		}
		$('.count').text(Total)
		return Total;
	},
	updateQtyOrder: function (id, quantity) {
		var Items = localStorage.getItem("cart");
		var Total = 0;
		if (Items != null) {
			var Orders = JSON.parse(Items);
			$.each(Orders, function (index, _item) {
				if (_item.Id === id) {
					_item.Qty = quantity;
					Total = Total + quantity;
				} else {
					Total = Total + parseInt(_item.Qty);
				}

			});
			localStorage.removeItem("cart");
			var Json = JSON.stringify(Orders);
			localStorage.setItem("cart", Json);
		}
		$('.count').text(Total);
	},
	deleteOrder: function (id) {
		var Items = localStorage.getItem("cart");
		var Total = 0;
		if (Items != null) {
			var Orders = JSON.parse(Items);
			var indexItem = -1;
			$.each(Orders, function (index, _item) {
				if (_item.Id === id) {
					indexItem = index;
				} else {
					Total = Total + parseInt(_item.Qty);
				}
			});
			if (indexItem !== -1) {
				Orders.splice(indexItem, 1);
			}
			localStorage.removeItem("cart");
			var Json = JSON.stringify(Orders);
			localStorage.setItem("cart", Json);
		}
		$('.count').text(Total);
	}
}
$(document).ready(function() {
	vuongQuangTuan.init();
	//lazyload();

	$(".swatch-element").mouseout(function () {
		 var value = $("#mainDetailProduct #add-item-form .select-swap .color label.sd span").html();
		$(this).parents(".swatch").find(".header span").html(value);
	});

	$(".swatch-element").mouseover(function () {
		var value = $(this).data("value");
		$(this).parents(".swatch").find(".header span").html(value);
	});
})
vuongQuangTuan.Main = {
	init: function(){
		this.colorVariant();
		this.mmMenu();
		this.menuFooter();
		this.resizeImage();
		//this.suggestSearch();
		this.quickview();
		this.limitCart();
		this.submitEmail();
		//this.promotionTopAllPage();
		this.backToTop();
		this.removeItemClick();
		this.sliderSuggest();
	},
	sliderSuggest: function(){
		$('.loopProductCombo .owl-carousel').owlCarousel({
			items:4,
			nav: true,
			dots: true,
			lazyLoad:true,
			touchDrag: true,
			margin: 30,
			responsive:{
				0:{
					items:2
				},
				767:{
					items:2
				},
				1024:{
					items:4
				}
			}
		});
	},
	removeItem: function(value){
		var combo = localStorage.getItem("attrCombo");
		var idVariant1 = localStorage.getItem("idVariant1");
		var idVariant2 = localStorage.getItem("idVariant2");
		if (combo == null){
			combo == "abc";
		}
		if (idVariant1 == null){
			idVariant1 == "abc";
		}
		if (idVariant2 == null){
			idVariant2 == "abc";
		}
		var checkAvai = false;
		$.ajax({
			type: 'get',
			url:"/cart.js",
			dataType: 'json',
			async: true,
			success: function(data){
				$.each(data.items, function(i,v){
					if (idVariant1 != 'abc' && idVariant2 != 'abc') {
						if (idVariant1 == v.variant_id || idVariant2 == v.variant_id){
							checkAvai = true
							return false;
						}
					}else{
						if (idVariant1 != 'abc') {
							if (idVariant1 == v.variant_id){
								checkAvai = true
								return false;
							}
						}else{
							localStorage.removeItem("idVariant1");
							return false;
						}
						if (idVariant2 != 'abc') {
							if (idVariant2 == v.variant_id){
								checkAvai = true
								return false;
							}
						}else{
							localStorage.removeItem("idVariant2");
							combo == "false"
							return false;
						}
					}
				});
			}
		});
		if (checkAvai){
			if (combo == "true"){
				$('.btnAppCombo').removeClass("btnAttrCombo");
				$(".btnAppCombo").removeAttr("data-toggle");
				$(".btnAppCombo").removeAttr("data-target");
			}
			if (combo == "false"){
				$('.btnAppCombo').removeClass("btnAttrCombo");
				$(".btnAppCombo").attr("data-toggle","modal");
				$(".btnAppCombo").attr("data-target","#modalProductAppCombo");
			}
			if (value == true){
				window.location = '/cart';
			}
		}
	},
	removeItemClick: function(){
		$(document).on("click", ".removePro", function(){
			var id = $(this).attr("data-variant");
			var idVariant1 = localStorage.getItem("idVariant1");
			var idVariant2 = localStorage.getItem("idVariant2");
			if (idVariant1 == null){
				idVariant1 == "abc";
			}
			if (idVariant2 == null){
				idVariant2 == "abc";
			}
			if (id == idVariant1){
				localStorage.removeItem("idVariant1");
			}
			if (id == idVariant2){
				localStorage.removeItem("idVariant2");
			}
			vuongQuangTuan.Main.removeItem();
		});
	},
	promotionTopAllPage: function(){
		$(".countCampaingTopbar .lof-clock-detail").lofCountDown({
			TargetDate:"03/08/2020 23:59:59",
			DisplayFormat:"<ul class='list-inline'><li class='day'>%%D%%<span>ngày</span></li><li>%%H%%<span>giờ</span></li><li>%%M%%<span>phút</span></li><li>%%S%%<span>giây</span></li></ul>",
			FinishMessage: "Hết hạn"
		});
	},
	awe_lazyloadImage: function(){
		var i = $("[data-lazyload]");
		i.length > 0 && i.each(function() {
			var i = $(this), e = i.attr("data-lazyload");
			i.appear(function() {
				i.removeAttr("height").attr("src", e);
			}, {
				accX: 0,
				accY: 120
			}, "easeInCubic");
		});
		var e = $("[data-lazyload2]");
		e.length > 0 && e.each(function() {
			var i = $(this), e = i.attr("data-lazyload2");
			i.appear(function() {
				i.css("background-image", "url(" + e + ")");
			}, {
				accX: 0,
				accY: 120
			}, "easeInCubic");
		});
	},
	backToTop: function() {
		$(function(){
			$(window).scroll(function(){
				if($(this).scrollTop()!=0){
					$('#bttop').fadeIn();}
				else{$('#bttop').fadeOut();
						}});
			$('#bttop').click(function(){
				$('body,html').animate(
					{scrollTop:0},800);
			});
		});
	},
	submitEmail: function(){
		$('#mc-embedded-subscribe-form').submit(function(e){
			e.preventDefault();
			var email = $(this).find(".newsletter-input").val()
			if (email == '' || email == null){
				swal({
					type: 'warning',
					text: 'Vui lòng nhập email!',
				});
			}else{
				window.insider_object.user.email = email;
				$(this).unbind().submit();
			}
		});
		$('#newFormsubmit').submit(function(e){
			var email = $(this).find(".newsletter-input").val();
			$('#entry_1611624057').attr('value',email);
			if ($(this).find("input[type='checkbox']:checked")){
				$.ajax({
					type: 'POST',
					dataType: "jsonp",
					url: 'https://docs.google.com/forms/d/e/1FAIpQLSc_DS_7KwUP1VA9vVekKNte6vgaDo0iSufcfcTHwZUMtRpzAA/formResponse',
					data: jQuery('#ss-form').serialize(),
					success: function(data) {
						$("#newFormsubmit .newsletter-input").val(' ');
					},
					error: function(xhr, textStatus, errorThrown) {
					}
				});
			}
		});
	},
	limitCart: function(){
		$(".checkLimitCart").click(function(e){
			e.preventDefault();
			$.ajax({
				type: 'get',
				url:"/cart.js",
				dataType: 'json',
				async: false,
				success: function(data){
					var checkQuantity = window.shop.limitCart;
					var checkQuantityCombo = 2;
					var checkQuantityOnlyOnline = 1;
					var titleLimit = window.shop.limitCartTitle;
					var titleLimitPrice = window.shop.limitCartTitlePrice;
					var titleLimitCombo = window.shop.limitCartTitleCombo;
					var titleLimitOnlyOnline = window.shop.limitCartTitleOnlyOnline;
					var template = window.shop.template;
					var numberItem = data.item_count;
					var checkLimit = false;
					var checkPrice = false;		
					var buyCombo = false;
					var buyOne = false;
					var checkHasCombo = false;
					$.each(data.items, function(i,v){
						if (v.price < 19999900){
							if (v.price < v.price_original){
								if (numberItem > 1){
									checkPrice = true;
									return false;
								}
							}
						}
						if (v.price < v.price_original){
							if (numberItem > checkQuantity){
								checkLimit = true;
								return false;
							}
						}
						if(v.properties.hasOwnProperty('only-online')){
							if (numberItem > checkQuantityOnlyOnline){
								buyOne = true;
								return false;
							}
						}
						if(v.properties.hasOwnProperty('Combo')){
							if (v.price < v.price_original){
								if (numberItem > checkQuantityCombo){
									buyCombo = true;
									return false;
								}
							}
							checkHasCombo = true;
						}
					});
					if (checkHasCombo == false){
						$.each(data.attributes, function(i,v){
							if (i.indexOf("Combo") != -1){
								data.attributes[i] = null;
							}
						});
						$.ajax({
							url: '/cart/update.js',
							type: "POST",
							dataType: "JSON",
							data: {
								"attributes": data.attributes
							},
							success: function(data){

							}
						});
						if(data.attributes.hasOwnProperty('Combo')){
							//console.log(data.attributes);
						}
					}
					if (buyOne){
						if (template == 'cart'){
							swal({
								type: 'warning',
								text: titleLimitOnlyOnline,
							});
						}
						else{
							swal({
								title: titleLimitOnlyOnline,
								type: 'warning',
								html: 'Go <a href="/cart">Cart</a> to update.',
								showConfirmButton: false,
							});
						}
					}else{
						if (buyCombo){			
							if (template == 'cart'){
								swal({
									type: 'warning',
									text: titleLimitCombo,
								});
							}
							else{
								swal({
									title: titleLimitCombo,
									type: 'warning',
									html: 'Go <a href="/cart">Cart</a> to update.',
									showConfirmButton: false,
								});
							}
						}
						else{
							if(checkPrice){
								if (template == 'cart'){
									swal({
										type: 'warning',
										text: titleLimitPrice,
									});
								}
								else{
									swal({
										title: titleLimitPrice,
										type: 'warning',
										html: 'Go <a href="/cart">Cart</a> to update.',
										showConfirmButton: false,
									});
								}
							}
							else{
								if (template == 'cart'){
									if (checkLimit){
										swal({
											type: 'warning',
											text: titleLimit,
										});
									}
									else{
										window.location = '/checkout'
									}
								}
								else{
									if (checkLimit){
										swal({
											title: titleLimit,
											type: 'warning',
											html: 'Go <a href="/cart">Cart</a> to update.',
											showConfirmButton: false,
										});
									}
									else{
										window.location.href = '/checkout'
									}
								}
							}
						}
					}
				}
			});
		});
		/*$(".checkLimitCart").click(function(e){
			e.preventDefault();
			$.ajax({
				type: 'get',
				url:"/cart.js",
				dataType: 'json',
				async: false,
				success: function(data){
					var checkQuantity = window.shop.limitCart;
					var titleLimit = window.shop.limitCartTitle;
					var template = window.shop.template;
					var numberItem = data.item_count;
					var titleLimitPrice = window.shop.limitCartTitlePrice;
					var checkLimit = false;
					var checkPrice = false;						
					$.each(data.items, function(i,v){
						if (v.price < v.price_original){
							if (numberItem > checkQuantity){
								checkLimit = true;
								return false;
							}
						}
					});
					if (template == 'cart'){
						if (checkLimit == true){
							swal({
								type: 'warning',
								text: titleLimit,
							});
						}else{
							window.location = '/checkout'
						}
					}
					else{
						if (checkLimit == true){
							swal({
								title: titleLimit,
								type: 'warning',
								html:
								'Tới <a href="/cart">giỏ hàng</a> để chỉnh sửa.',
								showConfirmButton: false,
							});
						}else{
							window.location.href = '/checkout'
						}
					}
				}
			});
		});*/
		/*$(".checkLimitCart").click(function(e){
			debugger
			e.preventDefault();
			$.ajax({
				type: 'get',
				url:"/cart.js",
				dataType: 'json',
				async: false,
				success: function(data){
					var buyOne = false;
					var buyCombo = true;
					$.each(data.items,function(i,v){
						if(v.properties.hasOwnProperty('only-online')){
							buyOne = true;
							return false;
						}
						if(v.properties.hasOwnProperty('Combo')){
							buyCombo = false;
							return false;
						}
					});
					if (buyOne || buyCombo) {
						var checkQuantity = window.shop.limitCart;
						var titleLimit = window.shop.limitCartTitle;
						var template = window.shop.template;
						var numberItem = data.item_count;
						var checkLimit = false;						
						$.each(data.items, function(i,v){
							if (v.price < v.price_original){
								if (numberItem > checkQuantity){
									checkLimit = true;
									return false;
								}
							}
						});
						if (checkLimit){
							swal({
								type: 'warning',
								text: titleLimit,
							});
						}else{
							window.location = '/checkout';
						}
					}
					else{
						var checkQuantity = 2;
						var titleLimit1 = window.shop.limitCartTitleCombo;
						var template = window.shop.template;
						var numberItem = data.item_count;
						var checkLimit = false;						
						$.each(data.items, function(i,v){
							if (v.price < v.price_original){
								if (numberItem > checkQuantity){
									checkLimit = true;
									return false;
								}
							}
						});
						if (checkLimit){
							swal({
								type: 'warning',
								text: titleLimit1,
							});
						}else{
							window.location = '/checkout';
						}
					}
				}
			});
		});*/
	},
	quickview: function(){
		$(document).on('click','.quickView', function(){
			var handle = $(this).attr("data-handle")
			$.ajax({
				url: handle,
				success: function (data) {
					$("#quickview-cart-desktop").html(data);
					$('#quickview-cart').modal('show');
				}
			});
		})
		$(document).on('click','.close-quick-view', function(){
			$('#quickview-cart').modal('hide');
		})
	},
	//suggestSearch: function(){
	//	$('.searchDesktop').submit(function(e) {
	//		e.preventDefault();
	//		var q = $(this).find('input[name=q]').val();
	//		var q_follow = 'product';
	//		var query = encodeURIComponent('((title:product**' + q + ')||(sku:product**' + q + '))');
	//		if( !q ) {
	//			window.location = '/search?type='+ q_follow +'&q=*';
	//			return;
	//		}	else {
	//			window.location = '/search?type=' + q_follow +'&q=filter=' + query;
	//			return;
	//		}
	//	});
	//	var $input = $('.searchDesktop input[type="text"]');
	//	$input.bind('keyup change paste propertychange', function() {
	//		var key = $(this).val(),
	//				$parent = $(this).parents('.searchFormHeader'),
	//				$results = $(this).parents('.searchFormHeader').find('#resultSearchDesktop');
	//		if(key.length > 0 ){
	//			$(this).attr('data-history', key);
	//			var q_follow = 'product',
	//					str = '';
	//			str = '/search?q=filter=((title:product**' + key + ')||(sku:product**' + key + '))&view=ultimate-product';
	//			$.ajax({
	//				url: str,
	//				type: 'GET',
	//				async: true,
	//				success: function(data){
	//					$results.find('.innerResultDesktop').html(data);
	//				}
	//			})
	//			$results.fadeIn();
	//		}else{
	//			$results.fadeOut();
	//		}
	//	});
	//	$('input[name="follow"]').on('change', function(){
	//		$('.searchDesktop input[type="text"]').trigger('change');
	//	})
	//	$('input[name="follow_mobile"]').on('change', function(){
	//		$('.searchDesktop input[type="text"]').trigger('change');
	//	})
	//	$('body').click(function(evt) {
	//		var target = evt.target;
	//		if (target.id !== 'resultSearchDesktop' && target.id !== 'searchInputDesktop') {
	//			$("#resultSearchDesktop").hide();
	//		}
	//	});
	//	$('body').on('click', '.searchDesktop input[type="text"]', function() {
	//		if ($(this).is(":focus")) {
	//			if ($(this).val() != '') {
	//				$("#resultSearchDesktop").show();
	//			}
	//		} else {
	//		}
	//	});
	//},
	heightHeader: function(){
		setTimeout(function(){
			$(window).resize();
			var height = $(".outerHeightHeader").outerHeight();
			$(".outerHeightHeader").css("height",height);
		},500)
	},
	menuFooter: function(){
		$("#footerBottom .innerInfoFooter h4").click(function(){
			if ($(window).width() > 768){
				$("#footerBottom .innerInfoFooter h4").next().slideToggle();
			}else{
				$(this).next().slideToggle();
			}
			(function(d, s, id) {
				var js, fjs = d.getElementsByTagName(s)[0];
				if (d.getElementById(id)) return;
				js = d.createElement(s); js.id = id;
				js.src = 'https://connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js#xfbml=1&version=v2.12&autoLogAppEvents=1';
				fjs.parentNode.insertBefore(js, fjs);
			}(document, 'script', 'facebook-jssdk'));
		});
	},
	mmMenu: function(){
		if ($(window).width() < 1200){
			$(function() {
				$('#menu-mobile').mmenu();
			});
			flagg = true;
			if(flagg){
				$('.hamburger-menu').click(function(){
					$('#menu-mobile').removeClass('hidden');
					flagg = false;
				})
			}
		}else{
			$("#menu-mobile").remove();
		}
	},
	colorVariant: function(){
		$(".variantColor").each(function(){
			$(this).find("li:visible:first").addClass("active");
		})
		$(".variantColor li").each(function(){
			if ($(this).hasClass("hide")){
				var img  = $(this).next().find("a").attr("data-img");
				var imgHover  = $(this).next().find("a").attr("data-img-hover");
				$(this).parents(".product-block").find(".product-img picture:nth-child(1) img").attr("src",img);
				$(this).parents(".product-block").find(".product-img picture:nth-child(2) img").attr("src",imgHover);
			}
		})
		$(".variantColor li.active").each(function(){
			//var value_color = $(this).attr("data-color");
			//var href = $(this).parents(".product-block").find("a:not(.notClick)").attr("href");
			//var newhref = href + value_color;
			//$(this).parents(".product-block").find("a:not(.notClick)").attr("href",newhref);
			var imgVariant1 = $(this).find("a").attr("data-img");
			var imgVariant2 = $(this).find("a").attr("data-img-hover");
			$(this).parents(".product-block").find(".product-img picture:nth-child(1) img").attr("src",imgVariant1);
			$(this).parents(".product-block").find(".product-img picture:nth-child(2) img").attr("src",imgVariant2);
		});
		$(".variantColor li").hover(function(e){
			e.preventDefault();
			$(this).parents(".variantColor").find("li").removeClass("active");
			$(this).addClass("active");
			//$(this).each(function(){
			//	var value_color = $(this).attr("data-color");
			//	var href = $(this).parents(".product-block").find("a:not(.notClick)").attr("href");
			//	if (href.indexOf("?color") != -1){
			//		var splitHref = href.split("?color")[0];
			//		var newhref = splitHref + value_color;
			//	}else{
			//		var newhref = href + value_color;
			//	}
			//	$(this).parents(".product-block").find("a:not(.notClick)").attr("href",newhref);
			//});
			var imgVariant1 = $(this).find("a").attr("data-img");
			var imgVariant2 = $(this).find("a").attr("data-img-hover");
			$(this).parents(".product-block").find(".product-img picture:nth-child(1) img").attr("src",imgVariant1);
			$(this).parents(".product-block").find(".product-img picture:nth-child(2) img").attr("src",imgVariant2);
		});
	},
	resizeImage: function () {
		setTimeout(function(){
			$('.image-resize').imagesLoaded(function() {
				$(window).resize();
				vuongQuangTuan.Main.fixHeightProduct('.product-resize','.image-resize');
				$(window).resize(function() {
					vuongQuangTuan.Main.fixHeightProduct('.product-resize','.image-resize');
				});
			});
		},5000)
	},
	fixHeightProduct: function(data_parent, data_target, data_image) {
		var box_height = 0;
		var box_image = 0;
		var boxtarget = data_parent + ' ' + data_target;
		var boximg = data_parent + ' ' + data_target + ' ' + data_image;
		jQuery(boximg).css('height', 'auto');
		jQuery($(boxtarget)).css('height', 'auto');
		jQuery($(boxtarget)).removeClass('fixheight');
		jQuery($(boxtarget)).each(function() {
			if (jQuery(this).find($(data_image)).height() > box_image) {
				box_image = jQuery(this).find($(data_image)).height();
			}
		});
		if (box_image > 0) {
			jQuery(boximg).height(box_image);
		}
		jQuery($(boxtarget)).each(function() {
			if (jQuery(this).height() > box_height) {
				box_height = jQuery(this).height();
			}
		});
		jQuery($(boxtarget)).addClass('fixheight');
		if (box_height > 0) {
			jQuery($(boxtarget)).height(box_height);
		}
		try {
			fixheightcallback();
		} catch (ex) {}
	},
};
vuongQuangTuan.Index = {
	init: function(){
		this.tabCollection();
		this.sliderCollection();
		this.sliderCustomer();
		this.clickPanel();
		this.slideBannerMobile();
		this.removeOptimize();
		this.sliderCollectionHome3();
		this.setSessionURL();
	},
	setSessionURL: function(){
		var url = window.location.href;
		sessionStorage.setItem("urlAfterLogin", url);
	},
	removeOptimize: function(){
		if ($(window).width() > 768){
			$(".visible-xs").remove();
		}
	}, 
	clickPanel: function(){
		$(".sectionContentTab a:not(.notClick)").click(function(){
			var link = $(this).attr("href");
			window.location.href = link;
		});
	},
	tabCollection: function() {

		$(document).on("click", "#sectionHomeTabCollection1 .tabTitle li:not(.noClickLi)", function(e) {
			$("#sectionHomeTabCollection1 .tabTitle li").addClass("noClickLi");
			var handle = $(this).children('a').attr('data-handle');
			var id = $(this).attr('data-slide');
			if ($('#sectionHomeTabCollection1 .tab-content .tab-pane.active').attr('data-get') == 'false' && handle != '' ) {
				jQuery.ajax({
					url: 'collections/' + handle + '?view=filter-tab-home-1',
					success:function(data){
						$('#sectionHomeTabCollection1 .tab-pane[data-get="false"]').find(".product-lists").html(' ');
						$('#sectionHomeTabCollection1 .tab-content .tab-pane.active').children('.product-lists-home').append(data);	
						$("#sectionHomeTabCollection1 .product-lists-home").fadeIn('slow');
						vuongQuangTuan.Index.clickPanel();

						setTimeout(function(){
							lazyload();
							vuongQuangTuan.Main.colorVariant();
							vuongQuangTuan.Main.resizeImage();
							$("#sectionHomeTabCollection1 .tabTitle li").removeClass("noClickLi");
						},300);
					}
				});
			}
			if ($('#sectionHomeTabCollection1 .tab-content .tab-pane.active').attr('data-get') == 'false' && handle == '' ) {				
				$('#sectionHomeTabCollection1 .tab-content .tab-pane.active').children('.product-lists-home').append("<div class='alertNoProduct'>Hiện tại cửa hàng mình đang cập nhật dữ liệu</div>");
			}
		});
		$(document).on("click", "#sectionHomeTabCollection2 .tabTitle li:not(.noClickLi)", function(e) {
			$("#sectionHomeTabCollection2 .tabTitle li").addClass("noClickLi");
			var handle = $(this).children('a').attr('data-handle');
			var id = $(this).attr('data-slide');
			if ($('#sectionHomeTabCollection2 .tab-content .tab-pane.active').attr('data-get') == 'false' && handle != '' ) {
				jQuery.ajax({
					url: 'collections/' + handle + '?view=filter-tab-home-2',
					success:function(data){
						$('#sectionHomeTabCollection2 .tab-pane[data-get="false"]').find(".product-lists").html(' ');
						$('#sectionHomeTabCollection2 .tab-content .tab-pane.active').children('.product-lists-home').append(data);	
						$("#sectionHomeTabCollection2 .product-lists-home").fadeIn('slow');	
						vuongQuangTuan.Index.clickPanel();	

						setTimeout(function(){
							lazyload();
							vuongQuangTuan.Main.colorVariant();
							vuongQuangTuan.Main.resizeImage();	
							$("#sectionHomeTabCollection2 .tabTitle li").removeClass("noClickLi");
						},300);
					}
				});
			}
			if ($('#sectionHomeTabCollection2 .tab-content .tab-pane.active').attr('data-get') == 'false' && handle == '' ) {				
				$('#sectionHomeTabCollection2 .tab-content .tab-pane.active').children('.product-lists-home').append("<div class='alertNoProduct'>Hiện tại cửa hàng mình đang cập nhật dữ liệu</div>");
			}
		});
		$(document).on("click", "#sectionHomeTabCollection4 .tabTitle li:not(.noClickLi)", function(e) {
			$("#sectionHomeTabCollection4 .tabTitle li").addClass("noClickLi");
			var handle = $(this).children('a').attr('data-handle');
			var id = $(this).attr('data-slide');
			if ($('#sectionHomeTabCollection4 .tab-content .tab-pane.active').attr('data-get') == 'false' && handle != '' ) {
				jQuery.ajax({
					url: 'collections/' + handle + '?view=filter-tab-home-4',
					success:function(data){
						$('#sectionHomeTabCollection4 .tab-pane[data-get="false"]').find(".product-lists").html(' ');
						$('#sectionHomeTabCollection4 .tab-content .tab-pane.active').children('.product-lists-home').append(data);	
						$("#sectionHomeTabCollection4 .product-lists-home").fadeIn('slow');	
						vuongQuangTuan.Index.clickPanel();	

						setTimeout(function(){
							lazyload();
							vuongQuangTuan.Main.colorVariant();
							vuongQuangTuan.Main.resizeImage();	
							$("#sectionHomeTabCollection4 .tabTitle li").removeClass("noClickLi");
						},300);
					}
				});
			}
			if ($('#sectionHomeTabCollection4 .tab-content .tab-pane.active').attr('data-get') == 'false' && handle == '' ) {				
				$('#sectionHomeTabCollection4 .tab-content .tab-pane.active').children('.product-lists-home').append("<div class='alertNoProduct'>Hiện tại cửa hàng mình đang cập nhật dữ liệu</div>");
			}
		});
	},
	sliderCollection: function () {
		$('.slideProductBanner').slick({
			centerPadding: '20px',
			slidesToShow: 2,
			autoplay: true,
		});
	},
	sliderCollectionHome3: function(){
		$('.slideProductHome3').slick({
			centerPadding: '20px',
			slidesToShow: 4,
			autoplay: true,
			responsive: [
				{
					breakpoint: 1024,
					settings: {
						slidesToShow: 4,
						slidesToScroll: 1,
						infinite: true,
						dots: true
					}
				},
				{
					breakpoint: 600,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 1
					}
				},
				{
					breakpoint: 480,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 1
					}
				}
			]
		});
	},
	sliderCustomer: function(){
		$('.sliderContentCustomer').slick({
			slidesToShow: 4,
			autoplay: true,
			arrows: false,
			responsive: [
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 1
					}
				},
			]
		});
	},
	slideBannerMobile: function(){
		if ($(window).width() < 767){
			$('.sliderMobileBannerHome').slick({
				slidesToShow: 1,
				autoplay: true,
				arrows: true,
			});
		}
	},
};
vuongQuangTuan.Collection = { 
	init: function(){
		this.filterMobile();
		this.removeDiv();
		//this.viewMoreContent();
		//this.setSessionURL();
	},
	setSessionURL: function(){
		var url = window.location.href;
		sessionStorage.setItem("urlAfterLogin", url);
	},
	removeDiv: function(){
		if ($(window).width() < 992){
			$(".removeMobile").remove();
		}else{
			$(".removeDesktop").remove();
		}
	},
	filterMobile: function(){
		$(".filterSmallScreen").click(function () {
			$("body").addClass("openFilter");
		});
		$(".btn_filter_cancel").click(function(){
			$("body").removeClass("openFilter");
		});
	},
	viewMoreContent: function(){
		var height = $(".showmore-content").outerHeight();
		if(height > 95){
			$(".showmore-content").addClass("active");
			$(".view-more").removeClass("hide");
		}
		$(".view-more").click(function(){
			$(this).hide();
			$(".showmore-content").removeClass("active");
		});
	},
};
vuongQuangTuan.Product = {
	init: function(){
		this.removeMobile();
		this.setSessionURL();
	},
	setSessionURL: function(){
		var url = window.location.href;
		sessionStorage.setItem("urlAfterLogin", url);
	},
	removeMobile: function(){
		if ($(window).width() < 768){
			$(".removeImgMobile").remove();
		}else {
			$(".removeImgDesktop").remove();
		}
	}
};
vuongQuangTuan.Blog = {
	init: function(){
		this.setSessionURL();
	},
	setSessionURL: function(){
		var url = window.location.href;
		sessionStorage.setItem("urlAfterLogin", url);
	}
};
vuongQuangTuan.Article = {
	init: function(){
		this.setSessionURL();
	},
	setSessionURL: function(){
		var url = window.location.href;
		sessionStorage.setItem("urlAfterLogin", url);
	}
};
vuongQuangTuan.Page = {
	init: function(){
		this.setSessionURL();
	},
	setSessionURL: function(){
		var url = window.location.href;
		sessionStorage.setItem("urlAfterLogin", url);
	}
};
vuongQuangTuan.SaleOnline = { 
	init: function(){
		this.countDownSaleOnline();
	},
	countDownSaleOnline: function(){
		$(".saleOnlineCountDown .lof-clock-detail").lofCountDown({
			TargetDate:"5/31/2019 23:59:59",
			DisplayFormat:"<ul class='list-inline'><li class='day'>%%D%%<span>ngày</span></li><li>%%H%%<span>giờ</span></li><li>%%M%%<span>phút</span></li><li>%%S%%<span>giây</span></li></ul>",
			FinishMessage: "Hết hạn"
		});
	},
};
vuongQuangTuan.ProductNew = { 
	init: function(){
		this.slickProductNew();
	},
	slickProductNew: function(){
		if ($(window).width() > 768){
			$('#sectionProductMain .slider-nav1').slick({
				autoplay: true,
				arrows: false,
				dots: false,
				slidesToShow: 5,
				centerPadding: "10px",
				draggable: true,
				infinite: true,
				pauseOnHover: false,
				swipe: false,
				touchMove: false,
				vertical: true,
				speed: 1000,
				autoplaySpeed: 2000,
				useTransform: true,
				cssEase: 'cubic-bezier(0.645, 0.045, 0.355, 1.000)',
				adaptiveHeight: true,
			});
		}else{
			$('#sectionProductMain .slider-nav1').slick({
				autoplay: true,
				arrows: false,
				dots: true,
				slidesToShow: 1,
				speed: 1000,
				autoplaySpeed: 2000,
			});
		}
	},
};
vuongQuangTuan.Cart = {
	init: function(){
		this.slideProductInCart();
	},
	slideProductInCart: function(){
		$('.owlCollectionCart .owl-carousel').owlCarousel({
			items:4,
			nav: true,
			dots: true,
			lazyLoad:true,
			touchDrag: true,
			margin: 10,
			responsive:{
				0:{
					items:2
				},
				767:{
					items:2
				},
				1024:{
					items:4
				}
			}
		});
	},
}
vuongQuangTuan.Store = { 
	init: function(){
		this.sliderStore();
	},
	sliderStore: function(){
		$('#store-slider .owl-carousel').owlCarousel({
			items:1,
			nav: false,
			dots: true,
			lazyLoad:true,
			touchDrag: true,
			responsive:{
				0:{
					items:1
				},
				768:{
					items:1
				},
				1024:{
					items:1
				}
			}
		});
	},
};
vuongQuangTuan.Campaign = { 
	init: function(){
		this.promotionCountCampaign();
		this.fixedMenuCampaign();
		this.menuActiveMobile();
		this.loadFixed();
		this.heightHeader();
	},

	heightHeader: function(){
		setTimeout(function(){
			var height = $("#site-header").outerHeight();
			$(".outerHeightHeader").css("min-height",height);
		},100);
	},

	promotionCountCampaign: function(){
		$(".countDownCampaign .lof-clock-detail").lofCountDown({
			TargetDate:"6/10/2019 23:59:59",
			DisplayFormat:"<ul class='list-inline'><li class='day'>%%D%%<span>ngày</span></li><li>%%H%%<span>giờ</span></li><li>%%M%%<span>phút</span></li><li>%%S%%<span>giây</span></li></ul>",
			FinishMessage: "Hết hạn"
		});
	},

	fixedMenuCampaign: function(){
		if ($(window).width() > 1024){
			var height = $(".outerMenuCampagin").outerHeight();
			$(".outerMenuCampagin").css("height",height);
			$(window).scroll(function() {    
				var scroll = $(window).scrollTop();
				var header = 90;
				var bannerCollection = $(".banner-collection-header").outerHeight();
				var mainCount = $(".mainCountDown").outerHeight();
				var total = header + bannerCollection + mainCount;
				if (scroll >= total) {
					$(".menuCampaignT5").addClass("darkHeader");
				} else {
					$(".menuCampaignT5").removeClass("darkHeader");
				}
			});
		}
		if ($(window).width() < 768){
			var height = $(".outerMenuCampagin").outerHeight();
			$(".outerMenuCampagin").css("height",height);
			$(window).scroll(function() {    
				var scroll = $(window).scrollTop();
				var header = 90;
				var bannerCollection = $(".banner-collection-header").outerHeight();
				var mainCount = $(".mainCountDown").outerHeight();
				var total = header + bannerCollection + mainCount;
				if (scroll >= total) {
					$(".menuCampaignT5").addClass("darkHeader");
				} else {
					$(".menuCampaignT5").removeClass("darkHeader");
				}
			});
		}
	},

	menuActiveMobile: function(){
		if ($(window).width() < 768){
			$(".menuLevel1Campaign .menuLevel2Campaign li.active").parents(".menuLevel1Campaign").find(".parentLv1").removeClass("active");
			$(".menuLevel1Campaign .menuLevel2Campaign li.active").parents("li").addClass("active");
		}
	},

	loadFixed: function(){
		if ($(window).width() > 1024){
			setTimeout(function(){
				$("html, body").animate({ 
					scrollTop: $('.outerMenuCampagin').offset().top
				}, 1000);			
			},1000);
		}
		if ($(window).width() < 768){
			setTimeout(function(){
				$("html, body").animate({ 
					//scrollTop: $('.outerMenuCampagin').offset().top - 50
				}, 1000);			
			},500);
		}
	}

};
vuongQuangTuan.WalkFreely = {
	init: function(){
		this.promotionCountWalkFreely();
		this.slideStar();
	},
	promotionCountWalkFreely: function(){
		$(".countDownWalkFreely .lof-clock-detail").lofCountDown({
			TargetDate:"8/1/2019 23:59:59",
			DisplayFormat:"<ul class='list-inline'><li class='day'>%%D%%<span>ngày</span></li><li>%%H%%<span>giờ</span></li><li>%%M%%<span>phút</span></li><li>%%S%%<span>giây</span></li></ul>",
			FinishMessage: "Hết hạn"
		});
	},
	slideStar: function(){
		$('.sliderStar .owl-carousel').owlCarousel({
			items:1,
			nav: true,
			navText : ["<img src='//theme.hstatic.net/1000003969/1000550110/14/left-arrow-white.png?v=83' alt='Left Arrow' />","<img src='//theme.hstatic.net/1000003969/1000550110/14/right-arrow-white.png?v=83' alt='Right Arrow' />"],
			dots: false,
			touchDrag: true,
		});
	},
};
vuongQuangTuan.DetailCollections = {
	init: function(){
		this.countDetailCollections();
		this.quickView();
		this.slideListCollections();
		this.addClass();
	},
	countDetailCollections: function(){
		$(".countDownDetailCollections .lof-clock-detail").lofCountDown({
			TargetDate:"10/29/2019 23:59:59",
			DisplayFormat:"<ul class='list-inline'><li class='day'>%%D%%<span>ngày</span></li><li>%%H%%<span>giờ</span></li><li>%%M%%<span>phút</span></li><li>%%S%%<span>giây</span></li></ul>",
			FinishMessage: "Hết hạn"
		});
	},
	addClass: function(){
		var sizeLoop = $(".groupDetailCollection5 .content-product-list .product-resize").size();
		if (sizeLoop < 4){
			$(".groupDetailCollection5 .content-product-list").addClass("disFlex");
		}
	},
	quickView: function(){
		$(document).on('click','.quickview', function(){
			var handle = $(this).attr("data-href");
			$.ajax({
				url: handle+'?view=quickview-ldp',
				success: function(data){
					$("#quickview-cart-desktop").html(data);
					$('#quickview-cart').modal('show');
				}
			});
		})
		$(document).on('click','.close-quick-view', function(){
			$('#quickview-cart').modal('hide');
		})
		$(document).on('click','#add-to-cart-quickview',function(e){	
			if($(this).parents("#add-item-form").find('label.sd').length == $(this).parents("#add-item-form").find('div[id*=variant-swatch-]').length){
				e.preventDefault();
				$(this).addClass('clicked_buy');
				//add_item_show_modalCart($(this).parents("#add-item-form").find('#product-select').val());
				getCartModal();
			}else{
				swal({
					type: 'error',
					text: 'Please choose your favorite dish. Thank you.'
				});
			}
		})
	},
	slideListCollections: function(){
		$('#sliderDetailCollections .owl-carousel').owlCarousel({
			items:4,
			nav: true,
			navText : ["<img src='https://file.hstatic.net/1000003969/file/left_arrow_fix1_c0a22539e52047ad970c05804a15ad47.png' alt='Left Arrow' />","<img src='https://file.hstatic.net/1000003969/file/right_arrow_fix1_b0dec2041e3b44598af52a564efdb2db.png' alt='Right Arrow' />"],
			dots: false,
			touchDrag: true,
			margin: 30,
			autoplay:true,
			autoplayTimeout:1000,
			autoplayHoverPause:true,
			responsive:{
				0:{
					items:2
				},
				767:{
					items:2
				},
				1024:{
					items:4
				}
			}
		});
	},
};
vuongQuangTuan.PSI = {
	init: function(){
		this.getUrl();
	},
	getUrl: function(){
		var save = localStorage.getItem("urlPsi");
		var admin = localStorage.getItem("admin",true);
		if (save == null){
			localStorage.setItem("urlPsi",window.location.href);
			var href =  window.location.href;
			window.location = href + "?view=vuongQuangTuan-system";
		}else{
			if (admin == null){
				var href =  window.location.href;
				window.location = href + "?view=vuongQuangTuan-system";
			}else{
				swal({
					type: 'success',
					text: "Welcome to Family vuongQuangTuan",
				});
			}
		}
	},
};
vuongQuangTuan.ClearOnline = { 
	init: function(){
		this.promotionCountClearOnline();
		this.formSubmit();
	},
	promotionCountClearOnline: function(){
		$(".countDownCampaign .lof-clock-detail").lofCountDown({
			TargetDate:"08/04/2019 23:59:59",
			DisplayFormat:"<ul class='list-inline'><li class='day'>%%D%%<span>ngày</span></li><li>%%H%%<span>giờ</span></li><li>%%M%%<span>phút</span></li><li>%%S%%<span>giây</span></li></ul>",
			FinishMessage: "Hết hạn"
		});
	},
	formSubmit: function(){
		$('#newFormsubmitClearOnline').submit(function(e){
			e.preventDefault();
			var email = $(this).find(".newsletter-input").val();
			$('#entry_992502368').attr('value',email);
			if ($(this).find("input[type='checkbox']:checked")){
				$.ajax({
					type: 'POST',
					dataType: "jsonp",
					url: 'https://docs.google.com/forms/d/e/1FAIpQLSdr6iWnxA8Q78Jyu6z75wSiaVN7hH7XeXIyFg6jMslO0A8psw/formResponse',
					data: jQuery('#formClearOnline').serialize(),
					success: function(data) {
						$("#newFormsubmitClearOnline .newsletter-input").val(' ');
					},
					error: function(xhr, textStatus, errorThrown) {
					}
				});
				swal({
					type: 'success',
					text: "Chức mừng bạn đã đăng ký thành công!",
				});
			}
		});
	},
};
vuongQuangTuan.RunningSale = { 
	init: function(){
		this.promotionCountRunningSale();
		this.formSubmit();
	},
	promotionCountRunningSale: function(){
		$(".countDownCampaign .lof-clock-detail").lofCountDown({
			TargetDate:"10/09/2019 23:59:59",
			DisplayFormat:"<ul class='list-inline'><li class='day'>%%D%%<span>ngày</span></li><li>%%H%%<span>giờ</span></li><li>%%M%%<span>phút</span></li><li>%%S%%<span>giây</span></li></ul>",
			FinishMessage: "Hết hạn"
		});
	},
	formSubmit: function(){
		$('#newFormsubmitRunningSale').submit(function(){
			var email = $(this).find(".newsletter-input").val();
			$('#entry_1689013373').attr('value',email);
			if ($(this).find("input[type='checkbox']:checked")){
				$.ajax({
					type: 'POST',
					dataType: "jsonp",
					url: 'https://docs.google.com/forms/d/e/1FAIpQLSdZrq_0gIlvIeD-MzZlChssHOtg5i0ZPtjVTwEGTJljRBAWIQ/formResponse',
					data: jQuery('#formClearOnline').serialize(),
					success: function(data) {
						$("#newFormsubmitRunningSale .newsletter-input").val(' ');
					},
					error: function(xhr, textStatus, errorThrown) {
					}
				});
			}
		});
	},
};
vuongQuangTuan.LdpSeptember = { 
	init: function(){
		this.countDownSeptember();
	},
	countDownSeptember: function(){
		$(".countDownCampaign .lof-clock-detail").lofCountDown({
			TargetDate:"02/14/2020 23:59:59",
			DisplayFormat:"<ul class='list-inline'><li class='day'>%%D%%<span>ngày</span></li><li>%%H%%<span>giờ</span></li><li>%%M%%<span>phút</span></li><li>%%S%%<span>giây</span></li></ul>",
			FinishMessage: "Hết hạn"
		});
	},
};
vuongQuangTuan.LdpAppCombo = { 
	init: function(){
		this.promotionCountAppCombo();
	},
	promotionCountAppCombo: function(){
		$(".countDownCampaign .lof-clock-detail").lofCountDown({
			TargetDate:"2/27/2020 23:59:59",
			DisplayFormat:"<ul class='list-inline'><li class='day'>%%D%%<span>ngày</span></li><li>%%H%%<span>giờ</span></li><li>%%M%%<span>phút</span></li><li>%%S%%<span>giây</span></li></ul>",
			FinishMessage: "Hết hạn"
		});
	},
	formSubmit: function(){
		$('#newFormsubmitRunningSale').submit(function(){
			var email = $(this).find(".newsletter-input").val();
			$('#entry_1871503202').attr('value',email);
			if ($(this).find("input[type='checkbox']:checked")){
				$.ajax({
					type: 'POST',
					dataType: "jsonp",
					url: 'https://docs.google.com/forms/d/e/1FAIpQLSdnDCWlNNovo3tnXHCcKPF-ZCFpDqF_bdrmFfK9kMnRLlafvA/formResponse',
					data: jQuery('#formClearOnline').serialize(),
					success: function(data) {
						$("#newFormsubmitRunningSale .newsletter-input").val(' ');
					},
					error: function(xhr, textStatus, errorThrown) {
					}
				});
			}
		});
	},
};
vuongQuangTuan.Register = {
	init: function(){
		this.checkEmail();
	},
	checkEmail: function(){
		$("#create_customer").submit(function(e){
			var email = $(".input-email-register").val();
			if (email.indexOf('@yandex.ru') != -1 || email.indexOf('yandex') != -1){
				e.preventDefault();
				swal({
					title: 'Email đăng ký không hợp lệ, vui lòng không spam!',
					type: 'warning',
				});
			}
		});
	},
};
vuongQuangTuan.BlackFriday2019 = {
	init: function(){
		this.promotionCountBlackFriday();
		this.formSubmit();
		this.filterMobile();
		this.removeDiv();
	},
	promotionCountBlackFriday: function(){
		$(".countDownCampaign .lof-clock-detail").lofCountDown({
			TargetDate:"11/24/2019 23:59:59",
			DisplayFormat:"<ul class='list-inline'><li class='day'>%%D%%<span>ngày</span></li><li>%%H%%<span>giờ</span></li><li>%%M%%<span>phút</span></li><li>%%S%%<span>giây</span></li></ul>",
			FinishMessage: "Hết hạn"
		});
	},
	formSubmit: function(){
		if ($(window).width() < 768){
			$(".item-small-menu-black-friday.active").parent().css({"display":"inherit","width":"100%"});
			$(".title-left-black-friday").click(function(){
				$(".list-right-menu-black-friday").hide();
				$(".list-left-menu-black-friday").css({"display":"inherit","width":"100%"});			
			});
			$(".title-right-black-friday").click(function(){
				$(".list-left-menu-black-friday").hide();
				$(".list-right-menu-black-friday").css({"display":"inherit","width":"100%"});
			});
			$(".item-small-menu-black-friday.active").parent().addClass("active");
			var data_tab = $(".list-item-menu-black-friday.active").attr("data-tab");
			$(".item-menu-black-friday[data-tab="+data_tab+"]").addClass("active");
		}else{
			$(".item-small-menu-black-friday.active").parent().addClass("active");
			var data_tab = $(".list-item-menu-black-friday.active").attr("data-tab");
			$(".item-menu-black-friday[data-tab="+data_tab+"]").addClass("active");
		}
		$('#newFormsubmitBlackFriday').submit(function(){
			var email = $(this).find(".newsletter-input").val();
			$('#entry_105485220').attr('value',email);
			if ($(this).find("input[type='checkbox']:checked")){
				$.ajax({
					type: 'POST',
					dataType: "jsonp",
					url: 'https://docs.google.com/forms/d/e/1FAIpQLScaJTMEBlUKa2uZSfWiRtbKhzV3dHSzR8NBOHyIRirkG9P5qw/formResponse',
					data: jQuery('#formClearOnline').serialize(),
					success: function(data) {
						$("#newFormsubmitBlackFriday .newsletter-input").val(' ');
					},
					error: function(xhr, textStatus, errorThrown) {
					}
				});
			}
		});
	},
	removeDiv: function(){
		if ($(window).width() < 992){
			$(".removeMobile").remove();
		}else{
			$(".removeDesktop").remove();
		}
	},
	filterMobile: function(){
		$(".filterSmallScreen").click(function(){
			$("body").addClass("openFilter");
		});
		$(".btn_filter_cancel").click(function(){
			$("body").removeClass("openFilter");
		});
	},
};
vuongQuangTuan.Promotion30 = {
	init: function(){
		this.promotionCount30();
	},
	promotionCount30: function(){
		$(".countDownCampaign .lof-clock-detail").lofCountDown({
			TargetDate:"12/19/2019 23:59:59",
			DisplayFormat:"<ul class='list-inline'><li class='day'>%%D%%<span>ngày</span></li><li>%%H%%<span>giờ</span></li><li>%%M%%<span>phút</span></li><li>%%S%%<span>giây</span></li></ul>",
			FinishMessage: "Hết hạn"
		});
	},
};
vuongQuangTuan.CustomerAccount = {
	init: function(){

	},
	functionEvent: function(){
		if ($(window).width() > 1000){
			var height = $(".banner-login").outerHeight();
			$(".userbox-new").css("height",height);
		}
		$(".relative-position img").click(function(){
			var input = $(this).parent().find("input");
			var attrInput = input.attr("type");
			if (attrInput == "password"){
				input.attr("type","text")
			}else{
				input.attr("type","password")
			}
		});
		$("#create_customer").submit(function(e){
			e.preventDefault();
			var pass1 = $("#password_main").val();
			var pass2 = $("#password_confirm").val();
			if (pass1 == pass2){
				$("#create_customer").bind("submit");
			}else{
				swal({
					title: "Xác nhận mật khẩu không chính xác",
					type: 'warning',
				});
			}
		});
	},
}
