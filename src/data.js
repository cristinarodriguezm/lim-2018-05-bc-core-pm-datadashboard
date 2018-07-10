window.computeUsersStats =(users, progress,courses)=>{
  
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
        let scoreSum =0;//quiz
        courses.forEach((nameCourse)=>{
             if(progressUser.hasOwnProperty(nameCourse)){
                const units = Object.values(progressUser[nameCourse].units);
                  //console.log(units);
                units.forEach((objUnit)=>{
                    const parts = Object.values(objUnit.parts);
                   // console.log(parts);//array con los valores de la unidad
                   
                    switch(type){
                        case "practice":
                        let exercises = parts.filter(objPart => objPart.type === "practice" && objPart.hasOwnProperty("exercises"));
                        //array q solo contiene los ejercicios
                        console.log(exercises);
                        exercises.forEach((objExercise)=>{
                            total += exercises.length;//cantidad de ejercicios
                            completed += objExercise.completed;//number
                        })
                        break;
                        case "read":
                        let readsTotal = parts.filter(objPart => objPart.type === "read");
                        let readsCompleted = parts.filter(objPart => objPart.type === "read" && objPart.completed === 1);
                            total += readsTotal.length;
                            completed += readsCompleted.length;
                        console.log(readsTotal, readsCompleted)
                        break;
                        case "quiz":
                        let quizTotal = parts.filter(objPart => objPart.type === "quiz");
                        let quizCompleted =  parts.filter(objPart => objPart.type === "quiz" && objPart.completed === 1);
                        quizCompleted.forEach(quiz => {
                            scoreSum += quiz.score;
                            console.log(quiz.score);
                        } 
                            
                        );
                            total += quizTotal.length;
                            completed += quizCompleted.length
                        break;
                    }
                    

                })
            };

        })
        let response=  {
            total: total,
            completed: completed,
            percent: completed*100/total
        };
        if(type ==="quiz"){
            response.scoreSum =scoreSum;
            response.scoreAvg =scoreSum/total
        }
        return response;
    };



    students = students.map(objStudent =>{
       const objectWithPropertysOfUsers = {
           name : objStudent.name,
            stats:{
                percent : calculatePercent(progress[objStudent.id], courses),
                exercises : calculateStats(progress[objStudent.id], courses, "practice"),
                reads : calculateStats(progress[objStudent.id], courses, "read"),
                quizzes: calculateStats(progress[objStudent.id], courses, "quiz") ,
                
            }
        }
        return objectWithPropertysOfUsers;
    })
    console.log(students);  
    return students;
    
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