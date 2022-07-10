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
            console.log('ok', thread_context)
            // success
            //set psid to input
            $("#psid").val(thread_context.psid);
            handleClickButtonReserveTable();
        },
        function error(err) {
            // error
            console.log('Lỗi bot', err);
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


function handleClickButtonReserveTable() {
    $("#btnReserveTable").on("click", function (e) {
        console.log('call 123');
        let check = validateInputFields(); //return true or false

        let data = {
            psid: $("#psid").val(),
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
            $.ajax({
                url: `${window.location.origin}/order-ajax`,
                method: "POST",
                data: data,
                success: function (data) {
                    console.log(data);
                },
                error: function (error) {
                    console.log(error);
                }
            })
        }
    });
}