const ORDER_ASC_BY_PRIECE = "$up";
const ORDER_DESC_BY_PRIECE= "$down";
const ORDER_BY_PROD_REL = "Rel.";
const serchBar =document.getElementById('serchWord')
var currentProductsArray = [];
var auxProducts = [];
var auxProductsName = [] ;
var currentSortCriteria = undefined;
var minCost = undefined;
var maxCost = undefined;



function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_PRIECE)
    {
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.coat < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_PRIECE){
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_REL){
        result = array.sort(function(a, b) {
            if ( a.soldCount > b.soldCount ){ return -1; }
            if ( a.soldCount < b.soldCount ){ return 1; }
            return 0;
        });
    }

    return result;
}


function findProducts(){
    
    var productsName = [] ;
    var filteredProducts=[];
    var auxProducts = [];

    
    
    for(let i = 0; i < currentProductsArray.length; i++){
        productsName[i] =currentProductsArray[i].name;
    }
    console.log('estoy')

    
    keyword = serchBar.value.toLowerCase();
    filteredProductsName = productsName.filter(function(productsName){
        productsName = productsName.toLowerCase();
       return productsName.indexOf(keyword) > -1; 
    });

    for(let i = 0; i < currentProductsArray.length; i++){
        var j = 0;
        if( filteredProductsName[j]==currentProductsArray[i].name ){
            filteredProducts[j] = currentProductsArray[i];
            j++;
        }
    }

    if (serchBar == undefined){
        currentProductsArray = auxProducts;
    } 

    currentProductsArray = filteredProducts ;

    showPoductsList();   

}

function showPoductsList(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentProductsArray.length; i++){
        let category = currentProductsArray[i];

        if (((minCost == undefined) || (minCost != undefined && category.cost >= minCost)) &&
            ((maxCost == undefined) || (maxCost != undefined && category.cost <= maxCost))){

            htmlContentToAppend += `
            <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + category.imgSrc + `" alt="` + category.desc + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ category.name +` - USD `+ category.cost +`</h4>
                        <small class="text-muted">` + category.soldCount + ` Vendidos</small> 
                    
                        
                    </div>
                    <p class="text-muted"> ` + category.description + `</p>
                </div>
            </div>
        </div>
            `
        }

        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }
}

function sortAndShowProducts(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;

    if(productsArray != undefined){
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    //Muestro las categorías ordenadas
    showPoductsList();
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
   
    getJSONData(CATEGORY_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            category = resultObj.data;

            let categoryNameHTML  = document.getElementById("categoryName");
            
        
            categoryNameHTML.innerHTML = category.name;
            
        
        }
    });
    
   
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndShowProducts(ORDER_ASC_BY_PRIECE, resultObj.data);
            
            for(let i = 0; i < currentProductsArray.length; i++){
                auxProductsName[i] =currentProductsArray[i].name;
            }
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_PRIECE);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_PRIECE);
    });

    document.getElementById("sortByRel").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_PROD_REL);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterPriceMin").value = "";
        document.getElementById("rangeFilterPriceMax").value = "";

        minCost = undefined;
        maxCost = undefined;

        showPoductsList();
    });

    document.getElementById("rangeFilterPrice").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCost = document.getElementById("rangeFilterPriceMin").value;
        maxCost = document.getElementById("rangeFilterPriceMax").value;

        if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0){
            minCost = parseInt(minCost);
        }
        else{
            minCost = undefined;
        }

        if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0){
            maxCost = parseInt(maxCost);
        }
        else{
            maxCost = undefined;
        }

        showPoductsList();
    });

    input.addEventListener('keyup', findProducts());

    
    
   
});