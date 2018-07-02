
//window.listCohort = (cohort) => {
//Despliega los cohorts en el menu desplegable   
fetch (cohortsJson)
    .then(function(cohorts){
    return cohorts.json();
    })
    .then(function(list){
//        console.log(list);   //muestra 1 array con 51 objetos = cohorts
    const promo = list;
//        console.log(promo.length); //muestra 51 = numero de objetos =cohorts
    let cohortname = "";
    nameOfCohorts = promo.filter(function(names){
        if(names.id.substring(0,3)=== "lim"){
            cohortname += `
            <option>${names.id}</option>`;
        }
    })
    menu.innerHTML = cohortname;
    });
//}
     
// inicio
//tree = parse(usersJson, progressJson);
//function parse(datUser, datProge) {
function leeJson() {    
//    Promise.all([loadJson(datUser), loadJson(datProge)]).then(function(responses) {
    Promise.all([loadJson(usersJson), loadJson(progressJson)]).then(function(responses) {        
        // responses contiene el parsed JSON objects en el orden de requests
        toHierarchy(responses[0], responses[1]);
        }).catch(function() {
        // tratar error de processing aqui, si cualquier promise es rejected
          alert("Error...error...loads JSON");
          return;        
    });
}

function loadJson(file) {
    return new Promise(function(resolve, reject) {
      var request = new XMLHttpRequest();
      request.open('GET', file);
      request.responseType = 'json';
      request.onload = function() {
        if (request.status === 200) {
          resolve(request.response);
        } else {
          reject(Error('Didn\'t load successfully; error code:' + request.statusText));
        }
      };
      request.onerror = function() {
          reject(Error('There was a network error.'));
      };
      request.send();
    });
}

function toHierarchy(datUser, datProge) {
    // aqui la combinación para trabajarlo
    if (menu.value ==="lim-2018-03-pre-core-pw"){
    try {
        let html = "";
        //for (let i = 0; i<promo.length; i++ ){        
        for (let i = 0; i<20; i++ ){
//            console.log(datUser[i].id);
//            console.log(datUser[i].name);

          for(key in datProge) {
            let infoJSON = datProge[key];
            if(typeof infoJSON !== "object"){
//              console.log(infoJSON);
              break;
            }   
            if (datUser[i].id === key){
              console.log(datUser[i].id);
              console.log("name : ", datUser[i].name);
              console.log(key); 
              console.log("completedUnits : ", infoJSON.intro.completedUnits);
              console.log("completedDuration : ", infoJSON.intro.completedDuration);
              console.log("totalUnits : ", infoJSON.intro.totalUnits);
              console.log("percent : ", infoJSON.intro.percent);
              //console.log("units : ", infoJSON.intro.units);
            //  let datUnits = [];
              let datUnits = infoJSON.intro.units;
              procUnits(datUnits);

              html +=`                        
              <tr>
                <td>${datUser[i].name}</td>
                <td>${infoJSON.intro.completedUnits}</td>
                <td>${infoJSON.intro.totalUnits}</td>
                <td>${infoJSON.intro.percent}</td>                                                
              </tr>`;              
              break
            }
          }        
        }
        listStudents.innerHTML = html;
    } catch (error) {
        alert("Error...error...JSON: datUser");        
        return;
    }
}       
//fin
      
function procUnits(datUnits){
//  console.log(datUnits);
  for(unit in datUnits){
      console.log(unit);
      for(part in unit){
          console.log(part);
      }
  }   
  for (let i = 0; i<datUnits.length; i++ ){
      //console.log(datUnits.percent);
  }    
}
}