$(".faq-content-menudropdown-item-show").hide();
$(".faq-content-menudropdown-item").click(function name(params) {
    $(this).toggleClass("borderbottom");
    $(this).children("#plus").toggle();
    $(this).children("#minus").toggle();
    let faqitemid = $(this).data("faqitemid");
    $("#"+faqitemid).slideToggle();
});
