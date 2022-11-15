![logo-full.png](https://app-ginkgo.web.app/assets/images/logo-full.png)

Progetto indipendente che si pone l’obbiettivo di creare uno strumento dinamico che semplifichi la raccolta, la
manipolazione, l’analisi e la visualizzazione, anche in modalità live, dei dati raccolti da dispositivi di differente
tipologia e ssttore di applicazione.

Ad oggi Ginkgo permette la raccolta delle
seguenti [tipologie di](https://www.notion.so/Metriche-edc625d412144db3b10b27173c72a7d3) [dati](https://www.notion.so/Metriche-edc625d412144db3b10b27173c72a7d3):

- [Geolocalizzazione (GPS)](https://www.notion.so/Geolocalizzazione-GPS-8d67fcabe495487ea0e3dc57a83321c8)
- [Frequenza Cardiaca](https://www.notion.so/Frequenza-Cardiaca-2b5f57cc2ff349f1bb81893529bd0e98)
- [Previsioni Meteo](https://www.notion.so/Meteo-ec421fef30304399aaa3325dbbafe53d) Geolocalizzate

I parametri possono essere raccolti utilizzando i seguenti **dispositivi**:

- Smarthphone IOS/Android
- Tablet IOS/Android
- Mac OS
- Fascia cardio BLE modello HRM
- PRIVATE API
- PUBLIC API
- MQTT/S

# From zero to Ginkgo hero! 🦸‍♂️

### Raccolta dati

Attualmente la modalità di raccolta dati avviene tramite App mobile la quale permette di visualizzare in real time la
tua posizione GPS attraverso una mappa interattiva, in aggiunta è possibile richiedere le previsioni meteo relative alla
posizione in cui ci si trova e connettendo tramite BLE una fascia cardio è possibile registrare la frequenza cardiaca.

Tutti questi dati vengono salvati come flusso dati temporale all’interno di un database non relazionale per poi poterli
successivamente analizzare.

E’ anche possibile trasmettere il flusso dati in real time a tutti gli utenti connessi allo streaming video (Ginkgo
eSport).

☀️ **Soluzioni disponibili:**

1. Device IoT + AWS Cloud + Time Series DB [Coming soon…]
2. Device BLE + App Mobile
3. Strava Account [Coming soon…]
4. GPX Files
5. API Private

### Rielaborazione dati

Tramite le funzionalità **Studio** dell’applicazione è possibile manipolare il dato in differenti modalità: creazione di
micro analisi di specifiche porzioni di dati o temporali, pulizia di eventuali errori di lettura o di porzioni di dati
malevoli al fine di analisi, aggiunta di dati manuale, calibrazione dei valori e decimazione dei dati.

### Analisi dati

I risultati delle analisi vengono **calcolate live** se i dispositivi sono connessi all’app mobile **o in un secondo
momento** caricando i dati sempre tramite app al termine del periodo di raccolta.

Una volta generata la prima analisi sarà possibile modificarne le configurazioni e ricalcolare a proprio piacimento.

Attualmente sono state inserite le seguenti metriche:
M[etrics book](https://www.notion.so/Metriche-edc625d412144db3b10b27173c72a7d3)

E possibile configurare soglie valore, range, scostamenti %, puoi anche provare a scrivere direttamente le tue formule
nei fogli di calcolo che ti vengono messi a
disposizione[.](https://www.notion.so/Studio-3af9a794980b4bd89b56ddb8e3b81a3d)

### Presentazione dati

Soluzioni attualmente disponibili:

**Applicazione**

Tramite l’applicazione sarà possibile consultare tutti i dati raccolti e le relative metriche calcolate tramite:
tabelle, grafici interattivi, mappe, contatori e molto altro ancora.

**Export**

Forniamo anche molteplici opzioni di esportazione dei dati: XLM, JSON, CSV, IMAGE Report, PDF Report, GPX e API Private.

**Ginkgo eSport**

E stato introdotta la possibile di effettuare uno streaming live dei una sessione di raccolta dati comprensiva di tutte
le metriche calcolate a quell’istante.

Questo strumento permetterà anche ad altri utenti di poter visualizzare in tempo reale la tua sessione di raccolta dati
direttamente in app o di connettere un servizio proprietario per ampliare infinitamente le possibilità.

# Demo App

🌐 [WEB](https://app.myginkgo.tech/login)

📱 [ANDROID](https://firebasestorage.googleapis.com/v0/b/ginkgo-8b79b.appspot.com/o/SDK_ANDROID%2Fapp-debug.apk?alt=media&token=00e9c257-52e7-4790-803f-06f8d6271890)

# Requisiti di sistema :)

**Web App Hybrid**

- Ionic (Angular ❤️)
- Capacitor
- Leaflet
- ChartJs
- VideoJs
- Tailwind

**MicroServices**

*Sport Analytics*

- NodeJs (Express)
- MongoDB 🔥

Identity Manager

- Java (Spring Boot 💡)
- SQL Server DB

**Cloud**

AWS 💪🏻

Firebase

**Dispositivi**

*Coming soon…*

# Parliamo di futuro?

### 💻DEV ROADMAP:

### Il nostro piano di lavoro sempre disponibile su [Github](https://github.com/my-ginkgo).

### 🚀COMMUNITY ROADMAP:

### Il nostro piano di lavoro sempre disponibile su [Notion](https://www.notion.so/eb23a4f0ec634163a3823a83ec0b08c2).

# Contatti

**EMAIL** 📮

*Support:* support@myginkgo.tech

*Info:* hello@myginkgo.tech

### Il nostro canale [Discord](https://discord.gg/7jkEMHZ4):

[Join the MyGinkgo Discord Server!](https://discord.com/invite/7jkEMHZ4)



# --- UTILS

npm login --scope=@my-ginkgo --registry=https://npm.pkg.github.com/
