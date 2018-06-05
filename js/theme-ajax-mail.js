// Content Contact Form
// ---------------------------------------------------------------------------------------
$(function () {

    $('#contact-form').submit(function (event) {

        var dataString = $('#contact-form').serialize();
        //alert (dataString); return false;

        $.ajax({
            type: "POST",
            url: "assets/php/contact-form.php",
            data: dataString,
            success: function () {
                $('#contact-form').prepend("<div class=\"alert alert-success fade in\" style='margin: 10px;'><button class=\"close\" data-dismiss=\"alert\" type=\"button\">&times;</button><strong>Contact Form Submitted!</strong> We will be in touch soon.</div>");
                $('#contact-form')[0].reset();
            }
        });
        return false;

    });

});