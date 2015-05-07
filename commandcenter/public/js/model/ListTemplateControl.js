/**
 * Created by hesk on 7/12/14.
 */

var ListTemplateControl = {};
jQuery(function ($) {
    ListTemplateControl = function (totalPages, id_mapping, loaded_job_id, post_id) {
        var $reportbox = $("#report_book_content"),
            month_year = $("#report_month_year").val();
        this.$container = $("#report_template_list");
        this.$book = $(".book", $reportbox);
        this.$template_used_field = $("#template_used");
        this.$listtable = $("#report_template_list_tb");
        //prepare to render all the photos and site photos

        this.$field_basemaps = $(".drawmapbuttons");
        this.$field_photolist = $(".sitephotobuttons");
        this.loaded_submission_id = $("#report_revision");
        //1142
        this.$renderbuttons = Handlebars.compile($("#button_image").html());
        this.gen_url = "http://onecallapp.imusictech.net/genimage/";
        this.sub_data = "http://onecallapp.imusictech.net/api/staffcontrol/get_submission_data/";
        this.actionsTemplate = Handlebars.compile($("#action_bar_buttons").html());
        this.p_normal_page_template = Handlebars.compile($("#_normal_page").html());
        this.p_cover_page_template = Handlebars.compile($("#_cover_page").html());
        this.p_cable_page_template = Handlebars.compile($("#_cable_drawing_page").html());
        this.p_footer_section = Handlebars.compile($("#_footer").html());
        this.p_header_section = Handlebars.compile($("#_header").html());
        this.total_init_pages = totalPages;
        this.templateAppMapping = id_mapping;
        this.template_used_data = $("#template_used").val() == "" ? [] : $("#template_used").val().split(",");
        var h = this;
        Handlebars.registerHelper('header', function () {
            var htmltext = h.p_header_section(this);
            return new Handlebars.SafeString(htmltext);
        });
        Handlebars.registerHelper('footer', function () {
            this.current_page = totalPages;
            this.month_year = month_year;
            var htmltext = h.p_footer_section(this);
            return new Handlebars.SafeString(htmltext);
        });
        Handlebars.registerHelper('process_body', function () {
            //      var htmltext = "";
            var htmltext = this.template;
            return new Handlebars.SafeString(htmltext);
        });
        this.jobid = loaded_job_id;
        this.report_id = post_id;
        this.container = {};
        this.init();
    }
    ListTemplateControl.prototype = {
        displaylistDrawMaps: function (list) {
            var h = "", d = this;
            $.each(list, function (i, val) {
                var data = {
                    attachmentid: val,
                    pointer_url: d.gen_url + "?key=" + val + "." + d.loaded_submission_id.val() + "." + d.jobid + "." + d.report_id
                };
                h += d.$renderbuttons(data);
            });
            d.$field_basemaps.html(h);
        },
        displaysitephoto: function (list) {
            var h = "", d = this;
            $.each(list, function (i, val) {
                var data = {
                    attachmentid: val,
                    pointer_url: d.gen_url + "?attachment_id=" + val
                };

                h += d.$renderbuttons(data);
            });
            d.$field_photolist.html(h);
        },
        init: function () {
            var d = this, data = {
                sub_id: d.loaded_submission_id.val(),
                jobid: d.jobid
            }
            d.jax(data, 'sub_data_retrieve');
            d.$container.on('sub_data_retrieve', function (e, data_pack) {
                d.container = $.parseJSON(data_pack.machine_data);
                var maps = data_pack.drawmaps,
                    photos = data_pack.photos;
                d.displaylistDrawMaps(maps.split(","));
                d.displaysitephoto(photos.split(","));
                d.TableInit();
                // console.log(d.container);
            });
        },
        jax: function (data, callback) {
            var d = this;
            $.post(d.sub_data, data, function (response) {
                if (response.result == 'success') {
                    if ($.type(response.obtain) === 'object') {
                        d.$container.trigger(callback, [response.obtain]);
                    } else if ($.type(response.data) === 'object') {
                        d.$container.trigger(callback, [response.data]);
                    } else {
                        d.$container.trigger(callback);
                    }
                }
            });
        },
        TableInit: function () {
            var d = this;
            d.$listtable.dataTable({
                processing: true,
                ajax: "http://onecallapp.imusictech.net/api/staffcontrol/get_report_templates_list_cms/",
                columns: [
                    {
                        class: "details-control",
                        orderable: false,
                        render: function (data, type, full, meta) {
                            return d.actionsTemplate(full);
                        }
                    },
                    { data: "name" },
                    { data: "cat"},
                    { data: "id" }
                ],
                fnRowCallback: function (nRow, full, iDisplayIndex, iDisplayIndexFull) {
                    var $row = $(nRow)
                    if (_.contains(d.template_used_data, new String(full.id))) {
                        //  console.log("fnRowCallback hide");
                        $("td.details-control input", $row).hide();
                    }
                    //  console.log(d.template_used_data);
                    //  console.log("fnRowCallback attr");
                    $row.attr("id", 'nm' + full.id);

                    return nRow;
                },
                fnDrawCallback: function (oSettings) {
                    // alert('DataTables has redrawn the table');
                },
                initComplete: function (settings, json) {
                    //  console.log("initComplete");
                    if (d.template_used_data.length > 0) {
                        d.initializeButtons(d.template_used_data);
                    }
                },
                iDisplayLength: 5
            });
            //.rowReordering();
        },
        initializeButtons: function (dlist) {
            var d = this;
            //  console.log("initializeButtons");
            try {
                d.$listtable.$("tr").each(function () {
                    var dd = $(this), $input = $(".details-control input", dd);
                    var ID = parseInt(new String(dd.attr("id")).replace(/^\D+/g, ''));
                    //  console.log(dd);
                    //  console.log("initializeButtons each" + ID);
                    if (_.contains(dlist, ID)) {
                        $input.hide();
                    }
                });

            } catch (e) {
                console.log(e);
            }
        },
        addReportContentEditorListener: function (cbMethod) {
            this.appendPageCBinterface = cbMethod;
        },

        click_function_add_page: function (ID) {
            var d = this, used_template_ids = d.template_used_data,
                name_row = "#nm" + ID, t = $(name_row), row = d.$listtable.dataTable().api().row(t), json = row.data(),
                can = used_template_ids.length === 0 || !_.contains(used_template_ids, ID), complete_page_set = "";
            try {
                if (typeof (d.templateAppMapping) === 'object') {
                    for (var obj in d.templateAppMapping) {
                        /*if (obj.val() == ID) {
                         console.log("Display ID confirmed:" + ID);
                         }*/
                        var value = d.templateAppMapping[obj];
                        // if (typeof (value) === 'number')  console.log(value);
                    }
                } else {
                    throw "not a object map";
                }
                if (can) {
                    if (isNaN(parseInt(d.total_init_pages))) {
                        d.total_init_pages = 1;
                    } else   d.total_init_pages++;

                    $("#total_pages").val(d.total_init_pages);
                    used_template_ids.push(ID);
                    // console.log(typeof (d.appendPageCB))
                    if (typeof (d.appendPageCBinterface) === "object") {
                        // console.log(json.cat);
                        var m1 = /active/gmi, m2 = /passive/gmi, mc = /cover/gmi,
                            rec = /recdata/gmi, photo = /photolist/gmi, basemap = /basemaps/gmi,
                            index = /pageindex/gmi,
                            reportforms = /report-form/gmi,
                            check_string = new String(json.cat),
                            iscover = check_string.match(mc),
                            isactive = check_string.match(m1),
                            isPassive = check_string.match(m2),
                            isbasemap = check_string.match(basemap),
                            isphoto = check_string.match(photo),
                            isrec = check_string.match(rec),
                            isindex = check_string.match(index),
                            isReportform = check_string.match(reportforms)
                            ;
                        if (iscover) {
                            complete_page_set = d.p_cover_page_template(json);
                        } else if (isindex) {
                            complete_page_set = d.p_normal_page_template(json);
                        } else if (isReportform) {
                            var template_html = $.parseHTML(json.template);
                            var table = 'none', renderer = 'none', expender = "";
                            $.each(template_html, function (i, val) {
                                var a = $(val), n = a.attr("id") == 'action_row_d', b = a.attr("id") == 'tblMain';
                                if (n) {
                                    renderer = Handlebars.compile(a.html());
                                } else if (b) {
                                    table = a;
                                }
                            });
                            $.each(d.container.workmaps, function (i, map) {
                                $.each(map.routenode, function (i, k) {
                                    expender += renderer(k);
                                });
                            });
                            $("tr", table).eq(2).after(expender);
                            json.template = "<table>" + table.html() + "</table>";
                            // console.log(json.template);
                            //   console.log(json.template);
                            complete_page_set = d.p_normal_page_template(json);
                        } else {
                            complete_page_set = d.p_normal_page_template(json);
                        }
                        d.appendPageCBinterface.addTemplate(ID, complete_page_set);
                        d.$template_used_field.val(used_template_ids.join(","));
                    } else {
                        console.error("there is no extension handler for adding page");
                        // d.$book.append(complete_page_set);
                        // d.$template_used_field.val(used_template_ids.join(","));
                    }

                } else {
                    throw "this template is already added.";
                }

                //
            } catch (e) {
                console.log(e);
            }
        }
    };
    //content_report_action_var


});