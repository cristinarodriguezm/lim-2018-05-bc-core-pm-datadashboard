//variables de los datos que vienen del json
const usersJson = "../data/cohorts/lim-2018-03-pre-core-pw/users.json";
const cohortsJson = "../data/cohorts.json";
const progressJson = "../data/cohorts/lim-2018-03-pre-core-pw/progress.json";
//Muestra las estudiantes solo nombres
const listStudents = document.querySelector("tbody");
const menu = document.getElementById("listCo");

//Muestra a las alumnas
const butOfList = document.querySelector('button');

butOfList.addEventListener("click", leeJsons);


function leeJsons(){
  new leeJson();
          
