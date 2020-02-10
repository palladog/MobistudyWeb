export default {
  privacyPolicy: {
    collectedData: `Quali dati personali verranno raccolti?
\u2022 Le informazioni sul tuo profilo generale com indirizzo email, nome, cognome, data di nascita, paese, lingua, condizioni di salute principali, medicamenti a lungo termine e stile di vita.
\u2022 La tua partecipazione agli studi and le volte che completi un attivitá di monitoraggio.
\u2022 Informazioni tecniche riguardo l'accesso al server (p.e. login) per motivi di sicurezza e verifica.`,
    collectedDataForm: `\u2022 Le risposte fornite al questionario {formName}.`,
    collectedDataQuery: `\u2022 {dataType} forniti da Google Fit (Android) o HealthKit (iPhone).`,
    storage: `Dove saranno conservati questi dati?
Sul telefono:
\u2022 Il tuo profilo.
\u2022 Le tue attivitá riguardanti gli studi di ricerca.
Sui server Mobistudy:
\u2022 I dati menzionati al punto precedente.
\u2022 Informazioni di sicurezza e verifica.`,
    access: `Chi avrá accesso ai miei dati?
\u2022 Personale tecnico dell'Unievrsitá di Malmö. Motivo: manutenzione e verfica tecnica.`,
    accessInstitution: `\u2022 {institution}`,
    accessReason: `. Motivo: {reason}`,
    rights: `Quali sono i miei diritti?
\u2022 Puoi ritirarti da uno studio in qualunque momento. I dati che avrai prodotto fino a quel momento verranno conservati.
\u2022 Puoi rimuovere il tuo account da Mobistudy. In questo caso cancelleremo tutti i tuoi dati, inclusi quelli prodotti per gli studi di ricerca, eccetto i log tecnici (che verranno conservati per motivi di sicurezza per una durata non superiore ai 5 anni).
\u2022 Puoi scaricare i tuoi dati in un formato leggibile da un computer. Manda una mail a info@mobistudy.org nel caso ne avessi bisogno.`,
    contacts: `Per atre domande, contatta uno dei ricercatori responsabili:`,
    piContact: `{name} presso: {contact}`
  },
  consent: {
    taskItemDataQuery: `Consento di inviare i miei dati relativi a {dataType}, {scheduling}`,
    taskItemForm: `Consento di rispondere al questionario {formName} {scheduling}.`
  },
  scheduling: {
    notDefined: 'Non definito',
    fromDaysConsented: `Il giorno dopo aver dato il consenso | {n} giorni dopo aver dato il consenso`,
    untilDaysConsented: `Fino a {n} giorno dopo aver dato il consenso`,
    occurrences: `Ripetuto {n} volte`,
    repeatedDays: `Ogni giorno | Ogni {n} giorni`,
    repeatedWeeks: `Ogni settimana | Ogni {n} settimane`,
    repeatedMonths: `Ogni mese | Ogni {n} mesi`,
    repeatedYears: `Ogni anno | Ogni {n} anni`,
    onMonths: `Nei seguenti mesi`,
    onDaysMonth: `Nei seguenti giorni del mese`,
    onDaysWeek: `Nei seguenti gorni della settimana`
  },
  months: {
    '1': 'Gennaio',
    '2': 'Febbraio',
    '3': 'Marzo',
    '4': 'Aprile',
    '5': 'Maggio',
    '6': 'Giugno',
    '7': 'Luglio',
    '8': 'Agosto',
    '9': 'Settembre',
    '10': 'Ottobre',
    '11': 'Novembre',
    '12': 'Dicembre'
  },
  weekDays: {
    'mo': 'lunedi',
    'tu': 'martedi',
    'we': 'mercoledi',
    'th': 'giovedi',
    'fr': 'venerdi',
    'sa': 'sabato',
    'su': 'domenica'
  },
  healthDataTypes: {
    'steps': 'Passi',
    'weight': 'Peso',
    'height': 'Altezza',
    'activity': 'Attivita\'',
    'heart_rate': 'Frequenza cardiaca',
    'heart_rate_variability': 'Varaibilita\' della frequenza cardiaca',
    'calories': 'Calorie',
    'distance': 'Distanza percorsa'
  }
}
