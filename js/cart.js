var productscar = [];
var totalcostlist = [];



function showUserCart(array){
    let htmlContentToAppend = "";

    htmlContentToAppend = `Carrito (`+ array.length +`)`;
    document.getElementById("productName").innerHTML = htmlContentToAppend;
    htmlContentToAppend = "";
    document.getElementById("listPCart").innerHTML = htmlContentToAppend;

  
    for(let i = 0; i < array.length; i++){
        let p = array[i];
        


        htmlContentToAppend += `
        <div  class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-2">
                <img src="` + p.src + `"  class="img-thumbnail"  width="80" height="80" >
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                     <b>`+ p.name +`</b> 
                    </div>
                    <p class="font-weight-light"  > `+ p.currency +` ` + p.unitCost + `</p>
                    `;
                    if("UYU" == p.currency){
                        htmlContentToAppend+=`<b class="text-right" id="money`+i+`">Total `+ p.currency +` ` + p.unitCost*p.count + `</b>`
                        totalcostlist[i]=p.unitCost*p.count;
                    } else{
                        htmlContentToAppend+=`<b class="text-right" id="money`+i+`">Total `+ p.currency +` ` + p.unitCost*p.count + `/ UYU `+ p.unitCost*p.count*40 + ` </b>`
                        totalcostlist[i]=p.unitCost*p.count*40;
                    }
        htmlContentToAppend +=` 
                </div>
                <div class=" col col-lg-2 ">
                    <button type="button" class="close text-right" aria-label="Close" onclick="takeAway(`+i+`)" >
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <input class="form-control" type="number" min="1" value="`+p.count+`" id="count`+i+`"  onchange="caculatorCostUnitary(`+i+`)">
                </div>

                  
            </div>
        </div>
        `;
        document.getElementById("listPCart").innerHTML = htmlContentToAppend;
        
    }
}

function caculatorCostUnitary(n){
    let a = 0;
    if(document.getElementById("count"+n+"").value >= 1) {
        a = document.getElementById("count"+n+"").value*productscar.articles[n].unitCost;
        showCostUnitary(n,a)
    }else{
        alert("La cantidad tiene que ser mayor a o igual 1!");
        document.getElementById("count"+n+"").value = 1;
        a = productscar.articles[n].unitCost;
        showCostUnitary(n,a)
    }
}
function showCostUnitary(n,a){
    let htmlContentToAppend = "";
    if ("UYU" == productscar.articles[n].currency){
        totalcostlist[n]=a;
        htmlContentToAppend += `
        Total `+ productscar.articles[n].currency +` ` + a + `
        `
    } else {
        totalcostlist[n]=a*40;
        htmlContentToAppend += `
        Total `+ productscar.articles[n].currency +` ` + a + ` / UYU `+ a*40 +`
        `
    }
    document.getElementById("money"+n+"").innerHTML = htmlContentToAppend;
    showSumaryCost()
}

function showSumaryCost(){
    let htmlContentToAppend = "";
    let subCost=0;
    let sendingCost = 0;
    for(let i = 0; i < totalcostlist.length; i++){
        subCost= subCost + totalcostlist[i];
    }

    sendingCost = Math.round(subCost*document.getElementById("inputSending").value);

    htmlContentToAppend=`
    Subtotal  `+subCost+`$ UYU
    `
    document.getElementById("subCost").innerHTML = htmlContentToAppend;

    let totalCost = subCost+sendingCost;
    htmlContentToAppend=`
    Costo Total  `+totalCost+`$ UYU
    `
    document.getElementById("finalCost").innerHTML = htmlContentToAppend;

    htmlContentToAppend=`
    Costo por Envio  `+sendingCost+`$ UYU
    `
    document.getElementById("sendCost").innerHTML = htmlContentToAppend;

}

function takeAway(i){
    productscar.articles.splice(i,1);
    totalcostlist.splice(i,1);
    showUserCart(productscar.articles);
    showSumaryCost()


}

function showModal(){
    var bk = document.getElementById('buyKind').value;

    if (bk == 1){  
        $('#creditModal').modal('show');
    } 
    if (bk == 2){ 
        $('#tranferModal').modal('show'); 
    }
}
function closeModal(){
    var bk = document.getElementById('buyKind').value;

    if (bk == 1){  
        $('#creditModal').modal('hide');
      
    } 
    if (bk == 2){ 
        $('#tranferModal').modal('hide'); 
        
    }
}

function selecNull(){
    document.getElementById("buyKind").value = "";
}


$("#prospects_form1").submit(function(e) {
    e.preventDefault();
});
$("#prospects_form2").submit(function(e) {
    e.preventDefault();
});

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData("https://japdevdep.github.io/ecommerce-api/cart/654.json").then(function(resultObj){
        if (resultObj.status === "ok"){
            productscar = resultObj.data; 
            showUserCart(productscar.articles); 
            showSumaryCost();
        }
    });

});