/**
 * Created by ryo on 14年11月13日.
 */

var AppEditor = {};
jQuery(function ($) {
    (function (doc, interactions) {
        AppEditor = function (component, data, app_log_table, method) {
            this.$container = $("#" + component);
            this.data = data;
            this.$app_name = $("#app_name", this.$container);
            this.$store_id = $("#store_id", this.$container);
            this.$icon_url = $("#icon_url", this.$container);
            this.$desc_area = $("#desc_area", this.$container);
            this.$app_log_table = app_log_table;
            this.method = method
            this.domain = window.location.origin + "/";
            this.image_row_template = Handlebars.compile($("#image_edit_row").html());
            this.init_table();
        };
        AppEditor.prototype = {
            init_table: function () {
                var d = this;
                var $back_button = $(".back_to_log", d.$container), holder = "";
                var screenshots = d.data.image_urls.split(";_;");
                console.log(d.data.status);
                $("#admin_page_app_reg_wrapper").addClass("hidden");
                d.$container.removeClass("hidden");

                d.$app_name.val(d.data.app_title);
                d.$store_id.val(d.data.store_id);
                d.$icon_url.val(d.data.icon);
                d.$desc_area.val(d.data.description);

                $.each(screenshots, function (key, val) {
                    holder += d.image_row_template({image_url: val});
                });
                $("#image_row").html(holder);

                $back_button.on(interactions, {that: d}, d.press_back).removeClass("disabled");

                var $add_image_button = $(".add_image_url_button", this.$container);
                var $remove_image_button = $(".remove_image_url_button", this.$container);
                var $browse_button = $(".browse_image_button", this.$container);
                var $update_button = $("#update_app", this.$container);

                $add_image_button.on(interactions, {that: d}, d.add_image_input);
                $remove_image_button.on(interactions, {that: d}, d.delete_image_input);
                $browse_button.on(interactions, {that: d}, d.init_image).removeClass("hidden").removeClass("disabled");
                $update_button.off(interactions);
                $update_button.on(interactions, {that: d}, d.update_this_app).removeClass("disabled");
            },
            update_this_app: function (e) {
                var d = e.data.that;
                var $image_group = $("#image_row", d.$container), $image_input = $(".add_image_url", $image_group);
                var image_srcs = [];
                var $back_btn = $(".back_to_log"),
                    $browse_btn = $(".browse_image_button"),
                    $add_btn = $(".add_image_url_button"),
                    $remove_btn = $(".remove_image_url_button");

                $(this).addClass("disabled").off(interactions);
                $back_btn.addClass("disabled").off(interactions);
                $browse_btn.addClass("hidden").off(interactions);
                $add_btn.addClass("disabled").off(interactions);
                $remove_btn.addClass("disabled").off(interactions);

                var $td = $(this).closest("td");
                $("#loading", $td).remove();

                $.each($image_input, function (key, val) {
                    image_srcs.push($(this).val());
                });
                image_srcs = image_srcs.join(";_;");

                var loader = new AJAXLoader($(this), "normal", "app_reg");
                var update = new JAXAPIsupport(d.domain + "api/cms/update_app_info", {
                    ID: d.data.ID,
                    store_id: d.$store_id.val(),
                    app_title: d.$app_name.val(),
                    icon: d.$icon_url.val(),
                    description: d.$desc_area.val(),
                    image_urls: image_srcs
                }, d, function (that, json) {
                    that.refresh_table();
                });
                update.add_loader(loader);
                update.init();
            },
            init_image: function (e) {
                var d = e.data.that;
                var $div = $(this).closest("div"), src = $(".add_image_url", $div).val();
                var $image = '<img src="' + src + '" class="remodal_image">';
                $("#image_holder").html($image);
            },
            add_image_input: function (e) {
                var d = e.data.that;
                if (d.check_input($(this))) {
                    var image_edit_row = $(d.image_row_template({image_url: ""}));
                    var $td = $(this).closest("td"), $last_child = $("div:last-child", $td);

                    $last_child.after($(image_edit_row));

                    var add_image_button = $(".add_image_url_button", this.$container);
                    var remove_image_button = $(".remove_image_url_button", this.$container);
                    var browse_button = $(".browse_image_button", this.$container);

                    add_image_button.off(interactions);
                    add_image_button.on(interactions, {that: d}, d.add_image_input);
                    remove_image_button.off(interactions);
                    remove_image_button.on(interactions, {that: d}, d.delete_image_input);
                    browse_button.off(interactions);
                    browse_button.on(interactions, {that: d}, d.init_image);
                }
            },
            delete_image_input: function (e) {
                var d = e.data.that;
                var $td = $(this).closest("td"), num_of_image_url = $("div", $td).length;
                if (num_of_image_url > 1)
                    $(this).closest("div").remove();
            },
            check_input: function ($el) {
                var d = this;
                var $td = $el.closest("td"), $input_urls = $("div input", $td)
                var is_empty = 0;

                $.each($input_urls, function (key, val) {
                    if ($(this).val() == "") {
                        is_empty++;
                    }
                });
                return (is_empty == 0);
            },
            press_back: function (e) {
                var d = e.data.that;
                d.off_table();
            },
            refresh_table: function () {
                var d = this;
                d.off_table();
                d.$app_log_table.fnReloadAjax(d.domain + "api/systemlog/" + d.method + "/?sort=" + d.data.status);
            },
            off_table: function () {
                var d = this;
                d.$app_name.val("");
                d.$store_id.val("");
                d.$icon_url.val("");
                d.$desc_area.val("");
                d.$container.addClass("hidden");
                $("#admin_page_app_reg_wrapper").removeClass("hidden");
            }
        }
    }(document, "click tap touch"));
});