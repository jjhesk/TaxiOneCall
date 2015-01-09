/**
 * Created by ryo on 14年8月7日.
 */
var approve = approve || {},
    reject = reject || {}, action_view_doc = action_view_doc || {};
var setting_ob = setting_ob || {};
jQuery(function ($) {
    (function (d, interaction, table) {
        var $table = $(table), domain = "http://devlogin.vcoinapp.com/";

        $table.dataTable({
            processing: true,
            "order": [ 0, 'desc' ],
            ajax: domain + "api/systemlog/login_log/",
            columns: [
                { data: "ID" },
                { data: "user" },
                { data: "comments",
                    render: function (data, type, full, meta) {
                        return data;
                    }},
                { data: "time" },
                { data: "event_code" },
                { data: "error_code" }
            ],
            "dom": 'lfrtip',
            fnRowCallback: function (nRow, full, iDisplayIndex, iDisplayIndexFull) {
                var $row = $(nRow)
                //  console.log(d.template_used_data);
                //  console.log("fnRowCallback attr");
                $row.attr("id", 'nm' + full.lid);
                return nRow;
            }
        });

        $table.css({
            'text-align': 'center',
            'font-size': '14px'
        });

        var log_menu_login = "Login",
            log_menu_email = "Email",
            log_menu_vcoin = "Vcoin",
            log_menu_new_account = "New Account",
            log_menu_verification = "Redemption(verification)",
            log_menu_verify = "Redemption(verify)",
            log_menu_third_party = "Third party App Transaction Request";

        $("div.log_menu").css({"text-align": "center", "padding-top": "20px"});
        $(".log_button").on("click", function (e) {
                switch (e.target.innerHTML) {
                    case log_menu_login:
                        $table.fnReloadAjax(domain + "api/systemlog/login_log/");
                        break;
                    case log_menu_email:
                        $table.fnReloadAjax(domain + "api/systemlog/email_log/");
                        break;
                    case log_menu_vcoin:
                        $table.fnReloadAjax(domain + "api/systemlog/vcoin_app_log/");
                        break;
                    case log_menu_new_account:
                        $table.fnReloadAjax(domain + "api/systemlog/new_account_log/");
                        break;
                    case log_menu_verification:
                        $table.fnReloadAjax(domain + "api/systemlog/redemption_verification_log/");
                        break;
                    case log_menu_verify:
                        $table.fnReloadAjax(domain + "api/systemlog/redemption_verify_log/");
                        break;
                    case log_menu_third_party:
                        $table.fnReloadAjax(domain + "api/systemlog/third_party_app_transaction_log/");
                        break;
                }
            }
        );

    }(document, "click tap touch", "#admin_page_system_log"));
});