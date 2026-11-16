

// Deixa o campo vermelho (is-invalid) e escreve a mensagem de erro
// A mensagem fica na <div class="invalid-feedback" id="erro-IDDOCAMPO">
function marcarErro(campo, mensagem) {
  campo.classList.remove("is-valid");
  campo.classList.add("is-invalid");

  var divErro = document.getElementById("erro-" + campo.id);
  if (divErro != null) {
    divErro.innerHTML = mensagem;
  }
}

// Deixa o campo verde (is-valid)
function marcarOk(campo) {
  campo.classList.remove("is-invalid");
  campo.classList.add("is-valid");
}

// Tira as cores do campo
function limparMarcacao(campo) {
  campo.classList.remove("is-invalid");
  campo.classList.remove("is-valid");
}

/* ---------- VALIDAÇÕES SIMPLES (servem para qualquer campo) ---------- */

function validarTamanho(campo, minimo, mensagem) {
  if (campo.value.trim().length < minimo) {
    marcarErro(campo, mensagem);
    return false;
  }
  marcarOk(campo);
  return true;
}

// Select: a primeira opção tem value="", então vazio = nada escolhido
function validarSelect(campo, mensagem) {
  if (campo.value == "") {
    marcarErro(campo, mensagem);
    return false;
  }
  marcarOk(campo);
  return true;
}

/* ---------- FIM VALIDACAO SIMPLES ---------- */


function pegarRadio(nomeGrupo) {
  var vetRadios = document.querySelectorAll("input[name='" + nomeGrupo + "']");
  for (let i = 0; i < vetRadios.length; i++) {
    if (vetRadios[i].checked) {
      return vetRadios[i].value;
    }
  }
  return "";
}


function validarRadio(nomeGrupo, mensagem) {
  var vetRadios = document.querySelectorAll("input[name='" + nomeGrupo + "']");
  var divErro = document.getElementById("erro-" + nomeGrupo);
  var escolhido = pegarRadio(nomeGrupo);

  for (let i = 0; i < vetRadios.length; i++) {
    if (escolhido == "") {
      vetRadios[i].classList.add("is-invalid");
    } else {
      vetRadios[i].classList.remove("is-invalid");
    }
  }

  if (escolhido == "") {
    divErro.innerHTML = mensagem;
    divErro.classList.add("d-block"); 
    return false;
  }
  divErro.classList.remove("d-block");
  return true;
}

/* ---------- MÁSCARAS ---------- */


function somenteNumeros(texto) {
  return texto.replace(/\D/g, "");
}


function aplicarMascara(campo, modelo) {
  var numeros = somenteNumeros(campo.value);
  var resultado = "";
  var i = 0;
  var j = 0;

  while (i < modelo.length && j < numeros.length) {
    if (modelo[i] == "#") {
      resultado = resultado + numeros[j];
      j++;
    } else {
      resultado = resultado + modelo[i];
    }
    i++;
  }
  campo.value = resultado;
}

function mascaraCPF(campo) {
  aplicarMascara(campo, "###.###.###-##");
}

function mascaraCNPJ(campo) {
  aplicarMascara(campo, "##.###.###/####-##");
}

function mascaraCEP(campo) {
  aplicarMascara(campo, "#####-###");
}

function mascaraTelefone(campo) {
  aplicarMascara(campo, "(##) #####-####");
}


function mascaraValor(campo) {
  var numeros = somenteNumeros(campo.value);
  if (numeros == "") {
    campo.value = "";
  } else {
    var valor = parseInt(numeros) / 100;
    campo.value = "R$ " + valor.toFixed(2).replace(".", ",");
  }
}


function valorParaNumero(texto) {
  var numeros = somenteNumeros(texto);
  if (numeros == "") {
    return 0;
  }
  return parseInt(numeros) / 100;
}

/* ---------- VALIDAÇÕES ---------- */

// E-mail validacao aula
function validarEmail(email) {
  var regEx = new RegExp(/^(\w+[\-\.])*\w+@(\w+\.)+[A-Za-z]+$/);
  return regEx.test(email);
}


function todosIguais(numeros) {
  for (var i = 1; i < numeros.length; i++) {
    if (numeros[i] != numeros[0]) {
      return false;
    }
  }
  return true;
}


function validarCPF(cpf) {
  var numeros = somenteNumeros(cpf);

  if (numeros.length != 11 || todosIguais(numeros)) {
    return false;
  }

  
  var soma = 0;
  for (var i = 0; i < 9; i++) {
    soma = soma + parseInt(numeros[i]) * (10 - i);
  }
  var digito1 = (soma * 10) % 11;
  if (digito1 == 10) {
    digito1 = 0;
  }


  soma = 0;
  for (var i = 0; i < 10; i++) {
    soma = soma + parseInt(numeros[i]) * (11 - i);
  }
  var digito2 = (soma * 10) % 11;
  if (digito2 == 10) {
    digito2 = 0;
  }

  if (digito1 == parseInt(numeros[9]) && digito2 == parseInt(numeros[10])) {
    return true;
  }
  return false;
}


function validarCNPJ(cnpj) {
  var numeros = somenteNumeros(cnpj);

  if (numeros.length != 14 || todosIguais(numeros)) {
    return false;
  }

  var pesos1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  var pesos2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  var soma = 0;
  for (var i = 0; i < 12; i++) {
    soma = soma + parseInt(numeros[i]) * pesos1[i];
  }
  var digito1 = 11 - (soma % 11);
  if (digito1 >= 10) {
    digito1 = 0;
  }


  soma = 0;
  for (var i = 0; i < 13; i++) {
    soma = soma + parseInt(numeros[i]) * pesos2[i];
  }
  var digito2 = 11 - (soma % 11);
  if (digito2 >= 10) {
    digito2 = 0;
  }

  if (digito1 == parseInt(numeros[12]) && digito2 == parseInt(numeros[13])) {
    return true;
  }
  return false;
}

/* ---------- DATAS ---------- */


function dataDeHoje() {
  var hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  return hoje;
}


function textoParaData(texto) {
  return new Date(texto + "T00:00:00");
}

function formatarData(texto) {
  var partes = texto.split("-");
  return partes[2] + "/" + partes[1] + "/" + partes[0];
}


function calcularIdade(dataNasc) {
  var hoje = dataDeHoje();
  var idade = hoje.getFullYear() - dataNasc.getFullYear();

  var aniversario = new Date(hoje.getFullYear(), dataNasc.getMonth(), dataNasc.getDate());
  if (hoje < aniversario) {
    idade = idade - 1;
  }
  return idade;
}
