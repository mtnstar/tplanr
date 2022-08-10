<img src="https://github.com/mtnstar/tplanr/raw/main/doc/gfx/export/logo.svg" width="300" />

# tplanr - tourenplanungs web app - Grobkonzept

Für Skitouren, Hochtouren, Biketouren, usw. wird für die Information an die Teilnehmer oft ein Worddokument erstellt. Dies beinhaltet Informationen wie eine Materialliste, Tourenbeschrieb, Übernachtungsinfos, Treffpunkt, Kosten usw. und wird in der Regel als PDF per E-Mail an die Teilnehmer verschickt.
Mit tplanr soll eine Webapp entstehen, welche diese manuell erstellten PDFs ersetzen soll. Den Teilnehmern kann per Link die Toureninformationen zugestellt werden. Für eine erste Version bzw. für das CAS FEE Projekt 2 soll der Fokus auf der Materialliste, Tourenbeschrieb sowie Tourenetappen liegen.

## Module

### User Module

Tourenmanager können sich einloggen um Touren und Materiallisten zu verwalten (CRUD). 

### Security

Rollen: Admin, Tourmanager, Tourenteilnehmer (Anonym)

Für jede Tour wird eine URL mit einem unique Key erstellt. Dieser Link kann an die Teilnehmer verschickt werden. Teilnehmer haben vorerst read-only access. Admins können Tourenmanager und deren Logins verwalten (CRUD)

### Tourenverwaltung inkl. Etappen

* Tourenmanager und Admins können Touren verwalten (CRUD)
* Tour wird einer Sportart zugewiesen. Sportarten sind fix im System hinterlegt: Hochtouren Sommer, Skitouren, Mountainbike, Wandern, Klettern
* Tourenmanager können Sections einer Tour verwalten (CRUD)
* Sectiontypes: Transfer, Übernachtung, Etappe
* Optional: Einer Etappe kann eine GPX Datei angehängt werden und eine Karte wird der Route wird via Swisstopo gerendert (nur CH)

![Touren Etappen](https://github.com/mtnstar/tplanr/raw/main/doc/prep/tplanr_wf1_touretappen.png)

![Touren Teilnehmer](https://github.com/mtnstar/tplanr/raw/main/doc/prep/tplanr_wf2_teilnehmer.png)

![Touren Overview](https://github.com/mtnstar/tplanr/raw/main/doc/prep/tplanr_wf4_touren.png)

### Materialliste

* Tourenmanager können Materiallisten die an Touren hängen verwalten (CRUD)
* Materiallisten haben vordefinierte Kategorien und gehören einer Sportart an
* Materiallisten können als Vorlage abgespeichert werden
* Teilnehmer können abhaken welche Gegenstände sie bereits eingepackt haben. Die Persistierung von welcher Tour welches Material bereits gepackt wurde erfolgt vorerst auf dem Endgerät im local storage
* Admins können die global verfügbaren Items verwalten, Tourenmanager können eigene Items erstellen, es gibt auch tourenspezifische Items
* Beim Zusammenstellen/Bearbeiten einer Materialliste werden beim Hinzufügen von Items dem Tourenmanager Vorschläge gemacht (typeahead)
* Es gibt auch global verfügbare Vorlagen für Materiallisten
* Optional: Admins können benutzerspezifische Items und Vorlagen in global verfügbare umwandeln sowie Duplikate zusammenführen

![Materialliste Teilnehmer](https://github.com/mtnstar/tplanr/raw/main/doc/prep/tplanr_wf3_matlistecheck.png)

### PDF Generierung

* Clientseitiges Generieren der Materialliste als PDF
* PDF enthält einen QR Code mit dem Link auf die Tour/Materialliste
* Optional: Clientseitiges Generieren des Tourenbeschriebs und Etappen

## Technisches

### Frontend

* React/Redux mit Typescript
* PDF lib wie z.B. react-pdf
* Vorbereitet für Mehrsprachigkeit (i18n lib), UI vorerst aber nur in Deutsch

### Backend

* Ruby on Rails
* Anbindung Frontend via Websockets
* evtl. teilweise Verwendung von REST wo viel sinnvoller (Typeahead, ...)


#### ERD


![ERD](https://github.com/mtnstar/tplanr/raw/main/doc/prep/tplanr_erd.png)
