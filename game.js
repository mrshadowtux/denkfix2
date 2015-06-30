$(document).ready
(
	function()
	{
		var fragenr=0;
		var fragengespielt=[];


		function zufallszahl(min,max)
		{
			return(min+Math.floor(Math.random()*(max-min)));
		}


		function fragencounter()
		{
			fragenr++;
			$("output#fragenummer").html("Frage "+fragenr+" von "+gesamtfragen);
		}


		function getbuchstabe()
		{
			var alphabet=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","R","S","T","U","V","W","Z"];
			var buchstabenzahl=alphabet.length;
			var zufall=zufallszahl(0,buchstabenzahl);
			return alphabet[zufall];
		}


		function getfrage()
		{
			var fragenzahl=fragen.length;
			var frageok=false;
			while(frageok==false)
			{
				var zufall=zufallszahl(0,fragenzahl);
				if($.inArray(zufall,fragengespielt)!==-1)
				{
					frageok=false;
				}
				else
				{
					frageok=true;
					fragengespielt.push(zufall);
				}
			}
			return fragen[zufall]
		}


		function setfrage()
		{
			$("article#frage p").html(getfrage()+" mit <span>"+getbuchstabe()+"</span>");
		}




		$("section#intro button").click
		(
			function()
			{
				// Gesamtfragen:
				gesamtfragen=window.prompt("Wie viele Fragen?");

				// Aufräumen zu Beginn:
				$("main header ul#punktestand li").remove();
				$("article#frage p").html("");
				$("section#antwortbuttons ul li").remove();

				// Spieleranzahl holen:
				var spielerzahl=window.prompt("Wie viele Spieler? (Mindestens 2, ab 3 macht es Spaß)");

				var i=0;
				var spielername=[];
				for(i=1; i<=spielerzahl; i++)
				{
					spielername[i]=window.prompt("Spieler "+i+", Ihr Name bitte?");
					$("main header ul#punktestand").append('<li id="punkte_spieler'+i+'">'+spielername[i]+": 0</li>");
					$("section#antwortbuttons ul").append('<li id="button_spieler'+i+'"><button>'+spielername[i]+"</button></li>");
				}

				// Button für "Niemand" hinzufügen
				$("section#antwortbuttons ul").append('<li id="button_niemand"><button>Wieder keiner</button></li>');

				// Erste Frage holen:
				setfrage();

				// Fragenummer-Feld setzen:
				fragencounter();

				// Und den Vorhang öffnen:
				$("section#intro").fadeOut();




				// Und die eignetliche Magie:
				$("section#antwortbuttons ul li button").click
				(
					function()
					{
						if($(this).parent().attr("id")!="button_niemand")
						{
							// felderid
							var splittedid=$(this).parent().attr("id").split("_");

							// unser punktefeld
							var punktefeld=$("main header ul#punktestand li#punkte_"+splittedid[1]);

							// eigentlichen namen (etwa hans) wegnehmen
							var punktefeldsplit=punktefeld.html().split(":");
							var punktewert=punktefeldsplit[1];

							// punkte addieren und neuen wert setzen
							punktewert++;
							punktefeld.html(punktefeldsplit[0]+": "+punktewert);
						}
						else
						{
							$("audio#soundfx").trigger("stop");
							$("audio#soundfx").attr("src","wiederkeiner.ogg");
							$("audio#soundfx").trigger("play");
							alert("Also Merlin hätte das gewusst!");
						}

						// neue frage holen
						if(fragenr<gesamtfragen)
						{
							fragencounter();
							setfrage();
						}
						else
						{
							alert("Alle Fragen sind durch");
						}
					}
				);


				// Neuer Buchstabe-Button
				$("article#frage button#neubuchstabe").click
				(
					function()
					{
						// das hier holt einen nuen buchstaben
						$("article#frage p span").html(getbuchstabe());
					}
				);
			}
		)
	}
);
