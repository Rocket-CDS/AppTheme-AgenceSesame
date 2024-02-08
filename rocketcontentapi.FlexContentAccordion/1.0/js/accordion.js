function slideAccordionFC(contentId, moduleId) {
    if ($('.fc-active' + moduleId).attr('id') == contentId) {
        $('.fc-active' + moduleId).slideUp();
        $('.fc-active' + moduleId).parent().removeClass('flexcontent-active');
        $('.fc-active' + moduleId).removeClass('fc-active' + moduleId);
    }
    else {
        $('.fc-active' + moduleId).slideUp();
        $('.fc-active' + moduleId).parent().removeClass('flexcontent-active');
        $('.fc-active' + moduleId).removeClass('fc-active' + moduleId);
        $('#' + contentId).slideDown();
        $('#' + contentId).parent().addClass('flexcontent-active');
        $('#' + contentId).addClass('fc-active' + moduleId);
    }
}