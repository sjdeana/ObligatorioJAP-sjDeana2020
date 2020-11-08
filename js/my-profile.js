


var u = { name: "", surname:"" , age: "", tel: "", email:"", img: "" };


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

    location.reload();
    return false;
}

function test() {
    var file = document.getElementById('file').files[0];
    var reader  = new FileReader();
    reader.onload = function(e)  {
        var image = document.getElementById("imgProfile");
        image.src = e.target.result;
        console.log(e.target.result )
        u.img = e.target.result;
        localStorage.setItem("uInformation", JSON.stringify(u));
       
     }
     reader.readAsDataURL(file);
     $('#imgModal').modal('hide');
     
     location.reload();
     return false;
}

function changeSexImg(s){
    if (s==="male"){
        u.img = "img/user1.png";
    } else {
        u.img = "img/user2.png";
        
    }
    localStorage.setItem("uInformation", JSON.stringify(u));
    location.reload();
    return false;
}

function showModal(){
    $('#imgModal').modal('show');
}

function hideModal(){
    $('#imgModal').modal('hide');
}

$('#file').on('change',function(){
    //get the file name
    var fileName = $(this).val();
    //replace the "Choose a file" label
    $(this).next('.custom-file-label').html(fileName);
})





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
        document.getElementById("imgProfile").src = u.img;
       

    }



});