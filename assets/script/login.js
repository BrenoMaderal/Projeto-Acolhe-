
var formLogin = document.querySelector("#formLogin");
var loginEmail = document.querySelector("#login-email");
var loginSenha = document.querySelector("#login-senha");
var msgLogin = document.querySelector("#msgLogin");

formLogin.addEventListener("submit", function (evento) {
  evento.preventDefault(); // não deixa a página recarregar
  var correto = true;

  // E-mail: formato da aula
  if (!validarEmail(loginEmail.value)) {
    marcarErro(loginEmail, "Informe um e-mail válido.");
    correto = false;
  } else {
    marcarOk(loginEmail);
  }

  // Senha: Minimo 6 caracteres
  if (!validarTamanho(loginSenha, 6, "A senha tem pelo menos 6 caracteres.")) correto = false;

  
  msgLogin.classList.remove("d-none", "alert-danger", "alert-success");
  if (correto) {
    msgLogin.classList.add("alert-success");
    msgLogin.innerHTML = "Bem-vindo(a) de volta! Login realizado.";
  } else {
    msgLogin.classList.add("alert-danger");
    msgLogin.innerHTML = "Confira os campos em vermelho.";
  }
}, false);


var formCadastro = document.querySelector("#formCadastro");
var cadNome = document.querySelector("#cad-nome");
var cadEmail = document.querySelector("#cad-email");
var cadTelefone = document.querySelector("#cad-telefone");
var cadCpf = document.querySelector("#cad-cpf");
var cadNascimento = document.querySelector("#cad-nascimento");
var cadSenha = document.querySelector("#cad-senha");
var cadConfirmar = document.querySelector("#cad-confirmar");
var cadCnpj = document.querySelector("#cad-cnpj");
var cadTermos = document.querySelector("#cad-termos");
var msgCadastro = document.querySelector("#msgCadastro");


cadTelefone.addEventListener("input", function () { mascaraTelefone(cadTelefone); }, false);
cadCpf.addEventListener("input", function () { mascaraCPF(cadCpf); }, false);
cadCnpj.addEventListener("input", function () { mascaraCNPJ(cadCnpj); }, false);

formCadastro.addEventListener("submit", function (evento) {
  evento.preventDefault();
  var correto = true;

  // Nome: mínimo 3 letras
  if (!validarTamanho(cadNome, 3, "Informe seu nome (mínimo 3 letras).")) correto = false;

  
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

  if (!validarCPF(cadCpf.value)) {
    marcarErro(cadCpf, "CPF inválido. Confira os números.");
    correto = false;
  } else {
    marcarOk(cadCpf);
  }

  // Data de nascimento: precisa ser anterior a hoje e ter pelo menos 12 anos
  if (cadNascimento.value == "" || textoParaData(cadNascimento.value) >= dataDeHoje()) {
    marcarErro(cadNascimento, "Informe uma data anterior a hoje.");
    correto = false;
  } else if (calcularIdade(textoParaData(cadNascimento.value)) < 12) {
    marcarErro(cadNascimento, "É preciso ter pelo menos 12 anos.");
    correto = false;
  } else {
    marcarOk(cadNascimento);
  }


  if (!validarTamanho(cadSenha, 6, "A senha precisa ter pelo menos 6 caracteres.")) correto = false;

  // Confirmar senha: precisa ser igual à senha
  if (cadConfirmar.value == "" || cadConfirmar.value != cadSenha.value) {
    marcarErro(cadConfirmar, "As senhas não são iguais.");
    correto = false;
  } else {
    marcarOk(cadConfirmar);
  }

  // CNPJ: opcional, mas se preencher precisa ser válido
  if (cadCnpj.value == "") {
    limparMarcacao(cadCnpj);
  } else if (!validarCNPJ(cadCnpj.value)) {
    marcarErro(cadCnpj, "CNPJ inválido. Confira os números.");
    correto = false;
  } else {
    marcarOk(cadCnpj);
  }

 
  if (!cadTermos.checked) {
    marcarErro(cadTermos, "É preciso aceitar os termos.");
    correto = false;
  } else {
    marcarOk(cadTermos);
  }


  msgCadastro.classList.remove("d-none", "alert-danger", "alert-success");
  if (correto) {
    msgCadastro.classList.add("alert-success");
    msgCadastro.textContent = "Conta criada, " + cadNome.value + "!";
  } else {
    msgCadastro.classList.add("alert-danger");
    msgCadastro.textContent = "Encontramos erros. Corrija os campos em vermelho.";
  }
}, false);
