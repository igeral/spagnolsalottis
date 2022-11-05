Shop = {
  init: function () {
    Shop.Common.init();
    Shop.Cart.init();
    Shop.Notifications.init();
    Shop.Search.initSearch();
  },

  Common: {
    init: function () {
      /**
       *  Side Cart opening / closing
       */
      $("body")
        .on(
          "click",
          "#partial-cart-side, .open-side-cart-button, .open-side-cart-button *, .close-cart, .close-cart *",
          function (event) {
            if (event.target !== this) {
              return;
            }
            event.preventDefault();
            Shop.Cart.toggle();
          }
        )
        .on("transitionend", "#section-cart-side", function (event) {
          $("#partial-cart-side").removeClass("cart-side-animatable");
        });

      $(document).keyup(function (e) {
        if (e.keyCode == 27) {
          Shop.Cart.hide();
        }
      });

      /**
       *  Sidebar opening / closing
       */
      $("#page-catalog").on(
        "click",
        "#partial-catalog-sidebar-toggle",
        function () {
          var productsContainer = $(this)
            .closest("#page-catalog")
            .find("#section-catalog-products-width");
          var productContainers = productsContainer.find(
            ".section-catalog-product-width"
          );
          var sidebar = $(this)
            .closest("#page-catalog")
            .find("#section-catalog-sidebar");
          var sidebarToggleVisibleLabel = $(this).find(
            "#partial-catalog-sidebar-visible"
          );
          var sidebarToggleHiddenleLabel = $(this).find(
            "#partial-catalog-sidebar-hidden"
          );

          //sidebar.addClass('sidebar-animatable');
          if (productsContainer.hasClass("col-sm-offset-3")) {
            sidebarToggleVisibleLabel.addClass("display-none");
            sidebarToggleHiddenleLabel.removeClass("display-none");

            productsContainer.removeClass().addClass("col-sm-12");
            productContainers.removeClass("sec-4-sm").addClass("col-sm-3");
            sidebar
              .css({ left: "-15px", opacity: 100 })
              .animate({ left: "-100%", opacity: 0 });
            document.cookie = "showSidebar=false";
          } else {
            sidebarToggleVisibleLabel.removeClass("display-none");
            sidebarToggleHiddenleLabel.addClass("display-none");

            productsContainer
              .addClass("col-sm-offset-3")
              .addClass("col-sm-9")
              .removeClass("col-sm-12");
            productContainers.addClass("sec-4-sm").removeClass("col-sm-3");
            sidebar
              .removeClass("hidden")
              .css({ left: "-100%", opacity: 0 })
              .animate({ left: 0, opacity: 100 });
            document.cookie = "showSidebar=true";
          }
        }
      );

      /**
       * Dropdown
       */
      $("body").on("click", ".dropdown-toggle", function (event) {
        event.preventDefault();

        //if (event.target !== this){ return }

        if ($(this).closest(".dropdown").hasClass("opened")) {
          $(this).closest(".dropdown").removeClass("opened");
        } else {
          var dropdown = $(this).closest(".dropdown");
          dropdown.addClass("opened");
          $("body").one("click.dropdown", function () {
            dropdown.find(".dropdown-toggle:first").click();
          });
        }
      });

      /**
       * Modal
       */
      $("body").on("click", ".modal-toggle", function (event) {
        event.preventDefault();

        var html = $($(this).data("modal-content")).html();

        Shop.Common.openModal(html);
      });

      /**
       * Accordion
       */
      $("body").on("click", ".accordion-toggle", function (event) {
        event.preventDefault();
        if ($(this).closest(".accordion-container").hasClass("active")) {
          $(this).closest(".accordion-container").removeClass("active");
        } else {
          if (!$(this).closest(".accordion").hasClass("no-auto-close")) {
            $(this)
              .closest(".accordion")
              .find(".accordion-container:not(active)")
              .each(function () {
                $(this).removeClass("active");
              });
          }
          $(this).closest(".accordion-container").addClass("active");
        }
      });

      /**
       * AddressDropdown
       */
      $("body").on("change", ".radio-accordion-toggle", function () {
        $(this)
          .closest(".radio-accordion")
          .find(".radio-accordion-container:not(active)")
          .each(function () {
            $(this).removeClass("active");
          });
        $(this).closest(".radio-accordion-container").addClass("active");
      });

      $("body").on("change", ".checkbox-accordion-toggle", function () {
        if ($(this).is(":checked")) {
          $(this)
            .closest(".checkbox-accordion-container")
            .removeClass("active");
        } else {
          $(this).closest(".checkbox-accordion-container").addClass("active");
        }
        /*$(this).closest('.radio-accordion').find('.radio-accordion-container:not(active)').each(function(){
                 $(this).removeClass('active');
                 });
                 $(this).closest('.radio-accordion-container').addClass('active');*/
      });

      /**
       * Tab
       */
      $("body").on("click", ".tab-toggle", function () {
        event.preventDefault();
        if (!$(this).hasClass("disabled")) {
          if (!$(this).hasClass("active")) {
            $(this)
              .closest(".tab-container")
              .find(".tab-toggle")
              .removeClass("active");
            $(this).addClass("active");

            $(this)
              .closest(".tab-container")
              .find(".tab-content")
              .removeClass("active");
            $(this)
              .closest(".tab-container")
              .find("#tab-" + $(this).data("tab") + ".tab-content")
              .addClass("active");
          }
        }
      });

      $(".open-search-button").click(function (event) {
        event.preventDefault();
        event.stopPropagation();

        if ($("#app-header-search-input").hasClass("active")) {
          $(this).removeClass("active");
          $("#app-header-search-input").removeClass("active");
          $("#search-result-block").fadeOut();
        } else {
          $(this).addClass("active");
          $("#app-header-search-input").addClass("active");
          $("#app-header-search-input").find("input").focus();
        }

        /*if($('#app-header-nav').hasClass('col-xs-8')){
                 $('#app-header-nav').removeClass('col-xs-8').addClass('hidden');
                 $('#app-header-search').removeClass('col-xs-2').addClass('col-xs-10');
                 }else{
                 $('#app-header-nav').removeClass('hidden').addClass('col-xs-8');
                 $('#app-header-search').removeClass('col-xs-10').addClass('col-xs-2');
                 }*/
      });
    },
    openModal: function (html, time) {
      if (html != "") {
        var appModal = $("#app-modal");
        var appModalContent = appModal.find("#app-modal-content");
        appModalContent.html(html);
        appModal.css("display", "block").animate({ opacity: 1 }, 500);
        $("body").on(
          "click.modalClick",
          "#app-modal-overlay",
          function (event) {
            if (event.target !== this) {
              return;
            }
            $("body").off("click.modalClick");
            appModal.animate({ opacity: 0 }, 300, function () {
              $(this).css("display", "none");
            });
          }
        );

        if (typeof time != "undefined") {
          setTimeout(function () {
            $("#app-modal-overlay").click();
          }, time);
        }
      }
    },
  },

  Notifications: {
    template: null,
    defaultConfig: {
      hideTimeout: 3000,
      hideOthers: false,
    },

    init: function () {
      Shop.Notifications.template = $("#notification-template");
    },
    add: function (html, configTemp) {
      var config = {};
      config = $.extend(config, Shop.Notifications.defaultConfig, configTemp);
      var $notification = Shop.Notifications.template.clone();
      $notification.removeAttr("id");
      $notification.find(".notification-content").html(html);

      var $notificationTrack = $("#notification-track");

      if (config.hideOthers) {
        $(".notification").remove();
      }
      $notificationTrack.append($notification);
      setTimeout(function () {
        $notification.addClass("active");
      }, 100);
      setTimeout(function () {
        $notification.removeClass("active");
        setTimeout(function () {
          $notification.remove();
        }, 3000);
      }, config.hideTimeout);
    },
    hideAll: function () {
      $("#notification-track").addClass("hide");
      setTimeout(function () {
        $("#notification-track").addClass("display-none");
      }, 600);
    },
    showAll: function () {
      $("#notification-track").removeClass("display-none");
      $("#notification-track").removeClass("hide");
    },
  },

  Wishlist: {
    init: function () {
      $("body")
        .on("click", ".add-product-to-wishlist", function (event) {
          event.preventDefault();
          var data = {};
          var sku = $(this).closest(".article-product").data("sku");
          data[sku] = {
            quantity: { action: "+", value: 1 },
          };
          Shop.Cart.addToCart(data);
        })
        .on("click", ".remove-discount-from-wishlist", function (event) {
          event.preventDefault();
          var data = {
            discountCode: null,
          };
          Shop.Cart.addDiscountToCart(data);
        });
    },

    toggleWishlist: function (data) {
      $.ajax({
        url: Helper.Router.route("shop_wishlist_toggle"),
        type: "post",
        dataType: "json",
        data: { data: data },
        beforeSend: function (request) {
          $("#spinner").removeClass("hidden");
          return request.setRequestHeader(
            "X-CSRF-Token",
            $("meta[name='_token']").attr("content")
          );
        },
        success: function (data) {
          alert("ok");
        },
        error: function (xhr, error, status) {
          console.log("error", xhr);
          toastr["error"]("Errore", xhr);
          $("#spinner").removeClass("hidden");
        },
        complete: function () {},
      });
    },
  },

  Cart: {
    init: function () {
      /**
       * Add to cart, remove from cart, ecc
       */
      $("body")
        .on("click", ".add-product-to-cart", function (event) {
          event.preventDefault();
          var data = {};
          var sku = $(this).closest(".article-product").data("sku");
          data[sku] = {
            quantity: { action: "+", value: 1 },
          };
          Shop.Cart.addToCart(data);
        })
        .on("click", ".add-product-to-cart-by-values", function (event) {
          event.preventDefault();
          var data = {};
          var sku = $(this).closest(".article-product").data("sku");
          var quantity = $(this)
            .closest(".article-product")
            .find("input.article-product-quantity")
            .val();
          data[sku] = {
            quantity: { action: "=", value: quantity },
          };
          Shop.Cart.addToCart(data);
        })
        .on("click", ".add-product-to-cart-by-value", function (event) {
          event.preventDefault();
          var data = {};
          var sku = $(this).closest(".article-product").data("sku");
          var quantity = $(this)
            .closest(".article-product")
            .find("input.article-product-quantity")
            .val();
          data[sku] = {
            quantity: { action: "+", value: quantity },
          };
          Shop.Cart.addToCart(data);
        })
        .on("click", ".remove-product-from-cart", function (event) {
          event.preventDefault();
          var data = {};
          var sku = $(this).closest(".article-product").data("sku");
          data[sku] = {
            quantity: { action: "=", value: 0 },
          };
          Shop.Cart.addToCart(data);
        })
        .on("click", ".add-products-to-cart-by-values", function (event) {
          event.preventDefault();
          var data = {};
          $(".section-products")
            .find(".article-product")
            .each(function () {
              var sku = $(this).data("sku");
              var quantity = $(this).find(".article-product-quantity").val();
              data[sku] = {
                quantity: { action: "=", value: quantity },
              };
            });
          Shop.Cart.addToCart(data);
        })
        .on("click", ".add-discount-to-cart", function (event) {
          event.preventDefault();
          var discountCode = $("#discount_code").val();
          if (discountCode == "") {
            return;
          }
          var data = {
            discountCode: discountCode,
          };
          Shop.Cart.addDiscountToCart(data);
        })
        .on("click", ".remove-discount-from-cart", function (event) {
          event.preventDefault();
          var data = {
            discountCode: null,
          };
          Shop.Cart.addDiscountToCart(data);
        });

      $("#partial-cart-side").on("click", ".edit-side-cart", function () {
        var articleProductvalues = $(this)
          .closest(".article-product")
          .find(".article-product-values");
        if (articleProductvalues.hasClass("hidden")) {
          $(this)
            .closest(".article-product")
            .find(".article-product-values")
            .removeClass("hidden");
        } else {
          $(this)
            .closest(".article-product")
            .find(".article-product-values")
            .addClass("hidden");
        }
      });

      $("#partial-cart").on("change", ".article-product-quantity", function () {
        $("#cart-page")
          .find(".add-products-to-cart-by-values")
          .removeClass("hidden");
        $("#cart-page").find(".go-to-checkout").addClass("hidden");
      });
    },
    show: function () {
      var partialCartSide = $("#partial-cart-side");
      partialCartSide.addClass("cart-side-animatable");
      $("body").addClass("overflow-hidden");
      partialCartSide.addClass("cart-side-visible");
      Shop.Notifications.hideAll();
    },
    hide: function () {
      var partialCartSide = $("#partial-cart-side");
      partialCartSide.addClass("cart-side-animatable");
      $("body").removeClass("overflow-hidden");
      partialCartSide.removeClass("cart-side-visible");
      Shop.Notifications.showAll();
    },
    toggle: function () {
      var partialCartSide = $("#partial-cart-side");
      partialCartSide.addClass("cart-side-animatable");
      if (partialCartSide.hasClass("cart-side-visible")) {
        Shop.Cart.hide();
      } else {
        Shop.Cart.show();
      }
    },
    addToCart: function (data) {
      var dataTracking = data;

      $.ajax({
        url: Helper.Router.route("shop_cart_add"),
        type: "post",
        dataType: "json",
        data: { data: data },
        beforeSend: function (request) {
          $("#spinner").removeClass("hidden");
          return request.setRequestHeader(
            "X-CSRF-Token",
            $("meta[name='_token']").attr("content")
          );
        },
        success: function (data) {
          if (Object.keys(data).length > 1) {
            Shop.Cart.updateViews();
          } else {
            $.each(data, function (index, value) {
              if (value.success) {
                Shop.Cart.updateViews();

                if (
                  typeof dataTracking[index] !== "undefined" &&
                  dataTracking[index]["quantity"]["action"] == "+"
                ) {
                  Track.productAddToCart(value.infoItem);
                } else if (
                  typeof dataTracking[index] !== "undefined" &&
                  dataTracking[index]["quantity"]["action"] == "=" &&
                  dataTracking[index]["quantity"]["value"] == 0
                ) {
                  Track.productRemoveFromCart(value.infoItem);
                }
              } else {
                Shop.Notifications.add(
                  '<i class="fa fa-times  fa-fw"></i> ' + value.html,
                  { hideOthers: true }
                );
                $("#spinner").addClass("hidden");
              }
            });
          }
        },
        error: function (xhr, error, status) {
          console.log("error", xhr);
          toastr["error"]("Errore", xhr);
          $("#spinner").removeClass("hidden");
        },
        complete: function () {},
      });
    },
    addDiscountToCart: function (data) {
      $.ajax({
        url: Helper.Router.route("shop_cart_add_discount"),
        type: "post",
        dataType: "json",
        data: { data: data },
        beforeSend: function (request) {
          $("#spinner").removeClass("hidden");
          return request.setRequestHeader(
            "X-CSRF-Token",
            $("meta[name='_token']").attr("content")
          );
        },
        success: function (data) {
          if (data.success) {
            Shop.Cart.updateViews();
            Shop.Notifications.add(
              '<i class="fa fa-check fa-fw"></i> ' + data.html,
              { hideOthers: true }
            );
          } else {
            Shop.Notifications.add(
              '<i class="fa fa-exclamation fa-fw"></i> ' + data.html,
              { hideOthers: true }
            );
          }
        },
        error: function (xhr, error, status) {
          console.log("error", xhr);
          toastr["error"]("Errore", xhr);
        },
        complete: function () {
          $("#spinner").addClass("hidden");
        },
      });
    },
    updateCartHeaderView: function () {
      if ($("#partial-cart-header").length == 0) {
        return;
      }
      $.ajax({
        url: Helper.Router.route("shop_cart_header_partial"),
        type: "post",
        dataType: "html",
        data: { addResult: {} },
        beforeSend: function (request) {
          return request.setRequestHeader(
            "X-CSRF-Token",
            $("meta[name='_token']").attr("content")
          );
        },
        success: function (data) {
          $("#partial-cart-header").html(data);
        },
        error: function (xhr, error, status) {
          console.log("error", xhr);
        },
      });
    },
    updateCartSideView: function () {
      if ($("#partial-cart-side").length == 0) {
        return;
      }
      $.ajax({
        url: Helper.Router.route("shop_cart_side_partial"),
        type: "post",
        dataType: "html",
        data: { addResult: {} },
        beforeSend: function (request) {
          return request.setRequestHeader(
            "X-CSRF-Token",
            $("meta[name='_token']").attr("content")
          );
        },
        success: function (data) {
          $("#partial-cart-side").html(data);
        },
        complete: function () {
          if ($("#partial-checkout-summary").length == 0) {
            Shop.Cart.show();
          }
          $("#spinner").addClass("hidden");
        },
        error: function (xhr, error, status) {
          console.log("error", xhr);
          $("#spinner").removeClass("hidden");
        },
      });
    },
    updateCartView: function () {
      if ($("#partial-cart").length == 0) {
        return;
      }
      $.ajax({
        url: Helper.Router.route("shop_cart_partial"),
        type: "post",
        dataType: "html",
        data: { addResult: {} },
        beforeSend: function (request) {
          return request.setRequestHeader(
            "X-CSRF-Token",
            $("meta[name='_token']").attr("content")
          );
        },
        success: function (data) {
          $("#partial-cart").html(data);
        },
        error: function (xhr, error, status) {
          console.log("error", xhr);
        },
      });
    },
    updateCartSummaryView: function () {
      if ($("#partial-checkout-summary").length == 0) {
        return;
      }
      $.ajax({
        url: Helper.Router.route("shop_cart_summary_partial"),
        type: "post",
        dataType: "html",
        data: { addResult: {} },
        beforeSend: function (request) {
          return request.setRequestHeader(
            "X-CSRF-Token",
            $("meta[name='_token']").attr("content")
          );
        },
        success: function (data) {
          $("#partial-checkout-summary").html(data);
        },
        error: function (xhr, error, status) {
          console.log("error", xhr);
        },
      });
    },
    updateViews: function () {
      Shop.Cart.updateCartHeaderView();
      Shop.Cart.updateCartSideView();
      Shop.Cart.updateCartView();
      Shop.Cart.updateCartSummaryView();
    },
  },

  Catalog: {
    init: function () {
      var elem = $(".catalog-filters .range-slide");
      if (elem.length > 0) {
        var min = elem.attr("data-min");
        var max = elem.attr("data-max");
        var from = elem.attr("data-from");
        var to = elem.attr("data-to");
        var step = elem.attr("data-step");
        elem.ionRangeSlider({
          type: "double",
          min: min,
          max: max,
          from: from,
          to: to,
          step: step,
          onStart: function (data) {
            //console.log(data);
          },
          onChange: function (data) {
            //console.log(data);
          },
          onFinish: function (data) {
            var f = data.from;
            var t = data.to;
            $("#page-catalog-product-grid").attr(
              "data-price_range",
              f + "-" + t
            );
            $('input[name="range-slide"]').trigger("click");
          },
          onUpdate: function (data) {
            //console.log(data);
          },
        });
      }

      $(function () {
        var resetFilters = function () {
          var params = {};
          var url = new Url();
          url.clearQuery();

          // get all selected checkbox
          $(".catalog-filter-checkbox").each(function (index) {
            $(this).prop("checked", false);

            // reset data attributes
            $("#page-catalog-product-grid").attr(
              "data-" + $(this).attr("name"),
              ""
            );
          });

          // load products from page 1
          $("#page-catalog-product-grid").attr("data-page", "1");
          loadProducts(true);

          window.history.pushState(null, null, url);
        };

        var updateFilters = function () {
          var params = {};
          var url = new Url();

          url.clearQuery();

          // get all selected checkbox
          $(".catalog-filter-checkbox").each(function (index) {
            if ($(this).is(":checked") || $(this).hasClass("active")) {
              if ($(this).hasClass("active")) {
                $(this).attr("checked", "checked");
              }

              if (typeof params[$(this).attr("name")] == "undefined") {
                params[$(this).attr("name")] = [];
              }
              params[$(this).attr("name")].push($(this).attr("value"));
            }

            // reset data attributes
            $("#page-catalog-product-grid").attr(
              "data-" + $(this).attr("name"),
              ""
            );
          });

          $(".catalog-filter-hidden").each(function (index) {
            if ($(this).val() != "") {
              if (typeof params[$(this).attr("name")] == "undefined") {
                params[$(this).attr("name")] = [];
              }
              params[$(this).attr("name")].push($(this).attr("value"));
            }

            // reset data attributes
            $("#page-catalog-product-grid").attr(
              "data-" + $(this).attr("name"),
              ""
            );
          });

          // update data filter attributes and generate new url
          $.each(params, function (index, param) {
            url.query[index] = param.join();
            $("#page-catalog-product-grid").attr("data-" + index, param.join());
          });

          // load products from page 1
          $("#page-catalog-product-grid").attr("data-page", "1");
          loadProducts(true);

          window.history.pushState(null, null, url);
        };

        var loadProducts = function (reload) {
          var productGrid = $("#page-catalog-product-grid");
          var data = {
            page: parseInt(productGrid.attr("data-page")),
            perpage: parseInt(productGrid.attr("data-perpage")),
            category_id: productGrid.attr("data-category"),
            brands_id: productGrid.attr("data-brand"),
            price_range: productGrid.attr("data-price_range"),
            top_products: productGrid.attr("data-top_products"),
            size: productGrid.attr("data-size"),
            search: productGrid.attr("data-search"),
          };

          $("#spinner").removeClass("hidden");

          $.ajax({
            url: Helper.Router.route("shop_catalog_grid"),
            type: "post",
            //dataType: 'json',
            data: data,
            beforeSend: function (request) {
              return request.setRequestHeader(
                "X-CSRF-Token",
                $("meta[name='_token']").attr("content")
              );
            },
            success: function (data) {
              if (reload == true) {
                //productGrid.attr('data-page', data.page);
                productGrid.find(".product-grid-row").html(data);
              } else {
                //newpage = page + 1;
                //productGrid.attr('data-page', page);
                productGrid.find(".product-grid-row").append(data);
              }

              $("#spinner").addClass("hidden");
            },
            error: function (xhr, error, status) {
              console.log("error", xhr);
              $("#spinner").addClass("hidden");
              //toastr['error']('Errore', xhr);
            },
          });
        };

        var updateCheckboxes = function () {
          var url = new Url();
          $(".catalog-filter-checkbox").each(function (index) {
            if (
              typeof url.query[$(this).attr("name")] != "undefined" &&
              url.query[$(this).attr("name")] == $(this).attr("value")
            ) {
              $(this).attr("checked", "checked");
            } else {
              $(this).attr("checked", false);
            }
          });
        };

        $("#page-catalog").on("click", ".load-more", function (event) {
          event.preventDefault();
          var productGrid = $("#page-catalog-product-grid");
          productGrid.attr(
            "data-page",
            parseInt(productGrid.attr("data-page")) + 1
          );
          loadProducts(true);
        });

        $("#page-catalog").on(
          "change",
          ".catalog-filter-checkbox",
          function (event) {
            event.stopPropagation();
            event.preventDefault();
            updateFilters();
          }
        );

        $("#page-catalog").on(
          "click",
          'input[name="range-slide"]',
          function (event) {
            event.stopPropagation();
            event.preventDefault();
            loadProducts(true);
          }
        );

        $("#page-catalog").on("click", ".pagination a", function (event) {
          event.stopPropagation();
          event.preventDefault();
          $("#page-catalog-product-grid").attr(
            "data-page",
            $(this).attr("data-page")
          );
          loadProducts(true);
        });

        updateFilters();
      });
    },
  },

  Search: {
    initSearch: function () {
      var typingTimer;
      var $input = $("#search-input");
      var $searchBlock = $("#search-bar");
      var $container = $("#search-result-block");
      var $searchForm = $("#search-form");
      var $loading = $(".loading-block");
      var arrowKey = [33, 34, 35, 36, 37, 38, 39, 40];
      var xhr;
      var $searchedTerm = "";

      $(document)
        .ajaxStart(function () {
          $loading.removeClass("display-none");
          $loading.addClass("loading");
        })
        .ajaxStop(function () {
          $loading.removeClass("loading");
          setTimeout(function () {
            $loading.addClass("display-none");
          }, 300);
        });

      /*$searchForm.on('submit', function () {
             if ($input.val().length > 1) {
             $loading.hide();
             event.preventDefault();
             var $link = '/search-results?search=';
             $link += $input.val().replace(/ /gi, '+');
             console.log('submit');
             window.location.href = $link;
             } else {
             event.preventDefault();
             }
             });*/

      /*$searchBlock.on('focusin', function () {
             if ($input.val().length > 1) {
             $container.stop(true, false).fadeIn();
             doneTyping();
             }
             });*/

      $input.on("focusout", function () {
        console.log("fade out");
        $container.fadeOut();
      });

      $input.on("keyup", function (e) {
        var key = e.which;
        if ($.inArray(key, arrowKey) < 0) {
          if ($input.val().length > 1) {
            clearTimeout(typingTimer);
            if (xhr && xhr.readyState != 4) {
              xhr.abort();
            }
            typingTimer = setTimeout(doneTyping, 250);
          }
        }
      });

      $input.on("keydown", function (e) {
        var key = e.which;
        if ($.inArray(key, arrowKey) < 0) {
          if ($input.val().length > 1) {
            clearTimeout(typingTimer);
            if (xhr && xhr.readyState != 4) {
              xhr.abort();
            }
            typingTimer = setTimeout(doneTyping, 250);
          }
        }
      });

      function doneTyping() {
        var term = $input.val();

        if (term.length > 1 && term != $searchedTerm) {
          $container.fadeIn();
          $searchedTerm = term;
          xhr = $.ajax({
            headers: {
              "X-CSRF-TOKEN": $('meta[name="_token"]').attr("content"),
            },
            url: "/" + Config.locale + "/search",
            type: "post",
            data: {
              action: "search",
              term: term,
            },
            success: function (data) {
              clearData();
              var result = "";

              if (data[0].count == 0) {
                $container.fadeOut();
              } else {
                $.each(data, function (index, value) {
                  //console.log(index, value);
                  if (index > 0) {
                    result +=
                      '<a href="' + value.url + '">' + value.name + "</a><br>";
                  }
                });

                $("#search-result-block").html(result);
              }

              /*var $dataCount = 0;
                                 $('#results-found').text(data[0]['count']);
                                 if (data[0]['count'] > 10) {
                                 $('#complete-results-link').attr('href',data[0]['url']);
                                 $('#complete-results-link').show();
                                 } else {
                                 $('#complete-results-link').hide();
                                 }
                                 for(var $i = 1;$i < 11; $i++ ){
                                 if (!jQuery.isEmptyObject(data[$i])  && !data[$i].hasOwnProperty('image')){
                                 //console.log(data[$i]);
                                 $('#product-list-'+$i+'-text').text(data[$i]['name']).attr('href',data[$i]['url']);
                                 $dataCount = $i;
                                 //console.log($dataCount);
                                 }else{
                                 $('#product-list-'+$i).addClass('display-none')
                                 }
                                 }
                                 for(var $k = 1;$k < 7; $k++ ){
                                 if (!jQuery.isEmptyObject(data[$dataCount+$k])){
                                 $('#search-results-'+$k+'-container').css('background-image','url('+data[$dataCount+$k]['image']+')');
                                 $('#search-results-'+$k+'-link').attr('href',data[$dataCount+$k]['url']);
                                 $('#search-results-'+$k+'-text').text(data[$dataCount+$k]['name']);
                                 }else{
                                 $('#search-results-'+$k+'-container').addClass('display-none');
                                 }
                                 }
                                 Metrics.track('Search', {
                                 'search_terms' : term,
                                 'number_of_results' : data[0]['count']
                                 });*/
            },
            error: function (errorThrown) {
              console.log(errorThrown);
            },
          });
        } else {
          if (term != $searchedTerm) {
            $container.fadeOut();
          }
        }
      }

      function clearData() {
        $("#results-found").text("");
        $("#complete-results-link").attr("href", "");
        for (var $i = 1; $i < 11; $i++) {
          $("#product-list-" + $i).removeClass("display-none");
          $("#product-list-" + $i + "-text")
            .text("")
            .attr("href", "#");
        }
        for (var $k = 1; $k < 7; $k++) {
          $("#search-results-" + $k + "-container").removeClass("display-none");
          $("#search-results-" + $k + "-link").attr("href", "#");
          $("#search-results-" + $k + "-text").text("");
        }
      }
    },
    initSearchResults: function () {
      var $input = $("#search-input");

      var $search = getUrlParameter("search");

      $search = $search.replace(/\+/gi, " ");
      $input.val($search);

      function getUrlParameter(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
          sURLVariables = sPageURL.split("&"),
          sParameterName,
          i;

        for (i = 0; i < sURLVariables.length; i++) {
          sParameterName = sURLVariables[i].split("=");

          if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
          }
        }
      }
    },
  },
};
