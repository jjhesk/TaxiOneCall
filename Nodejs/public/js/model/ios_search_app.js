/**
 * Created by ryo on 14年10月27日.
 */

var IOSSearchAPI = {};
jQuery(function ($) {
    IOSSearchAPI = function (name_component, slick) {
        this.store_id = $("#store_id");
        this.textdesc = $("#desc_area");
        this.icon_url = $("#icon_url");
        this.name_component = name_component;
        this.app_name = $("#app_name");
        this.ios_slicker = slick;
        this.ios_search_app = $("#search_app");
        this.ios_row_search_app = $("#ios_row_search_app");
        this.init();
    };

    IOSSearchAPI.prototype = {
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
                d.ios_row_search_app.removeClass("hidden");
                d.ios_slicker.clear();
            } else {
                d.ios_row_search_app.addClass("hidden");
            }
        },
        setOnChange: function (method) {
            this.ios_search_app.on("change", method);
        },
        init_select_module: function () {
            var d = this;
            d.select2module = $("#" + d.name_component).select2({
                fragmentPlatform: Handlebars.compile($("#t_ios").html()),
                placeholder: "Search for an app",
                minimumInputLength: 2,
                id: function (obj) {
                    return {id: obj._id};
                },
                ajax: { // instead of writing the function to execute the request we use Select2's convenient helper
                    url: "https://itunes.apple.com/search/",
                    dataType: 'jsonp',
                    data: function (query, page) {
                        return {
                            term: query, // search term
                            entity: "software",
                            limit: 30
                        };
                    },
                    results: function (data, page) {
                        // parse the results into the format expected by Select2.
                        // since we are using custom formatting functions we do not need to alter remote JSON data
                        console.log(data);
                        return {results: data.results}
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
            d.ios_slicker.clear();
            d.app_name.val(JSON.stringify(e.choice.trackName).replace(/"/g, ""));
            d.store_id.val(JSON.stringify(e.choice.trackId));
            d.icon_url.val(JSON.stringify(e.choice.artworkUrl60).replace(/"/g, ""));
            d.textdesc.val(JSON.stringify(e.choice.description).replace(/"/g, "").replace(/\\n/g, " ").replace(/\\/g, ""));
            d.ios_slicker.append(e.choice.screenshotUrls);
        },
        parseFormat: function (item) {
            var d = this, markup = "<table class='result_table_listing'>", fragment = d.fragmentPlatform;
            if (item.trackName !== undefined && item.trackId !== undefined)
                markup += fragment(item);
            markup += "</table>";
            return markup;
        },
        parseFormatSelection: function (item) {
            $("#search_app").val(item.bundleId);
            return item.bundleId;
        }
    };
});