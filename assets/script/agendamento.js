/* =========================================================
   PÁGINA DE AGENDAMENTO
   Usa as funções do arquivo validacoes.js
   ========================================================= */

/* ---------- PEGANDO OS ELEMENTOS ---------- */
var formAgendamento = document.querySelector("#formAgendamento");

var nome = document.querySelector("#ag-nome");
var cpf = document.querySelector("#ag-cpf");
var nascimento = document.querySelector("#ag-nascimento");
var telefone = document.querySelector("#ag-telefone");
var email = document.querySelector("#ag-email");
var cep = document.querySelector("#ag-cep");
var cidade = document.querySelector("#ag-cidade");
var estado = document.querySelector("#ag-estado");
var profissional = document.querySelector("#ag-profissional");
var tipo = document.querySelector("#ag-tipo");
var dataAtendimento = document.querySelector("#ag-data");
var horario = document.querySelector("#ag-horario");
var valor = document.querySelector("#ag-valor");
var humor = document.querySelector("#ag-humor");
var motivo = document.querySelector("#ag-motivo");
var termos = document.querySelector("#ag-termos");
var radiosModalidade = document.querySelectorAll("input[name='modalidade']");

var msgErro = document.querySelector("#msgErroAgendamento");
var msgSucesso = document.querySelector("#msgSucessoAgendamento");

/* ---------- MÁSCARAS (executam enquanto a pessoa digita) ---------- */
cpf.addEventListener("input", function () { mascaraCPF(cpf); }, false);
telefone.addEventListener("input", function () { mascaraTelefone(telefone); }, false);
cep.addEventListener("input", function () { mascaraCEP(cep); }, false);
valor.addEventListener("input", function () { mascaraValor(valor); }, false);

/* ---------- BOTÕES DE HORÁRIO ---------- */
var vetHorarios = document.querySelectorAll("#listaHorarios button");

for (let i = 0; i < vetHorarios.length; i++) {
  vetHorarios[i].addEventListener("click", function () {
    // tira a seleção de todos
    for (let j = 0; j < vetHorarios.length; j++) {
      vetHorarios[j].classList.remove("btn-primary");
      vetHorarios[j].classList.add("btn-outline-primary");
    }
    // marca só o que foi clicado
    vetHorarios[i].classList.remove("btn-outline-primary");
    vetHorarios[i].classList.add("btn-primary");
    horario.value = vetHorarios[i].innerHTML.trim();
    marcarOk(horario);
  }, false);
}

/* ---------- RANGE (como você está hoje) ---------- */
var humorTexto = document.querySelector("#humorTexto");
humor.addEventListener("input", function () {
  humorTexto.innerHTML = humor.value;
}, false);

/* ---------- CONTADOR DE CARACTERES ---------- */
var contadorMotivo = document.querySelector("#contadorMotivo");
motivo.addEventListener("input", function () {
  contadorMotivo.innerHTML = motivo.value.length;
}, false);

