# FindYourGift
Questo progetto è basato su un'applicazione web che utilizza le API di OpenAI per generare regali personalizzati in base alla descrizione fornita dall'utente. 

L'applicazione è realizzata utilizzando un backend Node.js con il framework Express e un database PostgreSQL per archiviare le ricerche degli utenti e i regali generati dalle API. Il frontend è sviluppato nativamente in HTML e CSS.

### Prerequisiti
Assicurati di avere installati i seguenti software prima di eseguire il progetto:

Node.js: https://nodejs.org

PostgreSQL: https://www.postgresql.org

### Installazione
Clona il repository GitHub:

$ git clone https://github.com/michele-porta/FindYourGift.git

Entra nella directory del progetto:

$ cd FindYourGift

Installa tutte le dipendenze del progetto, che puoi trovare nel file package.json, tramite il comando:

$ npm install *NomeDipendenza*

Crea un file di configurazione *.env* nella radice del progetto con le seguenti variabili:

PGUSER = postgres

PGHOST = localhost

PGPASSWORD = *YourPassword*

PGDATABASE = postgres

PGPORT = 5432

OPENAI_API = *your_openai_api_key*

Assicurati di sostituire username, password e nome_database con le tue credenziali di accesso al database PostgreSQL e your_openai_api_key con la tua chiave API di OpenAI.

Crea il database nel tuo server PostgreSQL:

$ createdb *nome_database*

Avvia il server backend:

$ node server.js

Apri il tuo browser e accedi a http://localhost:3000/home per visualizzare l'applicazione web.

### Utilizzo
Nella pagina principale dell'applicazione, inserisci una breve descrizione della persona per cui desideri trovare delle idee regalo.

Ad esempio: *Ragazzo di 24 anni, universitario, con la passione per il calcio ed i fumetti*

Fai clic sul pulsante "Search" per inviare la descrizione al server.

Il server utilizzerà l'API di OpenAI per generare una lista di regali basato sulla descrizione fornita.

Le idee regalo generate verranno visualizzato nella homepage dopo un periodo di attesa dovuto alla generazione stessa da parte di ChatGPT.

Puoi visualizzare i regali più desiderati e le ricerche più frequenti direttamente dal menù.

### Contributi
Sono benvenuti contributi al progetto! Se desideri contribuire, segui i passaggi seguenti:

Clona il tuo fork in locale:

$ git clone https://github.com/michele-porta/GiftyGPT.git

Crea un branch per il tuo lavoro:

$ git checkout -b nome_branch

Fai le modifiche e committa i tuoi cambiamenti:

$ git commit -m "Descrizione delle modifiche"

Pusha le modifiche sul tuo fork:

$ git push origin nome_branch

Apri una pull request sul repository originale su GitHub.
