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
                        ;
                        console.log(exercises);
                        exercises.forEach((objExercise, i)=>{
                           //cantidad de ejercicios //en cualquier posicion en q esten los ejercicios.
                        total += Object.keys(exercises[i].exercises).length  
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
                            completed += quizCompleted.length;
                        
                        break;
                    }
                    

                })
            };

        })
        let response=  {
            total: total,
            completed: completed,
            percent: Math.round(completed*100/total)
        };
        if(type ==="quiz"){
            response.scoreSum =scoreSum;
            response.scoreAvg =Math.round(scoreSum/total)
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

const compareByName = (a,b) => {
    if (a.name.toUpperCase() > b.name.toUpperCase()) {
        return 1;
    }
    if (a.name.toUpperCase() < b.name.toUpperCase()) {
        return -1;
    }
    return 0;
}

const compareByPercent = (a,b) => {
    if (a.stats.percent > b.stats.percent) {
      return 1;
    }
    if (a.stats.percent < b.stats.percent) {
      return -1;
    }
    return 0;
  }

const compareByExercises = (a,b) => {
    if (a.stats.exercises.percent > b.stats.exercises.percent) {
        return 1;
      }
      if (a.stats.exercises.percent < b.stats.exercises.percent) {
        return -1;
      }
      return 0;
    
}

const compareByReads = (a,b) => {
    if (a.stats.reads.percent > b.stats.reads.percent) {
        return 1;
      }
      if (a.stats.reads.percent < b.stats.reads.percent) {
        return -1;
      }
      return 0;
}

const compareByQuizzes = (a,b) => {
    
    if (a.stats.quizzes.percent > b.stats.quizzes.percent) {
        return 1;
      }
      if (a.stats.quizzes.percent < b.stats.quizzes.percent) {
        return -1;
      }
      return 0;

}

const compareByAvg = (a,b) => {
    if (a.stats.quizzes.scoreAvg > b.stats.quizzes.scoreAvg) {
        return 1;
      }
      if (a.stats.quizzes.scoreAvg < b.stats.quizzes.scoreAvg) {
        return -1;
      }
      return 0;

}

//2da funcion
window.sortUsers = (users, orderBy, orderDirection) => {
    let sortedUsers = users;
    if (orderBy === 'name') {
        nombre = users.sort(compareByName);
    } else if (orderBy === 'percent') {
        percent = users.sort(compareByPercent);
    } else if(orderBy ==='exercises'){
        exercises = users.sort(compareByExercises);
    } else if (orderBy === 'reads') {
        reads = users.sort(compareByReads)
    } else if (orderBy ==='quizzes'){
        quizzes = users.sort(compareByQuizzes)
    } else if (orderBy === 'average') {
        average = users.sort(compareByAvg)
    }
    
    if (orderDirection === 'DESC') {
        sortedUsers = sortedUsers.reverse();
    }

    return sortedUsers;

}


//3ra funcion
window.filterUsers = (users, search)=>{
    let usersFilter = users.filter(
        userFilterer => userFilterer.name.toLowerCase().indexOf(search.toLowerCase())>-1 
    );
    console.log(usersFilter);
    return usersFilter;

}

//4ta funcion
window.processCohortData =(options)=>{
    console.log(options);
    //console.log(Object.keys(options.cohort.coursesIndex)) //un array cuyos elementos representan las propiedaddes del objeto courseIndex
    const courses = Object.keys(options.cohort.coursesIndex);
    //1ra
    let students =computeUsersStats(options.cohortData.users,options.cohortData.progress,courses);
   
    //2da
    //let studentsOrdered = sortUsers(studentsFiltrados, "name", "ASC");
     //3ra
     let studentsFiltrados = filterUsers(students, options.search);
    //  sortUserStats(); 
    //  filterUsers();
    return studentsFiltrados;
   // 
}