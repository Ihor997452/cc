    $("input[type='number']").inputSpinner({buttonsOnly: true});

    $(window).scroll(function() {
        let scroll = $(window).scrollTop();

        if (scroll >= 70) {
            $(".navigation-wrapper").addClass("navigation-bg");
        } else {
            $(".navigation-wrapper").removeClass("navigation-bg");
        }
    });