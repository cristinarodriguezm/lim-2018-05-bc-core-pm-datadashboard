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
               
               /* ----------------> USANDO ForEACH <----------
               let html = "";
                data.forEach(function(names){
                    html +=`
                    <li>${names.name}</li>`;
                })
             listStudents.innerHTML = html;*/
            /*-------------------->USANDO for <-----------
             for(let i=0; i<data.length; i++){
                    let students = document.createElement("li");
                    students.innerHTML = data[i].name + " ";
                    listStudents.appendChild(students);
                }*/
                //document.write("1. "+ data[0].name + " ");
                //document.write("2. "+data[1].name);
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
       /*------------->FOREACH
        promo.forEach(function(names){
            cohortname +=`
            <option>${names.id}</option>`;
        })*/
        menu.innerHTML = cohortname;
        /*for (let i = 0; i<promo.length; i++ ){
            const options = document.createElement("option");
            const containOp = document.createTextNode(promo[i].id);
            options.appendChild(containOp);
            console.log(promo[i].id);
            menu.appendChild(options);

        }*/
        });
function busProg(progre) { 
    let num = 0;        
  fetch (progressJson)
        .then(function(progress){
        return progress.json();
        })
        .then(function(progress){
        
            //Object.keys(progress["00hJv4mzvqM3D9kBy3dfxoJyFV82"])
             //  console.log(progress["00hJv4mzvqM3D9kBy3dfxoJyFV82"].intro);
            //let daata = Object.keys(progress);
            //num++;
            //console.log(progress[daata[num]].intro.totalDuration);
            let daata = Object.keys(progress);
            daata.forEach(function(keys){
                //console.log(keys);
                //console.log(daata[num]);
                if(progre === daata[num]){
                    //console.log(progress[daata[num]].intro.totalDuration);
                    return daata[num];
                }
                num++;
            //let datta = Object.keys(progress);
            //console.log(progress[datta[num]].intro.totalDuration);
            
            }
            ) 
            
        }
        
    );
};