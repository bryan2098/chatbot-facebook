(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/messenger.Extensions.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'Messenger'));

window.extAsyncInit = function () {
    // the Messenger Extensions JS SDK is done loading 

    // 110952234978460
    MessengerExtensions.getContext('1097565404183780',
        function success(thread_context) {
            //set psid to input
            $("#psid").val(thread_context.psid);
            handleClickButtonOrder();
        },
        function error(err) {
            // run fallback, get userId from url
            $("#psid").val(senderId);
            handleClickButtonOrder();
        }
    );
};

//validate inputs
function validateInputFields() {
    let phoneNumber = $("#phoneNumber");

    if (phoneNumber.val() === "") {
        phoneNumber.addClass("is-invalid");
        return true;
    } else {
        phoneNumber.removeClass("is-invalid");
    }

    return false;
}


function handleClickButtonOrder() {
    $("#btnOrder").on("click", function (e) {
        let check = validateInputFields(); //return true or false

        let data = {
            psid: $("#psid").val() || '',
            customerName: $("#customerName").val(),
            address: $("#address").val(),
            phoneNumber: $("#phoneNumber").val()
        };

        if (!check) {
            //close webview
            MessengerExtensions.requestCloseBrowser(function success() {
                // webview closed
            }, function error(err) {
                // an error occurred
                console.log(err);
            });

            //send data to node.js server 
            let url = `${window.location.origin}/order-ajax`;

            $.ajax({
                url: url,
                method: "POST",
                contentType: "application/json",
                dataType: "json",
                data: JSON.stringify(data),
                success: function (res) {
                    console.log('success', res);
                },
                error: function (error) {
                    console.log(error);
                }
            })
        }
    });
}