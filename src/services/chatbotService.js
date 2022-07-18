require('dotenv').config();
const common = require('../script/common');
const CFGBTN = require('../configs/btn.json');
const CFGBTNJS = require('../configs/btnConfig');

const IMAGES = [
    'https://res.cloudinary.com/dvweth7yl/image/upload/v1656778684/product/z3533592465888_34e9848417e25ad68aea56a81c56d115.jpg',
]

let getStartedTemplate = () => {

    let elements = [
        {
            "title": "Xin chào bạn đến với Mollie Shop",
            "subtitle": "Dưới đây là các sản phẩm nổi bật của Shop",
            "image_url": IMAGES[0],
            "buttons": [
                CFGBTN.STARTED.PRODUCT_LIST
            ],
        }
    ];

    return common.getTemplate(elements, "generic");
}


let getListProductTemplate = (sender_psid) => {
    let elements = [
        {
            "title": "Danh sách sản phẩm nổi bật của Mollie",
            "subtitle": "Dưới đây là các sản phẩm nổi bật của Shop",
            "image_url": IMAGES[0],
            "buttons": [
                CFGBTN.PRODUCT_LIST.SET_LIST,
                CFGBTN.PRODUCT_LIST.DRESS_LIST,
                CFGBTN.PRODUCT_LIST.SKRIT_LIST
            ],
        },
        {
            "title": "Giờ mở cửa",
            "subtitle": "Tất cả các ngày trong tuần",
            "image_url": IMAGES[0],
            "buttons": [
                CFGBTNJS.btnBuyProduct(sender_psid),
            ],
        },
        {
            "title": "Kích cỡ chung của shop",
            "subtitle": "Kích cỡ của shop phù hợp với đa số phụ nữ Việt Nam < 58kg",
            "image_url": IMAGES[0],
            "buttons": [
                CFGBTN.PRODUCT_LIST.BEST_SELLER,
            ],
        }
    ];

    return common.getTemplate(elements, "generic");
}


let getSetListTemplate = () => {

    let elements = [
        {
            "title": "Set Áo Trễ Vai Váy Dài Chữ A",
            "subtitle": "Set Áo Trễ Vai Váy Dài Chữ A là một trong những sản phẩm nổi bật của Shop",
            "image_url": IMAGES[0],
            "buttons": [
                CFGBTN.PRODUCT.DETAIL,
            ],
        },
        CFGBTNJS.btnBackToList()
    ];


    return common.getTemplate(elements, "generic");
}


let getProductDetailTemplate = () => {
    let elements = [
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
                CFGBTN.PRODUCT.SHOW_IMAGE,
            ],
        },
        CFGBTNJS.btnBackToList()
    ];

    return common.getTemplate(elements, "generic");
}


let getStartedQuickReplyTemplate = () => {
    let response = {
        "text": "Dưới đây là các sản phẩm nổi bật của Shop",
        "quick_replies": [
            CFGBTN.QUICK_REPLY.PRODUCT_LIST,
            CFGBTN.QUICK_REPLY.BEST_SELLER,
            CFGBTN.QUICK_REPLY.GUIDE_TO_USE,

        ]
    };

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
                    CFGBTN.STARTED.PRODUCT_LIST,
                    CFGBTNJS.btnBuyProduct(sender_psid),
                ]
            }
        }
    }

    return response;
}


let handleGetStarted = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let username = await common.getUserName(sender_psid);

            // send text message
            let responseText = { 'text': `Xin chào mừng ${username} đến với Mollie Shop` };
            await common.callSendAPI(sender_psid, responseText);


            // send generic message
            let templateStarted = getStartedTemplate();
            await common.callSendAPI(sender_psid, templateStarted);

            let responseQuickReplyTemplate = getStartedQuickReplyTemplate();
            await common.callSendAPI(sender_psid, responseQuickReplyTemplate);


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
            await common.callSendAPI(sender_psid, response);

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

        case 'PRODUCT_LIST':
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
            case 'PRODUCT_LIST':
                await handleSendListProduct(sender_psid);
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
    common.callSendAPI(sender_psid, response);
}

let handleSendSetList = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {

            // send generic message
            let response = getSetListTemplate();
            await common.callSendAPI(sender_psid, response);


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
            await common.callSendAPI(sender_psid, response);


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
            await common.callSendAPI(sender_psid, response);


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
            await common.callSendAPI(sender_psid, response);


            resolve('done');
        } catch (error) {
            reject(error)
        }
    })
}

let handleShowImage = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {

            let responseImage = getImageTemplate();
            let responseBtn = getButtonTemplate(sender_psid);

            await common.callSendAPI(sender_psid, responseImage);
            await common.callSendAPI(sender_psid, responseBtn);


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
    handleSendSkirtList: handleSendSkirtList,
    getStartedQuickReplyTemplate: getStartedQuickReplyTemplate
}