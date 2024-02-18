Nachdem sich die HTL-IT als unerwartet komplex herausgestellt hat, haben wir jetzt unsere Alternativ-Lösung mit Cloudflare Tunnels evaluiert:

* (Persistente) Cloudflare Tunnels können nur von Accounts erstellt werden, welche eine Domain bei Cloudflare haben.
* Eine Weiterleitung von der HTL-Domain auf eine andere Domain bei Cloudflare (mittels CNAME) ist leider nicht möglich.
  * Bei einer HTTP-Anfrage wird nämlich dann nur die IP vom Cloudflare-Server und der Domain-Name der HTL-Domain gesendet, was beides nicht zu einem Cloudflare-Kunden oder einer Domain zuweisbar ist.
* Cloudflare Tunnel oder vergleichbare Anbieter (wobei Cloudflare zweifelslos der verlässlichste und beste ist) sind die einzige Möglichkeit, wie Synopsis von Außen erreichbar ist (was nicht zwingend erforderlich ist, aber praktisch wäre)

Da wir (und Browser; siehe Secure Contexts) eine reine HTTP-Verbindung für ein Projekt dieser Art als ungeeignet empfinden bleiben noch zwei Möglichkeiten: Selbstsignierte und "echte" TLS-Zertifikate

* Selbstsignierte Zertifikate haben laut Heimo bereits zu vielen Problemen geführt und ob diese für den Browser als Secure Context durchgehen ist zweifelhaft
* Ein "echtes" Zertifikat könnte von Let's-Encrypt kostenfrei bezogen werden. Dafür ist aber eine Challenge als Besitz-Nachweis notwendig.
  * Ohne Erreichbarkeit von Außen ist nur die DNS-Challenge möglich. Hierfür muss ein generierter String als DNS-Eintrag im World4You-Adminbereich als DNS-Eintrag hinzugefügt werden.
  * Let's Encrypt Zertifikate sind nur maximal 90 Tage gültig und müssen regelmäßig erneuert werden (also auch die Challenge neu)
  * Da dies wahrscheinlich keiner manuell durchführen möchte gibt es die Möglichkeit dies automatisch durchführen zu lassen, dafür sind aber die World4You Zugangsdaten notwendig.

Somit ergeben sich für uns folgende Möglichkeiten:

1. Die htl-grieskirchen.at Domain (oder alternativ eine andere) auf Cloudflare umstellen. Dies ist ein Prozess von 10 Minuten, da alle bestehenden DNS-Einträge automatisch importiert werden. Jedoch muss dann auch in Zukunft Cloudflare für das DNS-Management verwendet werden. Es ist *nicht* notwendig, dass die Daten von bestehenden Webseiten etc. durch Cloudflare fließen, da Cloudflare auch als reiner DNS-Server verwendet werden kann. Für die Performance der Webseite würden die kostenlosen Dienste aber auch nicht schaden. Nur für den Netzwerkverkehr von Synopsis ist der Umweg durch ein Cloudflare-Rechenzentrum wegen dem Tunnel zwingend notwendig.
   
   1. Explizit hervorheben möchte ich noch, dass alle Dienste von Cloudflare welche für dieses Projekt und vermutlich auch in Zukunft benötigt werden völlig kostenfrei sind und das Festlegen von Cloudflare als DNS-Server die Kontrolle über die Domain *nicht* übergibt.

2. Synopsis wird nur innerhalb des Schulnetzwerks verwendet und die World4You-Zugangsdaten können für die Zertifikaterstellung bereitgestellt werden. Die VM kann so vorbereitet werden, dass nach der Übergabe nur mehr die Zugangsdaten eingefügt werden müssen und dann (hoffentlich) kein weiterer Kontakt unsererseits notwendig ist. (heißt die Zugangsdaten bleiben geheim)

3. Synopsis wird auf einem gemieteten Server (z.B. [netcup](https://www.netcup.de/bestellen/produkt.php?produkt=2948)) außerhalb des Schulnetzwerks betrieben und kann mit einem VPN zu LDAP kommunizieren.

Von uns würde der erste Ansatz klar bevorzugt werden, da es einfacher ist, mehr bringt und ein "besserer" DNS-Anbieter als World4You sicher in Zukunft nochmal praktisch werden wird, wenn beispielsweise ein weiteres SYP-Projekt deployed wird.
