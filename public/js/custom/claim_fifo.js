/**
 * Created by Hesk on 14年11月17日.
 */
var gravityFormCouponApp = gravityFormCouponApp || {},
    reject = reject || {}, action_view_doc = action_view_doc || {};
var setting_ob = setting_ob || {};
jQuery(function ($) {
    (function (d, interaction, table, domainapi) {

        var $table = $(table),
            tinbutton = Handlebars.compile($("#user_page_claim_list_button_v1").html()),
            gfInstance = null;


        gravityFormCouponApp = function (div, table_name) {
            this.$wrapper = $("#" + div);
            this.postId = 0;
            this.rowdata = {};
            this.$table = $(table_name + "_wrapper");
            this.$fields = {
                input_5_5: "ID Name",
                input_5_1: "Hong Kong ID",
                input_5_3: "phone",
                input_5_4: "coupon",
                input_5_6: "post_id"
            }
            this.$fields_define = {
                id_name: "input_5_5",
                hk_id: "input_5_1",
                phone: "input_5_3",
                coupon: "input_5_4",
                post_id: "input_5_6"
            }
            this.backFresh = false;
            this.setup_fields();
        }
        gravityFormCouponApp.prototype = {
            setup_fields: function () {
                var d = this;
                d.id_name = $("#" + d.$fields_define.id_name);
                d.hk_id = $("#" + d.$fields_define.hk_id);
                d.phone = $("#" + d.$fields_define.phone);
                d.coupon = $("#" + d.$fields_define.coupon);
                d.post_id = $("#" + d.$fields_define.post_id);
                d.$back = $(".gform_footer #back");
                d.$submit = $(".gform_footer #submit");
                d.$back.on(interaction, function () {
                    d.closeForm();
                });
                var loader = new AJAXLoader(d.$back, "normal", "app_reg");
                d.$submit.on(interaction, function () {
                    try {
                        d.checkfields();
                        var enter = new JAXAPIsupport(domainapi + "cms/coupon_verify_web", {
                            post_id: Number(d.post_id.val()),
                            phone_cell: d.phone.val(),
                            hk_id: d.hk_id.val(),
                            id_name: d.id_name.val(),
                            code: d.coupon.val()
                        }, d, d.submission_return);
                        enter.add_loader(loader);
                        enter.init();
                        d.dimall(true);
                    } catch (e) {
                        alert(e);
                    }
                });
                MetaBoxSupport.InputControlSingle(d.coupon, true);
            },
            clearfields: function () {
                var d = this;
                d.phone.val("");
                d.hk_id.val("");
                d.id_name.val("");
            },
            dimall: function (bool) {
                var d = this;
                MetaBoxSupport.InputControlSingle(d.phone, bool);
                MetaBoxSupport.InputControlSingle(d.hk_id, bool);
                MetaBoxSupport.InputControlSingle(d.id_name, bool);
            },
            submission_return: function (that, data) {
                console.log(that);
                that.backFresh = true;
                alert("claim success");
                that.closeForm();
            },
            checkfields: function () {
                var d = this;
                if (d.phone.val() == "") throw "phone number is missing";
                if (d.hk_id.val() == "")throw "hong kong ID is missing";
                if (d.id_name.val() == "") throw "the ID name is missing";
            },
            set_post_id: function (row_data) {
                this.rowdata = row_data;
            },
            startForm: function () {
                var d = this;
                d.$table.addClass("hidden");
                d.$wrapper.removeClass("hidden");
                d.post_id.val(d.rowdata.post_id);
                d.coupon.val(d.rowdata.rdcode);
                d.clearfields();
                d.dimall(false);
            },
            closeForm: function () {
                var d = this;
                if (d.backFresh)
                    $table.fnReloadAjax(domainapi + "cms/cms_get_claim_list_game_play_2/");
                d.$table.removeClass("hidden");
                d.$wrapper.addClass("hidden");
            }
        }

        $table.dataTable({
            processing: true,
            order: [ 0, 'desc' ],
            ajax: domainapi + "cms/cms_get_claim_list_game_play_2/",
            columns: [
                {data: "post_id"},
                {data: "post_name"},
                {data: "rdcode"},
                {
                    class: "details_editor",
                    orderable: false,
                    render: function (data, type, full, meta) {
                        return tinbutton(full);
                    }
                }
            ],
            dom: '<"log_menu">lfrtip',
            fnRowCallback: function (nRow, full, iDisplayIndex, iDisplayIndexFull) {
                var $row = $(nRow)
                // console.log(full);
                $row.attr("id", 'nm' + full.post_id);
                $(".registration", $row).on(interaction, {that: Number(full.post_id)}, function () {
                    gfInstance.set_post_id(full);
                    gfInstance.startForm();
                });
                return nRow;
            },
            initComplete: function (settings, json) {
                $table.css({
                    'text-align': 'center',
                    'font-size': '14px'
                });

                gfInstance = new gravityFormCouponApp("user_page_claim_form", table);
                $table.DataTable().column(0).visible(false);
            }
        });


    }(document, "click tap touch", "#user_page_claim_list", window.location.origin + "/api/"));
});