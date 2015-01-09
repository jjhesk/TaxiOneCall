jQuery(document).ready(function($) {
	// tab between them
	jQuery('.metabox-tabs li a').each(function(i) {
		var thisTab = jQuery(this).parent().attr('class').replace(/active /, '');

		if ( 'active' != jQuery(this).attr('class') )
			jQuery('div.' + thisTab).hide();
		
		jQuery('div.' + thisTab).addClass('tab-content');
 
		jQuery(this).click(function(){
			// hide all child content
			jQuery(this).parent().parent().parent().children('div').hide();
 
			// remove all active tabs
			jQuery(this).parent().parent('ul').find('li.active').removeClass('active');
 
			// show selected content
			jQuery(this).parent().parent().parent().find('div.'+thisTab).show();
			jQuery(this).parent().parent().parent().find('li.'+thisTab).addClass('active');
		});
	});

	jQuery('.heading').hide();
	jQuery('.metabox-tabs').show();

	jQuery(".subsection-items").hide();
	jQuery(".subsection > h4").click(function() {
		var $this = jQuery(this);
		$this.find("span.minus").removeClass('minus');
		if($this.siblings('div').is(":visible")) {
			$this.siblings('div').fadeOut();
		} else {
			$this.siblings('div').fadeIn();
			$this.find("span").addClass('minus');
		}
	});

	// show by default
	
	jQuery("#subsection-Custom-Slide-Options > h4").click();
	jQuery("#subsection-Featured-Post-Carousel-Options > h4").click();
	jQuery("#subsection-Slider-Options > h4").click();
	jQuery("#subsection-Portfolio-Element > h4").click();
	jQuery("#subsection-Page-Options > h4").click();
	var page_subsection_map = {
		page_slider: "subsection-Eclipse-Slider-Options",
		box_section: "subsection-Box-Options",
		recent_posts_element: "subsection-Recent-Posts-Options",
		portfolio_element: "subsection-Portfolio-Options",
		twitterbar_section: "subsection-Twitter-Options"
	};
	jQuery("#ec_page_section_order").change(function(){
		var array = jQuery(this).val().split(",");
		jQuery.each(page_subsection_map, function(key, value) {
			if($.inArray(key, array) != -1) {
				jQuery("#" + value).show();
			} else {
				jQuery("#" + value).hide();
			}
		});
	}).change();


	// image_select
	jQuery(".image_select").each(function(){
		jQuery(this).find("img").click(function(){
			if(jQuery(this).hasClass('selected')) return;
			jQuery(this).siblings("img").removeClass('selected');
			jQuery(this).addClass('selected');
			jQuery(this).siblings("input").val(jQuery(this).data("key"));
		});
    if(jQuery(this).find("img.selected").length) {
			jQuery(this).find("input").val(jQuery(this).find("img.selected").data("key"));
    }
	});

	 /*
      Add toggle switch after each checkbox.  If checked, then toggle the switch.
    */
     jQuery('.checkbox').after(function(){
       if (jQuery(this).is(":checked")) {
         return "<a href='#' class='toggle checked' ref='"+jQuery(this).attr("id")+"'></a>";
       }else{
         return "<a href='#' class='toggle' ref='"+jQuery(this).attr("id")+"'></a>";
       }
       
     });
     
     /*
      When the toggle switch is clicked, check off / de-select the associated checkbox
     */
    jQuery('.toggle').click(function(e) {
       var checkboxID = jQuery(this).attr("ref");
       var checkbox = jQuery('#'+checkboxID);
       if (checkbox.is(":checked")) {
         checkbox.removeAttr("checked").change();
       }else{
         checkbox.attr("checked","checked").change();
       }
       jQuery(this).toggleClass("checked");
       e.preventDefault();
    });

    /*
      shows/hides checkboxes.
    */
    jQuery('#showCheckboxes').click(function(e) {
     jQuery('.checkbox').toggle();
     e.preventDefault();
    });
    jQuery('input[id^=checkbox-].toggle').change(function(){
    	//console.log("got it right");
    	var items = jQuery(this).parent().parent().next();
    	if(jQuery(this).is(':checked')) {
			items.show();
		} else {
			items.hide();
		}
    }).trigger('change');
});
