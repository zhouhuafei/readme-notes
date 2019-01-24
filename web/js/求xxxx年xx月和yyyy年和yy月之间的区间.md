```
function getYMRegion(oldV = [2019, 3], newV = [2019, 6]) {
    const Y = newV[0] - oldV[0];
    const result = [];
    for (var i = 0; i <= Y; i++) {
        var arr = [];
        for (var j = 1; j <= 12; j++) {
            if (Y === 0) {
                if (j - oldV[1] >= 0 && j - newV[1] <= 0) {
                    arr.push([oldV[0], j]);
                }
            } else {
                if (i === 0 && j - oldV[1] >= 0 || i === Y && j - newV[1] <= 0 || i > 0 && i < Y) {
                    arr.push([oldV[0] + i, j]);
                }
            }
        }
        result.push(arr);
    }
    console.log(result);
}
```
