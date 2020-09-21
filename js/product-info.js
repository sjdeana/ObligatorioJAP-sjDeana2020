var productsInfoArray = [];
var commentsArray =[];
var products =[];


//////////////////////////////////////////////////////////////////////////////////////////////////////////
function showInfoProduct () {
    let htmlContentToAppend = "";
    htmlContentToAppend +=`
    <h3 id="productName"> `+productsInfoArray.name+`</h3>
      <hr class="my-3">
      <dl>
         <dt>Precio</dt>
        <dd>
          <p id="productCost"> `+ productsInfoArray.currency +` `+ productsInfoArray.cost +` </p>
        </dd>

        <dt>Descripción</dt>
        <dd>
          <p id="productDescription">`+ productsInfoArray.description +`</p>
        </dd>

        <dt>Categoria</dt>
        <dd>
          <a href="Category-info.html" id="productCategory">`+productsInfoArray.category+`</a>
        </dd>

        <dt>Cantidad de Vendidos</dt>
        <dd>
          <p id="productCriteria">`+ productsInfoArray.soldCount +` </p>
        </dd>
        

        <dt>Imágenes ilustrativas</dt>
        <dd>
          <div class="row text-center text-lg-left pt-2" id="productImagesGallery">
          </div>
        </dd>
      </dl>
    `
    document.getElementById("info-products").innerHTML = htmlContentToAppend;
    showImagesGallery(productsInfoArray.images);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////
function showProductsRelated (){
  let htmlContentToAppend = "";
  let k=0;

    for(let i = 0; i < products.length && k < productsInfoArray.relatedProducts.length ; i++){
      let relatedProducts = products[i];
        if ( i == productsInfoArray.relatedProducts[k] ){

        htmlContentToAppend += `
        <div class="col-md-4">
          <a href="products.html" class="card mb-4 shadow-sm custom-card">
            <img class="bd-placeholder-img card-img-top"  src="`+relatedProducts.imgSrc+`">
            <h3 class="m-3">`+ relatedProducts.name +`</h3>
          </a>
        </div>
        `
        document.getElementById("relatedProducsId").innerHTML = htmlContentToAppend;
        k++;
        }
    }
   
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////
function showImagesGallery(array){

    let htmlContentToAppend = "";


    htmlContentToAppend = `
        <div class="carousel-item active">
        <img src="`+ array[0] +`" class="img-fluid img-thumbnail d-block w-100" >
        </div>
        `;

    for(let i = 1; i < array.length; i++){
        let imageSrc = array[i];
        


        htmlContentToAppend += `
        <div class="carousel-item">
        <img src="`+ imageSrc +`" class="img-fluid img-thumbnail d-block w-100" >
        </div>
        `
        
       
    }
    document.getElementById("carruselImg").innerHTML = htmlContentToAppend;

}

//////////////////////////////////////////////////////////////////////////////////////////////////////////
function showComments (array){

  let htmlContentToAppend = "";
  
    for(let i = 0; i < array.length; i++){
        let commenter = array[i];
        
        let startContent = "";
        for(let i= 1; i<=5; i++ ){
          if ( i<= commenter.score){
          startContent+=`
          <span class="fa fa-star checked"></span>
          `
          } else {
          startContent+=`
          <span class="fa fa-star"></span>
          `
          }
        } 

        htmlContentToAppend += `
        <dl>
          <dd> <b>`+ commenter.user+`</b> <em class="text-muted">`+ commenter.dateTime+` </em> `+startContent+`</dd>
            <dd>
              <p> `+ commenter.description +` </p>
              <hr class="my-3">
            </dd>
        </dl>    
        `
        document.getElementById("listComments").innerHTML = htmlContentToAppend;
        
    }
   
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////
function addComment(){

  let h1 = document.getElementById("radio5").checked;
  let h2 = document.getElementById("radio4").checked;
  let h3 = document.getElementById("radio3").checked;
  let h4 = document.getElementById("radio2").checked;
  let h5 = document.getElementById("radio1").checked;
  let textcomment= document.getElementById("realcomment").value; 
  let h = [false,h1,h2,h3,h4,h5]
  let k = 1;
  for(i=0; i<= 5; i++){
    if(h[i]){
      k=i;
    }
  }
 var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  let newComment = {
    dateTime: date +" "+time,
    description: textcomment,
    score: k,
    user: localStorage.getItem('user'),
  }
  console.log(newComment);
  commentsArray.push(newComment);
  showComments(commentsArray);

}
//////////////////////////////////////////////////////////////////////////////////////////////////////////





//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            productsInfoArray = resultObj.data;  
            showInfoProduct();     
        }
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
      if (resultObj.status === "ok"){
          commentsArray = resultObj.data;  
          showComments(commentsArray);     
      }
  });
  getJSONData(PRODUCTS_URL).then(function(resultObj){
    if (resultObj.status === "ok"){
        products = resultObj.data;  
        showProductsRelated();
           
    }
});



});