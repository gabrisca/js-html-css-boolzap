// Milestone 1
// Replica della grafica con la possibilità di avere messaggi scritti dall’utente (verdi) e dall’interlocutore (bianco) assegnando due classi CSS diverse
// Visualizzazione dinamica della lista contatti: tramite la direttiva v-for, visualizzare nome e immagine di ogni contatto

// Milestone 2
// Visualizzazione dinamica dei messaggi: tramite la direttiva v-for, visualizzare tutti i messaggi relativi al contatto attivo all’interno del pannello della conversazione
// Click sul contatto mostra la conversazione del contatto cliccato

// Milestone 3
// Aggiunta di un messaggio: l’utente scrive un testo nella parte bassa e digitando “enter” il testo viene aggiunto al thread sopra, come messaggio verde
// Risposta dall’interlocutore: ad ogni inserimento di un messaggio, l’utente riceverà un “ok” come risposta, che apparirà dopo 1 secondo.

// Milestone 4
// Ricerca utenti: scrivendo qualcosa nell’input a sinistra, vengono visualizzati solo i contatti il cui nome contiene le lettere inserite (es, Marco, Matteo Martina -> Scrivo “mar” rimangono solo Marco e Martina)

const app = new Vue({
  el: "#app",
  data: {
    msgUtente: "",
    activeUser: 0,
    notice: false,
    searchName: "",
    removeMenu: false,
    activeMsg: 0,
    user: {
      name: "Nome utente",
      avatar: "_io",
    },
    contacts: [
      {
        name: "Michele",
        avatar: "_1",
        visible: true,
        messages: [
          {
            date: "10/01/2020 15:30:55",
            text: "Hai portato a spasso il cane?",
            status: "sent",
          },
          {
            date: "10/01/2020 15:50:00",
            text: "Ricordati di dargli da mangiare",
            status: "sent",
          },
          {
            date: "10/01/2020 16:15:22",
            text: "Tutto fatto!",
            status: "received",
          },
        ],
      },
      {
        name: "Fabio",
        avatar: "_2",
        visible: true,
        messages: [
          {
            date: "20/03/2020 16:30:00",
            text: "Ciao come stai?",
            status: "sent",
          },
          {
            date: "20/03/2020 16:30:55",
            text: "Bene grazie! Stasera ci vediamo?",
            status: "received",
          },
          {
            date: "20/03/2020 16:35:00",
            text: "Mi piacerebbe ma devo andare a fare la spesa.",
            status: "sent",
          },
        ],
      },
      {
        name: "Samuele",
        avatar: "_3",
        visible: true,
        messages: [
          {
            date: "28/03/2020 10:10:40",
            text: "La Marianna va in campagna",
            status: "received",
          },
          {
            date: "28/03/2020 10:20:10",
            text: "Sicuro di non aver sbagliato chat?",
            status: "sent",
          },
          {
            date: "28/03/2020 16:15:22",
            text: "Ah scusa!",
            status: "received",
          },
        ],
      },
      {
        name: "Luisa",
        avatar: "_4",
        visible: true,
        messages: [
          {
            date: "10/01/2020 15:30:55",
            text: "Lo sai che ha aperto una nuova pizzeria?",
            status: "sent",
          },
          {
            date: "10/01/2020 15:50:00",
            text: "Si, ma preferirei andare al cinema",
            status: "received",
          },
        ],
      },
    ],
    // array di risposte che poi rendo automatiche e random con funzione addMsg
    risposte: [
      "Perfetto! \ud83d\ude4c ",
      "Non sono d'accordo",
      "Daje!!!",
      "Marmellata \ud83d\ude0e",
      "OMG \ud83d\ude31",
      "A domani",
      "Ok \ud83d\ude09",
    ],
  },
  methods: {
    // funzione che carica dinamicamente gli avatar
    getAvatar(index) {
      return `assets/img/avatar${this.contacts[index].avatar}.jpg`;
    },
    // funzione che mi permette di visualizzare la chat dell'user selezionato
    seeMyChat(index) {
      this.activeUser = index;
      console.log(index);
    },
    // funzione che aggiunge la data (la richiamo nella funzione addMsg)
    // si puà usare anche day.js (vedi documentazione)
    // -!!!!!! sostituita con day.js !!!!!---
    addDate() {
      const date = new Date();
      let day = date.getDate();
      let month = date.getMonth();
      let year = date.getFullYear();
      let hour = date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();
      let dateC =
        day +
        "/" +
        month +
        "/" +
        year +
        " " +
        hour +
        ":" +
        minutes +
        ":" +
        seconds;
      return dateC;
    },
    // funzione che fa il push dentro l'array messages di msgUtente, dello status e di date
    addMsg(index) {
      if (this.msgUtente.length > 0) {
        this.contacts[index].messages.push({
          text: this.msgUtente,
          status: "sent",
          date: dayjs().format("DD/MM/YYYY HH:mm:ss"),
        });
        this.msgUtente = "";
        // imposto un messaggio standard con status received che compare dopo 1 secondo
        setTimeout(() => {
          this.contacts[index].messages.push({
            text: this.risposte[
              Math.floor(Math.random() * this.risposte.length)
            ],
            status: "received",
            date: dayjs().format("DD/MM/YYYY HH:mm:ss"),
          });
        }, 1000);
      }
    },
    // funzione che trasforma notice nel suo contrario. La applico al click sulla sezione notice-logo (HTML) e con un v-if mostro un font awsome al posto dell'altro
    sendNote() {
      this.notice = !this.notice;
    },
    removeIt(index){
        this.removeMenu = !this.removeMenu
        this.activeMsg = index
        console.log(this.activeMsg);
    },
    // funzione che restituisce la proprietà date dell'ultimo messaggio "received". Utilizzo filter per ottenere un nuovo array dove salvo solo messages con status receive
    lastMsgDate(index) {
      const newArray = this.contacts[index].messages.filter((message) => {
        // console.log(messages.date);
        if (message.status === "received") return message.date;
      });
      // console.log(newArray);
      return newArray[newArray.length - 1].date;
    },
    // funzione che restituisce i primi n(15) caratteri della proprietà text di utente attivo
    lastMsgText(index) {
      let newMsg =
        this.contacts[index].messages[this.contacts[index].messages.length - 1]
          .text;
      return newMsg.substring(0, 15) + "...";
    },
    // funzione per cercare un nome nell'ul !!!filter
    fSearch() {
      // trasformo il valore inserito in searchName in maiuscolo
      this.searchName = this.searchName.toUpperCase();
      // filtro l'array contacts in un nuovo array
      const newArray = this.contacts.filter((contact) => {
        if (contact.name.toUpperCase().includes(this.searchName)) {
          // se il valore cercato è incluso...
          contact.visible = true;
          return true;
        } else {
          // ...altrimenti visibile diventa false
          contact.visible = false;
          return false;
        }
      });
      // alla fine resetto il valore di searchName
      // this.searchName = "";
      console.log(newArray);
    },
    reset(){
      // resetto il valore di searchName
      this.searchName = "";
    }
  },
});
