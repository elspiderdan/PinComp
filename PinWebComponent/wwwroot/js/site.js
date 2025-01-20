function SetLoading(value) {
    if (value) {
        document.getElementsByClassName('container')[0].style.display = "none";
        document.getElementsByClassName('containerLoading')[0].style.display = "flex";
    }
    else {
        document.getElementsByClassName('container')[0].style.display = "block";
        document.getElementsByClassName('containerLoading')[0].style.display = "none";
    }

}

function setSuccess(message) {
    if (message) {
        document.getElementById("msgSuccess").innerText = message;
    }

    document.getElementsByClassName('container')[0].style.display = "none";
    document.getElementsByClassName('success')[0].style.display = "block";
}