window.onload = function () {
    updateClock = () => {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();

        const clock = document.querySelector(".clock");
        clock.textContent = `${hours}:${minutes}:${seconds}`;
    };

    setInterval(updateClock, 1000);

    function checkIfLoggedIn() {
        const username = localStorage.getItem("loggedUser");
        if (username) {     
            const loginInfo = document.createElement("div");
            loginInfo.textContent = `Zalogowany jako: ${username}`;
            loginInfo.classList.add("login-info");

            const logoutButton = document.createElement("button");
            logoutButton.textContent = "Wyloguj";
            logoutButton.classList.add("logout-button");

            logoutButton.addEventListener("click", function () {
                localStorage.removeItem("loggedUser");
                window.location.href = "index.html";
            });

            const header = document.querySelector("header");
            header.appendChild(loginInfo);
            header.appendChild(logoutButton);
        }
    }

    function dodajPieniadze(kwota) {
        const username = localStorage.getItem("loggedUser");
        if (username) {
            let currentFunds = parseFloat(localStorage.getItem(`${username}_portfel`)) || 0;
            currentFunds += kwota;
            localStorage.setItem(`${username}_portfel`, currentFunds.toString());
            wyswietlStanPortfela();
        }
    }

    function wyswietlStanPortfela() {
        const username = localStorage.getItem("loggedUser");
        if (username) {
            const currentFunds = parseFloat(localStorage.getItem(`${username}_portfel`)) || 0;
            const portfelElement = document.querySelector(".portfel");
            portfelElement.textContent = `Portfel: ${currentFunds} zł`;
        }
    }
    
    const resetPortfelButton = document.getElementById("resetPortfel");

    resetPortfelButton.addEventListener("click", function() {
        resetujPortfel();
    });
    
    function resetujPortfel() {
        const username = localStorage.getItem("loggedUser");
        if (username) {
            if (confirm("Czy na pewno chcesz zresetować swój portfel?")) {
                localStorage.setItem(`${username}_portfel`, "0");
                wyswietlStanPortfela();
                alert("Portfel został zresetowany.");
            }
        }
    }
    

    checkIfLoggedIn();
    wyswietlStanPortfela();

    const dodaj10zlButton = document.getElementById("dodaj10zl");
    const dodaj20zlButton = document.getElementById("dodaj20zl");
    const dodaj50zlButton = document.getElementById("dodaj50zl");
    const dodaj100zlButton = document.getElementById("dodaj100zl");
    const dodaj500zlButton = document.getElementById("dodaj500zl");

    dodaj10zlButton.addEventListener("click", function () {
        dodajPieniadze(10);
    });

    dodaj20zlButton.addEventListener("click", function () {
        dodajPieniadze(20);
    });

    dodaj50zlButton.addEventListener("click", function () {
        dodajPieniadze(50);
    });

    dodaj100zlButton.addEventListener("click", function () {
        dodajPieniadze(100);
    });

    dodaj500zlButton.addEventListener("click", function () {
        dodajPieniadze(500);
    });

    const obstawCzerwonyButton = document.getElementById("obstawCzerwony");
    const obstawCzarnyButton = document.getElementById("obstawCzarny");
    const obstawZielonyButton = document.getElementById("obstawZielony");
    
    obstawCzerwonyButton.addEventListener("click", function () {
        obstawKolor("czerwony", 0.49); 
    });
    
    obstawCzarnyButton.addEventListener("click", function () {
        obstawKolor("czarny", 0.49); 
    });
    
    obstawZielonyButton.addEventListener("click", function () {
        obstawKolor("zielony", 0.02); 
    });
    
    function obstawKolor(kolor, szansa) {
        const username = localStorage.getItem("loggedUser");
        if (username) {
            let currentFunds = parseFloat(localStorage.getItem(`${username}_portfel`)) || 0;
            const kwota = parseFloat(prompt(`Ile chcesz postawić na ${kolor} kolor?`));
    

            if (isNaN(kwota) || kwota <= 0) {
                alert("Nieprawidłowa kwota. Kwota musi być liczbą większą od zera.");
                return;
            }
    

            const losowaLiczba = Math.random();
            let wygrana = 0;
    
            if (losowaLiczba <= szansa && kolor === "zielony") {
                wygrana = kwota * 16;
            } else if (losowaLiczba <= szansa) {
                wygrana = kwota * 2;
            }
    

            if (kwota > currentFunds) {
                alert("Błąd: Nie masz wystarczająco dużo środków na koncie, aby obstawić tę kwotę.");
                return;
            }
    

            currentFunds -= kwota;
    

            if (wygrana > 0) {
                currentFunds += wygrana;
            }
    
            localStorage.setItem(`${username}_portfel`, currentFunds.toString());
            alert(wygrana > 0 ? `Gratulacje! Wygrałeś ${wygrana} zł.` : `Niestety, przegrałeś ${kwota} zł.`);
    

            wyswietlStanPortfela();
        }
    }
    const kamienButton = document.getElementById("kamienButton");
    const papierButton = document.getElementById("papierButton");
    const nozyceButton = document.getElementById("nozyceButton");

  
    kamienButton.addEventListener("click", function () {
        grajKamienPapierNozyce("kamien");
    });

    papierButton.addEventListener("click", function () {
        grajKamienPapierNozyce("papier");
    });

    nozyceButton.addEventListener("click", function () {
        grajKamienPapierNozyce("nozyce");
    });

 

    function grajKamienPapierNozyce(wyborGracza) {
        const username = localStorage.getItem("loggedUser");
        if (!username) {
            alert("Musisz być zalogowany, aby zagrać w kamień, papier, nożyce.");
            return;
        }

        const currentFunds = parseFloat(localStorage.getItem(`${username}_portfel`)) || 0;
        const kwota = parseFloat(prompt(`Ile chcesz postawić na grę kamień, papier, nożyce? (Aktualny stan portfela: ${currentFunds} zł)`));

        if (isNaN(kwota) || kwota <= 0) {
            alert("Nieprawidłowa kwota. Kwota musi być liczbą większą od zera.");
            return;
        }

        if (kwota > currentFunds) {
            alert("Nie masz wystarczająco dużo środków na koncie, aby obstawić tę kwotę.");
            return;
        }


        const opcje = ["kamien", "papier", "nozyce"];
        const losowaLiczba = Math.floor(Math.random() * 3);
        const wyborKomputera = opcje[losowaLiczba];


        let wynik = "";
        if (wyborGracza === wyborKomputera) {
            wynik = "Remis!";
            dodajPieniadze(0); 
        } else if (
            (wyborGracza === "kamien" && wyborKomputera === "nozyce") ||
            (wyborGracza === "papier" && wyborKomputera === "kamien") ||
            (wyborGracza === "nozyce" && wyborKomputera === "papier")
        ) {
            wynik = "Wygrałeś!";
            dodajPieniadze(kwota); 
        } else {
            wynik = "Przegrałeś!";
            dodajPieniadze(-kwota); 
        }

        
        alert(`Twój wybór: ${wyborGracza}\nWybór komputera: ${wyborKomputera}\nWynik: ${wynik}`);
    }
    const obstawOrzelButton = document.getElementById("obstawOrzel");
    const obstawReszkaButton = document.getElementById("obstawReszka");

    obstawOrzelButton.addEventListener("click", function () {
        obstawMonete("orzel");
    });

    obstawReszkaButton.addEventListener("click", function () {
        obstawMonete("reszka");
    });

    function obstawMonete(wyborGracza) {
        const username = localStorage.getItem("loggedUser");
        if (!username) {
            alert("Musisz być zalogowany, aby zagrać w rzut monetą.");
            return;
        }

        const currentFunds = parseFloat(localStorage.getItem(`${username}_portfel`)) || 0;
        const kwota = parseFloat(prompt(`Ile chcesz postawić na rzut monetą? (Aktualny stan portfela: ${currentFunds} zł)`));

        if (isNaN(kwota) || kwota <= 0) {
            alert("Nieprawidłowa kwota. Kwota musi być liczbą większą od zera.");
            return;
        }

        if (kwota > currentFunds) {
            alert("Nie masz wystarczająco dużo środków na koncie, aby obstawić tę kwotę.");
            return;
        }

        const losowaLiczba = Math.random();
        let wynik = "";
        let wygrana = 0;

        if (losowaLiczba < 0.5 && wyborGracza === "orzel") {
            wynik = "Wygrałeś!";
            wygrana = kwota * 2;
        } else if (losowaLiczba >= 0.5 && wyborGracza === "reszka") {
            wynik = "Wygrałeś!";
            wygrana = kwota * 2;
        } else {
            wynik = "Przegrałeś!";
            wygrana = -kwota;
        }

        const aktualnyPortfel = parseFloat(localStorage.getItem(`${username}_portfel`)) || 0;
        const nowyStanPortfela = aktualnyPortfel + wygrana;

        localStorage.setItem(`${username}_portfel`, nowyStanPortfela.toString());
        alert(`Wynik rzutu monetą: ${losowaLiczba < 0.5 ? "Orzeł" : "Reszka"}\nTwój wybór: ${wyborGracza}\nWynik: ${wynik}`);

        wyswietlStanPortfela();
    }
}



