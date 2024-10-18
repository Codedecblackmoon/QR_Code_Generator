const wrapper = document.querySelector(".wrapper"),
    qrinput = wrapper.querySelector(".form input"),
    generateBtn = wrapper.querySelector(".form button"),
    qrimag = wrapper.querySelector(".qr-code img"),
    downloadBtn = wrapper.querySelector("#downloadBtn");

generateBtn.addEventListener("click", () =>{
    let qrvalue = qrinput.value;
    if(!qrvalue) return;
    generateBtn.innerText = "Generator QR Code...";
    qrimag.src=`https://api.qrserver.com/v1/create-qr-code/?size=170x170&data=${qrvalue}`;
    console.log(qrimag.src)
    qrimag.addEventListener("load", () => {
        wrapper.classList.add("active");
        generateBtn.innerText = "Generator QR Code";
        downloadBtn.style.display = "block";
    })
});

downloadBtn.addEventListener("click", e => {
    e.preventDefault();
    downloadBtn.innerText = "Downloading URL...";
    fatchFile(qrimag.src);
});

function fatchFile(url){
    fetch(url).then(res => res.blob()).then(file => {
        let tempURL = URL.createObjectURL(file);
        let atag = document.createElement("a");
        atag.href = tempURL;
        atag.download = url.replace(/^.*[\\\/]/, '');
        document.body.appendChild(atag)
        atag.click();
        atag.remove();
        URL.revokeObjectURL(tempURL)
        downloadBtn.innerText = "Download URL";
    }).catch (() => {
        downloadBtn.innerText = "Download URL";
        alert("Faild to download file")
    })
}


qrinput.addEventListener("keyup", () => {
    if (!qrinput.value){
        wrapper.classList.remove("active");
        downloadBtn.style.display = "none";
    }

});

