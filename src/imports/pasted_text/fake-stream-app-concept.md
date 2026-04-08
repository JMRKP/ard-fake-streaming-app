# 🎬 Fake-Streaming-App "3 Minuten" (für Filmaufnahmen)

## 🧩 Grundkonzept

Eine fiktive App (ähnlich wie BeReal) namens "3 Minuten", bei der Nutzer live streamen. Alle Nutzer werden gleichzeitig benachrichtigt, ein Benutzer wird zufällig als Streamer ausgewählt. Er broadcastet, all anderen schauen zu.
Um zu gewinnen muss der Sender die Zuschauerzahlen (Views) über 3 Minuten halten. Fallen sie vorher unter einen bestimmten Schwellwert, verliert der Spieler, kann der Spieler die Zuschauerzahlen über dem Schwellwert halten, gewinnt er (Gamification).

Die App hat **zwei Hauptmodi**:

* **Sender (Streamer)**
* **Empfänger (Viewer)**

---

# 📱 1. Modus: Sender (Streamer)

## 🔹 Startzustand

* Schwarzer Bildschirm
* Optional:

  * Start per:

    * Button
    * Timer/Delay
    * Fernsteuerung (z. B. für Filmcrew)

---

## 🔹 Countdown-Phase

* Countdown (9 → 1)
* Anzeige:

  * visuell hervorgehoben (Farbe/Animation)

---

## 🔹 Live-Phase

Nach Countdown:

### 🎥 Kamera

* Frontkamera automatisch aktiv
* Möglichkeit zum Wechsel:

  * Button ODER
  * Swipe-Geste

---

### 📊 UI-Elemente während Stream

* **Skala (Erfolg)**

  * "Peak-O-Meter" Farbig / abstrakt (z. B. von gelb (hoch) → nach rot (teif))

* **Timer**

  * zählt hoch bis **3 Minuten**

---

## 🔹 Ergebnis-Phase (nach 3 Minuten)

### 🟢 Szenario 1: Erfolg

* Peak-O-meter bleibt 3 Minuten oberhalb des Schwellwerts
* Ergebnis:

  * „YOU WON“
  * Gewinnanzeige (verschiedene Stufen möglich)

### 🔴 Szenario 2: Misserfolg

* Peak-O-meter fällt vor Ablauf der 3 Minuten unterhalb des Schwellwerts
* Ergebnis:

  * „YOU LOSE“

---

## 🔹 Film-Features (sehr wichtig)

* Fersteuerbarkeit der App
  * Startscreens (Viewer, Sender, Countdown, Live-Phase) sollen wählbar sein
  * Startzeit soll wählbar sein: Countdown 3 -> 1, Live-Phase ab Minute 1
  * Peak-O-Meter soll steuerbar sein
* Alternativ: Sender-Mode unterstützt mehrere vorproudzierte Variante
  * Streamer verliert nach 1:30 Minuten
  * Stream startet bei Min 2:00, Streamer verliert bei Minute 2:50 
  * Streamer gewinnt nach 3:00 Minuten
  * usw.

---

# 👀 2. Modus: Viewer (Zuschauer)

## 🔹 Start

* Countdown (andere Farbe als Sender)

---

## 🔹 Wiedergabe

* Anzeige eines **vorproduzierten Videos**
* UI simuliert Live-Stream:

  * View-Zahlen

---

# Look and Feel

* Die App verwendet aufwendige Animationen mit Glitches und Glow für Peak-O-Meter, Countdown und Timer
* das Feel erinnert ist an ein Game angelehnt, die Optik ist Retro und erinnert ein bisschen an Shooter wie Overwatch, Quake oder Fallout
* Die App ist im Vollbildmodus, es sind keine Betriebssystemspezifischen UI Elemente sichtbar
