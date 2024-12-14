function blog_showSelectedMonths(monthidx, date1, date2, reloadUrl, browserUrl, cscSelectedClass) {
    $('.simplisity_loader').show();
    simplisity_setSessionField('page', '1');
    $('#viewsearchtext').val('');
    $('.rocket-monthdates').removeClass(cscSelectedClass);
    $('.rocket-monthdates' + monthidx).addClass(cscSelectedClass);
    simplisity_setSessionField('viewsearchtext', '');
    simplisity_setSessionField('monthidx', monthidx);
    simplisity_setSessionField('searchdate1', date1);
    simplisity_setSessionField('searchdate2', date2);
    $('.rocket-categorylink').removeClass(cscSelectedClass);
    if (browserUrl && browserUrl != '') {
        history.pushState('', "Title", browserUrl);
    }
    if (reloadUrl && reloadUrl != '') {
        simplisity_setSessionField('rocketpropertyidtag', '0');
        $('.rocket-filtercheckbox').each(function (i, obj) { simplisity_setSessionField(this.id, false); });
        location.replace(reloadUrl);
    }
    else {
        var element_to_scroll_to = document.getElementById('rocketblogdisplay');
        element_to_scroll_to.scrollIntoView();
        doDateSearchReload(date1, date2);
    }
}
function blog_clearFiltersCategories(cscSelectedClass) {
    $('.simplisity_loader').show();
    // remove selecton class
    $('.rocket-monthdates').removeClass(cscSelectedClass);

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
function blog_pageLoad(cscSelectedClass) {
    $('.simplisity_loader').show();
    if (simplisity_getSessionField('searchdate1') != '' && simplisity_getSessionField('viewsearchtext') == '') {
        monthidx = simplisity_getSessionField('monthidx');
        $('.rocket-monthdates').removeClass(cscSelectedClass);
        $('.rocket-monthdates' + monthidx).addClass(cscSelectedClass);
    }
    $('.simplisity_loader').hide();
}

function blog_sharrre(pageUrl, iconClass) {
    var list = ['facebook', 'linkedin', 'twitter', 'pinterest'];
    $('#rocket-sharrre').sharrre({
        share: {
            facebook: true,
            twitter: true,
            linkedin: true,
            pinterest: true,
        },
        buttons: {
            facebook: {
                popup: {
                    width: 1200,
                    height: 900
                }
            },
            twitter: {
                popup: {
                    width: 1200,
                    height: 900
                }
            },
            linkedin: {
                popup: {
                    width: 1200,
                    height: 900
                }
            },
            pinterest: {
                popup: {
                    width: 1200,
                    height: 900
                }
            },
        },
        url: pageUrl,
        enableCounter: false,
        enableHover: false,
        template: function () {
            content = '';
            for (i in list) {
                service = list[i];
                content += '<a class="' + service + '"><span class="ri-' + service + ' ' + iconClass + '"></span></a>';
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