
/* ---------- PEGANDO OS ELEMENTOS ---------- */
var formAgendamento = document.querySelector("#formAgendamento");
var nome = document.querySelector("#ag-nome");
var genero = document.querySelector("#ag-genero");
var cpf = document.querySelector("#ag-cpf");
var nascimento = document.querySelector("#ag-nascimento");
var telefone = document.querySelector("#ag-telefone");
var email = document.querySelector("#ag-email");
var cep = document.querySelector("#ag-cep");
var cidade = document.querySelector("#ag-cidade");
var estado = document.querySelector("#ag-estado");
var profissional = document.querySelector("#ag-profissional");
var dataAtendimento = document.querySelector("#ag-data");
var valor = document.querySelector("#ag-valor");
var humor = document.querySelector("#ag-humor");
var humorTexto = document.querySelector("#humorTexto");
var motivo = document.querySelector("#ag-motivo");
var termos = document.querySelector("#ag-termos");
var msgErro = document.querySelector("#msgErroAgendamento");
var msgSucesso = document.querySelector("#msgSucessoAgendamento");

/* ---------- MÁSCARAS (executam enquanto a pessoa digita) ---------- */
cpf.addEventListener("input", function () { mascaraCPF(cpf); }, false);
telefone.addEventListener("input", function () { mascaraTelefone(telefone); }, false);
cep.addEventListener("input", function () { mascaraCEP(cep); }, false);
valor.addEventListener("input", function () { mascaraValor(valor); }, false);

/* ---------- "COMO VOCÊ ESTÁ HOJE" ---------- */
humor.addEventListener("input", function () { humorTexto.innerHTML = humor.value; }, false);

/* ---------- FUNÇÃO QUE VALIDA TODOS OS CAMPOS ---------- */
function validarAgendamento() {
  var correto = true;

  // Nome: mínimo 8 caracteres e com sobrenome (precisa ter um espaço no meio)
  if (nome.value.trim().length < 8 || nome.value.trim().indexOf(" ") == -1) {
    marcarErro(nome, "Digite nome e sobrenome (mínimo 8 caracteres).");
    correto = false;
  } else {
    marcarOk(nome);
  }

  // CPF: confere os dígitos verificadores
  if (!validarCPF(cpf.value)) {
    marcarErro(cpf, "CPF inválido. Confira os números.");
    correto = false;
  } else {
    marcarOk(cpf);
  }

  // Data de nascimento: precisa ser anterior a hoje e ter pelo menos 12 anos
  if (nascimento.value == "" || textoParaData(nascimento.value) >= dataDeHoje()) {
    marcarErro(nascimento, "Informe uma data anterior a hoje.");
    correto = false;
  } else if (calcularIdade(textoParaData(nascimento.value)) < 12) {
    marcarErro(nascimento, "Atendimento a partir de 12 anos.");
    correto = false;
  } else {
    marcarOk(nascimento);
  }

  // Telefone: celular com DDD (11 números)
  if (somenteNumeros(telefone.value).length != 11) {
    marcarErro(telefone, "Informe o celular com DDD.");
    correto = false;
  } else {
    marcarOk(telefone);
  }

  // E-mail: formato testado com a expressão regular da aula
  if (!validarEmail(email.value)) {
    marcarErro(email, "E-mail inválido. Ex: nome@email.com");
    correto = false;
  } else {
    marcarOk(email);
  }

  // CEP: exatamente 8 números
  if (somenteNumeros(cep.value).length != 8) {
    marcarErro(cep, "CEP deve ter 8 números.");
    correto = false;
  } else {
    marcarOk(cep);
  }

  // Campos de texto: quantidade mínima de caracteres
  if (!validarTamanho(cidade, 3, "Informe sua cidade.")) correto = false;
  if (!validarTamanho(motivo, 20, "Escreva pelo menos 20 caracteres.")) correto = false;

  // Selects: precisa escolher uma opção
  if (!validarSelect(genero, "Escolha uma opção.")) correto = false;
  if (!validarSelect(estado, "Escolha a UF.")) correto = false;
  if (!validarSelect(profissional, "Escolha um profissional ou grupo.")) correto = false;

  // Radios: precisa marcar um de cada grupo
  if (!validarRadio("formato", "Escolha individual ou em grupo.")) correto = false;
  if (!validarRadio("modalidade", "Escolha online ou presencial.")) correto = false;
  if (!validarRadio("acompanhamento", "Responda sim ou não.")) correto = false;
  if (!validarRadio("horario", "Clique em um dos horários.")) correto = false;

  // Data do atendimento: precisa ser futura e não pode ser domingo
  if (dataAtendimento.value == "" || textoParaData(dataAtendimento.value) <= dataDeHoje()) {
    marcarErro(dataAtendimento, "Escolha uma data futura (a partir de amanhã).");
    correto = false;
  } else if (textoParaData(dataAtendimento.value).getDay() == 0) {
    marcarErro(dataAtendimento, "Não há atendimentos aos domingos.");
    correto = false;
  } else {
    marcarOk(dataAtendimento);
  }

  // Valor: faixa de R$ 0,00 até R$ 200,00
  if (valor.value == "" || valorParaNumero(valor.value) > 200) {
    marcarErro(valor, "Informe um valor entre R$ 0,00 e R$ 200,00.");
    correto = false;
  } else {
    marcarOk(valor);
  }

  // Termos: o checkbox precisa estar marcado
  if (!termos.checked) {
    marcarErro(termos, "Você precisa marcar esta opção para continuar.");
    correto = false;
  } else {
    marcarOk(termos);
  }

  return correto;
}

