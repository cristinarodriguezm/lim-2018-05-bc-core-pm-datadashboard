window.computeUsersStats =(users, progress,courses)=>{
 try{  
    //console.log(users, progress,courses);
    
     let students = users.filter(objUser => objUser.role ==="student");
     const calculatePercent = (progressUser, courses) => {
        let count = 0;
        courses.forEach(nameCourse =>{            
          
          //console.log(progressUser);
            if(progressUser.hasOwnProperty(nameCourse)){
                count += progressUser[nameCourse].percent;
            };
        });
        return (count/courses.length);
    };


    const calculateStats = (progressUser, courses, type) =>{
        let total = 0;
        let completed = 0;
        
       
        let scoreSum =0;//quizzes
        let scoreAvg = 0;//quizzez
        courses.forEach((nameCourse)=>{
             if(progressUser.hasOwnProperty(nameCourse)){
                const units = Object.values(progressUser[nameCourse].units);
                  //console.log(units);
                units.forEach((objUnit)=>{
                    const parts = Object.values(objUnit.parts);
                   // console.log(parts);//array con los valores de la unidad
                   debugger
                    switch(type){
                        case "practice":
                        const exercises = parts.filter(objPart => objPart.type === "practice" && objPart.hasOwnProperty("exercises"));
                        //array q solo contiene los ejercicios
                        console.log(exercises);
                        exercises.forEach((objExercise)=>{
                            total += exercises.length;//cantidad de ejercicios
                            completed += objExercise.completed;//number
                        })
                        break;
                        case "read":
                        const readsTotal = parts.filter(objPart => objPart.type === "read");
                        const readsCompleted = parts.filter(objPart => objPart.type === "read" && objPart.completed === 1);
                        readsTotal += readsTotal.length;
                        readsCompleted += readsCompleted.length;
                        console.log(readsTotal, readsCompleted)
                        break;
                        case "quiz":
                        const quizTotal = parts.filter(objPart => objPart.type === "quiz");
                        const quizCompleted =  parts.filter(objPart => objPart.type === "quiz" && objPart.completed === 1);
                        const quizPercent = (100*quizCompleted.length)/quizTotal;
                        //const quizTotalScore =
                        //const quizCompleteProm = 
                        break;
                    }
                    

                })
            };

        })
        let response=  {
            total: exerciseTotal,
            completed: exercisesCompleted,
            percent: exercisesComplete*100/exercisesTotal
        };
        if(type ==="quiz"){
            respuesta.scoreSum =scoreSum;
            respuesta.scoreAvg =scoreAvg
        }
        return response;
    };



    students = students.map(objStudent =>{
       const objectWithPropertysOfUsers = {
           name : objStudent.name,
            stats:{
                percent : calculatePercent(progress[objStudent.id], courses),
                exercises : calculateStats(progress[objStudent.id], courses, "practice"),
                reads :null,
                quizzes: null,
                
            }
        }
        return objectWithPropertysOfUsers;
    })
    console.log(students);  
    return students;
 }catch (error) {
   console.log(error.name);
   console.log(error.message);
   console.log("Error linea: ", error.lineNumber);        
   return;    
 }  
    
}

//2da funcion
window.sortUsers = (users, orderBy, orderDirection) =>{

}

//3ra funcion
window.filterUsers = (users, search)=>{

}

//4ta funcion
window.processCohortData =(options)=>{
    console.log(options);
    //console.log(Object.keys(options.cohort.coursesIndex)) //un array cuyos elementos representan las propiedaddes del objeto courseIndex
    const courses = Object.keys(options.cohort.coursesIndex);
    let students =computeUsersStats(options.cohortData.users,options.cohortData.progress,courses);
  //  sortUserStats(); 
  //  filterUsers();
    return students;
}