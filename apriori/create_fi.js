var fi = [];

function create_fi(ci, support_count){
    fi = [];
    if(ci.length<1){
        return fi;
    }else{
        ci.forEach(function (elem) {
           if(elem.support >=support_count)
               fi.push(elem);
        });
        return fi;
    }
}

module.exports = {create_fi};