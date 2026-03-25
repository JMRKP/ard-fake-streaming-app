Hier ist deine Idee einmal sauber strukturiert – so, wie man sie z. B. für ein Drehteam oder Entwickler briefen würde:

---

# 🎬 Fake-Streaming-App (für Filmaufnahmen)

## 🧩 Grundkonzept

Eine fiktive App (ähnlich wie BeReal), bei der Nutzer live streamen.
Je mehr Zuschauer („Views“) ein Stream erreicht, desto höher die Gewinnchance (Gamification).

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

* Countdown (z. B. 10 → 0 oder 9 → 0)
* Anzeige:

  * Text: „DU BIST DRAN“
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

* **View-Anzeige**

  * Zahl (z. B. 12.4k Zuschauer)
  * UND/ODER visuelle Skala („Peak-O-Meter“)
* **Skala (Erfolg)**

  * Farbig / abstrakt (z. B. von rot → grün)
* **Timer**

  * zählt hoch bis **3 Minuten**

---

## 🔹 Ergebnis-Phase (nach 3 Minuten)

### 🟢 Szenario 1: Erfolg

* Skala steigt kontinuierlich
* Ergebnis:

  * „YOU WON“
  * Gewinnanzeige (verschiedene Stufen möglich)

### 🔴 Szenario 2: Misserfolg

* Skala fällt
* Ergebnis:

  * „YOU LOSE“

---

## 🔹 Film-Features (sehr wichtig)

* Zeit:

  * pausieren
  * vorspulen
  * resetten
* ggf.:

  * Zustände manuell triggern (Win/Lose)

---

# 👀 2. Modus: Viewer (Zuschauer)

## 🔹 Start

* Countdown (andere Farbe als Sender)

---

## 🔹 Wiedergabe

* Anzeige eines **vorproduzierten Videos**
* UI simuliert Live-Stream:

  * View-Zahlen
  * evtl. Chat/Overlay (optional)

---

