function blog_showSelectedMonths(monthidx, date1, date2, reloadUrl, browserUrl, cssSelectedClass) {
    $('.simplisity_loader').show();
    simplisity_setSessionField('page', '1');
    $('#viewsearchtext').val('');
    $('.rocket-monthdates').removeClass(cssSelectedClass);
    $('.rocket-monthdates' + monthidx).addClass(cssSelectedClass);
    simplisity_setSessionField('viewsearchtext', '');
    simplisity_setSessionField('monthidx', monthidx);
    simplisity_setSessionField('searchdate1', date1);
    simplisity_setSessionField('searchdate2', date2);
    $('.rocket-categorylink').removeClass(cssSelectedClass);
    if (browserUrl && browserUrl != '') {
        history.pushState('', "Title", browserUrl);
    }
    if (reloadUrl && reloadUrl != '') {
        simplisity_setSessionField('rocketpropertyidtag', '0');
        $('.rocket-filtercheckbox').each(function (i, obj) { simplisity_setSessionField(this.id, false); });
        location.replace(reloadUrl);
    }
    else {
		$("html,body").animate({scrollTop:$('#rocket-blog').offset().top - 100},500);
        doDateSearchReload(date1, date2);
    }
}
function blog_clearFiltersCategories(cssSelectedClass) {
    $('.simplisity_loader').show();
    // remove selecton class
    $('.rocket-monthdates').removeClass(cssSelectedClass);

    // Clear the search field
    $('#viewsearchtext').val('');
    simplisity_setSessionField('viewsearchtext', '');

    // Clear the date range selection (This is a search)
    simplisity_setSessionField('monthidx', '');
    simplisity_setSessionField('searchdate1', '');
    simplisity_setSessionField('searchdate2', '');

    // Clear tag selection
    simplisity_setSessionField('rocketpropertyidtag', '0');

    // Clear Filter checkboxes
    $('.rocket-filtercheckbox').each(function (i, obj) { simplisity_setSessionField(this.id, false); });
}
function blog_pageLoad(cssSelectedClass) {
    $('.simplisity_loader').show();
    if (simplisity_getSessionField('searchdate1') != '' && simplisity_getSessionField('viewsearchtext') == '') {
        monthidx = simplisity_getSessionField('monthidx');
        $('.rocket-monthdates').removeClass(cssSelectedClass);
        $('.rocket-monthdates' + monthidx).addClass(cssSelectedClass);
    }
    $('.simplisity_loader').hide();
}

function blog_sharrre(pageUrl, iconClass) {
    var list = ['facebook', 'linkedin', 'twitter', 'pinterest'];
    $('#rocket-sharrre').sharrre({
        share: {
            facebook: true,
            twitter: false,
            linkedin: true,
            pinterest: false
        },
        buttons: {
            facebook: {},
            linkedin: {}
        },
        url: pageUrl,
        enableCounter: false,
        enableHover: false,
        template: function () {
            content = '';
            for (i in list) {
                service = list[i];
                content += '<a class="' + service + ' ' + iconClass + '" href="#"><span class="ri-' + service + '"></span></a>';
            }
            return content;
        }(), render: function (api, options) {
            for (i in list) {
                service = list[i];
                $(api.element).on('click', '.' + service, function () {
                    api.openPopup(this.className);
                });
            }
        }
    });

}