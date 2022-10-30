const getSelectionInfo = (x, n = null) => {
    let res = new Map();
    let nSum = 0;
    if (n) {
        for (i = 0, count = 0; i < x.length; i++) {
            res.set(x[i], n[i]);
            nSum += n[i];
        }
    } else {
        Array.from(new Set(x)).sort().forEach(item => {
            for (i = 0, count = 0; i < x.length; i++) {
                if (x[i] == item) count++;
            }
            res.set(item, count);
            nSum += count;
        });
    }
    return [res, nSum];
};

const getXiNiComposition = selectionInfo => {
    let res = [];
    for (item of selectionInfo) {
        res.push(item[0] * item[1]);
    }
    return res;
};

const getMiddle = (xArr, n) => xArr.map(i => x += i, x = 0).reverse()[0] / n;

const getDifferenceX = (selection, xMiddle) => {
    res = [];
    for (item of selection) {
        res.push(item[0] - xMiddle);
    }
    return res;
};

const getDifferenceXInSquare = differenceArr => {
    res = [];
    for (item of differenceArr) {
        res.push(Math.pow(item, 2));
    }
    return res;
};

const getCompositionSquareAndNi = (selection, squareArr) => {
    let res = [],
        i = 0;
    for (item of selection) {
        res.push(item[1] * squareArr[i]);
        i++;
    }
    return res;
};

const main = (xArr, nArr) => {
    let [selection, nSum] = getSelectionInfo(xArr, nArr);
    let xiniCompos = getXiNiComposition(selection);
    let xMiddle = getMiddle(xiniCompos, nSum);
    let differArr = getDifferenceX(selection, xMiddle);
    let differInSquare = getDifferenceXInSquare(differArr);
    let ComposNiAndSquare = getCompositionSquareAndNi(selection, differInSquare);
    let dispersion = getMiddle(ComposNiAndSquare, nSum);

    return [selection, nSum, xiniCompos, xMiddle, differArr, differInSquare, ComposNiAndSquare, dispersion];
};

$(".calc").on("click", () => {
    let xArr = Array.from($("#selection").val().replaceAll(" ", "").split(",").map(Number));
    let nArr = Array.from($("#n").val().replaceAll(" ", "").split(",").map(Number));
    let i = 0;

    nArr = nArr.length == xArr.length ? nArr : null;

    let [selection, nSum, xiniCompos, xMiddle, differArr, 
        differInSquare, ComposNiAndSquare, dispersion] = main(xArr, nArr);
    
    for (item of selection) {
        $(".res").append(`<tr><th>${item[0]}</th><th>${item[1]}</th><th>${parseFloat(xiniCompos[i]).toFixed(3)}</th><th>${parseFloat(differArr[i]).toFixed(3)}</th><th>${parseFloat(differInSquare[i]).toFixed(3)}</th><th>${parseFloat(ComposNiAndSquare[i]).toFixed(3)}</th></tr>`);
        i++;
    }
    $(".res").append(`<tr><th></th><th>${parseFloat(nSum).toFixed(3)}</th><th>${parseFloat(xMiddle).toFixed(3)}</th><th></th><th></th><th>${parseFloat(dispersion).toFixed(3)}</th></tr>`);
    $(".res").append("<tr colspan='6'><td></td><td></td><td></td><td></td><td></td><td></td></tr>");
    
});

