$('#loginsubmit').click(function () {
    var email = $('#loginemail').val();
    var pass = $('#loginpassword').val();

    $.post('/checkLogin', {email : email, password: pass}, function(result) {});
});
