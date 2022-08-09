# tplanr - tourenplanungs app

Für Skitouren, Hochtouren, Biketouren, usw. wird für die Information an die Teilnehmer oft ein Worddokument erstellt. Dies beinhaltet Informationen wie eine Materialliste, Tourenbeschrieb, Übernachtungsinfos, Treffpunkt, Kosten usw. und wird in der Regel als PDF per E-Mail an die Teilnehmer verschickt.
Mit tplanr soll eine Webapp entstehen, welche diese manuell erstellten PDFs ersetzen soll. Den Teilnehmern kann per Link die Toureninformationen zugestellt werden. Für eine erste Version bzw. für das CAS FEE Projekt 2 soll der Fokus auf der Materialliste, Tourenbeschrieb sowie Tourenetappen liegen.

## Module

### User Module

Tourenmanager können sich einloggen um Touren und Materiallisten zu verwalten (CRUD). 

### Security

Rollen: Admin, Tourmanager, Tourenteilnehmer (Anonym)

Für jede Tour wird eine URL mit einem unique Key erstellt. Dieser Link kann an die Teilnehmer verschickt werden. Teilnehmer haben vorerst read-only access.

### Tourenverwaltung und Etappen

* Tourenmanager und Admins können Touren verwalten (CRUD)
* Tour wird einer Sportart zugewiesen. Sportarten sind fix im System hinterlegt: Hochtouren Sommer, Skitouren, Mountainbike, Wandern
* 

### Materialliste

* Tourenmanager können Materiallisten die an Touren hängen verwalten (CRUD)
* Materiallisten haben vordefinierte Kategorien und gehören einer Sportart an
* Materiallisten können als Vorlage abgespeichert werden
* Teilnehmer können abhaken welche Gegenstände sie bereits eingepackt haben. Die Persistierung von welcher Tour welches Material bereits gepackt wurde erfolgt vorerst auf dem Endgerät im local storage

### PDF Generierung

* Clientseitiges Generieren der Materialliste als PDF
* PDF enthält einen QR Code mit dem Link auf die Tour/Materialliste
* Optional: Clientseitiges Generieren des Tourenbeschriebs und Etappen

## Technisches

### Backend

* Ruby on Rails
* 
