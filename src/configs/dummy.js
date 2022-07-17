const COFG = require('./conf.json');

const dummyProduct = [
    {
        "title": "Set Áo Trễ Vai Váy Dài Chữ A",
        "subtitle": "296.000đ",
        "image_url": "https://res.cloudinary.com/dvweth7yl/image/upload/v1656778684/product/z3533592465888_34e9848417e25ad68aea56a81c56d115.jpg",
        "buttons": [
            COFG.BUTTONS.SHOW_IMAGE
        ]
    }
]

const dummyBackToList = {
    "title": "Quay trở lại",
    "subtitle": "Quay trở lại danh sách sản phẩm",
    "image_url": "https://res.cloudinary.com/dvweth7yl/image/upload/v1656778684/product/z3533592465888_34e9848417e25ad68aea56a81c56d115.jpg",
    "buttons": [
        COFG.BUTTONS.BACK_TO_LIST
    ],
}



module.exports = {
    dummyProduct: dummyProduct,
    dummyBackToList: dummyBackToList
}