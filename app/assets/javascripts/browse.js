var browseFunctions = {

    onLoad: function() {
        this.bindEventListeners();
        $('img.jump-to-top').hide();
        $('dd.blacklight-abstract_display').truncate({max_length: 500});
//        $('dd.blacklight-author_display').text($('dd.blacklight-author_display').text().replace(/\|/g,", "));
    },
    
    bindEventListeners: function() {
        $('a#expandAll').click( function(e) {
            e.preventDefault();
            browseFunctions.expandCollapse();
        });

        $('div.browse-panel-heading').each(function() {
            $(this).click( function () {
                browseFunctions.changePanelHeadingColor($(this));
                browseFunctions.updateExpandText();
            })
        });

        $('div.browse-sub-heading').each(function() {
            $(this).click( function () {
                browseFunctions.changeExpandClass($(this));
            })
        });

        $('select').change( function() {
            $('form#browse-select').attr('action',$(this).val());
            $('form#browse-select').submit();
        });

        $('img.jump-to-top').click(function() {
          $("html, body").animate({ scrollTop: 0 }, 400);
        });

        $(window).scroll(function(){
            if ( !$('a#expandAll').visible() ) {
                                
                $('img.jump-to-top').show();
            }
            else {
                $('img.jump-to-top').hide();
            }
        });
    },
    
    expandCollapse: function() {
        if ( $('a#expandAll').text() == "Expand all" ) {
            $('a#expandAll').text("Collapse all");
            $('.panel-collapse').each(function() {
               $(this).collapse('show');
               var $divParent = $(this).parent('div');
               $divParent.children('div.browse-panel-heading').addClass('expanded-heading');
            });
            browseFunctions.expandAllSubheadings();
        }
        else {
            $('a#expandAll').text("Expand all");
            $('.panel-collapse').each(function() {
               $(this).collapse('hide');
               var $divParent = $(this).parent('div');
               $divParent.children('div.browse-panel-heading').removeClass('expanded-heading');
            });
            browseFunctions.collapseAllSubheadings();
        }
    },
    
    changePanelHeadingColor: function($obj) {
        if ( ($obj).next('div.panel-collapse').is(":hidden")  ) {
            ($obj).addClass('expanded-heading');
        }
        else {
            ($obj).removeClass('expanded-heading');
            browseFunctions.collapseSingleSubheading($obj);
        }
    },
    
    changeExpandClass: function($obj) {
        if ( ($obj).children('span').attr('class') == "expand-section"  ) {
            ($obj).children('span').removeClass('expand-section');
            ($obj).children('span').addClass('collapse-section');
        }
        else {
            ($obj).children('span').removeClass('collapse-section');
            ($obj).children('span').addClass('expand-section');
        }
    },
    
    updateExpandText: function() {
        if ( $('div.panel-collapse:visible').length <= 1 ) {
            $('a#expandAll').text("Expand all");
        }
        else if ( $('div.panel-collapse:hidden').length <= 1 ) {
            $('a#expandAll').text("Collapse all");
        }
    },

    expandAllSubheadings: function() {
        $('div.browse-sub-heading').each(function() {
             var $span = $(this).children('span');
             $span.removeClass('expand-section');
             $span.addClass('collapse-section');
         });
    },

    collapseAllSubheadings: function() {
        $('div.browse-sub-heading').each(function() {
             var $span = $(this).children('span');
             $span.removeClass('collapse-section');
             $span.addClass('expand-section');
         });
    },

    collapseSingleSubheading: function($obj) {
        $obj.next('div.panel-collapse').children('div.browse-panel-sub-body').children('div.sub-collapse').each(function() {
            var $span = $(this).prevAll('.browse-sub-heading').children('span');
            if ( $span.attr('class') == "collapse-section" ) { 
                $span.removeClass('collapse-section');
                $span.addClass('expand-section');
                $(this).removeClass('in');
                $(this).addClass('collapse');
            }
        });
    }        
};

$(document).ready(function() {   
    browseFunctions.onLoad();
}); 

