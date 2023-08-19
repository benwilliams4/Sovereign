var MathTools = {};

MathTools.addCommas = function (x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
MathTools.removeCommas = function (x) {
    return x.replaceAll(",", "");
}

MathTools.numberToCurrency = function (x, params = {}) {

    // Define default parameters
    var defaultParams = {
        "signPositives": false,
        "removeRedundantDecimal": false,
        "addThousandSeparator": true
    };

    //Set parameters to default unless passed
    for(let p in defaultParams){
        if(params.hasOwnProperty(p) === false){
            parms[p] = defaultParams[p];
        }
    }

    var positive = (x > 0);
    x = x.toFixed(2);
    x = x.toString();

    if (params.addThousandSeparator) {
        x = this.addCommas(x);
    }

    if (params.signPositives) {
        x = (positive) ? "+ " + x : x;
    }

    if (params.removeRedundantDecimal) {
        x = x.replace(".00", "");
    }

    return x;
}

MathTools.currencyToNumber = function (x) {
    x = x.replace("+ ", "");
    x = this.removeCommas(x);
    x = Number(x);
    return x;
}

export default MathTools;
