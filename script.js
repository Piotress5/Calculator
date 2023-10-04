const wynik = document.querySelector("div.operacja1");
const dzialanie = document.querySelector("div.operacja2");
const numer = document.querySelectorAll("button.number");
const operator = document.querySelectorAll("button.operator");
const policz = document.querySelector("button.oblicz");
const allclear = document.querySelector("button.allclear");
const backspace = document.querySelector("button.backspace");
const memory = document.querySelector("button.memory");
const mem_manager = document.querySelector("div.pamiec-container");
const historia = document.querySelector("div.historia");
const his_reset = document.querySelector("button.his-reset");
const zaladuj = document.querySelector("button.zapisz");
const wczytaj = document.querySelector("button.wczytaj");
const mem_dodaj = document.querySelector("button.dodaj");
const mem_odejmij = document.querySelector("button.odejmij");
const mem_reset = document.querySelector("button.mem-reset");
const pamiec = document.querySelector("p.schowek");
let zmienna1 = "";
let zmienna2 = "";
let zmienna_wynik = "";
let zmienna_end = "";
let tempspace = "";
let zawiera1 = false;
let zawiera2 = false;
let zawiera3 = false;
let zawiera4 = false;
let przycisk = "";
let activeElement = "";
let dlug1 = 0;
let dlug2 = 0;
// wyświetlanie panelu pamięci
memory.addEventListener("click", pamiec_animacja);
function pamiec_animacja() {
    tempspace = window.getComputedStyle(mem_manager).display;
    if (tempspace == "flex") {
        mem_manager.style.display = "none";
    } else if (tempspace == "none") {
        mem_manager.style.display = "flex";
    }
}
// funkcja obsługująca wczytywanie wciskanych klawiszy
document.addEventListener("keydown", klawisz_wcisniety);
function klawisz_wcisniety(klawisz) {
    przycisk = klawisz.key;
    // console.log(przycisk);
    if (wynik.textContent == "NaN" && przycisk != "c") return;
    if (wynik.textContent == "Infinity" && przycisk != "c") return;

    tempspace = wynik;
    zawiera1 = tempspace.innerText.includes(".");
    if (przycisk >= 0 && przycisk <= 9 && tempspace.textContent.length == 1 
        && tempspace.textContent == "0") {
        wynik.innerText = przycisk;
    } else if (przycisk >= 1 && przycisk <= 9) {
        wynik.innerText += przycisk;
    } else if (przycisk == 0 && tempspace.textContent.length >= 1) {
        wynik.innerText += przycisk;
    }

    if (przycisk == "." && zawiera1 == false
        || przycisk == "," && zawiera1 == false) {
        wynik.innerText += ".";
    }

    if (przycisk == "+" || przycisk == "-" ||
        przycisk == "*" || przycisk == "/") {
        if (przycisk == "/") {
            tempspace = "÷";
        } else {
            tempspace = przycisk;
        }
        zmienna_end = wynik.innerText.slice(-1);
        if (zmienna_end == ".") {
            wynik.innerText = wynik.innerText.slice(0, -1);
        }
        if (zmienna1 == "" || zmienna1 == 0) {
            dzialanie.innerText = wynik.innerText + tempspace;
            zmienna1 = wynik.innerText;
        } else {
            dzialanie.innerText = zmienna1 + tempspace;
        }
        dzialanie.style.visibility = "visible";
        zmienna_end = dzialanie.textContent.slice(-1);
        wynik.innerText = "0";
    }

    if (przycisk == "c") {
        wyczysc();
    }

    if (przycisk == "Backspace") {
        cofnij();
    }

    if (przycisk == "Enter") {
        activeElement = document.activeElement;
        if (activeElement !== policz) {
	        activeElement.blur();
        };
        oblicz();
    }
}

// test sprawdzający pętlę dla liczb
// numer.forEach(element => {
//     console.log(element);
// });

