// 拆订单，使用优惠金额把账做平
const data = {
    discountPrice: '198.85', // 主订单优惠金额
    payPrice: '0.03', // 主订单实付金额
    freight: null, // 主订单运费
    totalPrice: null, // 主订单总价
    item: [
        {
            price: '99.92', // 子订单商品价格
            freight: '0.02', // 子订单运费
            payPrice: null, // 子订单实付金额
            discountPrice: null, // 子订单优惠金额
        },
        {
            price: '0.01', // 子订单商品价格
            freight: '0.00', // // 子订单运费
            payPrice: null, // 子订单实付金额
            discountPrice: null, //子订单优惠金额
        },
    ],
};

// 拆单业务逻辑
function dismantleOrder(data) {
    data.item.forEach(function (value) {

    });
}

console.log(dismantleOrder());
