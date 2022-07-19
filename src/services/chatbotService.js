require('dotenv').config();
const common = require('../script/common');
const CFGBTN = require('../configs/btn.json');
const DATA = require('../configs/data.json');
const CFGBTNJS = require('../configs/btnConfig');
const template = require('./templateService');

const IMAGES = [
    'https://res.cloudinary.com/dvweth7yl/image/upload/v1656778684/product/z3533592465888_34e9848417e25ad68aea56a81c56d115.jpg',
]

let getListProductTemplate = (sender_psid) => {
    let elements = [
        {
            "title": "Danh sách sản phẩm nổi bật của Mollie",
            "subtitle": "Dưới đây là các sản phẩm nổi bật của Shop",
            "image_url": DATA.LOGO,
            "buttons": [
                CFGBTN.PRODUCT_LIST.SET_LIST,
                CFGBTN.PRODUCT_LIST.DRESS_LIST,
                CFGBTN.PRODUCT_LIST.SKRIT_LIST
            ],
        },
        {
            "title": "Đặt hàng",
            "subtitle": "Sản phẩm được giao trong vòng từ 3-4 ngày tùy thuộc vào khu vực nhé.",
            "image_url": DATA.LOGO,
            "buttons": [
                CFGBTNJS.btnBuyProduct(sender_psid),
            ],
        },
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
        "text": "Để xem nhiều sản phẩm hơn tại Shopee, khách yêu nhấn vào dấu 3 gạch ở góc phải màn hình nhé.",
        "quick_replies": [
            CFGBTN.QUICK_REPLY.PRODUCT_LIST,
            CFGBTN.QUICK_REPLY.BEST_SELLER,
            CFGBTN.QUICK_REPLY.PRODUCT_NEW,
            CFGBTN.QUICK_REPLY.PAYMENT_METHOD,
            CFGBTN.QUICK_REPLY.INFOMATION,
            CFGBTN.QUICK_REPLY.POLICY,
        ]
    };

    return response;
}

let getQuickReplyTemplate = (exlTag) => {

    let tags = [
        CFGBTN.QUICK_REPLY.PRODUCT_LIST,
        CFGBTN.QUICK_REPLY.BEST_SELLER,
        CFGBTN.QUICK_REPLY.PRODUCT_NEW,
        CFGBTN.QUICK_REPLY.PAYMENT_METHOD,
        CFGBTN.QUICK_REPLY.INFOMATION,
        CFGBTN.QUICK_REPLY.POLICY,
    ];

    tags = tags.filter((tag) => {
        return tag.payload !== exlTag;
    })

    let response = {
        "text": "Chọn đề mục để biết thêm thông tin nhé",
        "quick_replies": tags
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
            let responseText = { 'text': `Xin chào ${username}. Mình là bot Mollie.` };
            await common.callSendAPI(sender_psid, responseText);

            let quickReplyTemplate = getStartedQuickReplyTemplate();
            await common.callSendAPI(sender_psid, quickReplyTemplate);


            resolve('done');
        } catch (error) {
            reject(error)
        }
    })
}

let handleSendListProduct = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {



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

        default:
            break;
    }
}


// Handles messages events
async function handleMessage(sender_psid, received_message) {
    let response;

    // check message for with replies
    if (received_message.quick_reply && received_message.quick_reply.payload) {

        let tag = null;
        switch (received_message.quick_reply.payload) {
            case 'PRODUCT_LIST':
                await handleSendListProduct(sender_psid);
                tag = 'PRODUCT_LIST';
                break;

            case 'BEST_SELLER':
                await handleSendListProduct(sender_psid);
                tag = 'BEST_SELLER';
                break;

            case 'PRODUCT_NEW':
                await handleSendListProduct(sender_psid);
                tag = 'PRODUCT_NEW';
                break;

            case 'PAYMENT_METHOD':
                await handleSendPaymentMethod(sender_psid);
                tag = 'PAYMENT_METHOD';
                break;

            case 'POLICY':
                await handleSendPolicy(sender_psid);
                tag = 'POLICY';
                break;

            case 'INFOMATION':
                await handleSendInformation(sender_psid);
                tag = 'INFOMATION';
                break;

            default:
                break;
        }

        let quickReplyTemplate = getQuickReplyTemplate(tag);
        await common.callSendAPI(sender_psid, quickReplyTemplate);

        return;
    }

    // Check if the message contains text
    if (received_message.text) {

        let username = await common.getUserName(sender_psid);
        // Create the payload for a basic text message
        response = {
            "text": `Chào mừng ${username} đến với Mollie Shop. ${username} đợi một chút sẽ có cô bé dễ thương trả lời cho nhé. <3`
        }
    }

    // Sends the response message
    common.callSendAPI(sender_psid, response);
}

let handleSendSetList = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {

            // send generic message
            let template = getSetListTemplate();
            await common.callSendAPI(sender_psid, template);


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
            let template = getSetListTemplate(sender_psid);
            await common.callSendAPI(sender_psid, template);


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
            let template = getSetListTemplate(sender_psid);
            await common.callSendAPI(sender_psid, template);


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
            let template = getProductDetailTemplate();
            await common.callSendAPI(sender_psid, template);


            resolve('done');
        } catch (error) {
            reject(error)
        }
    })
}

let handleShowImage = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {

            let templateImage = getImageTemplate();
            let templateBtn = getButtonTemplate(sender_psid);

            await common.callSendAPI(sender_psid, templateImage);
            await common.callSendAPI(sender_psid, templateBtn);


            resolve('done');
        } catch (error) {
            reject(error)
        }
    })
}


let handleSendPolicy = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {

            // chinh sach mua hang
            await common.callSendAPI(sender_psid, template.templateBuyProductPolicy());

            // chinh sach doi tra
            await common.callSendAPI(sender_psid, template.templateReturnPolicy());

            resolve('done');
        } catch (error) {
            reject(error)
        }
    })
}

let handleSendPaymentMethod = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {

            await common.callSendAPI(sender_psid, template.templatePaymentMethod());

            resolve('done');
        } catch (error) {
            reject(error)
        }
    })
}

let handleSendInformation = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {

            // send information shop
            await common.callSendAPI(sender_psid, template.templateInfoShop());

            // send information product
            await common.callSendAPI(sender_psid, template.templateInfoProduct());

            // send generic message
            let response = getListProductTemplate(sender_psid);
            await common.callSendAPI(sender_psid, response);

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