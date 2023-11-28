document.addEventListener('DOMContentLoaded', function() {
        // ajout de la date du jour dans le champ date
        const dateInput = document.getElementById('start');
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); 
        const day = String(today.getDate()).padStart(2, '0');
        dateInput.value = `${year}-${month}-${day}`;

        // ajout des options de temps dans le champ select
        const select = document.getElementById('time-select');
        for(let i = 0; i <= 240; i++) {
            const option = document.createElement('option');
            option.value = i;
            if (i === 0) {
                option.text = '0 minute';
            } else if (i < 60) {
                option.text = `${i} minute${i > 1 ? 's' : ''}`;
            } else {
                const hours = Math.floor(i / 60);
                const minutes = i % 60;
                option.text = `${hours} heure${hours > 1 ? 's' : ''}${minutes > 0 ? ' ' + minutes + ' minute' + (minutes > 1 ? 's' : '') : ''}`;
            }
            select.appendChild(option);
        }

        // enregistrement du retard dans le fichier json
        const save = document.getElementById("save");
        save.addEventListener('click', () => {
            const date = dateInput.value;
            const moments = document.getElementById("moment-select")
            const moment = moments.value;
            const temps = select.value;
            const data = {
                date: date,
                moment: moment,
                temps: temps
            };
        
            console.log(JSON.stringify(data));

            fs.writeFile('../dbb/donnees.json', JSON.stringify(data), (err) => {
                if (err) throw err;
                console.log('Data written to file');
            });
        })
})