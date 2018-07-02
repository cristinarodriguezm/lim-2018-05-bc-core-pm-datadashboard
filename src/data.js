const computeUserStats = (users,progress, courses) => {
    
    if (userProgress === {}) {
        stats = {
            percent: 0,
            exercises : {
                total: 0,
                completed: 0 ,
                percent: 0
                },
            reads: {
                total: 0,
                completed: 0,
                percent: 0
                },
            quizzes: {
                total: 0,
                completed: 0,
                percent: 0,
                scoreSum: 0,
                scoreAvg: 0,
            }
        }  

    }
    stats = {
        percent: " ",
        exercises : {
            total: " ",
            completed: " " ,
            percent: " "
            },
        reads: {
            total: " ",
            completed: " ",
            percent: " "
            },
        quizzes: {
            total: " ",
            completed: " ",
            percent: " ",
            scoreSum: " ",
            scoreAvg: " ",
        }
    }
}

const sortUser = (users, orderBy, orderDirection) =>{
    
}


/*aqui fetch

1) computeUsersStats(users, progress, courses)
2) sortUsers(users, orderBy, orderDirection)
3) filterUsers(users, search)
4) processCohortData(options)

const processCohortData = (options) => {
    let users = options.cohortData.users;
    let progress = options.cohortData.progress
    let usersWithGrades = computeUsersStates(users,progress,courses);
}

const computeUserStates = (users, progress, courses)=>{
    let ststs ={percent:0,exercises:{total:0,}}
    stats.percent =100
    console.log(stats.percent)
    stats.exercises,total = 25
    console.log("computeUserStates");
}

const sortUsrs =(users,orderby,orderdirection){
    console.log(sortusers)
}
como llamar a processCohortData
 const userwithstats = processcohortdata(options);
 console.log(userwithstats)
 userwithstats.forEach(function() {

 })
*/




