document.addEventListener("DOMContentLoaded", function () {
  // ajout de la date du jour dans le champ date
  const dateInput = document.getElementById("start");
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  dateInput.value = `${year}-${month}-${day}`;

  // ajout des options de temps dans le champ select
  const select = document.getElementById("time-select");
  for (let i = 0; i <= 240; i++) {
    const option = document.createElement("option");
    option.value = i;
    if (i === 0) {
      option.text = "0 minute";
    } else if (i < 60) {
      option.text = `${i} minute${i > 1 ? "s" : ""}`;
    } else {
      const hours = Math.floor(i / 60);
      const minutes = i % 60;
      option.text = `${hours} heure${hours > 1 ? "s" : ""}${
        minutes > 0 ? " " + minutes + " minute" + (minutes > 1 ? "s" : "") : ""
      }`;
    }
    select.appendChild(option);
  }

  const sendButton = document.getElementById("save");
  sendButton.addEventListener("click", () => {
    document.getElementById("loading-screen").style.display = "flex";

    const data = {
      Date: dateInput.value,
      Moment: document.getElementById("moment-select").value,
      Temps: select.value,
    };

    sendButton.disabled = true;
    console.log(data);

    fetch("http://localhost:2080/api/retards/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((data) => {
        document.getElementById("loading-screen").style.display = "none";
      })
      .catch((error) => {
        console.log(error);
        document.getElementById("loading-screen").style.display = "none";
      });
  });
});