//Easter Egg
// wynik.addEventListener("click", myFunction);
// function myFunction() {
//     tempspace = "siema";
//     wynik.innerText = tempspace;
// }
// czyszczenie ekranu
allclear.addEventListener("click", wyczysc);
function wyczysc() {
    tempspace = "0";
    wynik.innerText = tempspace;
    dzialanie.innerText = tempspace;
    dzialanie.style.visibility = "hidden";
    zmienna1 = "";
    zmienna2 = "";
    zawiera1 = false;
    zawiera2 = false;
}
// backspace
backspace.addEventListener("click", cofnij);
function cofnij() {
    if (wynik.textContent == "NaN") wynik.innerText = "0";
    if (wynik.textContent == "Infinity") wynik.innerText = "0";
    tempspace = wynik;
    if (tempspace.textContent.length > 1 ) {
        wynik.innerText = tempspace.textContent.slice(0, -1);
    } else {
        tempspace = "0";
        wynik.innerText = tempspace;
    }
}

// Funkcje pamięci i historii
function his_zapisz(x) {
    const element = document.querySelector("p.dzialania");
    if (element != null) {
        element.remove();
    }
    const para = document.createElement("p");
    para.innerHTML = zmienna2 + x + zmienna1 + "=" + zmienna_wynik;
    historia.appendChild(para);
}

his_reset.addEventListener("click", his_resetuj);
function his_resetuj() {
    historia.innerHTML = '<p class="dzialania">Brak&nbsp;ostatnich&nbsp;działań </p>';
}

zaladuj.addEventListener("click", mem_zapisz);
function mem_zapisz() {
    if (wynik.textContent == "NaN" || wynik.textContent == "Infinity") return;
    pamiec.innerText = wynik.innerText;
}

wczytaj.addEventListener("click", mem_wczytaj);
function mem_wczytaj() {
    wynik.innerText = pamiec.innerText;
}

mem_reset.addEventListener("click", mem_resetuj);
function mem_resetuj() {
    pamiec.innerText = 0;
}

mem_dodaj.addEventListener("click", mem_dodajaca);
function mem_dodajaca() {
    if (wynik.textContent == "NaN" || wynik.textContent == "Infinity") return;
    zbierz_dane(pamiec);
    if (zawiera3 == true) return;
    if (zawiera1 == true && zawiera2 == true) {
        zmienna2 = zmienna2 + zmienna1;
    } else {
        tempspace = dlug1 + dlug2;
        zmienna2 = zmienna2 + zmienna1;
        zmienna2 = zmienna2 * (10 ** tempspace);
        zmienna2 = parseInt(zmienna2);
        zmienna2 = zmienna2 / (10 ** tempspace);
    }
    pamiec.innerText = zmienna2;
}

mem_odejmij.addEventListener("click", mem_odejmujaca);
function mem_odejmujaca() {
    if (wynik.textContent == "NaN" || wynik.textContent == "Infinity") return;
    zbierz_dane(pamiec);
    if (zawiera3 == true) return;
    tempspace = dlug1 + dlug2;
    zmienna2 = zmienna2 - zmienna1;
    zmienna2 = zmienna2 * (10 ** tempspace);
    zmienna2 = parseFloat(Math.round(zmienna2));
    zmienna2 = zmienna2 / (10 ** tempspace);
    pamiec.innerText = zmienna2;
}
// funkcja potrzebna przy obliczeniach
function zbierz_dane(z) {
    zmienna1 = wynik.textContent;
    zmienna2 = z.textContent;
    zawiera1 = wynik.innerText.includes("-");
    zawiera1 = zmienna1.toString().includes(".");
    zawiera2 = zmienna2.toString().includes(".");
    zawiera3 = zmienna1.toString().includes("%");
    zawiera4 = zmienna2.toString().includes("%");
    zmienna1 = parseFloat(wynik.textContent);
    zmienna2 = parseFloat(z.textContent);
    dlug1 = zmienna1.toString().length;
    dlug2 = zmienna2.toString().length;
}

