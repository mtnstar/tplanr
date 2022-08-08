# tplanr - tourenplanungs app

Für Skitouren, Hochtouren, Biketouren, usw. wird für die Information an die Teilnehmer oft ein Worddokument erstellt. Dies beinhaltet Informationen wie eine Materialliste, Tourenbeschrieb, Übernachtungsinfos, Treffpunkt, Kosten usw. und wird in der Regel als PDF per E-Mail an die Teilnehmer verschickt.
Mit tplanr soll eine Webapp entstehen, welche diese manuell erstellten PDFs ersetzen soll. Den Teilnehmern kann per Link die Toureninformationen zugestellt werden. Für eine erste Version bzw. für das CAS FEE Projekt 2 soll der Fokus auf der Materialliste, Tourenbeschrieb sowie Tourenetappen liegen.

## Module

### User Module

Tourenmanager können sich einloggen um Touren und Materiallisten zu verwalten (CRUD). 

### Security

Rollen: Admin, Tourmanager, Tourenteilnehmer (Anonym)

Für jede Tour wird eine URL mit einem unique Key erstellt. Dieser Link kann an die Teilnehmer verschickt werden. Teilnehmer haben vorerst read-only access.

### Touren

### Materialliste

### Etappen
