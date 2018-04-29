// 拆订单，使用优惠金额把账做平
const order = {
    id: '0', // 主订单号
    totalPrice: '199.86', // 主订单总价
    freight: '0.02', // 主订单运费
    payPrice: '0.03', // 主订单实付金额
    coupon: '199.85', // 主订单优惠券
    fullReduction: '0.00', // 主订单满减
    goods: [ // 商品
        {
            supplier: { // 供应商
                id: '0', // 供应商id
            },
            price: '99.92', // 价格
            freight: '0.02', // 运费
        },
        {
            supplier: { // 供应商
                id: '1', // 供应商id
            },
            price: '0.01', // 价格
            freight: '0.00', // 运费
        },
    ],
};

// 期望结果
const result = [
    {
        id: '0-0', // 子订单号
        totalPrice: '199.86', // 子订单总价
        freight: '0.02', // 子订单运费
        payPrice: '0.03', // 子订单实付金额
        coupon: '199.84', // 子订单优惠券
        fullReduction: '0.00', // 子订单满减
        goods: [
            {
                supplier: { // 供应商
                    id: '0', // 供应商id
                },
                price: '99.92', // 价格
                freight: '0.02', // 运费
            },
        ],
    },
    {
        id: '0-1', // 子订单号
        totalPrice: '0.01', // 子订单总价
        freight: '0.00', // 子订单运费
        payPrice: '0.00', // 子订单实付金额
        coupon: '0.01', // 子订单优惠券
        fullReduction: '0.00', // 子订单满减
        goods: [
            {
                supplier: { // 供应商
                    id: '1', // 供应商id
                },
                price: '0.01', // 价格
                freight: '0.00', // 运费
            },
        ],
    },
];


// 拆单业务逻辑
function dismantleOrder(data) {
    data.item.forEach(function (value) {

    });
}

console.log(dismantleOrder(order));
