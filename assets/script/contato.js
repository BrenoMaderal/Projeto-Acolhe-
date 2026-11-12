/* =========================================================
   PÁGINA DE CONTATO
   Usa as funções do arquivo validacoes.js
   ========================================================= */

var formContato = document.querySelector("#formContato");
var ctNome = document.querySelector("#nome");
var ctEmail = document.querySelector("#email");
var ctTelefone = document.querySelector("#telefone");
var ctAssunto = document.querySelector("#assunto");
var ctMensagem = document.querySelector("#mensagem");
var msgContato = document.querySelector("#msgContato");
var contadorMensagem = document.querySelector("#contadorMensagem");

// Máscara e contador
ctTelefone.addEventListener("input", function () { mascaraTelefone(ctTelefone); }, false);
ctMensagem.addEventListener("input", function () {
  contadorMensagem.innerHTML = ctMensagem.value.length;
}, false);

formContato.addEventListener("submit", function (evento) {
  evento.preventDefault();
  var correto = true;

  if (ctNome.value.trim().length < 3) {
    marcarErro(ctNome, "Informe seu nome (mínimo 3 letras).");
    correto = false;
  } else {
    marcarOk(ctNome);
  }

  if (ctEmail.value == "") {
    marcarErro(ctEmail, "Informe seu e-mail para podermos responder.");
    correto = false;
  } else if (!validarEmail(ctEmail.value)) {
    marcarErro(ctEmail, "E-mail em formato inválido.");
    correto = false;
  } else {
    marcarOk(ctEmail);
  }

  // Telefone é opcional: só valida se a pessoa digitou algo
  var numTel = somenteNumeros(ctTelefone.value);
  if (numTel == "") {
    limparMarcacao(ctTelefone);
  } else if (numTel.length < 10) {
    marcarErro(ctTelefone, "Telefone incompleto.");
    correto = false;
  } else {
    marcarOk(ctTelefone);
  }

  if (ctAssunto.value.trim().length < 5) {
    marcarErro(ctAssunto, "Escreva o assunto (mínimo 5 caracteres).");
    correto = false;
  } else {
    marcarOk(ctAssunto);
  }

  if (ctMensagem.value.trim().length < 15) {
    marcarErro(ctMensagem, "Sua mensagem precisa ter pelo menos 15 caracteres.");
    correto = false;
  } else {
    marcarOk(ctMensagem);
  }

  msgContato.classList.remove("d-none");
  msgContato.classList.remove("alert-danger");
  msgContato.classList.remove("alert-success");
  if (correto) {
    msgContato.classList.add("alert-success");
    msgContato.innerHTML = "Mensagem enviada! Obrigado pelo contato, " + ctNome.value +
      ". Responderemos em até 2 dias úteis. (demonstração)";
    formContato.reset();
    contadorMensagem.innerHTML = "0";
    var campos = formContato.querySelectorAll(".form-control, .form-select");
    for (let i = 0; i < campos.length; i++) {
      limparMarcacao(campos[i]);
    }
  } else {
    msgContato.classList.add("alert-danger");
    msgContato.innerHTML = "Encontramos erros. Corrija os campos em vermelho.";
  }
}, false);
