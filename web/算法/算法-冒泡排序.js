// 冒泡算法核心思想：让第i个和第i个之后的每一个都进行一次比对。即：第0个和第0个之后的每一个比对，然后让第1个和第1个之后的每一个进行比对，依次类推。
const arr = [7, 8, 7, 9, 10, 2, 4, 3, 6, 7, 1, 5];

function sort(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] > arr[j]) {
                const temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}

console.log('冒泡排序的结果：', sort(arr));
