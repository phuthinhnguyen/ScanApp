wrapper = document.querySelector(".section-collection-content");
pressed = false;
startX = 0;
wrapper.addEventListener("mousedown", function (e) {
    pressed = true;
    startX = e.clientX;
})
wrapper.addEventListener("mouseleave", function (e) {
    pressed = false;
})
window.addEventListener("mouseup", function (e) {
    pressed = false;
})
wrapper.addEventListener("mousemove", function (e) {
    if (!pressed) {
        return
    }
    this.scrollLeft += (startX - e.clientX) * 2;
    $(".arrow").children("a").css({ "color": "white" });
})
$(".arrow").children("a").hover(function name(params) {
    $(this).css({ "cursor": "pointer" })
})
$(".arrow").children("a").last().click(function name(params) {
    wrapper.scrollLeft += 2050;
    $(this).css({ "color": "gray" });
    $(".arrow").children("a").first().css({ "color": "white" });
})
$(".arrow").children("a").first().click(function name(params) {
    wrapper.scrollLeft -= 2050;
    $(this).css({ "color": "gray" });
    $(".arrow").children("a").last().css({ "color": "white" });
})
if (wrapper.scrollLeft == 0) {
    $(".arrow").children("a").first().css({ "color": "gray" })
}