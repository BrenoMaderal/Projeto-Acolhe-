/* =========================================================
   FUNÇÕES DE VALIDAÇÃO E MÁSCARAS (usadas em todos os formulários)
   ========================================================= */

/* ---------- MOSTRAR ERRO / ACERTO (classes do Bootstrap) ---------- */

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

/* ---------- MÁSCARAS ---------- */

// Deixa só os números de um texto (regex: \D = tudo que não é número)
function somenteNumeros(texto) {
  return texto.replace(/\D/g, "");
}

// Função geral de máscara: cada # do modelo vira um número digitado
// Exemplo: modelo "###.###.###-##" e números "12345678901"
//          resultado "123.456.789-01"
function aplicarMascara(campo, modelo) {
  var numeros = somenteNumeros(campo.value);
  var resultado = "";
  var j = 0; // posição nos números

  for (var i = 0; i < modelo.length; i++) {
    if (j >= numeros.length) {
      break; // acabaram os números digitados
    }
    if (modelo[i] == "#") {
      resultado = resultado + numeros[j];
      j++;
    } else {
      resultado = resultado + modelo[i]; // ponto, traço, barra, parênteses...
    }
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
  // celular tem 11 números, fixo tem 10
  if (somenteNumeros(campo.value).length > 10) {
    aplicarMascara(campo, "(##) #####-####");
  } else {
    aplicarMascara(campo, "(##) ####-####");
  }
}

// Valor em reais: o que for digitado vira centavos. Ex: 1550 -> R$ 15,50
function mascaraValor(campo) {
  var numeros = somenteNumeros(campo.value);
  if (numeros == "") {
    campo.value = "";
  } else {
    var valor = Number(numeros) / 100;
    campo.value = "R$ " + valor.toFixed(2).replace(".", ",");
  }
}

// Transforma "R$ 15,50" no número 15.5
function valorParaNumero(texto) {
  var numeros = somenteNumeros(texto);
  if (numeros == "") {
    return 0;
  }
  return Number(numeros) / 100;
}

/* ---------- VALIDAÇÕES ---------- */

// E-mail com Expressão Regular (a mesma da aula)
function validarEmail(email) {
  var regEx = new RegExp(/^(\w+[\-\.])*\w+@(\w+\.)+[A-Za-z]+$/);
  return regEx.test(email);
}

// Verifica se todos os números são iguais (ex: 111.111.111-11)
function todosIguais(numeros) {
  for (var i = 1; i < numeros.length; i++) {
    if (numeros[i] != numeros[0]) {
      return false;
    }
  }
  return true;
}

// CPF: confere os 2 dígitos verificadores
function validarCPF(cpf) {
  var numeros = somenteNumeros(cpf);

  if (numeros.length != 11 || todosIguais(numeros)) {
    return false;
  }

  // 1º dígito: multiplica os 9 primeiros por 10, 9, 8 ... 2
  var soma = 0;
  for (var i = 0; i < 9; i++) {
    soma = soma + Number(numeros[i]) * (10 - i);
  }
  var digito1 = (soma * 10) % 11;
  if (digito1 == 10) {
    digito1 = 0;
  }

  // 2º dígito: multiplica os 10 primeiros por 11, 10, 9 ... 2
  soma = 0;
  for (var i = 0; i < 10; i++) {
    soma = soma + Number(numeros[i]) * (11 - i);
  }
  var digito2 = (soma * 10) % 11;
  if (digito2 == 10) {
    digito2 = 0;
  }

  if (digito1 == Number(numeros[9]) && digito2 == Number(numeros[10])) {
    return true;
  }
  return false;
}

// CNPJ: confere os 2 dígitos verificadores
function validarCNPJ(cnpj) {
  var numeros = somenteNumeros(cnpj);

  if (numeros.length != 14 || todosIguais(numeros)) {
    return false;
  }

  var pesos1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  var pesos2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  // 1º dígito
  var soma = 0;
  for (var i = 0; i < 12; i++) {
    soma = soma + Number(numeros[i]) * pesos1[i];
  }
  var digito1 = 11 - (soma % 11);
  if (digito1 >= 10) {
    digito1 = 0;
  }

  // 2º dígito
  soma = 0;
  for (var i = 0; i < 13; i++) {
    soma = soma + Number(numeros[i]) * pesos2[i];
  }
  var digito2 = 11 - (soma % 11);
  if (digito2 >= 10) {
    digito2 = 0;
  }

  if (digito1 == Number(numeros[12]) && digito2 == Number(numeros[13])) {
    return true;
  }
  return false;
}

/* ---------- DATAS ---------- */

// Data de hoje sem as horas (para comparar só o dia)
function dataDeHoje() {
  var hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  return hoje;
}

// Converte o valor do <input type="date"> ("2026-11-20") em Date
function textoParaData(texto) {
  return new Date(texto + "T00:00:00");
}

// "2026-11-20" vira "20/11/2026"
function formatarData(texto) {
  var partes = texto.split("-");
  return partes[2] + "/" + partes[1] + "/" + partes[0];
}

// Calcula a idade a partir da data de nascimento
function calcularIdade(dataNasc) {
  var hoje = dataDeHoje();
  var idade = hoje.getFullYear() - dataNasc.getFullYear();

  // se ainda não fez aniversário este ano, tira 1
  var aniversario = new Date(hoje.getFullYear(), dataNasc.getMonth(), dataNasc.getDate());
  if (hoje < aniversario) {
    idade = idade - 1;
  }
  return idade;
}
