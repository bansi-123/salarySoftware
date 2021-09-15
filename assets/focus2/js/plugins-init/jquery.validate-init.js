


jQuery(".form-valide").validate({
    rules: {
        "val-email": {
            required: !0,
            email: !0
        },
        "val-email2": {
            required: !0,
            email: !0
           
        },
        "ifscCode": {
            required: !0,
            email: !0,
            minlength: 11,
            maxlength: 11
        },
       
        "uan": {
            required: !0,
            minlength: 12,
            maxlength: 12

        },
        "Aadhar": {
            required: !0,
            minlength: 12,
            maxlength: 12
        },
        "Pan_No": {
            required: !0,
            minlength: 10,
            maxlength: 10
        },
        "mis": {
            required: !0,
            minlength: 3,
            maxlength: 3
        },
     
        "mobile": {
            required: !0,
            // phoneUS: !0,
            maxlength: 10,
            minlength: 10
            
        },

        "phdYr":{
            required: !0,
            minlength: 4,
            maxlength: 4

        },
        "pgYr":{
            required: !0,
            minlength: 4,
            maxlength: 4

        },
        "ugYr":{
            required: !0,
            minlength: 4,
            maxlength: 4

        },
        "ulip":{
            required: !0,
            minlength: 8,
            maxlength: 10

        },
        "nps":{
            required: !0,
            minlength: 8,
            maxlength: 10

        }
    },
    messages: {
       
        "val-email": "Please enter a valid email address",
        
        "val-phoneus": "Please enter a US phone!",
        "val-digits": "Please enter only digits!",
        "val-number": "Please enter a number!",
        "val-range": "Please enter a number between 1 and 5!",
        "val-terms": "You must agree to the service terms!"
    },

    ignore: [],
    errorClass: "invalid-feedback animated fadeInUp",
    errorElement: "div",
    errorPlacement: function(e, a) {
        jQuery(a).parents(".form-group > div").append(e)
    },
    highlight: function(e) {
        jQuery(e).closest(".form-group").removeClass("is-invalid").addClass("is-invalid")
    },
    success: function(e) {
        jQuery(e).closest(".form-group").removeClass("is-invalid"), jQuery(e).remove()
    },
});


jQuery(".form-valide-with-icon").validate({
    rules: {
        "val-username": {
            required: !0,
            minlength: 3
        },
        "val-password": {
            required: !0,
            minlength: 5
        }
    },
    messages: {
        "val-username": {
            required: "Please enter a username",
            minlength: "Your username must consist of at least 3 characters"
        },
        "val-password": {
            required: "Please provide a password",
            minlength: "Your password must be at least 5 characters long"
        }
    },

    ignore: [],
    errorClass: "invalid-feedback animated fadeInUp",
    errorElement: "div",
    errorPlacement: function(e, a) {
        jQuery(a).parents(".form-group > div").append(e)
    },
    highlight: function(e) {
        jQuery(e).closest(".form-group").removeClass("is-invalid").addClass("is-invalid")
    },
    success: function(e) {
        jQuery(e).closest(".form-group").removeClass("is-invalid").addClass("is-valid")
    }




});