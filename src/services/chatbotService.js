require('dotenv').config();
const common = require('../script/common');

const IMAGES = [
    'https://res.cloudinary.com/dvweth7yl/image/upload/v1656778684/product/z3533592465888_34e9848417e25ad68aea56a81c56d115.jpg',
]

let getStartedTemplate = () => {
    let res = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    {
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
                    }
                ]
            }
        }
    }

    // return common.getTemplate("generic", elements);

    return res;
}


let getListProductTemplate = (sender_psid) => {
    let elements = [
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
    ];

    return common.getTemplate("generic", elements);
}


let getSetListTemplate = () => {

    let elements = [
        {
            "title": "Set Áo Trễ Vai Váy Dài Chữ A",
            "subtitle": "Set Áo Trễ Vai Váy Dài Chữ A là một trong những sản phẩm nổi bật của Shop",
            "image_url": IMAGES[0],
            "buttons": [
                {
                    "type": "postback",
                    "title": "Chi Tiết",
                    "payload": "PRODUCT_DETAIL",
                }
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
    ];


    return common.getTemplate("generic", elements);
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
    ];

    return common.getTemplate("generic", elements);
}


let getBotMediaTemplate = () => {
    let elements = [
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
    ];

    return common.getTemplate('media', elements);
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

            await common.callSendAPI(sender_psid, responseImage);
            await common.callSendAPI(sender_psid, responseBtn);


            resolve('done');
        } catch (error) {
            reject(error)
        }
    })
}


// let handleGuideToUseBot = (sender_psid) => {
//     return new Promise(async (resolve, reject) => {
//         try {

//             let username = await common.getUserName(sender_psid);
//             let responseText = {
//                 text: `Xin chào bạn ${username}, mình là chat bot Mollie. \n Để biết cách sử dụng, bạn vui lòng xem hết video bên dưới nhé 😉`
//             };

//             let responseMediaTemplate = getBotMediaTemplate();

//             await common.callSendAPI(sender_psid, responseText);
//             await common.callSendAPI(sender_psid, responseMediaTemplate);

//             resolve('done');
//         } catch (error) {
//             reject(error)
//         }
//     })
// }


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