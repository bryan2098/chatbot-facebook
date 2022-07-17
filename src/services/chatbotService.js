require('dotenv').config();
import request from "request";

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

const IMAGES = [
    'https://res.cloudinary.com/dvweth7yl/image/upload/v1656778684/product/z3533592465888_34e9848417e25ad68aea56a81c56d115.jpg',
]


let callSendAPI = async (sender_psid, response) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Construct the message body
            let request_body = {
                "recipient": {
                    "id": sender_psid
                },
                "message": response
            }

            await sendMarkReadMessage(sender_psid);
            await sendTypingOn(sender_psid);

            // Send the HTTP request to the Messenger Platform
            request({
                "uri": "https://graph.facebook.com/v14.0/me/messages",
                "qs": { "access_token": PAGE_ACCESS_TOKEN },
                "method": "POST",
                "json": request_body
            }, (err, res, body) => {
                console.log('body', body);
                if (!err) {
                    resolve('message sent!')
                } else {
                    reject("Unable to send message:" + err);
                }
            });
        } catch (error) {
            reject(error);
        }
    })
}

let sendTypingOn = (sender_psid) => {
    // Construct the message body
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "sender_action": "typing_on"
    }

    // Send the HTTP request to the Messenger Platform
    request({
        "uri": "https://graph.facebook.com/v14.0/me/messages",
        "qs": { "access_token": PAGE_ACCESS_TOKEN },
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (!err) {
            console.log('sendTypingOn sent!')
        } else {
            console.error("Unable to send message:" + err);
        }
    });
}

let sendMarkReadMessage = (sender_psid) => {
    // Construct the message body
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "sender_action": "mark_seen"
    }

    // Send the HTTP request to the Messenger Platform
    request({
        "uri": "https://graph.facebook.com/v14.0/me/messages",
        "qs": { "access_token": PAGE_ACCESS_TOKEN },
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (!err) {
            console.log('sendTypingOn sent!')
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


            let responseQuickReplyTemplate = getStartedQuickReplyTemplate();
            await callSendAPI(sender_psid, responseQuickReplyTemplate);


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


let getListProductTemplate = (sender_psid) => {
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
                                "type": "web_url",
                                "url": `${process.env.URL_WEB_VIEW_ORDER}?senderId=${sender_psid}`,
                                "title": "Mua sản phẩm",
                                "webview_height_ratio": "tall",
                                "messenger_extensions": true
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
            let response = getListProductTemplate(sender_psid);
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

        case 'SHOW_IMAGE':
            await handleShowImage(sender_psid);
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
async function handleMessage(sender_psid, received_message) {
    let response;

    // check message for with replies
    if (received_message.quick_reply && received_message.quick_reply.payload) {

        switch (received_message.quick_reply.payload) {
            case 'LIST_PRODUCT':
                await handleSendListProduct(sender_psid);
                break;

            case 'GUIDE_TO_USE':
                await handleGuideToUseBot(sender_psid);
                break;

            default:
                break;
        }

        return;
    }

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




let getSetListTemplate = (sender_psid) => {
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
                                "type": "weburl",
                                "url": `${process.env.URL_WEB_VIEW_ORDER}?senderId=${sender_psid}`,
                                "title": "Mua sản phẩm",
                                "webview_height_ratio": "tall",
                                "messenger_extensions": true
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
                                "type": "weburl",
                                "url": `${process.env.URL_WEB_VIEW_ORDER}?senderId=${sender_psid}`,
                                "title": "Mua sản phẩm",
                                "webview_height_ratio": "tall",
                                "messenger_extensions": true
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
                                "type": "weburl",
                                "url": `${process.env.URL_WEB_VIEW_ORDER}?senderId=${sender_psid}`,
                                "title": "Mua sản phẩm",
                                "webview_height_ratio": "tall",
                                "messenger_extensions": true
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
            let response = getSetListTemplate(sender_psid);
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
            let response = getSetListTemplate(sender_psid);
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
            let response = getSetListTemplate(sender_psid);
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
                        "subtitle": "296.000đ",
                        "image_url": IMAGES[0],
                    },
                    {
                        "title": "Set Áo Trễ Vai Váy Dài Chữ A",
                        "subtitle": "296.000đ",
                        "image_url": IMAGES[0],
                    },
                    {
                        "title": "Set Áo Trễ Vai Váy Dài Chữ A",
                        "subtitle": "296.000đ",
                        "image_url": IMAGES[0],
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "Hiển thị ảnh",
                                "payload": "SHOW_IMAGE",
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


let getImageTemplate = () => {
    let response = {
        "attachment": {
            "type": "image",
            "payload": {
                "url": IMAGES[0],
                "is_reusable": true
            }
        }
    };

    return response;
}


let getButtonTemplate = (sender_psid) => {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "button",
                "text": "Size shop < 58kg nha bạn iu",
                "buttons": [
                    {
                        "type": "postback",
                        "title": "DANH SÁCH SẢN PHẨM NỔI BẬT",
                        "payload": "LIST_PRODUCT",
                    },
                    {
                        "type": "weburl",
                        "url": `${process.env.URL_WEB_VIEW_ORDER}?senderId=${sender_psid}`,
                        "title": "Mua sản phẩm",
                        "webview_height_ratio": "tall",
                        "messenger_extensions": true
                    },
                ]
            }
        }
    }

    return response;
}

let handleShowImage = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {

            // send an image 
            let responseImage = getImageTemplate();
            // send a button templates
            let responseBtn = getButtonTemplate(sender_psid);

            // send generic message

            await callSendAPI(sender_psid, responseImage);
            await callSendAPI(sender_psid, responseBtn);


            resolve('done');
        } catch (error) {
            reject(error)
        }
    })
}

