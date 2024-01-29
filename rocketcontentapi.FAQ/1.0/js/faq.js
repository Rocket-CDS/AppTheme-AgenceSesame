function slideAccordionFAQ(contentId, moduleId) {
    if ($('.a-active' + moduleId).attr('id') == contentId) {
        $('.a-active' + moduleId).slideUp();
        $('.a-active' + moduleId).parent().removeClass('accordion-active');
        $('.a-active' + moduleId).removeClass('a-active' + moduleId);
    }
    else {
        $('.a-active' + moduleId).slideUp();
        $('.a-active' + moduleId).parent().removeClass('accordion-active');
        $('.a-active' + moduleId).removeClass('a-active' + moduleId);
        $('#' + contentId).slideDown();
        $('#' + contentId).parent().addClass('accordion-active');
        $('#' + contentId).addClass('a-active' + moduleId);
    }
}