/* ---------- ENVIO DO FORMULÁRIO ---------- */
formAgendamento.addEventListener("submit", function (evento) {
  evento.preventDefault(); // não deixa a página recarregar

  msgErro.classList.add("d-none");
  msgSucesso.classList.add("d-none");

  if (!validarAgendamento()) {
    msgErro.innerHTML = "<strong>Ops!</strong> Corrija os campos em vermelho.";
    msgErro.classList.remove("d-none");
    return;
  }

  // adiciona o novo agendamento no vetor e redesenha a tabela
  vetAgendamentos.push(new Agendamento(profissional.value, pegarRadio("formato"), pegarRadio("modalidade"), dataAtendimento.value, pegarRadio("horario")));
  montarTabela();

  msgSucesso.innerHTML = "<strong>Agendamento confirmado!</strong> Veja abaixo em \"Meus agendamentos\".";
  msgSucesso.classList.remove("d-none");
  limparFormulario();
}, false);

/* ---------- LIMPAR ---------- */
function limparFormulario() {
  formAgendamento.reset();

  // tira o verde/vermelho de todos os campos
  var campos = formAgendamento.querySelectorAll(".is-valid, .is-invalid");
  for (let i = 0; i < campos.length; i++) {
    limparMarcacao(campos[i]);
  }
  // esconde as mensagens de erro dos radios
  var errosRadio = formAgendamento.querySelectorAll(".invalid-feedback.d-block");
  for (let i = 0; i < errosRadio.length; i++) {
    errosRadio[i].classList.remove("d-block");
  }
  humorTexto.innerHTML = "5";
}

document.querySelector("#btnLimpar").addEventListener("click", function (evento) {
  evento.preventDefault();
  limparFormulario();
  msgErro.classList.add("d-none");
  msgSucesso.classList.add("d-none");
}, false);

class Agendamento {
  constructor(profissional, formato, modalidade, data, horario) {
    this.profissional = profissional;
    this.formato = formato;
    this.modalidade = modalidade;
    this.data = data;
    this.horario = horario;
  }
}

var vetAgendamentos = [];
vetAgendamentos.push(new Agendamento("Camila Araujo - Psicóloga", "Individual", "Online", "2026-11-18", "09:00"));
vetAgendamentos.push(new Agendamento("Carlos Mendes - Terapeuta", "Individual", "Presencial", "2026-11-21", "14:00"));
vetAgendamentos.push(new Agendamento("Mariana Costa - Psicóloga", "Individual", "Online", "2026-11-25", "10:00"));
vetAgendamentos.push(new Agendamento("Grupo Recomeçar", "Em grupo", "Online", "2026-12-05", "10:00"));

var corpoTabela = document.querySelector("#corpoTabela");
var msgTabela = document.querySelector("#msgTabela");

// Monta as linhas da tabela a partir do vetor
function montarTabela() {
  corpoTabela.innerHTML = "";
  for (let i = 0; i < vetAgendamentos.length; i++) {
    var item = vetAgendamentos[i];
    corpoTabela.innerHTML +=
      "<tr>" +
      "<td><input type='checkbox' class='form-check-input caixaItem'></td>" +
      "<td>" + item.profissional + "</td>" +
      "<td>" + item.formato + "</td>" +
      "<td>" + item.modalidade + "</td>" +
      "<td>" + formatarData(item.data) + "</td>" +
      "<td>" + item.horario + "</td>" +
      "</tr>";
  }
}

// Botão excluir: monta um vetor novo só com os itens NÃO marcados
document.querySelector("#btnExcluir").addEventListener("click", function () {
  var vetChk = document.querySelectorAll(".caixaItem");
  var novoVetor = [];
  for (let i = 0; i < vetChk.length; i++) {
    if (!vetChk[i].checked) {
      novoVetor.push(vetAgendamentos[i]);
    }
  }

  msgTabela.classList.remove("d-none", "alert-warning", "alert-success");
  if (novoVetor.length == vetAgendamentos.length) {
    msgTabela.classList.add("alert-warning");
    msgTabela.innerHTML = "Marque pelo menos um agendamento para excluir.";
    return;
  }

  msgTabela.classList.add("alert-success");
  msgTabela.innerHTML = (vetAgendamentos.length - novoVetor.length) + " agendamento(s) excluído(s).";
  vetAgendamentos = novoVetor;
  montarTabela();
}, false);

// Desenha a tabela quando a página abre
montarTabela();
