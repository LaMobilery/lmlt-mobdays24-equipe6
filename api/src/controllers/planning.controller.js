const PlanningElement = require("../models/planning.model");
const weatherController = require("./weather.controller");

async function makePlanning() {
  const daysOfWeek = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ];
  console.log("On démarre la génération du planning");
  // D'abord on récupère les prévisions des 7 jours à venir
  const weatherData = await weatherController.getWeather();
  // On filtre sur les données journalières
  const forecastDatas = weatherData["forecast"];

  // On supprime le contenu de la collection pour réinitialiser les données de planning à 7 jours
  await PlanningElement.deleteMany({});

  // On boucle sur les 7 prochains jours de prévision météo
  for (let i = 0; i < 7; i++) {
    let arrosage = false;
    let couverture = false;
    let alerte = false;
    let collaborator = "";
    const element = forecastDatas[i];
    const weatherDate = new Date(element["datetime"]);
    const dayOfTheWeek = daysOfWeek[weatherDate.getDay()];
    const dayNumber = weatherDate.getDate();

    if (element["rr1"] < process.env.SEUIL_PLUIE) {
      arrosage = true;
    }

    if (
      element["probawind70"] > process.env.SEUIL_PROBA_PLUIE ||
      element["probafrost"] > process.env.SEUIL_PROBA_GEL
    ) {
      couverture = true;
    }

    if (arrosage === true || couverture === true) {
      // On va chercher les utilisateurs à l'agence ce jour là
      // Comme Angelo déconne, on utilise un JSON en dur, ce sera à revoir

      const presence = angeloJSON.filter(
        (elem) =>
          new Date(elem["date"]).getTime() === weatherDate.getTime() &&
          elem["isPotager"] === true
      );

      if (presence.length > 0) {
        const rand = Math.floor(Math.random() * presence.length);
        collaborator = presence[rand]["collaborator"];
      } else {
        alerte = true;
      }
    }

    const planningElem = {
      date: weatherDate,
      dateLabel: dayOfTheWeek + " " + dayNumber,
      isWatering: arrosage,
      isCovering: couverture,
      alert: alerte,
      collaborator: collaborator,
    };

    await PlanningElement.create(planningElem);
  }
}