/* ---------- FUNÇÃO QUE VALIDA TODOS OS CAMPOS ---------- */
function validarAgendamento() {
  var correto = true;

  // 1 - Nome: obrigatório, mínimo 8 letras e com sobrenome (tem espaço)
  if (nome.value.trim() == "") {
    marcarErro(nome, "Informe seu nome.");
    correto = false;
  } else if (nome.value.trim().length < 8 || nome.value.trim().indexOf(" ") == -1) {
    marcarErro(nome, "Digite nome e sobrenome (mínimo 8 caracteres).");
    correto = false;
  } else {
    marcarOk(nome);
  }

  // 2 - CPF: obrigatório e com dígitos válidos
  if (cpf.value == "") {
    marcarErro(cpf, "Informe seu CPF.");
    correto = false;
  } else if (!validarCPF(cpf.value)) {
    marcarErro(cpf, "CPF inválido. Confira os números.");
    correto = false;
  } else {
    marcarOk(cpf);
  }

  // 3 - Data de nascimento: data anterior a hoje e idade entre 12 e 110 anos
  if (nascimento.value == "") {
    marcarErro(nascimento, "Informe sua data de nascimento.");
    correto = false;
  } else {
    var dataNasc = textoParaData(nascimento.value);
    var idade = calcularIdade(dataNasc);
    if (dataNasc >= dataDeHoje()) {
      marcarErro(nascimento, "A data de nascimento precisa ser anterior a hoje.");
      correto = false;
    } else if (idade < 12) {
      marcarErro(nascimento, "Atendimento a partir de 12 anos (menores com responsável).");
      correto = false;
    } else if (idade > 110) {
      marcarErro(nascimento, "Confira o ano de nascimento.");
      correto = false;
    } else {
      marcarOk(nascimento);
    }
  }

  // 4 - Telefone: 10 ou 11 números
  var numTelefone = somenteNumeros(telefone.value);
  if (numTelefone == "") {
    marcarErro(telefone, "Informe um telefone para contato.");
    correto = false;
  } else if (numTelefone.length < 10) {
    marcarErro(telefone, "Telefone incompleto. Use (DDD) + número.");
    correto = false;
  } else {
    marcarOk(telefone);
  }

  // 5 - E-mail com regex
  if (email.value == "") {
    marcarErro(email, "Informe seu e-mail.");
    correto = false;
  } else if (!validarEmail(email.value)) {
    marcarErro(email, "E-mail em formato inválido. Ex: nome@email.com");
    correto = false;
  } else {
    marcarOk(email);
  }

  // 6 - CEP: 8 números
  if (somenteNumeros(cep.value).length != 8) {
    marcarErro(cep, "CEP deve ter 8 números.");
    correto = false;
  } else {
    marcarOk(cep);
  }

  // 7 - Cidade: mínimo 3 letras
  if (cidade.value.trim().length < 3) {
    marcarErro(cidade, "Informe sua cidade.");
    correto = false;
  } else {
    marcarOk(cidade);
  }

  // 8 - Estado (select)
  if (estado.value == "") {
    marcarErro(estado, "Escolha a UF.");
    correto = false;
  } else {
    marcarOk(estado);
  }

  // 9 - Profissional (select)
  if (profissional.value == "") {
    marcarErro(profissional, "Escolha um profissional.");
    correto = false;
  } else {
    marcarOk(profissional);
  }

  // 10 - Tipo de atendimento (select)
  if (tipo.value == "") {
    marcarErro(tipo, "Escolha o tipo de atendimento.");
    correto = false;
  } else {
    marcarOk(tipo);
  }

  // 11 - Modalidade (radio): pelo menos um marcado
  var modalidadeEscolhida = "";
  for (let i = 0; i < radiosModalidade.length; i++) {
    if (radiosModalidade[i].checked) {
      modalidadeEscolhida = radiosModalidade[i].value;
    }
  }
  var erroModalidade = document.querySelector("#erro-modalidade");
  for (let i = 0; i < radiosModalidade.length; i++) {
    if (modalidadeEscolhida == "") {
      radiosModalidade[i].classList.add("is-invalid");
    } else {
      radiosModalidade[i].classList.remove("is-invalid");
    }
  }
  if (modalidadeEscolhida == "") {
    erroModalidade.innerHTML = "Escolha online ou presencial.";
    erroModalidade.classList.add("d-block");
    correto = false;
  } else {
    erroModalidade.classList.remove("d-block");
  }

  // 12 - Data do atendimento: data futura, até 60 dias e sem domingo
  if (dataAtendimento.value == "") {
    marcarErro(dataAtendimento, "Escolha a data do atendimento.");
    correto = false;
  } else {
    var dataEscolhida = textoParaData(dataAtendimento.value);
    var limite = dataDeHoje();
    limite.setDate(limite.getDate() + 60);

    if (dataEscolhida <= dataDeHoje()) {
      marcarErro(dataAtendimento, "Escolha uma data futura (a partir de amanhã).");
      correto = false;
    } else if (dataEscolhida > limite) {
      marcarErro(dataAtendimento, "A agenda está aberta só para os próximos 60 dias.");
      correto = false;
    } else if (dataEscolhida.getDay() == 0) {
      marcarErro(dataAtendimento, "Não há atendimentos aos domingos.");
      correto = false;
    } else {
      marcarOk(dataAtendimento);
    }
  }

  // 13 - Horário (botões)
  if (horario.value == "") {
    marcarErro(horario, "Clique em um dos horários.");
    correto = false;
  }

  // 14 - Valor: faixa de R$ 0,00 a R$ 200,00
  if (valor.value == "") {
    marcarErro(valor, "Informe um valor (pode ser R$ 0,00).");
    correto = false;
  } else if (valorParaNumero(valor.value) > 200) {
    marcarErro(valor, "O valor deve ficar entre R$ 0,00 e R$ 200,00.");
    correto = false;
  } else {
    marcarOk(valor);
  }

  // 15 - Motivo: mínimo de 20 caracteres
  if (motivo.value.trim().length < 20) {
    marcarErro(motivo, "Escreva pelo menos 20 caracteres (faltam " +
      (20 - motivo.value.trim().length) + ").");
    correto = false;
  } else {
    marcarOk(motivo);
  }

  // 16 - Termos (checkbox)
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

  if (validarAgendamento()) {
    // descobre qual radio de modalidade está marcado
    var modalidade = "";
    for (let i = 0; i < radiosModalidade.length; i++) {
      if (radiosModalidade[i].checked) {
        modalidade = radiosModalidade[i].value;
      }
    }

    // adiciona o novo agendamento no vetor e redesenha a tabela
    vetAgendamentos.push({
      profissional: profissional.value,
      tipo: tipo.value,
      modalidade: modalidade,
      data: dataAtendimento.value,
      horario: horario.value
    });
    montarTabela();

    msgSucesso.innerHTML = "<strong>Agendamento confirmado!</strong> " +
      nome.value.split(" ")[0] + ", sua conversa com " + profissional.value +
      " ficou para " + formatarData(dataAtendimento.value) + " às " + horario.value +
      ". Veja abaixo em \"Meus agendamentos\". (demonstração)";
    msgSucesso.classList.remove("d-none");

    limparFormulario();
  } else {
    msgErro.innerHTML = "<strong>Ops!</strong> Encontramos alguns campos com problema. Corrija os campos em vermelho.";
    msgErro.classList.remove("d-none");
  }
}, false);

