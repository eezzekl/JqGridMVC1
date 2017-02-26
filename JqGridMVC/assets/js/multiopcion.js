$('.dropdown-submenu').click(function () {
    var val = $(this).children('.dropdown-menu').css('display');

    if (val == 'block') {
        $(this).find('.dropdown-menu').css('display', 'none');
    }
    else {
        $(this).parent().find('.dropdown-menu').css('display', 'none');
        $(this).children('.dropdown-menu').css('display', 'block');

        //If not enough space in left, display the submenu in ... right
        var menu = $(this).parent().find("ul");
        var menupos = menu.offset();

        if ((menupos.left + menu.width()) + 30 > $(window).width()) {
            var newpos = -menu.width();
        } else {
            var newpos = $(this).parent().width();
        }
        menu.css({ left: newpos });
    }

    return false;
});
