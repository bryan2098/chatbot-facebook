require('dotenv').config();
import request from "request";

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

const IMAGES = [
    'https://res.cloudinary.com/dvweth7yl/image/upload/v1656778684/product/z3533592465888_34e9848417e25ad68aea56a81c56d115.jpg',
]

const URL_MESSAGES = "https://graph.facebook.com/v14.0/me/messages";
const COFG = require('../configs/conf.json');
const DUMMY = require('../configs/dummy');


let getProductDetailTemplate = () => {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    DUMMY[0],
                    {
                        "title": "Quay trở lại",
                        "subtitle": "Quay trở lại danh sách sản phẩm",
                        "image_url": IMAGES[0],
                        "buttons": [
                            COFG.BUTTONS.BACK_TO_LIST
                        ],
                    }
                ]
            }
        }
    }

    return response;
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
                        COFG.BUTTONS.PRODUCT_LIST,
                        COFG.BUTTONS.SHOPEE
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
                            COFG.BUTTONS.SET_LIST,
                            COFG.BUTTONS.DRESS_LIST,
                            COFG.BUTTONS.SKIRT_LIST,
                            COFG.BUTTONS.JUMPSUIT_LIST
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
                            COFG.BUTTONS.BEST_SELLER
                        ],
                    }
                ]
            }
        }
    }

    return response;
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
                        "url": "https://business.facebook.com/hoidanITEricRestaurant/videos/765420714370507",
                        "buttons": [
                            COFG.BUTTONS.PRODUCT_LIST,
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
                        "image_url": "https://res.cloudinary.com/dvweth7yl/image/upload/v1656778684/product/z3533592465888_34e9848417e25ad68aea56a81c56d115.jpg",
                        "buttons": [
                            COFG.BUTTONS.PRODUCT_DETAIL,
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
                    COFG.BUTTONS.PRODUCT_LIST,
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
            "text": COFG.TEXT_HELLO_1
        }
    }

    // Sends the response message
    callSendAPI(sender_psid, response);
}


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
                "uri": URL_MESSAGES,
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
        "uri": URL_MESSAGES,
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
        "uri": URL_MESSAGES,
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



module.exports = {
    handleGetStarted: handleGetStarted,
    handleSendListProduct: handleSendListProduct,
    handlePostback: handlePostback,
    handleMessage: handleMessage,
    handleSendDressList: handleSendDressList,
    handleSendSkirtList: handleSendSkirtList,
    callSendAPI: callSendAPI,
    getUserName: getUserName,
    getStartedQuickReplyTemplate: getStartedQuickReplyTemplate
}