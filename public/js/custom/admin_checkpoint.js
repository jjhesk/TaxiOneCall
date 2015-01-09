/**
 * Created by ryo on 14年8月29日.
 */

jQuery(function ($) {
    (function (d, c, duration) {
        var screen_option = new WPScreenOptionSupport(),
            status_support = new PublishingSupport(),
            postbox_handler = new PostBoxWatch();

        var $action_key = $("#action_key");
        var $occurrence = $("#occurrence");
        var $cycle_reward = $("#cycle_reward");
        var $frequency = $("#delta_f");
        var occurrence_choice = $("option:selected", $occurrence).val();
        var cycle_choice = $("option:selected", $cycle_reward).val();

        if (occurrence_choice == "once")
            MetaBoxSupport.InputControlSingle($cycle_reward, true);

        $occurrence.on("change", occurrence_selection);

        MetaBoxSupport.InputControlSingle($action_key, true);

        var checkpoint_log = new CheckPointAdmin("data_check_mission", $action_key.val());
        var checkpoint_chart = new CheckPointChartAdmin(
            "check_point_data_chart", $action_key.val(), occurrence_choice, cycle_choice);

        function occurrence_selection(e) {
            occurrence_choice = $("option:selected", $occurrence).val();

            if (occurrence_choice == "once") {
                MetaBoxSupport.InputControlSingle($cycle_reward, true);
                //MetaBoxSupport.InputControlSingle($frequency, true);
            }
            else {
                MetaBoxSupport.InputControlSingle($cycle_reward, false);
                //MetaBoxSupport.InputControlSingle($frequency, false);
            }
        }

    }(document, 'gform_wrapper', 1000));
});