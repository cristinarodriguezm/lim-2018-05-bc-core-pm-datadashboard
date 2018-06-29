//variables de los datos que vienen del json
const usersJson = "../data/cohorts/lim-2018-03-pre-core-pw/users.json";
const cohortsJson = "../data/cohorts.json";
const progressJson = "../data/cohorts/lim-2018-03-pre-core-pw/progress.json";
//Muestra las estudiantes solo nombres
const listStudents = document.querySelector("tbody");
const menu = document.getElementById("listCo");

//Muestra a las alumnas
const butOfList = document.querySelector('button');
butOfList.addEventListener("click", girls);

function girls() {
    if (menu.value ==="lim-2018-03-pre-core-pw"){
        fetch(usersJson)
            .then(function(response){
                return response.json(); //conexion con el json
                                        //y como queremos q lo traiga json
            })
            .then(function(data){ //aqui ya tenemos los datos,
                let html = "";
                let progre = "";
                nameOfStudents = data.filter(function(names){
                    if( names.signupCohort === "lim-2018-03-pre-core-pw" && names.role === "student"){
                       progre = busProg(names.id);
                       console.log(progre);
                        html +=`                        
                        <tr><td>${names.name}</td></tr>`;
                    }
                })
                listStudents.innerHTML = html;
               
                           });       
                }}



//Despliega los cohorts en el menu desplegable -
fetch (cohortsJson)
        .then(function(cohorts){
        return cohorts.json();
        })
        .then(function(list){
        console.log(list);   //muestra 1 array con 51 objetos = cohorts
        const promo = list;
        console.log(promo.length); //muestra 51 = numero de objetos =cohorts
        let cohortname = "";
        nameOfCohorts = promo.filter(function(names){
            if(names.id.substring(0,3)=== "lim"){
                cohortname += `
                <option>${names.id}</option>`;
            }
        })
      
        menu.innerHTML = cohortname;
        
        });
function busProg(progre) { 
    let num = 0;        
  fetch (progressJson)
        .then(function(progress){
        return progress.json();
        })
        .then(function(progress){
        
            let daata = Object.keys(progress);
            daata.forEach(function(keys){
            
            }
            ) 
            
        }
        
    );
};