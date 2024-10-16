const wrapper = document.querySelector(".wrapper"),
qrinput = wrapper.querySelector(".form input"),
generateBtn = wrapper.querySelector(".form button"),
qrimag = wrapper.querySelector(".qr-code img"),
qrcolor = wrapper.querySelector(".color input");

generateBtn.addEventListener("click", () =>{
    let color = qrcolor.value;
    let qrvalue = qrinput.value;
    if(!qrvalue) return;
    generateBtn.innerText = "Generator QR Code..."
    qrimag.src=`https://api.qrserver.com/v1/create-qr-code/?size=170x170&data=${qrvalue}${color}`;
    qrimag.addEventListener("load", () => {
        wrapper.classList.add("active");
        generateBtn.innerText = "Generator QR Code"
    })
});

qrinput.addEventListener("keyup", () => {
    if (!qrinput.value){
        wrapper.classList.remove("active");
    }

});