// Funkcja pobiera wartości z poszczególnych guzików z klasą 
// "number" i wpisuje je do kontenera div.item0
numer.forEach(function(x) {
    zmienna_end = dzialanie.textContent.slice(-1);
    x.addEventListener("click", wpisz);
    function wpisz() {
        if (wynik.textContent == "NaN") return;
        if (wynik.textContent == "Infinity") return;
        tempspace = x.getAttribute("value");

        zawiera1 = wynik.innerText.includes("%");
        if (tempspace == "%") {
            if (zawiera1 == false) {
                wynik.innerText += tempspace;
            } else if (zawiera1 == true) {
                tempspace = wynik.innerText.slice(0, -1);
                wynik.innerText = tempspace;
            }
            return;
        }
        if (zawiera1 == true && tempspace != "%" 
        && tempspace != "neg") return;

        if (tempspace == "neg") {
            if (wynik.textContent == "0") return;
            zawiera1 = wynik.innerText.includes("-");
            if (zawiera1 == true) {
                tempspace = wynik.textContent.slice(1);
                wynik.innerText = tempspace;
                return;
            }
            zmienna_end = wynik.innerText.slice(0, 1);
            wynik.innerText = "-" + wynik.innerText;
            return;
        }

        if (tempspace == "%") {
            if (zawiera1 == false) {
                wynik.innerText += tempspace;
            } else if (zawiera1 == true) {
                tempspace = wynik.innerText.slice(0, -1);
                wynik.innerText = tempspace;
            }
        }

        if (wynik.innerText == "0" && tempspace != ".") {
            wynik.innerText = tempspace;
        } else if (tempspace != ".") {
            wynik.innerText += tempspace;
        } else if (tempspace == "." && wynik.innerText.includes(".") == false) {
            wynik.innerText += tempspace;
        }
    }
});
// Funkcja pobiera wartości z poszczególnych guzików z klasą 
// "operator" i dopisuje je do przeniesionej wartości
operator.forEach(function(y) {
    y.addEventListener("click", operacja);
    function operacja() {
        if (wynik.textContent == "NaN") return;
        if (wynik.textContent == "Infinity") return;
        tempspace = y.getAttribute("value");
        zmienna_end = wynik.innerText.slice(-1);
        if (wynik.innerText == "%") return;
        if (zmienna_end == ".") {
            wynik.innerText = wynik.innerText.slice(0, -1);
        }
        if (zmienna1 == "" || zmienna1 == 0 ) {
            dzialanie.innerText = wynik.innerText + tempspace;
            zmienna1 = wynik.innerText;
        } else {
            dzialanie.innerText = zmienna1 + tempspace;
        }
        dzialanie.style.visibility = "visible";
        zmienna_end = dzialanie.textContent.slice(-1);
        wynik.innerText = "0";
    }
})
// Funkcja obliczająca
policz.addEventListener("click", oblicz);
function oblicz() {
    zbierz_dane(dzialanie);
    zmienna_end = dzialanie.textContent.slice(-1);

    function zamien1() {
        if (zawiera3 == true) {
            zmienna1 = zmienna1 / 100;
            if (zawiera2 == false) {
                tempspace = dlug1 + dlug2 - 3;
                zmienna1 = zmienna1 * zmienna2;
                zmienna1 = parseFloat(zmienna1);
            } else if (zawiera2 == true) {
                tempspace = dlug1 + dlug2;
                zmienna1 = zmienna1 * zmienna2;
                zmienna1 = zmienna1.toPrecision(tempspace);
                zmienna1 = parseFloat(zmienna1);
            }
        }
    
        if (zawiera4 == true) {
            zmienna2 = zmienna2 / 100;
            if (zawiera1 == false) {
                tempspace = dlug1 + dlug2 - 3;
                zmienna2 = zmienna1 * zmienna2;
                zmienna2 = parseFloat(zmienna2);
            } else if (zawiera1 == true) {
                tempspace = dlug1 + dlug2;
                zmienna2 = zmienna1 * zmienna2;
                zmienna2 = zmienna2.toPrecision(tempspace);
                zmienna2 = parseFloat(zmienna2);
            }
        }
    }

    function zamien2() {
        if (zawiera3 == true) zmienna1 = zmienna1 / 100;
        if (zawiera4 == true) zmienna2 = zmienna2 / 100;
    }

    switch (zmienna_end) {
        case "+":
            if (zawiera3 == true || zawiera4 == true) {
                zamien1();
                zawiera1 = zmienna1.toString().includes(".");
                zawiera2 = zmienna2.toString().includes(".");
            }
            if (zawiera1 == true && zawiera2 == true) {
                zmienna_wynik = zmienna1 + zmienna2;
                if (dlug1 >= dlug2 || dlug1 == dlug2) {
                    tempspace = dlug1;
                }
                else {
                    tempspace = dlug2;
                }
                zmienna_wynik = zmienna1 + zmienna2;
                zmienna_wynik = zmienna_wynik * (10 ** tempspace);
                zmienna_wynik = parseInt(zmienna_wynik);
                zmienna_wynik = zmienna_wynik / (10 ** tempspace);
            } else {
                tempspace = dlug1 + dlug2;
                zmienna_wynik = zmienna1 + zmienna2;
                zmienna_wynik = zmienna_wynik * (10 ** tempspace);
                zmienna_wynik = parseInt(zmienna_wynik);
                zmienna_wynik = zmienna_wynik / (10 ** tempspace);
            }
            his_zapisz("+");
            wyczysc();
            wynik.innerText = zmienna_wynik;
            break;
        case "-":
            if (zawiera4 == false) zamien1();
            tempspace = dlug1 + dlug2;
            zmienna_wynik = zmienna2 - zmienna1;
            zmienna_wynik = zmienna_wynik * (10 ** tempspace);
            zmienna_wynik = parseFloat(Math.round(zmienna_wynik));
            zmienna_wynik = zmienna_wynik / (10 ** tempspace);
            his_zapisz("-");
            wyczysc();
            wynik.innerText = zmienna_wynik;
            break;
        case "*":
            if (zawiera3 == true && zawiera4 == true) return;
            zamien2();
            if (zawiera1 == true && zawiera2 == true) {
                tempspace = dlug1 + dlug2;
                zmienna_wynik = zmienna1 * zmienna2;
                zmienna_wynik = zmienna_wynik.toPrecision(tempspace);
                zmienna_wynik = parseFloat(zmienna_wynik);
            } else if (zawiera1 == true || zawiera2 == true) {
                tempspace = dlug1 + dlug2 - 3;
                zmienna_wynik = zmienna1 * zmienna2;
                zmienna_wynik = zmienna_wynik.toFixed(tempspace);
                zmienna_wynik = parseFloat(zmienna_wynik);
            } else {
                zmienna_wynik = zmienna1 * zmienna2;
            }
            his_zapisz("*");
            wyczysc();
            wynik.innerText = zmienna_wynik;
            break;
        case "÷":
            if (zawiera4 == false) zamien1();
            if (zmienna1 == 0) {
                return;
            }
            if (zawiera1 == true || zawiera2 == true) {
                tempspace = dlug1 + dlug2;
                zmienna_wynik = zmienna2 / zmienna1;
                zmienna_wynik = zmienna_wynik * (10 ** tempspace);
                zmienna_wynik = parseInt(Math.ceil(zmienna_wynik));
                zmienna_wynik = zmienna_wynik / (10 ** tempspace);
            } else {
                zmienna_wynik = zmienna2 / zmienna1;
            }
            his_zapisz("/");
            wyczysc();
            wynik.innerText = zmienna_wynik;
            break;
        case "^":
            if (zawiera3 == true || zawiera4 == true) return;
            tempspace = dlug2;
            if (zmienna2 <= 0 && zawiera1 == false) {
                zmienna_wynik = Math.pow(zmienna2, zmienna1);
            } else if (zmienna2 <= 0 && zawiera1 == true) {
                zmienna2 = zmienna2 * -1;
                zmienna_wynik = Math.pow(zmienna2, zmienna1);
                zmienna_wynik = zmienna_wynik * -1;
            } else if (zawiera1 != true) {
                zmienna_wynik = Math.pow(zmienna2, zmienna1);
                zmienna_wynik = zmienna_wynik * (10 ** tempspace);
                zmienna_wynik = parseFloat(zmienna_wynik);
                zmienna_wynik = zmienna_wynik.toFixed(tempspace);
                zmienna_wynik = zmienna_wynik / (10 ** tempspace);
            } else {
                zmienna_wynik = Math.pow(zmienna2, zmienna1);
                zmienna_wynik = zmienna_wynik.toPrecision(12);
            }
            his_zapisz("^");
            wyczysc();
            wynik.innerText = zmienna_wynik;
            break;
        case "√":
            if (zawiera3 == true || zawiera4 == true) return;
            if (zmienna2 == 2) {
                zmienna_wynik = Math.sqrt(zmienna1);
            } else if (zmienna2 == 3) {
                zmienna_wynik = Math.cbrt(zmienna1);
            } else {
                zmienna_wynik = Math.pow(zmienna1, (1 / zmienna2));
                zmienna_wynik = parseFloat(zmienna_wynik);
            }
            his_zapisz("√");
            wyczysc();
            wynik.innerText = zmienna_wynik;
            break;
        default:
            break;
    }
}

// function wyswietlWynik() {
//     wynik.innerHTML = wartosc;
// }
