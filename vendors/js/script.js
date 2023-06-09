const modeBtn = document.getElementById('checkbox');
modeBtn.onchange = (e) => {
    if (modeBtn.checked === true) {
        document.documentElement.classList.remove("light")
        document.documentElement.classList.add("dark")
        window.localStorage.setItem('checkbox', 'dark');
    } else {
        document.documentElement.classList.remove("dark")
        document.documentElement.classList.add("light")
        window.localStorage.setItem('checkbox', 'light');
    }
}

const mode = window.localStorage.getItem('checkbox');
if (mode == 'dark') {
    modeBtn.checked = true;
    document.documentElement.classList.remove("light")
    document.documentElement.classList.add("dark")
}

if (mode == 'light') {
    modeBtn.checked = false;
    document.documentElement.classList.remove("dark")
    document.documentElement.classList.add("light")
}


// copy text 

function copyAddress() {
    var address = document.getElementById("address").innerText;
    var copyBtn = document.getElementById("copyBtn");
    navigator.clipboard.writeText(address);
    copyBtn.innerText = "  Copied ! ";
    setTimeout(function () {
        copyBtn.innerText = "Copy Address";
    }, 4000);
}

// copy text 