let getStartedQuickReplyTemplate = () => {
    let response = {
        "text": "Dưới đây là các sản phẩm nổi bật của Shop",
        "quick_replies": [
            {
                "content_type": "text",
                "title": "Sản phẩm nổi bật",
                "payload": "LIST_PRODUCT",
            },
            {
                "content_type": "text",
                "title": "Sản phẩm bán chạy",
                "payload": "BEST_SELLER",
            },
            {
                "content_type": "text",
                "title": "Hướng dẫn sử dụng",
                "payload": "GUIDE_TO_USE",
            }
        ]
    };

    return response;
}


let handleGuideToUseBot = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {

            let username = await getUserName(sender_psid);
            let responseText = {
                text: `Xin chào bạn ${username}, mình là chat bot Mollie. \n Để biết cách sử dụng, bạn vui lòng xem hết video bên dưới nhé 😉`
            };

            let responseMediaTemplate = getBotMediaTemplate();

            await callSendAPI(sender_psid, responseText);
            await callSendAPI(sender_psid, responseMediaTemplate);

            resolve('done');
        } catch (error) {
            reject(error)
        }
    })
}

let getBotMediaTemplate = () => {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "media",
                "elements": [
                    {
                        "media_type": "<image|video>",
                        // "attachment_id": "765420714370507",
                        // Need upload video to https://business.facebook.com/creatorstudio/content_posts after that copy link video
                        "url": "https://business.facebook.com/hoidanITEricRestaurant/videos/765420714370507",
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "Danh sách sản phẩm nổi bật",
                                "payload": "PRODUCT_LIST",
                            },
                            {
                                "type": "weburl",
                                "url": `https://shopee.vn/mollieshop2501`,
                                "title": "Shopee",
                                "webview_height_ratio": "full",
                            },
                        ]
                    }
                ]
            }
        }
    };

    return response;
}


module.exports = {
    handleGetStarted: handleGetStarted,
    handleSendListProduct: handleSendListProduct,
    handlePostback: handlePostback,
    handleMessage: handleMessage,
    handleSendSetList: handleSendSetList,
    handleSendDressList: handleSendDressList,
    handleSendSkirtList: handleSendSkirtList,
    callSendAPI: callSendAPI,
    getUserName: getUserName,
    getStartedQuickReplyTemplate: getStartedQuickReplyTemplate
}