const angeloJSON = [
  {
    date: "2024-06-13",
    collaborator: "Franck B.",
    isPotager: false,
  },
  {
    date: "2024-06-15",
    collaborator: "Julie R.",
    isPotager: true,
  },
  {
    date: "2024-06-15",
    collaborator: "Franck B.",
    isPotager: false,
  },
  {
    date: "2024-06-15",
    collaborator: "Sebastien R.",
    isPotager: true,
  },
  {
    date: "2024-06-15",
    collaborator: "Julien V.",
    isPotager: false,
  },
  {
    date: "2024-06-15",
    collaborator: "Quentin L.",
    isPotager: false,
  },
  {
    date: "2024-06-17",
    collaborator: "Sebastien R.",
    isPotager: true,
  },
  {
    date: "2024-06-17",
    collaborator: "Nicolas Z.",
    isPotager: true,
  },
  {
    date: "2024-06-17",
    collaborator: "Franck B.",
    isPotager: false,
  },
  {
    date: "2024-06-17",
    collaborator: "Julie R.",
    isPotager: true,
  },
  {
    date: "2024-06-17",
    collaborator: "Claire M.",
    isPotager: true,
  },
  {
    date: "2024-06-18",
    collaborator: "Claire M.",
    isPotager: true,
  },
  {
    date: "2024-06-18",
    collaborator: "Julie R.",
    isPotager: true,
  },
  {
    date: "2024-06-18",
    collaborator: "Julien V.",
    isPotager: false,
  },
  {
    date: "2024-06-18",
    collaborator: "Nicolas Z.",
    isPotager: true,
  },
  {
    date: "2024-06-18",
    collaborator: "Sebastien R.",
    isPotager: true,
  },
  {
    date: "2024-06-19",
    collaborator: "Claire M.",
    isPotager: true,
  },
  {
    date: "2024-06-19",
    collaborator: "Julien V.",
    isPotager: false,
  },
  {
    date: "2024-06-19",
    collaborator: "Nicolas Z.",
    isPotager: true,
  },
  {
    date: "2024-06-20",
    collaborator: "Julien V.",
    isPotager: false,
  },
  {
    date: "2024-06-21",
    collaborator: "Quentin L.",
    isPotager: false,
  },
  {
    date: "2024-06-21",
    collaborator: "Nicolas Z.",
    isPotager: true,
  },
  {
    date: "2024-06-21",
    collaborator: "Sebastien R.",
    isPotager: true,
  },
  {
    date: "2024-06-25",
    collaborator: "Claire M.",
    isPotager: true,
  },
  {
    date: "2024-06-25",
    collaborator: "Sebastien R.",
    isPotager: true,
  },
  {
    date: "2024-06-25",
    collaborator: "Nicolas Z.",
    isPotager: true,
  },
  {
    date: "2024-06-25",
    collaborator: "Franck B.",
    isPotager: false,
  },
  {
    date: "2024-06-25",
    collaborator: "Quentin L.",
    isPotager: false,
  },
  {
    date: "2024-06-25",
    collaborator: "Julien V.",
    isPotager: false,
  },
  {
    date: "2024-06-25",
    collaborator: "Julie R.",
    isPotager: true,
  },
  {
    date: "2024-06-26",
    collaborator: "Sebastien R.",
    isPotager: true,
  },
  {
    date: "2024-06-26",
    collaborator: "Julie R.",
    isPotager: true,
  },
  {
    date: "2024-06-26",
    collaborator: "Claire M.",
    isPotager: true,
  },
  {
    date: "2024-06-26",
    collaborator: "Quentin L.",
    isPotager: false,
  },
  {
    date: "2024-06-26",
    collaborator: "Julien V.",
    isPotager: false,
  },
  {
    date: "2024-06-26",
    collaborator: "Nicolas Z.",
    isPotager: true,
  },
  {
    date: "2024-06-26",
    collaborator: "Franck B.",
    isPotager: false,
  },
  {
    date: "2024-06-27",
    collaborator: "Sebastien R.",
    isPotager: true,
  },
  {
    date: "2024-06-27",
    collaborator: "Quentin L.",
    isPotager: false,
  },
  {
    date: "2024-06-28",
    collaborator: "Claire M.",
    isPotager: true,
  },
  {
    date: "2024-07-01",
    collaborator: "Julie R.",
    isPotager: true,
  },
  {
    date: "2024-07-01",
    collaborator: "Franck B.",
    isPotager: false,
  },
  {
    date: "2024-07-01",
    collaborator: "Julien V.",
    isPotager: false,
  },
  {
    date: "2024-07-01",
    collaborator: "Nicolas Z.",
    isPotager: true,
  },
  {
    date: "2024-07-01",
    collaborator: "Claire M.",
    isPotager: true,
  },
  {
    date: "2024-07-01",
    collaborator: "Quentin L.",
    isPotager: false,
  },
  {
    date: "2024-07-01",
    collaborator: "Sebastien R.",
    isPotager: true,
  },
  {
    date: "2024-07-02",
    collaborator: "Quentin L.",
    isPotager: false,
  },
  {
    date: "2024-07-02",
    collaborator: "Franck B.",
    isPotager: false,
  },
  {
    date: "2024-07-02",
    collaborator: "Nicolas Z.",
    isPotager: true,
  },
  {
    date: "2024-07-02",
    collaborator: "Sebastien R.",
    isPotager: true,
  },
  {
    date: "2024-07-02",
    collaborator: "Julie R.",
    isPotager: true,
  },
  {
    date: "2024-07-02",
    collaborator: "Julien V.",
    isPotager: false,
  },
  {
    date: "2024-07-03",
    collaborator: "Julien V.",
    isPotager: false,
  },
  {
    date: "2024-07-03",
    collaborator: "Sebastien R.",
    isPotager: true,
  },
  {
    date: "2024-07-03",
    collaborator: "Julie R.",
    isPotager: true,
  },
  {
    date: "2024-07-03",
    collaborator: "Nicolas Z.",
    isPotager: true,
  },
  {
    date: "2024-07-03",
    collaborator: "Claire M.",
    isPotager: true,
  },
  {
    date: "2024-07-04",
    collaborator: "Julien V.",
    isPotager: false,
  },
  {
    date: "2024-07-04",
    collaborator: "Nicolas Z.",
    isPotager: true,
  },
  {
    date: "2024-07-04",
    collaborator: "Claire M.",
    isPotager: true,
  },
  {
    date: "2024-07-04",
    collaborator: "Franck B.",
    isPotager: false,
  },
  {
    date: "2024-07-04",
    collaborator: "Sebastien R.",
    isPotager: true,
  },
  {
    date: "2024-07-04",
    collaborator: "Julie R.",
    isPotager: true,
  },
  {
    date: "2024-07-08",
    collaborator: "Franck B.",
    isPotager: false,
  },
  {
    date: "2024-07-08",
    collaborator: "Julie R.",
    isPotager: true,
  },
  {
    date: "2024-07-08",
    collaborator: "Quentin L.",
    isPotager: false,
  },
  {
    date: "2024-07-08",
    collaborator: "Nicolas Z.",
    isPotager: true,
  },
  {
    date: "2024-07-08",
    collaborator: "Claire M.",
    isPotager: true,
  },
  {
    date: "2024-07-08",
    collaborator: "Julien V.",
    isPotager: false,
  },
  {
    date: "2024-07-08",
    collaborator: "Sebastien R.",
    isPotager: true,
  },
  {
    date: "2024-07-09",
    collaborator: "Claire M.",
    isPotager: true,
  },
  {
    date: "2024-07-09",
    collaborator: "Quentin L.",
    isPotager: false,
  },
  {
    date: "2024-07-09",
    collaborator: "Julien V.",
    isPotager: false,
  },
  {
    date: "2024-07-10",
    collaborator: "Julie R.",
    isPotager: true,
  },
  {
    date: "2024-07-10",
    collaborator: "Julien V.",
    isPotager: false,
  },
  {
    date: "2024-07-10",
    collaborator: "Franck B.",
    isPotager: false,
  },
];

module.exports = {
  makePlanning,
};
