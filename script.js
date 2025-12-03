const cepForm = document.querySelector("form#cep-form");
const submitButton = document.querySelector("button#btn-search");
const result = document.querySelector("section#result");


cepForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const cepInput = document.querySelector("input#cep-input").value;

    requestCEP(cepInput);
});

async function requestCEP(cep) {
    try{
        const url = `https://viacep.com.br/ws/${cep}/json/`;
        const response = await fetch(url);
        const json = await response.json();

        filterCEPData(json);

    }catch(error){
        showMessage("Erro ao encontrar CEP. Tente novamente.");
        console.error("Erro na API:", error);
    }
}


function filterCEPData(json){
    const logradouro = json.logradouro;
    const bairro = json.bairro;
    const localidade = json.localidade;
    const estado = json.estado;

    showCEP(logradouro, bairro, localidade, estado);
}

function showCEP(logradouro, bairro, localidade, estado){

    result.innerHTML = '';

    const fields = [
        `<b>Logradouro: </b>` + logradouro,
        `<b>Bairro: </b>` + bairro,
        `<b>Localidade: </b>` + localidade,
        `<b>Estado: </b>` + estado,
    ];

    fields.forEach((value)=>{
        const paragraphy = document.createElement('p');
        paragraphy.innerHTML = value;
        result.appendChild(paragraphy);
    })
}


function showMessage(msg){
    result.innerHTML = msg;
}