/**
 * Created by ryo on 14年10月23日.
 */

var AndroidSearchAPI = {};
jQuery(function ($) {
    AndroidSearchAPI = function (name_component, slick) {
        this.name_component = name_component;
        this.key = "10334b44b22486861b4cc4a39be9991f";
        this.app_name = $("#app_name");
        this.store_id = $("#store_id");
        this.icon = $("#icon_url");
        this.description = $("#desc_area");
        this.search_api = "http://api.playstoreapi.com/v1.1/search/apps/";
        this.app_info_api = "http://api.playstoreapi.com/v1.1/apps/";
        this.domain = window.location.origin + "/";
        this.search_word = "";
        this.android_slicker = slick;
        this.android_row_search_app = $("#android_row_search_app");
        this.android_search_app = $("#android_search_app");
        this.init();
    };

    AndroidSearchAPI.prototype = {
        init: function () {
            var d = this;
            d.init_select_module();

            $(".bigdrop").css({
                'max_height': 500
            });
            $("ul.select2-results").css({
                'max-height': 450
            });

        },

        enable: function (bool) {
            var d = this;
            if (bool) {
                d.android_row_search_app.removeClass("hidden");
                d.android_slicker.clear();
            } else {
                d.android_row_search_app.addClass("hidden");
            }
        },

        setOnChange: function (method) {
            this.android_search_app.on("change", method);
        },

        init_select_module: function () {
            var d = this;
            d.select2module = $("#" + d.name_component).select2({
                fragmentPlatform: Handlebars.compile($("#t_android").html()),
                placeholder: "Search for an app",
                minimumInputLength: 2,
                id: function (obj) {
                    return {id: obj._id};
                },
                ajax: { // instead of writing the function to execute the request we use Select2's convenient helper
                    url: function () {
                        return d.search_api + d.search_word;
                    },
                    dataType: 'json',
                    data: function (query, page) {
                        d.search_word = query.replace(/\s+/g, "");
                        return {
                            key: d.key
                        };
                    },
                    results: function (data, page) {
                        // parse the results into the format expected by Select2.
                        // since we are using custom formatting functions we do not need to alter remote JSON data
                        return {results: data}
                    }
                },
                initSelection: function (element, callback) {
                    // the input tag has a value attribute preloaded that points to a preselected movie's id
                    // this function resolves that id attribute to an object that select2 can render
                    // using its formatResult renderer - that way the movie name is shown preselected
                    //  console.log(element);
                    var data = {id: element.val(), text: element.val()};
                    callback(data);
                    console.log(data);
                },
                selectOnBlur: true,
                formatResult: d.parseFormat, // omitted for brevity, see the source of this page
                formatSelection: d.parseFormatSelection,  // omitted for brevity, see the source of this page
                dropdownCssClass: "bigdrop", // apply css that makes the dropdown taller
                closeOnSelect: true,
                multiple: false,
                escapeMarkup: function (m) {
                    return m;
                } // we do not want to escape markup since we are displaying html in results
            });
            d.select2module.on("select2-selecting", {that: d}, d.fill_in_app_data);
        },
        fill_in_app_data: function (e) {
            var d = e.data.that;
            d.android_slicker.clear();
            var loader_appname = new AJAXLoader(d.app_name, "normal", "app_reg");
            var get_app_meta = new JAXAPIsupport(d.domain + "api/cms/get_app_info",
                {url: d.app_info_api + e.choice.itemID + "&?key=" + d.key}, d, function (that, data) {
                    that.icon.val(data.logo);
                    that.app_name.val(data.appName);
                    that.store_id.val((data.packageID).replace(/&/g, ""));
                    that.description.val((data.description).replace(/"/g, "").replace(/\\n/g, " ").replace(/\\/g, ""));
                    that.android_slicker.append(data.thumbnails);
                });

            get_app_meta.add_loader(loader_appname);
            get_app_meta.init();
        },

        parseFormat: function (item) {
            var d = this, markup = "<table class='result_table_listing'>", fragment = d.fragmentPlatform;
            if (item.title !== undefined && item.itemID !== undefined)
                markup += fragment(item);
            markup += "</table>";
            return markup;
        },
        parseFormatSelection: function (item) {
            $("#android_search_app").val(item.itemID);
            return item.itemID;
        }
    };
});