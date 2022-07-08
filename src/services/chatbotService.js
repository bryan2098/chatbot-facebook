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
            let responseGenericMessage = getStartedTemplate();
            await callSendAPI(sender_psid, responseGenericMessage);


            resolve('done');
        } catch (error) {
            reject(error)
        }
    })
}


let getStartedTemplate = () => {
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


let getListProductTemplate = () => {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    {
                        "title": "Danh sách sản phẩm nổi bật của Mollie",
                        "subtitle": "Dưới đây là các sản phẩm nổi bật của Shop",
                        "image_url": IMAGES[0],
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "Set",
                                "payload": "SET_LIST",
                            },
                            {
                                "type": "postback",
                                "title": "ĐẦM",
                                "payload": "DRESS_LIST",
                            },
                            {
                                "type": "postback",
                                "title": "VÁY",
                                "payload": "SKIRT_LIST",
                            }
                        ],
                    },
                    {
                        "title": "Giờ mở cửa",
                        "subtitle": "Tất cả các ngày trong tuần",
                        "image_url": IMAGES[0],
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "MUA SẢN PHẨM",
                                "payload": "BUY_PRODUCT",
                            },
                        ],
                    },
                    {
                        "title": "Kích cỡ chung của shop",
                        "subtitle": "Kích cỡ của shop phù hợp với đa số phụ nữ Việt Nam < 58kg",
                        "image_url": IMAGES[0],
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "CÁC SẢN PHẨM BÁN CHẠY",
                                "payload": "BEST_SELLER",
                            },
                        ],
                    }
                ]
            }
        }
    }

    return response;
}


let handleSendListProduct = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {

            // send generic message
            let response = getListProductTemplate();
            await callSendAPI(sender_psid, response);


            resolve('done');
        } catch (error) {
            reject(error)
        }
    })
}

// Handles messaging_postbacks events
async function handlePostback(sender_psid, received_postback) {
    let response;

    let payload = received_postback.payload;

    switch (payload) {
        case 'yes':
            response = { 'text': 'Thanks!' };
            break;

        case 'no':
            response = { 'text': 'Oops, try sending another image.' };
            break;

        case 'RESTART_BOT':
        case 'GET_STARTED':
            await handleGetStarted(sender_psid);
            break;

        case 'LIST_PRODUCT':
            await handleSendListProduct(sender_psid);
            break;

        case 'SET_LIST':
            await handleSendSetList(sender_psid);
            break;

        case 'DRESS_LIST':
            await handleSendDressList(sender_psid);
            break;

        case 'SKIRT_LIST':
            await handleSendSkirtList(sender_psid);
            break;

        case 'PRODUCT_DETAIL':
            await handleDetailProduct(sender_psid);
            break;

        case 'BUY_PRODUCT':
            break;

        case 'BACK_TO_LIST':
            await handleBackToList(sender_psid);
            break;


        default:
            response = { 'text': `oop! I don't know response with postback ${payload}` };
            break;
    }


    // callSendAPI(sender_psid, response);
}


// Handles messages events
function handleMessage(sender_psid, received_message) {
    let response;

    // Check if the message contains text
    if (received_message.text) {

        // Create the payload for a basic text message
        response = {
            "text": `Chào mừng bạn đến với Mollie Shop. Bạn đợi mình một chút nhé. Mình sẽ trả lời ngay <3`
        }
    }

    // Sends the response message
    callSendAPI(sender_psid, response);
}




let getSetListTemplate = () => {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    {
                        "title": "Set Áo Trễ Vai Váy Dài Chữ A",
                        "subtitle": "Set Áo Trễ Vai Váy Dài Chữ A là một trong những sản phẩm nổi bật của Shop",
                        "image_url": IMAGES[0],
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "Chi Tiết",
                                "payload": "PRODUCT_DETAIL",
                            },
                            {
                                "type": "postback",
                                "title": "Mua",
                                "payload": "BUY_PRODUCT",
                            },
                        ],
                    },
                    {
                        "title": "Set Áo Trễ Vai Váy Dài Chữ A",
                        "subtitle": "Set Áo Trễ Vai Váy Dài Chữ A là một trong những sản phẩm nổi bật của Shop",
                        "image_url": IMAGES[0],
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "Chi Tiết",
                                "payload": "PRODUCT_DETAIL",
                            },
                            {
                                "type": "postback",
                                "title": "Mua",
                                "payload": "BUY_PRODUCT",
                            },
                        ],
                    },
                    {
                        "title": "Set Áo Trễ Vai Váy Dài Chữ A",
                        "subtitle": "Set Áo Trễ Vai Váy Dài Chữ A là một trong những sản phẩm nổi bật của Shop",
                        "image_url": IMAGES[0],
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "Chi Tiết",
                                "payload": "PRODUCT_DETAIL",
                            },
                            {
                                "type": "postback",
                                "title": "Mua",
                                "payload": "BUY_PRODUCT",
                            },
                        ],
                    },
                    {
                        "title": "Quay trở lại",
                        "subtitle": "Quay trở lại danh sách sản phẩm",
                        "image_url": IMAGES[0],
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "Quay trở lại",
                                "payload": "BACK_TO_LIST",
                            },
                        ],
                    }
                ]
            }
        }
    }

    return response;
}


let handleSendSetList = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {

            // send generic message
            let response = getSetListTemplate();
            await callSendAPI(sender_psid, response);


            resolve('done');
        } catch (error) {
            reject(error)
        }
    })
}

let handleSendDressList = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {

            // send generic message
            let response = getSetListTemplate();
            await callSendAPI(sender_psid, response);


            resolve('done');
        } catch (error) {
            reject(error)
        }
    })
}

let handleSendSkirtList = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {

            // send generic message
            let response = getSetListTemplate();
            await callSendAPI(sender_psid, response);


            resolve('done');
        } catch (error) {
            reject(error)
        }
    })
}

let handleBackToList = async (sender_psid) => {
    await handleSendListProduct(sender_psid);
}


let getProductDetailTemplate = () => {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    {
                        "title": "Set Áo Trễ Vai Váy Dài Chữ A",
                        "subtitle": "Set Áo Trễ Vai Váy Dài Chữ A là một trong những sản phẩm nổi bật của Shop",
                        "image_url": IMAGES[0],
                    },
                    {
                        "title": "Set Áo Trễ Vai Váy Dài Chữ A",
                        "subtitle": "Set Áo Trễ Vai Váy Dài Chữ A là một trong những sản phẩm nổi bật của Shop",
                        "image_url": IMAGES[0],
                    },
                    {
                        "title": "Set Áo Trễ Vai Váy Dài Chữ A",
                        "subtitle": "Set Áo Trễ Vai Váy Dài Chữ A là một trong những sản phẩm nổi bật của Shop",
                        "image_url": IMAGES[0],
                    },
                    {
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "Mua",
                                "payload": "BUY_PRODUCT",
                            },
                        ],
                    },
                ]
            }
        }
    }

    return response;
}


let handleDetailProduct = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {

            // send generic message
            let response = getProductDetailTemplate();
            await callSendAPI(sender_psid, response);


            resolve('done');
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    handleGetStarted: handleGetStarted,
    handleSendListProduct: handleSendListProduct,
    handlePostback: handlePostback,
    handleMessage: handleMessage,
    handleSendSetList: handleSendSetList,
    handleSendDressList: handleSendDressList,
    handleSendSkirtList: handleSendSkirtList
}