let title = document.getElementById('title');
let price = document.getElementById('price');
let texes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let catogray = document.getElementById('catogray');
let create = document.getElementById('create');
let search = document.getElementById('search');
let tbody = document.getElementById('tbody');
let btn = document.getElementById('DelAll');
let mood = 'create';
let tmp;

// #1 get total
function getTotal() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value)
            - discount.value;
        total.innerHTML = result;
        total.style.background = '#05fd9e'
    }
    else {
        total.innerHTML = '';
        total.style.background = '#ffff00';
    }
}
// #2 create proudct
let arrayPro;
if (localStorage.array != null) {

    arrayPro = JSON.parse(localStorage.array);

} else {
    arrayPro = [];
}
// function onclick create product new
create.onclick = function () {
    //  object input value input    
    let newpro = {
        title: title.value,
        price: price.value,
        texes: texes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        catogray: catogray.value,
    }
    if(title.value != '' &&
    price.value != '' &&
    catogray.value != ''&&
    count.value < 100){
            if (mood === 'create') {
            if (newpro.count > 1) {
                for (let i = 0; i < newpro.count; i++) {
                    arrayPro.push(newpro);
                }
            }
            else {
                arrayPro.push(newpro);

            }
            } else {
                arrayPro[tmp] = newpro;
                count.style.display = 'block';
                create.innerHTML = 'create';
                total.style.background = '#ffff00';
                mood = 'create';
            }
     clrInp();

    }
    
    localStorage.array = JSON.stringify(arrayPro);
    GetRead();
    // array save in data


}

// #3 clear inputs
function clrInp() {
    title.value = '';
    price.value = '';
    texes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    catogray.value = '';

}
// #4 read
function GetRead() {
    let table = '';
    for (let i = 0; i < arrayPro.length; i++) {
        table += `
        <tr>
        <td>${[i+1]}</td>
        <td>${arrayPro[i].title}</td>
        <td>${arrayPro[i].price}</td>
        <td>${arrayPro[i].texes}</td>
        <td>${arrayPro[i].ads}</td>
        <td>${arrayPro[i].discount}</td>
        <td>${arrayPro[i].total}</td>
        <td>${arrayPro[i].catogray}</td>
        <td><button onclick="Updata(${[i]})" id="updata">updata</button></td>
        <td><button onclick="Del(${[i]})" id="delete">delete</button></td>
        </tr>
        `
    }
    if (arrayPro.length > 0) {
        btn.style.display = 'block';
    } else {
        btn.style.display = 'none';
    }
    tbody.innerHTML = table;
    btn.innerHTML = (`delete all (${arrayPro.length})`)

}
GetRead();
// #5 delete
function Del(i) {
    arrayPro.splice(i, 1);
    localStorage.array = JSON.stringify(arrayPro);
    GetRead();
}
// delete All
btn.onclick = function () {
    localStorage.clear();
    arrayPro.splice(0);
    GetRead();
    
}
// onclick remove data hide btn
// #6 count
// #7 updata
// 1 onclick updata show data
function Updata(i) {
    title.value = arrayPro[i].title;
    price.value = arrayPro[i].price;
    texes.value = arrayPro[i].texes;
    ads.value = arrayPro[i].ads;
    discount.value = arrayPro[i].discount;
    getTotal();
    catogray.value = arrayPro[i].catogray;
    count.style.display = 'none';
    create.innerHTML = 'Updata';
    tmp = i;
    mood = 'updata';
}
// #9 search
// focus onclick button
let searchMood = 'searchTitle';
function ClickBtnSearch(id)
{
    if(id == 'searchTitle'){
        searchMood = 'searchTitle';
        search.placeholder = 'title';
    }
    else{
        searchMood = 'searchcatogray';
        search.placeholder = 'catogray';
    }
    search.focus();
    search.value = '';
    GetRead();
}
// search title & catogray
function searchInp(value)
{
    let table = '';
    if(searchMood == 'searchTitle')
    {
        for(let i = 0;i < arrayPro.length;i++){
            if(arrayPro[i].title.includes(value)){
                table += `
                <tr>
                <td>${[i]}</td>
                <td>${arrayPro[i].title}</td>
                <td>${arrayPro[i].price}</td>
                <td>${arrayPro[i].texes}</td>
                <td>${arrayPro[i].ads}</td>
                <td>${arrayPro[i].discount}</td>
                <td>${arrayPro[i].total}</td>
                <td>${arrayPro[i].catogray}</td>
                <td><button onclick="Updata(${[i]})" id="updata">updata</button></td>
                <td><button onclick="Del(${[i]})" id="delete">delete</button></td>
                </tr>
                `
            }
        }
    }
    else
    {
        for(let i = 0;i < arrayPro.length;i++){
            if(arrayPro[i].catogray.includes(value)){
                table += `
                <tr>
                <td>${[i]}</td>
                <td>${arrayPro[i].title}</td>
                <td>${arrayPro[i].price}</td>
                <td>${arrayPro[i].texes}</td>
                <td>${arrayPro[i].ads}</td>
                <td>${arrayPro[i].discount}</td>
                <td>${arrayPro[i].total}</td>
                <td>${arrayPro[i].catogray}</td>
                <td><button onclick="Updata(${[i]})" id="updata">updata</button></td>
                <td><button onclick="Del(${[i]})" id="delete">delete</button></td>
                </tr>
                `
            }
        }
    }
    tbody.innerHTML = table;
}