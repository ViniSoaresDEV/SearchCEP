const cepForm = document.querySelector("form#cep-form");
const submitButton = document.querySelector("button#btn-search");
const result = document.querySelector("section#result");
const cepInput = document.querySelector("input#cep-input");


cepForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    requestCEP(cepInput.value);
});

async function requestCEP(cep) {

    showMessage("Carregando...");

    try{
        const url = `https://viacep.com.br/ws/${cep}/json/`;
        const response = await fetch(url);
        const json = await response.json();

        showCEP(json);

    }catch(error){
        showMessage("Erro ao encontrar CEP. Tente novamente.");
        console.error("Erro na API:", error);
    }
}


function showCEP(json){

    result.textContent = '';

    const fields = [
        `<b>Logradouro: </b>` + json.logradouro,
        `<b>Bairro: </b>` + json.bairro,
        `<b>Localidade: </b>` + json.localidade,
        `<b>Estado: </b>` + json.uf,
    ];

    fields.forEach((value)=>{
        const paragraphy = document.createElement('p');
        paragraphy.innerHTML = value;
        result.appendChild(paragraphy);
    })
}


function showMessage(msg){
    result.textContent = msg;
}