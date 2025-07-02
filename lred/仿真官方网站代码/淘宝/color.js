$(function(){
    function addHoverEffect(selector) {
        $(selector).on("mouseover", "a, span, p", function() {
            $(selector).find("a, span, p").removeClass("orange");
            $(this).addClass("orange");
        }).on("mouseout", "a, span, p", function() {
            $(this).removeClass("orange");
        });
    }

    addHoverEffect('.header_left');
    addHoverEffect('.header_right');
    addHoverEffect('.pic_desc');
    addHoverEffect('.channel_extre');
    addHoverEffect('.part2_li');
    addHoverEffect('.guang_right');
    addHoverEffect('.channel_extre3');
});
