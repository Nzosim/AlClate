document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth'
    });
    calendar.render();

    fetch("http://localhost:2080/api/retards", {
      method: "GET"
    })
      .then(async (data) => {
        let retards = await data.json()
        console.log(retards.retards)
        retards.retards.forEach((retard) => {
          let temps = retard.Temps
          temps = retard.Moment == 1 ? "Matin : " + retard.Temps : "Après-midi : " + retard.Temps;
          calendar.addEvent({
            title: temps, // Remplacez 'title' par le nom de la propriété correspondante dans vos données
            start: retard.Date, // Remplacez 'start' par le nom de la propriété correspondante dans vos données
            end: retard.Date // Remplacez 'end' par le nom de la propriété correspondante dans vos données
          });
      })
    })
      .catch((error) => {
        console.error("Error:", error);
      });
});