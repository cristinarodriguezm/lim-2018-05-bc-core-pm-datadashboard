//variables de los datos que vienen del json
const usersJson = "../data/cohorts/lim-2018-03-pre-core-pw/users.json";
const cohortsJson = "../data/cohorts.json";
const progressJson = "../data/cohorts/lim-2018-03-pre-core-pw/progress.json";
//Muestra las estudiantes solo nombres
const listStudents = document.querySelector("tbody");
const menu = document.getElementById("listCo");

//Muestra a las alumnas
const butOfList = document.querySelector('button');
//butOfList.addEventListener("click", girls);



//Despliega los cohorts en el menu desplegable -
fetch (cohortsJson)
        .then(function(cohorts){
        return cohorts.json();
        })
        .then(function(list){
        //console.log(list);   //muestra 1 array con 51 objetos = cohorts
        const promo = list;
        //console.log(promo.length); //muestra 51 = numero de objetos =cohorts
        let cohortname = "";
        nameOfCohorts = promo.filter(function(names){
            if(names.id.substring(0,3)=== "lim"){
                cohortname += `
                <option>${names.id}</option>`;
            }
        })
       menu.innerHTML = cohortname;
        
        });

function girls() {
     if (menu.value ==="lim-2018-03-pre-core-pw"){
        // fetch(usersJson)
        //     .then(function(response){
        //         return response.json(); //conexion con el json
        //                                         //y como queremos q lo traiga json
        //         })
        //         .then(function(data){ //aqui ya tenemos los datos,
                let html = "";
                nameOfStudents = users.filter(function(names){
                if( names.signupCohort === "lim-2018-03-pre-core-pw" && names.role === "student"){
                html +=`                        
                <tr><td>${names.name}</td></tr>`;
                     }
                
                })
                
                listStudents.innerHTML = html;
                }}//);       
               // }}        
          
// fetch (progressJson)
//         .then(function(progress){
//         return progress.json();
//         })
//         .then(function(progress){
//             progresoG = progress
        
//             //Object.keys(progress["00hJv4mzvqM3D9kBy3dfxoJyFV82"])
//              //  console.log(progress["00hJv4mzvqM3D9kBy3dfxoJyFV82"].intro);
//             //let daata = Object.keys(progress);
//         //num++;
//             //console.log(progress[daata[num]].intro.totalDuration);
//             let daata = Object.keys(progress);
//             daata.forEach(function(keys){
//                // console.log(keys);
//                 //console.log(daata[num]);
//                 //if(progre === daata[num]){
//                     //console.log(progress[daata[num]].intro.totalDuration);
//                    // return daata[num];
//                // }
//                // num++;
//             //let datta = Object.keys(progress);
//             //console.log(progress[datta[num]].intro.totalDuration);
            
//             }
//             ) 
            
//         }
        
//     );

//Anidando los 3 fetch
const getDataR = (callback) => {
        fetch(usersJson)
          .then((responseUse) => {
            fetch(progressJson)
              .then((responsePro) => {
                fetch(cohortsJson)
                    .then((responseCoh) => { 
                // responseU.json().then(users => {
                //   responseP.json().then(progress => {
                //     responseC.json().then(cohorts => {
                //       callback && callback(users, progress, cohorts);
                //     })
                //   })
                // })
                Promise.all([responseUse.json(),responsePro.json(), responseCoh]).then(dataArr => {
                  [window.users, window.progress, window.cohorts] = dataArr;
                  // const users = dataArr[0]
                  // const progress = dataArr[1]
                  // const cohorts = dataArr[2]
                  callback && callback(users, progress,cohorts);
                })
                })
              })
          })
      }
  
  
const callbackGetData = (users, progress, cohorts) => {
    console.log('BEGIN');
    console.log(users, progress, cohorts);
    console.log('END');

    users.forEach((user)=>{
        const userId = user.id;
        const userProgress = progress[userId];
        console.log(userProgress);
    })
  }
  
getDataR(callbackGetData)

  //alineando users y sus progress
