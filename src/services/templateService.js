const templateInfoShop = () => {
    return {
        text: ` -- SHOP --
        \n - Giờ mở cửa: Từ 8:00 - 20:00. Tất cả các ngày trong tuần
        \n - Hotline: 0869.881.504
        \n - Địa chỉ: Phạm Thế Hiển, P4. Q8. TP.HCM
        \n - Shopee: https://shopee.vn/mollieshop2501
        `
    };
}

const templateInfoProduct = () => {
    return {
        text: ` -- SẢN PHẨM --
        \n - Chuyên sỉ, lẻ các mặt hàng thiết kế, hàng Quảng Châu, hàng VNXK
        \n - Cam kết chất lượng đúng như mô tả
        \n - Size chung < 58kg
        `
    };
}

module.exports = {
    templateInfoShop: templateInfoShop,
    templateInfoProduct: templateInfoProduct
}