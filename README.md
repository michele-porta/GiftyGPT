# FindYourGift
Questo progetto è basato su un'applicazione web che utilizza le API di OpenAI per generare regali personalizzati in base alla descrizione fornita dall'utente. 

L'applicazione è realizzata utilizzando un backend Node.js con il framework Express e un database PostgreSQL per archiviare le ricerche degli utenti e i regali generati dalle API. Il frontend è sviluppato in HTML e CSS.

### Prerequisiti
Assicurati di avere installati i seguenti software prima di eseguire il progetto:

Node.js: https://nodejs.org

PostgreSQL: https://www.postgresql.org

### Installazione
Clona il repository GitHub:

$ git clone https://github.com/tuonome/progetto-regali.git

Entra nella directory del progetto:

$ cd progetto-regali

Installa le dipendenze del backend:

$ npm install

Crea un file di configurazione .env nella radice del progetto con le seguenti variabili:

DATABASE_URL=postgres://username:password@localhost:5432/nome_database

OPENAI_API_KEY=your_openai_api_key

Assicurati di sostituire username, password e nome_database con le tue credenziali di accesso al database PostgreSQL e your_openai_api_key con la tua chiave API di OpenAI.

Crea il database nel tuo server PostgreSQL:

$ createdb nome_database

Avvia il server backend:

$ npm start

Apri il tuo browser e accedi a http://localhost:3000 per visualizzare l'applicazione.

### Utilizzo
Nella pagina principale dell'applicazione, inserisci una descrizione della persona per cui desideri trovare un regalo nel campo di input fornito.

Fai clic sul pulsante "Search" per inviare la descrizione al server.

Il server utilizzerà l'API di OpenAI per generare una lista di regali basato sulla descrizione fornita.

I regali generato verrà visualizzato nella homepage dopo un periodo di attesa dovuto alla generazione stessa da parte di ChatGPT.

Puoi visualizzare i regali più desiderati e le ricerche più frequenti direttamente dal menù.

### Contributi
Sono benvenuti contributi al progetto! Se desideri contribuire, segui i passaggi seguenti:

Fai il fork del repository su GitHub.

Clona il tuo fork in locale:

$ git clone https://github.com/michele-porta/findYourGift.git

Crea un branch per il tuo lavoro:

$ git checkout -b nome_branch

Fai le modifiche e committa i tuoi cambiamenti:

$ git commit -m "Descrizione delle modifiche"

Pusha le modifiche sul tuo fork:

$ git push origin nome_branch

Apri una pull request sul repository originale su GitHub.

### Licenza
Il progetto è concesso in licenza secondo i termini della licenza MIT. Consulta il file LICENSE per ulteriori informazioni.

### Contatti
Se hai domande o dubbi, puoi contattarmi all'indirizzo email michele.porta@protonmail.com.
