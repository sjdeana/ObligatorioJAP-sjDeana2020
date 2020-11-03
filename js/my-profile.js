


var u = { name: "", surname:"" , age: 0, tel: "", email:""};
var userJS

function submitDate(){
    
    u.name = document.getElementById('nameId').value; 
    u.surname = document.getElementById('surnameId').value;
    u.age = document.getElementById('ageId').value;
    u.tel = document.getElementById('telId').value;
    u.email = document.getElementById('emailId').value;
    console.log(u);
    localStorage.setItem("uInformation", JSON.stringify(u));
    prueba = JSON.parse(localStorage.getItem("uInformation"));
    console.log(prueba);
  
    return false;
}




//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    
    if( localStorage.getItem("uInformation") != null  ){
        u = JSON.parse(localStorage.getItem("uInformation"));
        document.getElementById('nameId').value = u.name;
        document.getElementById('surnameId').value = u.surname;
        document.getElementById('ageId').value = u.age;
        document.getElementById('telId').value = u.tel;
        document.getElementById('emailId').value = u.email;
    }

});