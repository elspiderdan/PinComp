let alertMsg = document.getElementById("msgAlert");
var borrar = false;
var elts = document.getElementsByClassName('input')

Array.from(elts).forEach(function (elt) {
    elt.addEventListener("keyup", function (event) {

        if (elt.value.length > 1) {
            elt.value = elt.value[elt.value.length - 1];
        }

        if (event.keyCode === 13 || elt.value.length === 1) {

            if (elt.id === "pin6") {
                if (isValidPin()) {
                    sendPin();
                }
                else {
                    //mensaje error
                }
            }
            else {
                elt.nextElementSibling?.focus();
            }

        }
        else if (event.keyCode == 8) {
            if (elt.id !== "pin1") {
                if (!borrar)
                    borrar = true;
                else
                    elt.previousElementSibling.value = "";
                elt.previousElementSibling?.focus();
            }
        }
    });

    elt.addEventListener("focus", function (event) {

        if (elt.value.length === 0 && elt.id !== "pin1" && elt.previousElementSibling.value.length === 0) {
            elt.previousElementSibling?.focus();
            return;
        }
        else if (elt.value.length > 0) {
            elt.nextElementSibling?.focus();
            return;
        }
        
    });

});

function sendPin() {
    alertMsg.style.display = "none";
    SetLoading(true);
    console.log("PIN Enviado.... esperando respuesta");
    setTimeout(function () {
        SetLoading(false);
        if (Math.floor(Math.random() * 2) == 1) {
            console.log("PIN Válido");
            setSuccess("Exitoso...Espere un momento.");
        }
        else {
            console.log("PIN Incorrecto");
            Array.from(elts).forEach(function (elt) {
                elt.value = "";
            });
            alertMsg.style.display = "flex";
            alertMsg.getElementsByClassName("error-prompt-container")[0].innerHTML = '<p class="error-prompt-heading">El PIN que ingresaste es incorrecto, intentalo de nuevo. <br /> Al tercer intento erroneo se te bloqueará el acceso.</p>';
        }
    }, 3000);
}

function isValidPin() {
    let result = false;
    let pinVal = "";

    Array.from(elts).forEach(function (elt) {
        if (elt.value.length == 1) {
            pinVal += elt.value;
        }
    });

    result = pinVal.length === 6;

    return result;
}

elts[0].focus();