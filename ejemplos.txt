const listCampus = documen.getElemnetById("sedes"); //sedes es el ul  //objeto
const sectionMain = document.querySelector("#mai-content");

const options ={
        cohort:null,
        cohortData:{
                users:null,
                progress:null,
        },
        orderBy:"name",//mandamos valores por defecto
        orderDirection: "ASC",
        search=""
};

 const getData = (str,url,callback)=>{ //callback es una funcion
         const xhr = new xmlhttprequest();
         xhr.open("get",url,true);
         xhr.addeventListener("load",event =>{//current traget = xhr, target
                 if(event.target.readyState ===4){
                         if(event.target.status !==200){
                                 return console.log(new Error("http error: $(event.target.ststus ===404)"))
                         } else{
                                 const response = JSON.parse(event.target.responseText);
                                 callback(str,response);
                         }
                 }
         })
         xhr.sed();
 }

const getData=(str,url,callback)=>{

}
//aqui mostramos los  cohorts de cada pais al clickear
const showCohorts =(id, arrCohorts)=>{
       const cohortsOfCampus=  arrCohorts.filter(element =>{//filter es una funcion de orden mayor porque recibe otra funcion,crea un nuevoarray con elemntq cumplan una condicion
        return element.id.indexOf(id) !== -1;
        })
        let content ="";
        console.log(cohortsOfCampus);
        cohortsOfCampus.forEach(cohort =>{
                content += `
                <div class="abd">
                <div id="${cohort.id}" clas="dftdr">
                ${cohort.id}
                </div>
                </div>
                `;
        });
        sectionMain.innerHTML = content;
}

const showProgress= (idCohort,objProgress)=>{
    console.log(idCohort,objProgress);
    options.cohortData.progress = objProgress;
    console.log(options);
    const studentsConStats = processCohortData(options);//objeto con propiedad
    let template = "";
    studentsConStats.forEach((objStudentConStats)=>{
        template += `
        ${objStudentConStats.name}
        ${math.floor(objStudentconStats.stats.percent)}
        ${math.floor(objStudentconStats.stats.exercises.total)}
        `
    })
    sectionMain.innerHTML =template;
}



const showUsers= (idCohort, arrUsers)=>{
        console.log(idCohort,arrUsers);
        options.cohortData.users = arrUsers; //asi metemos a la info de users en la propiedad user en option
        getData(idCohort, "/data/cohort/${idCohort}/progress.json",showProgress);
}

const cohortSelected = (idCohort, datCohorts)=>{
    console.log(idCohort, datCohorts);
    dataCohorts.forEach(objCohort=>{
        if(objCohort.id === id){
            options.cohort = objCohort;
        }
    })
}


listCampues.addEventListener("click", event =>{
        console.log(event.target) //me trae en console, etiqueta en donde hicimos click (<li>ayrjset lima</li>)
        const id = event.target.id;
        getData(id, cohortsJson, showCohorts);
})

sectionMain.addEventListener("click", e=>{//CURRENT TRAGET =SECTIONMAIN
        const id = e.target.id;
        getData(id,"../data/cohorts.json", cohortSelected);
        getData(id, "../data/cohort/${id}users.json",showUsers); //funciona con cualquiercohort
})





//----------------------------> DATA
window.computeUsersStats =(users, progress,courses)=>{
    console.log(users, progress,courses);
     let students = users.filter(objUser => objUser.role ==="student");
    
     const calculatePercent = ()=>{
        let count = 0;
        courses.forEach(nameCourse =>{
            const progressUser= progress[student.id];
            if(progressUser.hasOwnProperty(nameCourse)){
                count += progressUser[nameCourse].percent;
            };
        });
        return (count/courses.length);
    };

    const calculateStats = (student, type) =>{
        let complete = 0;
        let total = 0;
        let scoreSum =0;
        let scoreAvg = 0;
        courses.forEach((nameCourse)=>{
            const progressUser= progress[student.id];
            if(progressUser.hasOwnProperty(nameCourse)){
                const units = Object.values(progressUser[nameCourse].units);
                console.log(units);
                units.forEach((objUnit)=>{
                    const parts = Objet.values(objUnit.parts);
                    console.log(parts);//array
                    switch(type){
                        case "practice":
                        const exercises = parts.filter(objPart => objPart.type === "practice" && objPart.hasOwnProperty("exercise"))
                        console.log(exercises);
                        exercises.forEach((objExercise)=>{
                            exercisesTotal += exercises.length;
                            exercisesCompleted += objExercise.completed;
                        })
                        break;
                        case "read":
                        break;
                        case "practice":
                        break;
                    }
                    

                })
            };

        })
        let response=  {
            total: total,
            completed: complete,
            percent: complete/total
        };
        if(type ==="quiz"){
            respuesta.scoreSum =scoreSum;
            respuesta.scoreAvg =scoreAvg
        }
    }



    students = students.map(objStudent =>{
       const objectWithPropertysOfUsers = {
           name : objStudent.name,
            stats:{
                percent : calculatePercent(objStudent),
                exercises : calculateStats(objStudent, "practice"),
                
            }
        }
        return objectWithPropertysOfUsers;
    })  
    return students;
    console.log(students);
}



window.processCohortData =(options)=>{
    //console.log(options);
    //console.log(Object.keys(options.cohort.coursesIndex)) //un array cuyos elementos representan las propiedaddes del objeto courseIndex
    const courses = Object.keys(options.cohort.coursesIndex);
    let students =computeUsersStats(options.cohortData.users,options.cohortData.progress,courses);
    sortUserStats();
    filterUsers();
    return students;
}