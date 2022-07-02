require('dotenv').config();
import request from "request";

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

const IMAGES = [
    'https://res.cloudinary.com/dvweth7yl/image/upload/v1656778684/product/z3533592465888_34e9848417e25ad68aea56a81c56d115.jpg',
]


let callSendAPI = (sender_psid, response) => {
    // Construct the message body
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "message": response
    }

    // Send the HTTP request to the Messenger Platform
    request({
        "uri": "https://graph.facebook.com/v14.0/me/messages",
        "qs": { "access_token": PAGE_ACCESS_TOKEN },
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (!err) {
            console.log('message sent!')
        } else {
            console.error("Unable to send message:" + err);
        }
    });
}


let getUserName = (sender_psid) => {
    return new Promise((resolve, reject) => {
        request({
            "uri": `https://graph.facebook.com/${sender_psid}?fields=first_name,last_name,profile_pic&access_token=${PAGE_ACCESS_TOKEN}`,
            "qs": { "access_token": PAGE_ACCESS_TOKEN },
            "method": "GET",
        }, (err, res, body) => {
            if (!err) {
                let response = JSON.parse(body);
                let username = `${response.last_name} ${response.first_name}`;
                resolve(username);
            } else {
                console.error("Unable to send message:" + err);
            }
        });
    })
}


let handleGetStarted = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let username = await getUserName(sender_psid);

            // send text message
            let responseText = { 'text': `Xin chào mừng ${username} đến với Mollie Shop` };
            await callSendAPI(sender_psid, responseText);


            // send generic message
            let responseGenericMessage = sendGetStartedTemplate();
            await callSendAPI(sender_psid, responseGenericMessage);


            resolve('done');
        } catch (error) {
            reject(error)
        }
    })
}


let sendGetStartedTemplate = () => {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": "Xin chào bạn đến với Mollie Shop",
                    "subtitle": "Dưới đây là các sản phẩm nổi bật của Shop",
                    "image_url": IMAGES[0],
                    "buttons": [
                        {
                            "type": "postback",
                            "title": "DANH SÁCH SẢN PHẨM NỔI BẬT",
                            "payload": "LIST_PRODUCT",
                        },
                        {
                            "type": "postback",
                            "title": "SHOPEE",
                            "payload": "LINK_SHOPEE",
                        }
                    ],
                }]
            }
        }
    }

    return response;
}

module.exports = {
    handleGetStarted: handleGetStarted
}