/**
 * Code de base, ne pas modifier
 */

// Définition
const boutonVoyageHTML = document.querySelector(".btn-voyage");
const localisationEpoqueHTML = document.querySelector(".localisation_epoque");
const listeArtefactHTML = document.querySelector(".liste_artefacts");
const formChoixEpoqueHtml = document.querySelector(".form__choix_epoque");
const formRechercheArtefact = document.querySelector(
  ".form__recherche_artefact"
);

const creerLesChoixEpoque = (epoques) => {
  const selectHtml = formChoixEpoqueHtml.querySelector("select");
  Object.entries(epoques).forEach(([id_epoque, nom_epoque]) => {
    const option = document.createElement("option");
    option.value = id_epoque;
    option.text = nom_epoque;
    selectHtml.appendChild(option);
  });
};

function generationNombreAleatoireEntre(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Permet d'afficher l'époque de destination du voyage
const afficherDestination = (nomEpoque) =>
  (localisationEpoqueHTML.textContent = nomEpoque);

// Permet d'afficher un artefact trouvée, ou non, à une époque
const afficherRechercheArtefact = ({ artefact, epoque, success = true }) => {
  const li = document.createElement("li");
  li.textContent = `${success ? "✅" : "❌"} ${artefact} (Epoque ${epoque})`;
  listeArtefactHTML.appendChild(li);
};

// Execution

// Gestion envoi formulaire choix époque
formChoixEpoqueHtml.addEventListener("submit", (event) => {
  event.preventDefault();
  const epoque = new FormData(formChoixEpoqueHtml).get("epoque");

  if (!epoque) {
    alert("Choisie une époque de voyage temporel Chronos !");
    return;
  }

  quandEpoqueChoisie(epoque);
});

// Gestion envoi formulaire recherche artelefact
formRechercheArtefact.addEventListener("submit", (event) => {
  event.preventDefault();
  const artefact = new FormData(formRechercheArtefact).get("artefact");
  quandRechercheArtefact(artefact);
});

/**
 * Votre partie commence ici, la partie modifiable par vos soins
 */

function main() {
  // Sera modifié par le dernier exercice
  const epoques = {
    romaine: "Romaine",
    medievale: "Médievale",
    jurassique: "Jurassique",
  };

  // Création dynamique des époques de destination de la machine temporelle
  creerLesChoixEpoque(epoques);
}

main();

// Permet d'être réutilisé dans la fonction quandRechercheArtefact
let nomEpoqueActuelle;

/**
 * Exercice 1 - Le Téléporteur Temporel
 */

const hideEpoque = document.querySelector(".localisation_epoque");
const loaderTravel = document.querySelector(".voyage_en_cours");

/**
 * Fonction permettant de cacher le document html avec la class "voyage_en_cours" * puis d'afficher le document html avec la class "localisation_epoque" et lui
 * donné comme valeur la constante nomEpoqueActuelle.
 */
function whenTravelFinish() {
  // Cache le document html avec la class "voyage_en_cours".
  loaderTravel.style.display = "none";
  // Affiche le document html avec la class "localisation_epoque".
  hideEpoque.style.display = "block";
  // Ecrit la valeur qui a dans la constante "nomEpoqueActuelle" dans le document html avec la class "localisation_epoque".
  hideEpoque.textContent = nomEpoqueActuelle;
}
/**
 * @param {String} nomEpoque - Reprend le nom d'époque du select du formulaire.
 * @param {Function} callback - Fonction callback une fois le voyage
 * terminé.
 */
function voyagezTemps(nomEpoque, callback) {
  // Execute la fonction "whenTravelFinish" au bout d'un timer aléatoire (entre 1000 et 3000ms).
  setTimeout(function () {
    callback(nomEpoque);
  }, generationNombreAleatoireEntre(1000, 3000));
}

/**
 * Gère l'affichage lors de la sélection d'une époque.
 * @param {string} nomEpoque - Reprend le nom d'époque du select du formulaire.
 */
function quandEpoqueChoisie(nomEpoque) {
  nomEpoqueActuelle = nomEpoque;
  // Cache le document html avec la class "localisation_epoque".
  hideEpoque.style.display = "none";
  // Affiche le document html avec la class "voyage_en_cours".
  loaderTravel.style.display = "block";

  // Execute la fonction voyagezTemps.
  voyagezTemps(nomEpoque, whenTravelFinish);
}

/**
 * Exercice 2 - La Collecte d'Artefact Mystère
 */
const searchArtefact = document.querySelector(".recherche_en_cours");

function recolteArtefact(success, artefact) {
  afficherRechercheArtefact({
    artefact,
    epoque: nomEpoqueActuelle,
    success,
  });

  searchArtefact.style.display = "none";
}

function collecterArtefact(nomArtefact, callback) {
  console.log("Je suis en train de collecter");
  const collecte_reussie = Math.random() * 100 >= 50;
  setTimeout(function () {
    callback(collecte_reussie, nomArtefact);
  }, generationNombreAleatoireEntre(1000, 3000));
}

// Fonction appelée plus haut quand le formulaire de recherche d'artefact est envoyé
function quandRechercheArtefact(nomArtefact) {
  searchArtefact.style.display = "block";
  collecterArtefact(nomArtefact, recolteArtefact);
}
