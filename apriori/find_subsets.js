var unique;
var temp;
var subset;
var items_to_be_added;

function cpy_array(x){
    var new_temp_array = [];
    x.forEach(function (elem) {
        new_temp_array.push(elem);
    });
    return new_temp_array;
}

function add (start){
    var num_of_itterations = unique.length - start - items_to_be_added;
    while(num_of_itterations>0){
        if(items_to_be_added==1){
            temp.push(unique[++start]);
            subset.push(cpy_array(temp));
            temp.pop();
        }
        else{
            items_to_be_added--;
            temp.push(unique[++start]);
            add(start);
            temp.pop();
            items_to_be_added++;
        }
        num_of_itterations--;
    }
}

function find_subsets(uniq, subset_size){
    subset = [], temp= [];
    items_to_be_added = subset_size;
    unique = uniq;
    add(-1);
    return subset;
}

module.exports = { find_subsets };