/* ---------- LIMPAR ---------- */
function limparFormulario() {
  formAgendamento.reset();

  var campos = formAgendamento.querySelectorAll(".form-control, .form-select, .form-check-input");
  for (let i = 0; i < campos.length; i++) {
    limparMarcacao(campos[i]);
  }
  limparMarcacao(horario);
  horario.value = "";
  document.querySelector("#erro-modalidade").classList.remove("d-block");

  for (let i = 0; i < vetHorarios.length; i++) {
    vetHorarios[i].classList.remove("btn-primary");
    vetHorarios[i].classList.add("btn-outline-primary");
  }
  humorTexto.innerHTML = "5";
  contadorMotivo.innerHTML = "0";
}

document.querySelector("#btnLimpar").addEventListener("click", function (evento) {
  evento.preventDefault();
  limparFormulario();
  msgErro.classList.add("d-none");
  msgSucesso.classList.add("d-none");
}, false);

/* =========================================================
   TABELA COM CHECKBOX PARA EXCLUSÃO
   Vetor estático simulando dados (ainda sem banco de dados)
   ========================================================= */
var vetAgendamentos = [
  { profissional: "Camila Araujo — Psicóloga", tipo: "Conversa de acolhimento", modalidade: "Online", data: "2026-11-18", horario: "09:00" },
  { profissional: "Carlos Mendes — Terapeuta", tipo: "Orientação", modalidade: "Presencial", data: "2026-11-21", horario: "14:00" },
  { profissional: "Mariana Costa — Psicóloga", tipo: "Atendimento individual", modalidade: "Online", data: "2026-11-25", horario: "10:00" },
  { profissional: "Juliana Rocha — Terapeuta", tipo: "Conversa de acolhimento", modalidade: "Online", data: "2026-12-02", horario: "16:00" },
  { profissional: "Camila Araujo — Psicóloga", tipo: "Atendimento individual", modalidade: "Presencial", data: "2026-12-09", horario: "08:00" }
];

var corpoTabela = document.querySelector("#corpoTabela");
var marcarTodos = document.querySelector("#marcarTodos");
var msgTabela = document.querySelector("#msgTabela");

// Monta as linhas da tabela a partir do vetor
function montarTabela() {
  corpoTabela.innerHTML = "";

  if (vetAgendamentos.length == 0) {
    corpoTabela.innerHTML = "<tr><td colspan='6' class='text-center text-secondary py-4'>" +
      "Nenhum agendamento por aqui. Que tal marcar uma conversa?</td></tr>";
    return;
  }

  for (let i = 0; i < vetAgendamentos.length; i++) {
    var item = vetAgendamentos[i];

    // cor da etiqueta: azul para Online, amarela para Presencial
    var corBadge = "text-bg-warning";
    if (item.modalidade == "Online") {
      corBadge = "text-bg-info";
    }

    corpoTabela.innerHTML +=
      "<tr>" +
      "<td><input type='checkbox' class='form-check-input chkItem' value='" + i + "'></td>" +
      "<td>" + item.profissional + "</td>" +
      "<td>" + item.tipo + "</td>" +
      "<td><span class='badge " + corBadge + "'>" + item.modalidade + "</span></td>" +
      "<td>" + formatarData(item.data) + "</td>" +
      "<td>" + item.horario + "</td>" +
      "</tr>";
  }
  marcarTodos.checked = false;
}

// Checkbox do cabeçalho: marca ou desmarca todos
marcarTodos.addEventListener("click", function () {
  var vetChk = document.querySelectorAll(".chkItem");
  for (let i = 0; i < vetChk.length; i++) {
    vetChk[i].checked = marcarTodos.checked;
  }
}, false);

// Botão excluir: remove do vetor os itens marcados
document.querySelector("#btnExcluir").addEventListener("click", function () {
  var vetChk = document.querySelectorAll(".chkItem");
  var novoVetor = [];
  var qtdExcluidos = 0;

  for (let i = 0; i < vetChk.length; i++) {
    if (vetChk[i].checked) {
      qtdExcluidos++;
    } else {
      novoVetor.push(vetAgendamentos[i]); // fica só quem NÃO foi marcado
    }
  }

  msgTabela.classList.remove("d-none");
  msgTabela.classList.remove("alert-warning");
  msgTabela.classList.remove("alert-success");

  if (qtdExcluidos == 0) {
    msgTabela.classList.add("alert-warning");
    msgTabela.innerHTML = "Marque pelo menos um agendamento para excluir.";
    return;
  }

  vetAgendamentos = novoVetor;
  montarTabela();
  msgTabela.classList.add("alert-success");
  msgTabela.innerHTML = qtdExcluidos + " agendamento(s) excluído(s) com sucesso.";
}, false);

// Desenha a tabela quando a página abre
montarTabela();
