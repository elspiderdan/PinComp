let alertMsg = document.getElementById("msgAlert");
const inputs = document.querySelectorAll("input");
const form = document.getElementById("form");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");
const showPassword = document.getElementById("show-password");
const matchPassword = document.getElementById("match");
const validEmail = document.getElementById("validEmail");
const submit = document.getElementById("submit");

inputs.forEach((input) => {
    input.addEventListener("blur", (event) => {
        if (event.target.value) {
            input.classList.add("is-valid");
        } else {
            input.classList.remove("is-valid");
        }
    });
});

showPassword.addEventListener("click", (event) => {
    if (password.type == "password") {
        password.type = "text";
        confirmPassword.type = "text";
        showPassword.innerText = "hide";
        showPassword.setAttribute("aria-label", "hide password");
        showPassword.setAttribute("aria-checked", "true");
    } else {
        password.type = "password";
        confirmPassword.type = "password";
        showPassword.innerText = "show";
        showPassword.setAttribute("aria-label", "show password");
        showPassword.setAttribute("aria-checked", "false");
    }
});

const updateRequirement = (id, valid) => {
    const requirement = document.getElementById(id);

    if (valid) {
        requirement.classList.add("valid");
    } else {
        requirement.classList.remove("valid");
    }
};

password.addEventListener("input", (event) => {
    const value = event.target.value;

    updateRequirement("length", value.length == 6);
    updateRequirement("lowercase", isValidSequence(value));
    updateRequirement("uppercase", /^(?!.*(\d)(?=\d\1)).*$/.test(value));
});

confirmPassword.addEventListener("blur", (event) => {
    const value = event.target.value;

    if (value.length && value != password.value) {
        matchPassword.classList.remove("hidden");
    } else {
        matchPassword.classList.add("hidden");
    }
});

email.addEventListener("blur", (event) => {
    const value = event.target.value;

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
        validEmail.classList.remove("hidden");
    } else {
        validEmail.classList.add("hidden");
    }
});

confirmPassword.addEventListener("focus", (event) => {
    matchPassword.classList.add("hidden");
});

const handleFormValidation = () => {
    const emmail = email.value;
    const value = password.value;
    const confirmValue = confirmPassword.value;

    if (
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emmail) &&
        value.length == 6 &&
        isValidSequence(value) &&
        /^(?!.*(\d)(?=\d\1)).*$/.test(value) &&
        value == confirmValue
    ) {
        submit.removeAttribute("disabled");
        return true;
    }

    submit.setAttribute("disabled", true);
    return false;
};

form.addEventListener("change", () => {
    handleFormValidation();
});

form.addEventListener("submit", (event) => {
    event.preventDefault();
    SetLoading(true);
    const validForm = handleFormValidation();

    if (!validForm) {
        return false;
    }

    setTimeout(function () {
        SetLoading(false);
        if (Math.floor(Math.random() * 2) == 1) {
            console.log("Registro correcto!");
            setSuccess("Resgistro exitoso! Reedirigiendo.");
        }
        else {
            console.log("Ups! algo salió mal.");
            alertMsg.style.display = "flex";
            alertMsg.getElementsByClassName("error-prompt-container")[0].innerHTML = '<p class="error-prompt-heading">Ups! algo salió mal.<br /> En caso de seguir presentando el error pongase en contacto con soporte.</p>';
        }
    }, 3000);

});


function isValidSequence(str) {
    let result = false;
    if (str.length > 2) {
        for (let i = 2; i < str.length; i++) {
            if (
                // Secuencia ascendente
                parseInt(str[i]) === parseInt(str[i - 1]) + 1 &&
                parseInt(str[i - 1]) === parseInt(str[i - 2]) + 1 ||
                // Secuencia descendente
                parseInt(str[i]) === parseInt(str[i - 1]) - 1 &&
                parseInt(str[i - 1]) === parseInt(str[i - 2]) - 1
            ) {
                result = false;
            }
            else {
                result = true;
            }
        }
    }

    return result;
}