require('dotenv').config();
import request from "request";

const common = require('../script/common');

const IMAGES = [
    'https://res.cloudinary.com/dvweth7yl/image/upload/v1656778684/product/z3533592465888_34e9848417e25ad68aea56a81c56d115.jpg',
]

const COFG = require('../configs/conf.json');
const DUMMY = require('../configs/dummy');


let getProductDetailTemplate = () => {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    DUMMY.dummyProduct[0],
                    DUMMY.dummyBackToList
                ]
            }
        }
    }

    return response;
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
                            COFG.BUTTONS.SKIRT_LIST
                        ],
                    },
                    {
                        "title": "Giờ mở cửa",
                        "subtitle": "Tất cả các ngày trong tuần",
                        "image_url": IMAGES[0],
                        "buttons": [
                            common.buyProduct(sender_psid)
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
                            common.buyProduct(sender_psid)
                        ],
                    },
                    DUMMY.dummyBackToList
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
                    common.buyProduct(sender_psid)
                ]
            }
        }
    }

    return response;
}

let getStartedQuickReplyTemplate = () => {
    let response = {
        "text": "Dưới đây là các gợi ý của Mollie. Bạn yêu tham khảo nhé.",
        "quick_replies": [
            COFG.BUTTONS.PRODUCT_LIST_QUICK_REPLY,
            COFG.BUTTONS.BEST_SELLER_QUICK_REPLY,
            COFG.BUTTONS.GUIDE_TO_USE
        ]
    };

    return response;
}


let handleSendSetList = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {

            // send generic message
            let response = getSetListTemplate(sender_psid);
            await common.callsendAPI(sender_psid, response);

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
            await common.callsendAPI(sender_psid, response);


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
            await common.callsendAPI(sender_psid, response);


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
            await common.callsendAPI(sender_psid, response);


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

            await common.callsendAPI(sender_psid, responseImage);
            await common.callsendAPI(sender_psid, responseBtn);


            resolve('done');
        } catch (error) {
            reject(error)
        }
    })
}


let handleGuideToUseBot = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {

            let username = await common.getUserName(sender_psid);
            let responseText = {
                text: `Xin chào bạn ${username}, mình là chat bot Mollie. \n Để biết cách sử dụng, bạn vui lòng xem hết video bên dưới nhé 😉`
            };

            let responseMediaTemplate = getBotMediaTemplate();

            await common.callsendAPI(sender_psid, responseText);
            await common.callsendAPI(sender_psid, responseMediaTemplate);

            resolve('done');
        } catch (error) {
            reject(error)
        }
    })
}

let handleGetStarted = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let username = await common.getUserName(sender_psid);

            // send text message
            let responseText = { 'text': `Xin chào mừng ${username} đến với Mollie Shop` };
            await common.callsendAPI(sender_psid, responseText);


            // send generic message
            let responseGenericMessage = getStartedTemplate();
            await common.callsendAPI(sender_psid, responseGenericMessage);


            let responseQuickReplyTemplate = getStartedQuickReplyTemplate();
            await common.callsendAPI(sender_psid, responseQuickReplyTemplate);


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
            await common.callsendAPI(sender_psid, response);

            resolve('done');
        } catch (error) {
            reject(error)
        }
    })
}

// Handles messaging_postbacks events
async function handlePostback(sender_psid, received_postback) {
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
    common.callsendAPI(sender_psid, response);
}



module.exports = {
    handleGetStarted: handleGetStarted,
    handleSendListProduct: handleSendListProduct,
    handlePostback: handlePostback,
    handleMessage: handleMessage,
    handleSendDressList: handleSendDressList,
    handleSendSkirtList: handleSendSkirtList,
    getStartedQuickReplyTemplate: getStartedQuickReplyTemplate
}