var u = { name: "", surname:" " , age: "", tel: "", email:"", img: "img/user1.png" };

function goInit(){
   window.open('start.html') ;
   window.close();
}




//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
   document.getElementById("loginButton").addEventListener("click", function (){
   
    u.email = document.getElementById('inputEmail').value;
    localStorage.setItem("uInformation", JSON.stringify(u));

   
   
   });
});