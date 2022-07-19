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

const templatePaymentMethod = () => {
    return {
        text: ` -- PHƯƠNG THỨC THANH TOÁN --
        \n Chuyển khoản ngân hàng:
        \n    *Ngân hàng: Sacombank
        \n    *STK: 060266421225
        \n    *Tên: NGUYEN THI NHAT TRINH
        \n
        \n    *Ngân hàng: Techcombank
        \n    *STK: 19036205125014
        \n    *Tên: NGUYEN MINH TRI
        \n -Nội dung chuyển khoản-
        \n Họ tên - Số điện thoại
        \n (Vui lòng chụp màn hình lại và gửi shop để xác nhận thanh toán nhé.)
        \n
        \n COD: Ship toàn quốc
        \n   *Miễn ship nội thành (TP.HCM)
        \n   *Ngoại thành phí ship là 30.000đ
        `
    }
}

const templateBuyProductPolicy = () => {
    return {
        text: ` -- CHÍNH SÁCH MUA HÀNG --
        \n - Miễn ship từ 2 sản phẩm trở lên
        \n - Giảm 5-10% khi mua từ 3 sản phẩm trở lên
        \n - Giảm 15-20% khi mua từ 5 sản phẩm trở lên và trở thành khách hàng thân thiết của Mollie 
        `
    };
}

const templateReturnPolicy = () => {
    return {
        text: ` -- CHÍNH SÁCH ĐỔI TRẢ --
        \n - Trả hàng khi shop giao nhầm size hoặc không đúng mẫu (shop trả phí)
        \n - Đổi trả sản phẩm khi sản phẩm khi bị lỗi (shop trả phí)
        \n (Chỉ xử lý 2 trường hợp trên khi có quay video khui hàng để tránh trường hợp không phải lỗi của shop - trả hàng từ 2-3 ngày sau khi nhận hàng)
        `
    }
};

module.exports = {
    templateInfoShop: templateInfoShop,
    templateInfoProduct: templateInfoProduct,
    templatePaymentMethod: templatePaymentMethod,
    templateBuyProductPolicy: templateBuyProductPolicy,
    templateReturnPolicy: templateReturnPolicy
}