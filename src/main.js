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
    const promo = list;
    
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
           if(progre === daata[num]){
             return daata[num];
        }
        num++;
      
      }
      ) 
      
    }
    
  );
};

const getData = (callback) => {
  fetch(usersJson)
    .then((responseU) => {
      fetch(progressJson)
        .then((responseP) => {
          fetch(cohortsJson)
            .then((responseC) => {
              // responseU.json().then(users => {
              //   responseP.json().then(progress => {
              //     responseC.json().then(cohorts => {
              //       callback && callback(users, progress, cohorts);
              //     })
              //   })
              // })
              Promise.all([responseU.json(), responseP.json(), responseC.json()]).then(dataArr => {
                const [users, progress, cohorts] = dataArr;
                // const users = dataArr[0]
                // const progress = dataArr[1]
                // const cohorts = dataArr[2]
                callback && callback(users, progress, cohorts);
              })
            })
        })
    })
}

const callbackGetData = (users, progress, cohorts) => {
  // console.log('BEGIN')
  // console.log(users, progress, cohorts)
  // console.log('END')

users.forEach((user) => {
  const usuario = user.id;
  const uprogress = progress[usuario];

  console.log(usuario);

})

}

getData(callbackGetData)


