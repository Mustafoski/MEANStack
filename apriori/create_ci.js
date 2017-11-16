var find_subsets = require("./find_subsets.js").find_subsets;
var ci = [];

function create_ci(subset_size, unique_values, transactions){
    ci = [];
    //console.log(unique_values);
    var subsets = find_subsets(unique_values, subset_size);
    subsets.forEach(function(elem){
        var obj = {itemset:elem, support:find_supp(elem, transactions)};
        ci.push(obj);
    });
    return ci;
}

function find_supp(elem, transactions){
    var supp = 0;
    for(var i = 0; i<transactions.length;i++){
        var missing = false;
        for(var j = 0; j<elem.length;j++){
            var submissing = true;
            for(var k = 0; k<transactions[i].length;k++){
                if(elem[j]==transactions[i][k])
                    submissing = false;
            }
            if(submissing){
                missing = true;
                break;
            }
        }
        if(!missing){
            supp++;
        }
    }
    return supp;
}

module.exports = {create_ci};
