// Initializing variables:

const input_encryptor = document.getElementById('encryptor');
const btn_encrypt = document.getElementById('encrypt');
const btn_decrypt = document.getElementById('decrypt');
const container_decryptor = document.querySelector('.main-container-decrypt-container');
const input_decryptor = document.getElementById('decryptor');
const btn_copy = document.getElementById('copy');
const container_search = document.querySelector('.main-container-decrypt-search');
const copy_message = document.querySelector('.main-container-decrypt-container__msg');
const encryptor_filter = new RegExp(/[0-9A-ZáéíóúÁÉÍÓÚ]/g);
const encrypt_regExp = [/e/g, /i/g, /a/g, /o/g, /u/g];
const decrypt_regExp = [/enter/g, /imes/g, /ai/g, /ober/g, /ufat/g];
const encrypt_replace = ['enter', 'imes', 'ai', 'ober', 'ufat'];
const decrypt_replace = ['e', 'i', 'a', 'o', 'u'];

// Core functions:

function getEncryptedValue(value) {
    if(filterMessage(value)){
        let coded_value = value.trim();
        coded_value = replaceAllMatchs(coded_value, encrypt_regExp, encrypt_replace);
        scrollAndClean();
        return coded_value;
    }
}

function getDecryptedValue(value){
    if(filterMessage(value)){
        let decoded_value = value.trim();
        decoded_value = replaceAllMatchs(decoded_value, decrypt_regExp, decrypt_replace);
        scrollAndClean();
        return decoded_value;
    }
}

function replaceAllMatchs(value, regExps, replacements) {
    let final_value = value
    for (let i = 0; i < regExps.length; i++) {
        final_value = final_value.replace(regExps[i], replacements[i])
    }
    return final_value;
}

function showDisplay(action) {
    let value = action(input_encryptor.value);
    if(value){
        container_search.classList.add('hidden');
        container_decryptor.classList.remove('hidden');
        input_decryptor.value = value;
    } else {
        container_search.classList.remove('hidden');
        container_decryptor.classList.add('hidden');
    }
}

function filterMessage(value) {
    if(value.match(encryptor_filter)) {
        return false;
	} else if(value === "") {
		return false;
	} else {return true;}
}

function showError(value) {
    if(value.match(encryptor_filter)){
        displayError();
    } else {
        hideError();
    }
}

function displayError() {
    input_encryptor.classList.add('error');
    btn_encrypt.disabled = true;
    btn_decrypt.disabled = true;
    btn_encrypt.innerHTML = 'No ingrese mayúsc. ni acentos!';
    btn_decrypt.innerHTML = 'No ingrese mayúsc. ni acentos!';
    container_search.classList.remove('hidden');
    container_decryptor.classList.add('hidden');
}

function hideError() {
    input_encryptor.classList.remove('error');
    btn_encrypt.disabled = false;
    btn_decrypt.disabled = false;
    btn_encrypt.innerHTML = 'Encriptar';
    btn_decrypt.innerHTML = 'Desencriptar';
}

function scrollAndClean() {
    document.body.scrollIntoView({behavior: "smooth", block: "end"});
    input_encryptor.value = '';
}

function copyToClipboard() {
    let text_copy = input_decryptor.value;
    if(text_copy){
        navigator.clipboard.writeText(text_copy);
        copy_message.classList.toggle('hidden');
        setTimeout(()=>{
            copy_message.classList.toggle('hidden');
        }, 1000);
        setTimeout(()=>{
            document.body.scrollIntoView({behavior: "smooth", block: "start"});
        }, 600)
    }
    setTimeout(()=>{
        input_encryptor.focus();
    }, 900)
}

// Events:

btn_encrypt.addEventListener('click', () => {
    showDisplay(getEncryptedValue)
})

btn_decrypt.addEventListener('click', ()=>{
    showDisplay(getDecryptedValue)
})

btn_copy.addEventListener('click', ()=>{
    copyToClipboard();
})

input_encryptor.addEventListener('input', ()=>{
    showError(input_encryptor.value);
})