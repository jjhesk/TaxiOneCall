/**
 * Created by ryo on 14年9月25日.
 */

var setting_ob = setting_ob || {};

jQuery(function ($) {
    var api_domain =  window.location.origin +"/api/";

    var widget_id = "vcoin_plan_review",
        $widget = $("#" + widget_id),
        api_request_postnum = api_domain + "cms/dashboard_request_pending_post_num/",
        api_request_list = api_domain + "cms/dashboard_request_listed_post_num/",
        $widget_container = $("#" + widget_id + " .inside");

    var account_status_template_output = Handlebars.compile($("#account_status_template").html());
    var set_content = {company_name: setting_ob.company_name, app_coins: setting_ob.app_coins};

    var loader_component = new AJAXLoader(widget_id, "big", "dashboard");
    var ajax = new JAXAPIsupport(api_request_postnum, {}, set_content, function (that, json) {
        var pending_number = {app_pending_count: Number(json)};
        $.extend(set_content, pending_number);
        var ajax2 = new JAXAPIsupport(api_request_list, {}, set_content, function (that, json) {
            var listed_number = {app_listed_count: Number(json)};
            $.extend(set_content, listed_number);
            var content = account_status_template_output(set_content);
            var $template_content = $("<div></div>");
            $template_content.html(content);
            $widget_container.append($template_content);
        });
        var loader_component2 = new AJAXLoader(widget_id, "big", "dashboard");
        ajax2.add_loader(loader_component2);
        ajax2.init();
    });
    ajax.add_loader(loader_component);
    ajax.init();

    //JAXAPIsupport()
});