function inTemp(temp, subelem) {
    if(temp.length>0){
        for(var i = 0; i<temp.length; i++){
            if(temp[i]==subelem)
                return true;
        }
    }
    return false;
}

function unique_values(x){
    var temp = [];
    x.forEach(function (elem) {
        elem.forEach(function (subelem) {
            if(!inTemp(temp, subelem))
                temp.push(subelem);
        })
    });
    return temp;
}

function unique_values2(x){
    var temp = [];
    x.forEach(function (elem) {
        temp.push(elem.itemset);
    });
    return unique_values(temp);
}

module.exports = {unique_values, unique_values2};

