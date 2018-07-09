//unico url, porque contiene todos lod cohorts
const cohortsJson = "../data/cohorts.json";
//capturar los elementos del html
const sectionMain = document.querySelector("#space");
const menu = document.getElementById("listCo");
const sedeLima = document.getElementById("lim");
const firtsMenu= document.getElementById("father");

//objeto options, es devuelta por la funcion processCohortData
const options ={
    cohort:null,
    cohortData:{
            users:null,
            progress:null,
    },
    orderBy:"name",//mandamos valores por defecto
    orderDirection: "ASC",
    search:""
};

const getData = (str,file,callback)=>{ //callback es una funcion
       // console.log(str,file);
    const request = new XMLHttpRequest();
    request.open("GET",file,true);
    request.addEventListener("load", event =>{//current traget = xhr, target
            if(event.target.readyState === 4){
                    if(event.target.status !==200){
                            return console.error(new Error(`HTTP error: ${event.target.status}`))
                    } else{
                            const response = JSON.parse(event.target.responseText);
                            callback(str,response);
                    }
            }
    })
    request.send();
}


//click al boton lima SALEN LOS COHORTS DE LIMA FILTRADOS
const displayCohorts = (id, arrCohorts)=>{
    const cityCohort = arrCohorts.filter(generation =>{
        return generation.id.indexOf(id) !== -1;
    })
    let cohortName = "";
   // console.log(cityCohort);
        cityCohort.forEach(cohort =>{
                cohortName += `
                <option id=${cohort.id}>
                ${cohort.id}
                </option>
                `;
        });
        menu.innerHTML = cohortName;
}

const displayProgress= (idCohort,objProgress)=>{
        //console.log(idCohort,objProgress);
        options.cohortData.progress = objProgress;
        //console.log(options);
        processCohortData(options);//objeto con propiedad
        // let template = "";
        // studentsConStats.forEach((objStudentConStats)=>{
        //     template += `
        //     ${objStudentConStats.name}
        //     ${math.floor(objStudentconStats.stats.percent)}
        //     ${math.floor(objStudentconStats.stats.exercises.total)}
        //     `
        // })
        // sectionMain.innerHTML =template;
    }

const displayUsers= (idCohort, arrUsers)=>{
       // console.log(idCohort,arrUsers);
        options.cohortData.users = arrUsers; //asi metemos a la info de users en la propiedad user en option
        getData(idCohort, `../data/cohorts/${idCohort}/progress.json`, displayProgress);
}

const cohortSelected = (idCohort, dataCohorts)=>{
        //console.log(idCohort,dataCohorts);
        dataCohorts.forEach(objCohort =>{
                if(objCohort.id === idCohort){
                        options.cohort = objCohort;
                }
        })
}
 
//evento de los botones q activan el select
firtsMenu.addEventListener("click", event =>{
    //console.log(event.target);
    const id = event.target.id;
    getData(id, cohortsJson, displayCohorts);
});

//evento del select q lista los cohorts
menu.addEventListener("change", e=>{
        let id = e.target.value;
        //console.log( e.target.value);
        
        if (id != "listCo"){
          getData(id,cohortsJson, cohortSelected);
          getData(id,`../data/cohorts/${id}/users.json`, displayUsers);
        }
})
