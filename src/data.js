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
        let complete = 0;
        let total = 0;
        let scoreSum =0;//quizzes
        let scoreAvg = 0;//quizzez
        courses.forEach((nameCourse)=>{
            
            
            if(progressUser.hasOwnProperty(nameCourse)){
                const units = Object.values(progressUser[nameCourse].units);
                  //console.log(units);
                units.forEach((objUnit)=>{
                    const parts = Object.values(objUnit.parts);
                   // console.log(parts);//array
                    switch(type){
                        case "practice":
                        const exercises = parts.filter(objPart => objPart.type === "practice" && objPart.hasOwnProperty("exercise"));
                        console.log(exercises);
                        exercises.forEach((objExercise)=>{
                            exercisesTotal += exercises.length;
                            exercisesCompleted += objExercise.completed;
                        })
                        break;
                        case "read":
                        const reads = parts.filter(objPart => objPart.type === "read");
                        const readsCompleted = parts.filter(objPart => objPart.type === "read" && objPart.completed === 1);
                        console.log(reads, readsCompleted)
                        break;
                        case "quiz":
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


//4ta funcion
window.processCohortData =(options)=>{
    //console.log(options);
    //console.log(Object.keys(options.cohort.coursesIndex)) //un array cuyos elementos representan las propiedaddes del objeto courseIndex
    const courses = Object.keys(options.cohort.coursesIndex);
    let students =computeUsersStats(options.cohortData.users,options.cohortData.progress,courses);
  //  sortUserStats();
  //  filterUsers();
    return students;
}