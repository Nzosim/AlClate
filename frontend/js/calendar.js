// document.addEventListener('DOMContentLoaded', function() {
//     var calendarEl = document.getElementById('calendar');
//     var calendar = new FullCalendar.Calendar(calendarEl, {
//       initialView: 'dayGridMonth'
//     });
//     calendar.render();

//     document.getElementById('loading-screen').style.display = 'flex';

// fetch("http://localhost:2080/api/retards", {
//   method: "GET"
// })
// .then(async (data) => {
//   let retards = await data.json();

//   console.log(JSON.parse(JSON.stringify(retards.retards)));

//   retards.retards.sort((a, b) => {
//     // Convertissez les dates en objets Date pour la comparaison
//     let dateA = new Date(a.Date);
//     let dateB = new Date(b.Date);

//     // Comparez les dates
//     if (dateA < dateB) {
//       return -1;
//     } else if (dateA > dateB) {
//       return 1;
//     } else {
//       return b.Moment - a.Moment;
//     }
//   });

//   console.log(retards.retards);

//   retards.retards.forEach((retard) => {
//     let temps = retard.Temps;

//     temps = retard.Moment == 1 ? "Matin : " : "Après-midi : " ;

//     if (retard.Temps < 60) {
//       temps+= ` ${retard.Temps} minute${retard.Temps > 1 ? "s" : ""}`;
//     } else {
//       const hours = Math.floor(retard.Temps / 60);
//       const minutes = retard.Temps % 60;
//       temps+= `${hours} heure${hours > 1 ? "s" : ""}${
//         minutes > 0 ? " " + minutes + " minute" + (minutes > 1 ? "s" : "") : ""
//       }`;
//     }

//     calendar.addEvent({
//       title: temps,
//       start: retard.Date,
//       end: retard.Date
//     });
//   });

//   // Cachez l'écran de chargement
//   document.getElementById('loading-screen').style.display = 'none';
// })
// .catch((error) => {
//   console.error("Error:", error);

//   // Cachez l'écran de chargement en cas d'erreur
//   document.getElementById('loading-screen').style.display = 'none';
// });
// });

document.addEventListener("DOMContentLoaded", function () {
  var calendarEl = document.getElementById("calendar");
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
  });
  calendar.render();

  document.getElementById("loading-screen").style.display = "flex";

  fetch("http://localhost:2080/api/retards", {
    method: "GET",
  })
    .then(async (data) => {
      let retards = await data.json();

      addCalendarEvent(retards);

      document.getElementById("loading-screen").style.display = "none";
    })
    .catch((error) => {
      console.error("Error:", error);
      document.getElementById("loading-screen").style.display = "none";
    });

  function addCalendarEvent(data) {
    data.retards.sort((a, b) => {
      let dateA = new Date(a.Date);
      let dateB = new Date(b.Date);

      if (dateA < dateB) {
        return -1;
      } else if (dateA > dateB) {
        return 1;
      } else {
        return a.Moment - b.Moment;
      }
    });

    data.retards.forEach((retard) => {
      let temps = retard.Temps;

      temps = retard.Moment == 1 ? "Matin : " : "Après-midi : ";

      if (retard.Temps < 60) {
        temps += ` ${retard.Temps}min`;
      } else {
        const hours = Math.floor(retard.Temps / 60);
        const minutes = retard.Temps % 60;
        temps += `${hours}h${ minutes > 0 ? minutes + "min" : ""}`;
      }

      calendar.addEvent({
        title: temps,
        start: retard.Date,
        end: retard.Date,
      });
    });
  }
});
