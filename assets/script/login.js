/* =========================================================
   PÁGINA DE LOGIN E CADASTRO
   Usa as funções do arquivo validacoes.js
   ========================================================= */

/* ---------- FORMULÁRIO DE LOGIN ---------- */
var formLogin = document.querySelector("#formLogin");
var loginEmail = document.querySelector("#login-email");
var loginSenha = document.querySelector("#login-senha");
var msgLogin = document.querySelector("#msgLogin");

formLogin.addEventListener("submit", function (evento) {
  evento.preventDefault();
  var correto = true;

  if (loginEmail.value == "") {
    marcarErro(loginEmail, "Informe seu e-mail.");
    correto = false;
  } else if (!validarEmail(loginEmail.value)) {
    marcarErro(loginEmail, "E-mail em formato inválido.");
    correto = false;
  } else {
    marcarOk(loginEmail);
  }

  if (loginSenha.value == "") {
    marcarErro(loginSenha, "Informe sua senha.");
    correto = false;
  } else if (loginSenha.value.length < 6) {
    marcarErro(loginSenha, "A senha tem pelo menos 6 caracteres.");
    correto = false;
  } else {
    marcarOk(loginSenha);
  }

  msgLogin.classList.remove("d-none");
  msgLogin.classList.remove("alert-danger");
  msgLogin.classList.remove("alert-success");
  if (correto) {
    msgLogin.classList.add("alert-success");
    msgLogin.innerHTML = "Bem-vindo(a) de volta! Login realizado. (demonstração)";
  } else {
    msgLogin.classList.add("alert-danger");
    msgLogin.innerHTML = "Confira os campos em vermelho.";
  }
}, false);

/* ---------- BOTÕES "BUSCAR APOIO" / "SER VOLUNTÁRIO" ---------- */
var btnApoio = document.querySelector("#btnApoio");
var btnVoluntario = document.querySelector("#btnVoluntario");
var camposVoluntario = document.querySelector("#camposVoluntario");
var ehVoluntario = false;

btnApoio.addEventListener("click", function () {
  ehVoluntario = false;
  // botão clicado fica preenchido, o outro fica só com borda
  btnApoio.classList.remove("btn-outline-primary");
  btnApoio.classList.add("btn-primary");
  btnVoluntario.classList.remove("btn-primary");
  btnVoluntario.classList.add("btn-outline-primary");
  // esconde os campos de voluntário
  camposVoluntario.classList.add("d-none");
}, false);

btnVoluntario.addEventListener("click", function () {
  ehVoluntario = true;
  btnVoluntario.classList.remove("btn-outline-primary");
  btnVoluntario.classList.add("btn-primary");
  btnApoio.classList.remove("btn-primary");
  btnApoio.classList.add("btn-outline-primary");
  // mostra os campos de voluntário
  camposVoluntario.classList.remove("d-none");
}, false);

/* ---------- FORMULÁRIO DE CADASTRO ---------- */
var formCadastro = document.querySelector("#formCadastro");
var cadNome = document.querySelector("#cad-nome");
var cadEmail = document.querySelector("#cad-email");
var cadTelefone = document.querySelector("#cad-telefone");
var cadSenha = document.querySelector("#cad-senha");
var cadConfirmar = document.querySelector("#cad-confirmar");
var tipoVoluntario = document.querySelector("#tipo-voluntario");
var cadRegistro = document.querySelector("#cad-registro");
var cadCnpj = document.querySelector("#cad-cnpj");
var cadTermos = document.querySelector("#cad-termos");
var msgCadastro = document.querySelector("#msgCadastro");

// Máscaras
cadTelefone.addEventListener("input", function () { mascaraTelefone(cadTelefone); }, false);
cadCnpj.addEventListener("input", function () { mascaraCNPJ(cadCnpj); }, false);

formCadastro.addEventListener("submit", function (evento) {
  evento.preventDefault();
  var correto = true;

  // Nome: mínimo 3 letras
  if (cadNome.value.trim().length < 3) {
    marcarErro(cadNome, "Informe seu nome (mínimo 3 letras).");
    correto = false;
  } else {
    marcarOk(cadNome);
  }

  // E-mail
  if (!validarEmail(cadEmail.value)) {
    marcarErro(cadEmail, "Informe um e-mail válido.");
    correto = false;
  } else {
    marcarOk(cadEmail);
  }

  // Celular: 11 números
  if (somenteNumeros(cadTelefone.value).length != 11) {
    marcarErro(cadTelefone, "Informe o celular com DDD.");
    correto = false;
  } else {
    marcarOk(cadTelefone);
  }

  // Senha: mínimo 8, com letra e número
  var temLetra = /[A-Za-z]/.test(cadSenha.value);
  var temNumero = /[0-9]/.test(cadSenha.value);
  if (cadSenha.value.length < 8) {
    marcarErro(cadSenha, "A senha precisa ter pelo menos 8 caracteres.");
    correto = false;
  } else if (!temLetra || !temNumero) {
    marcarErro(cadSenha, "Use letras e números na senha.");
    correto = false;
  } else {
    marcarOk(cadSenha);
  }

  // Confirmar senha: igual à senha
  if (cadConfirmar.value == "") {
    marcarErro(cadConfirmar, "Confirme sua senha.");
    correto = false;
  } else if (cadConfirmar.value != cadSenha.value) {
    marcarErro(cadConfirmar, "As senhas não são iguais.");
    correto = false;
  } else {
    marcarOk(cadConfirmar);
  }

  // Campos do voluntário (só valida se escolheu "Ser voluntário")
  if (ehVoluntario) {
    if (tipoVoluntario.value == "") {
      marcarErro(tipoVoluntario, "Escolha como você quer ajudar.");
      correto = false;
    } else {
      marcarOk(tipoVoluntario);
    }

    if (cadRegistro.value.trim().length < 4) {
      marcarErro(cadRegistro, "Informe seu registro profissional.");
      correto = false;
    } else {
      marcarOk(cadRegistro);
    }

    // CNPJ é opcional, mas se preencher tem que ser válido
    if (cadCnpj.value == "") {
      limparMarcacao(cadCnpj);
    } else if (!validarCNPJ(cadCnpj.value)) {
      marcarErro(cadCnpj, "CNPJ inválido. Confira os números.");
      correto = false;
    } else {
      marcarOk(cadCnpj);
    }
  }

  // Termos
  if (!cadTermos.checked) {
    marcarErro(cadTermos, "É preciso aceitar os termos.");
    correto = false;
  } else {
    marcarOk(cadTermos);
  }

  msgCadastro.classList.remove("d-none");
  msgCadastro.classList.remove("alert-danger");
  msgCadastro.classList.remove("alert-success");
  if (correto) {
    msgCadastro.classList.add("alert-success");
    if (ehVoluntario) {
      msgCadastro.innerHTML = "Obrigado, " + cadNome.value + "! Seu cadastro de voluntário foi enviado para análise. (demonstração)";
    } else {
      msgCadastro.innerHTML = "Conta criada, " + cadNome.value + "! Você já pode buscar apoio na rede. (demonstração)";
    }
  } else {
    msgCadastro.classList.add("alert-danger");
    msgCadastro.innerHTML = "Encontramos erros. Corrija os campos em vermelho.";
  }
}, false);
