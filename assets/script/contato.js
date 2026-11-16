
var formContato = document.querySelector("#formContato");
var contatoNome = document.querySelector("#nome");
var contatoEmail = document.querySelector("#email");
var contatoTelefone = document.querySelector("#telefone");
var contatoAssunto = document.querySelector("#assunto");
var contatoCidade = document.querySelector("#cidade");
var contatoMotivo = document.querySelector("#motivo");
var contatoPeriodo = document.querySelector("#periodo");
var contatoMensagem = document.querySelector("#mensagem");
var msgContato = document.querySelector("#msgContato");


contatoTelefone.addEventListener("input", function () { mascaraTelefone(contatoTelefone); }, false);


formContato.addEventListener("submit", function (evento) {
  evento.preventDefault(); 
  var correto = true;


  if (!validarTamanho(contatoNome, 3, "Informe seu nome (mínimo 3 letras).")) correto = false;
  if (!validarTamanho(contatoAssunto, 5, "Escreva o assunto (mínimo 5 caracteres).")) correto = false;
  if (!validarTamanho(contatoCidade, 3, "Informe sua cidade.")) correto = false;
  if (!validarTamanho(contatoMensagem, 15, "Sua mensagem precisa ter pelo menos 15 caracteres.")) correto = false;


  if (!validarSelect(contatoMotivo, "Escolha o motivo do contato.")) correto = false;
  if (!validarSelect(contatoPeriodo, "Escolha o melhor período.")) correto = false;


  if (!validarEmail(contatoEmail.value)) {
    marcarErro(contatoEmail, "Informe um e-mail válido.");
    correto = false;
  } else {
    marcarOk(contatoEmail);
  }

  
  if (!validarRadio("retorno", "Escolha como prefere receber a resposta.")) correto = false;

  
  var retorno = pegarRadio("retorno");
  var numTel = somenteNumeros(contatoTelefone.value);
  if ((retorno == "Telefone" || retorno == "WhatsApp") && numTel.length != 11) {
    marcarErro(contatoTelefone, "Informe o celular com DDD para responder por " + retorno + ".");
    correto = false;
  } else if (numTel != "" && numTel.length != 11) {
    marcarErro(contatoTelefone, "Celular incompleto. Use DDD + 9 números.");
    correto = false;
  } else {
    limparMarcacao(contatoTelefone);
  }

  
  msgContato.classList.remove("d-none", "alert-danger", "alert-success");
  if (correto) {
    msgContato.classList.add("alert-success");
    msgContato.textContent = "Mensagem enviada! Obrigado pelo contato, " + contatoNome.value + ".";
    formContato.reset();
    var campos = formContato.querySelectorAll(".is-valid");
    for (let i = 0; i < campos.length; i++) {
      limparMarcacao(campos[i]);
    }
  } else {
    msgContato.classList.add("alert-danger");
    msgContato.innerHTML = "Encontramos erros. Corrija os campos em vermelho.";
  }
}, false);
