

let lojas = {};
let equipamentos = [];

fetch('./lojas.json')
  .then(res => res.json())
  .then(data => lojas = data)
  .catch(err => showToast("Erro ao carregar os dados das lojas.", true));

// Carregamento dos equipamentos (Plaqueta -> Modelo)
fetch('./equipamentos.json')
  .then(res => res.json())
  .then(data => equipamentos = data)
  .catch(err => console.log("Aviso: 'equipamentos.json' não foi carregado. Pode não existir ainda ou ser inválido."));

/* --- Theme Logic --- */
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";

  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);

  const toggleBtn = document.getElementById("themeToggle");
  toggleBtn.innerText = newTheme === "light" ? "☀️" : "🌙";

  showToast(`Modo ${newTheme === "light" ? "Claro" : "Escuro"} ativado!`);
}

// Initialize theme from storage
(function initTheme() {
  const savedTheme = localStorage.getItem("theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);

  window.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById("themeToggle");
    if (toggleBtn) {
      toggleBtn.innerText = savedTheme === "light" ? "☀️" : "🌙";
    }
  });
})();

/* --- UI Logic --- */
function showToast(message, isError = false) {
  const toast = document.getElementById("toast");
  toast.innerText = message;
  toast.style.background = isError ? "linear-gradient(135deg, #ff3c3c, #b31414)" : "linear-gradient(135deg, #7000ff, #4a00a8)";
  toast.style.display = "block";
  setTimeout(() => { toast.style.display = "none"; }, 3000);
}

function showTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(t => t.classList.add('hidden'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));

  document.getElementById(tabId).classList.remove('hidden');
  event.currentTarget.classList.add('active');
}

function buscarLoja() {
  const id = document.getElementById("searchInput").value.trim();
  const dados = lojas[id];

  if (id && dados) {
    document.getElementById("camposExtras").classList.remove("hidden");
    showToast("Loja " + id + " (" + dados.cidade + ") carregada!");
  } else {
    showToast("Loja não encontrada ou ID vazio.", true);
    document.getElementById("camposExtras").classList.add("hidden");
  }
}

/* --- AI Logic --- */
let aiSuggestion = null;

function aiAnalyze() {
  const prob = document.getElementById("problema").value.toLowerCase();
  const aiPanel = document.getElementById("aiPanel");
  const aiMessage = document.getElementById("aiMessage");

  if (prob.length < 5) {
    aiPanel.classList.add("hidden");
    return;
  }

  aiPanel.classList.remove("hidden");

  if (prob.includes("troca") || prob.includes("quebrado") || prob.includes("parou") || prob.includes("monitor") || prob.includes("teclado") || prob.includes("mouse") || prob.includes("pdv") || prob.includes("plaqueta")) {
    aiMessage.innerHTML = "✨ <b>I.A. Arklok:</b> Identifiquei um possível problema de hardware. <br>Recomendo a aba <b>Equipamento</b> para gerar o chamado de troca.";
    aiSuggestion = "equipamento";
  } else if (prob.includes("lento") || prob.includes("travando") || prob.includes("sistema") || prob.includes("librix") || prob.includes("windows") || prob.includes("senha")) {
    aiMessage.innerHTML = "✨ <b>I.A. Arklok:</b> Parece ser um problema de software ou configuração. <br>Sugiro a aba <b>Técnico</b> para solicitar suporte remoto/campo.";
    aiSuggestion = "tecnico";
  } else {
    aiMessage.innerHTML = "✨ <b>I.A. Arklok:</b> Estou analisando sua descrição para sugerir o melhor fluxo...";
    aiSuggestion = null;
  }
}

function aiApplySuggestions() {
  if (aiSuggestion === "equipamento") {
    showTab('tab-equip');
    document.getElementById("patrimonio").focus();
    showToast("Foco alterado para Troca de Equipamento");
  } else if (aiSuggestion === "tecnico") {
    showTab('tab-tecnico');
    document.getElementById("procedimentosRemotos").focus();
    showToast("Foco alterado para Suporte Técnico");
  } else {
    showToast("Continue digitando para mais sugestões.");
  }
}

/* --- Clipboard Actions --- */
async function copyToClipboard(texto, message = "Copiado para o clipboard!") {
  try {
    await navigator.clipboard.writeText(texto);
    showToast(message);
  } catch (err) {
    showToast("Erro ao acessar clipboard.", true);
  }
}

function getBaseInfo(id, dados) {
  return `LOJA - ${id}
Chamado Externo: ${document.getElementById("chamado").value}
Chamado Arklok: ${document.getElementById("cervello").value}
Telefone Loja: ${document.getElementById("telefoneLoja").value}
Telefone Gerente: ${document.getElementById("telefoneGerente").value}
E-mail: ${dados.email}
Endereço: ${dados.rua}
Bairro: ${dados.bairro}
CEP: ${dados.cep}
Cidade: ${dados.cidade} / ${dados.UF}
Plaqueta: ${document.getElementById("patrimonio").value}`;
}

function copiarInformacoes() {
  const id = document.getElementById("searchInput").value.trim();
  const dados = lojas[id];
  if (!dados) return;

  const texto = `${getBaseInfo(id, dados)}
Problema Encontrado: ${document.getElementById("problema").value}`;
  copyToClipboard(texto, "Escopo Cervello Copiado!");
}

function copiarCervello() {
  const texto = `Prezados (as):
Seu chamado foi recebido pela Arklok e, em breve, iremos atender sua solicitação.
Chamado Cervello: ${document.getElementById("cervello").value}

Prezado(a), o chamado foi encaminhado à equipe de Field Service. Pedimos a gentileza de aguardar o agendamento da visita técnica.`;
  copyToClipboard(texto, "Log de Atendimento Copiado!");
}

function copiarChamadoTecnico() {
  const id = document.getElementById("searchInput").value.trim();
  const dados = lojas[id];
  if (!dados) return;

  const texto = `Chamado Técnico | Pague Menos/Extrafarma Loja ${id} – ${dados.cidade}
Prezados,
Solicitamos Atendimento Técnico Na Pague Menos Loja - ${id}
Chamado Externo: ${document.getElementById("chamado").value}
Chamado Arklok: ${document.getElementById("cervello").value}
Plaqueta: ${document.getElementById("patrimonio").value}
Descrição Do Chamado: ${document.getElementById("problema").value}
Procedimentos executados remotamente: ${document.getElementById("procedimentosRemotos").value}
Endereço: ${dados.rua}
Bairro: ${dados.bairro}
CEP: ${dados.cep}
Cidade: ${dados.cidade}
UF: ${dados.UF || ""}

Itens e Instruções para Manutenção no Cliente:
Para realizar o reparo do equipamento solicitado pela loja, é essencial levar os seguintes itens:
1. Imagem do sistema:
A imagem necessária encontra-se na última versão enviada pelo cliente, disponível no SharePoint. O caminho para acessá-la é:
Imagens > Pague Menos > Imagens > Windows Balcão
Arquivo: PAGUE MENOS - BALCAO - WIN 10 22H2 - (Att. Fev. 2025).mrimg
2. Ferramentas necessárias:
Baixar o aplicativo "HirensBoot" ou "Gandalf" para realizar o restore do arquivo “.mrimg” utilizando a ferramenta “Macrium”, que está inclusa nos aplicativos citados.
• Link para download: https://www.hirensbootcd.org/#google_vignette
Atenção: Monte o Pendrive para o boot antes de se dirigir ao estabelecimento, para evitar contratempos com a montagem do dispositivo no local.
3. Backup de dados:
Antes de iniciar qualquer procedimento, consulte a loja para verificar se é necessário realizar o backup de pastas e arquivos. Como as portas USB dos equipamentos são bloqueadas pela PGM, utilize uma das ferramentas “Hirens” ou “Gandalf” para a realização do backup.`;

  copyToClipboard(texto, "Chamado Windows Copiado!");
}

function copiarChamadoTecnicoLibrix() {
  const id = document.getElementById("searchInput").value.trim();
  const dados = lojas[id];
  if (!dados) return;

  const texto = `Chamado Técnico (Librix) | Loja ${id} – ${dados.cidade}
Prezados,
Solicitamos Atendimento Técnico Na Pague Menos ${id}
Chamado Externo: ${document.getElementById("chamado").value}
Chamado Arklok: ${document.getElementById("cervello").value}
Plaqueta: ${document.getElementById("patrimonio").value}
Descrição: ${document.getElementById("problema").value}
Procedimentos: ${document.getElementById("procedimentosRemotos").value}
Endereço: ${dados.rua}
UF: ${dados.UF || ""}

Instruções para Realização do Reparo do Equipamento Solicitado pela Loja:
Para a execução do reparo, siga as orientações abaixo. Os arquivos necessários estão disponíveis nas últimas versões enviadas pelo cliente e podem ser acessados no SharePoint. O caminho para acessá-los é:
Imagens > Pague Menos > Imagens>Librix_Pdv
Arquivos imprescindíveis para a montagem do Pendrive bootável:
•	Imagem: Librix-Embarcado-6.1.7-V8.0.iso
•	RPMs (install_rpm):
Para os demais estados, faça o download dos arquivos da pasta correspondente: 
Para o estado do Ceará, baixe os arquivos da pasta indicada:
 
•	Arqsinc:
Para estabelecimentos Extra Farma, faça o download dos arquivos da pasta específica:
 
Para estabelecimentos Pague Menos, baixe os arquivos da pasta pertinente: 
Importante:
No momento da formatação, os únicos dispositivos que devem permanecer conectados aos PDVs são os seguintes:
1.Impressora;
2.MFE (para lojas no Ceará);
3.SAT (para lojas em São Paulo);
4.Teclado;
5.Pinpad;
6.Leitor de código de barras.
Observação:
Mouse e outros dispositivos não listados acima não são necessários para o funcionamento do PDV e podem causar falhas de comunicação com os dispositivos essenciais para a operação correta do sistema.`;
  copyToClipboard(texto, "Chamado Librix Copiado!");
}

function solicitacaoTecnicaEquipamentosGerais() {
  const id = document.getElementById("searchInput").value.trim();
  const dados = lojas[id];
  if (!dados) return;

  const texto = `Chamado Técnico Geral | Loja ${id}
Chamado Externo: ${document.getElementById("chamado").value}
Chamado Arklok: ${document.getElementById("cervello").value}
Plaqueta: ${document.getElementById("patrimonio").value}
Descrição: ${document.getElementById("problema").value}
Endereço: ${dados.rua}, ${dados.cidade}`;
  copyToClipboard(texto);
}

function solicitacaoDeEquipamento() {
  const id = document.getElementById("searchInput").value.trim();
  const dados = lojas[id];
  if (!dados) return;

  const texto = `[ X ] NECESSÁRIO TROCA DE EQUIPAMENTO
Número de plaqueta Com Problema: ${document.getElementById("patrimonio").value}
Modelo: ${document.getElementById("modelo").value}
Modelo (S) Envio: ${document.getElementById("modeloSerEnviado").value}

Contrato: 202300198
Termo: ${document.getElementById("obra").value}
Código do cliente: 000678
LOJA: 0001
SKU: ${document.getElementById("sku").value}
Imagem: [ ] SIM  [ ] NÃO [ ] N/A
Saída: [ ] TÉCNICO [ ] TRANSPORTADORA [ ] CORREIOS [ ] MOTOBOY
Base: [ ] ITAPEVI [ ] BARRA FUNDA
Solicitante: ${id}
Razão Social: ${dados.razaoSocial}
CNPJ: ${dados.CNPJ}
Endereço: ${dados.rua}
Bairro: ${dados.bairro}
Cidade: ${dados.cidade}
CEP: ${dados.cep}

**INCLUIR INFORMAÇÕES NF**
SOLICITANTE: ${id}
USUÁRIO FINAL: ${id}
CHAMADO EXTERNO (SE HOUVER): ${document.getElementById("chamado").value}`;

  copyToClipboard(texto, "Solicitação de Equipamento Copiada!");
}

function solicitacaoDePeca() {
  const id = document.getElementById("searchInput").value.trim();
  const dados = lojas[id];
  if (!dados) return;

  const texto = `[ X ] NECESSÁRIO TROCA DE PEÇA
Plaqueta: ${document.getElementById("patrimonio").value}
Peça: ${document.getElementById("pecaSerEnviado").value}
Modelo: ${document.getElementById("modelo").value}
SKU: ${document.getElementById("sku").value}
Endereço: ${dados.rua}`;
  copyToClipboard(texto, "Solicitação de Peça Copiada!");
}

function SolicitacaoEstoque() {
  const texto = `Solicitado ao Estoque Arklok o envio de um(a) novo(a).
Plaqueta: ${document.getElementById("patrimonio").value}

Por favor aguarde pelas informações de envio.`;
  copyToClipboard(texto);
}

function SolicitacaoComercial() {
  const texto = `Olá!
Seu chamado encontra-se atualmente no setor Comercial para tratativa.
Em breve você receberá um retorno. Assim que houver retorno, avisaremos.

Plaqueta: ${document.getElementById("patrimonio").value}

Quaisquer dúvidas estou à disposição.
Atenciosamente, Suporte Arklok.`;
  copyToClipboard(texto);
}

function SolicitacaoTranspor() {
  const texto = `Olá!
O chamado já está com a transportadora  para tratativa.
Assim que houver retorno, avisaremos.

Plaqueta: ${document.getElementById("patrimonio").value}
 
Quaisquer dúvidas estou à disposição,
Atenciosamente Suporte Arklok.`;
  copyToClipboard(texto);
}

async function buscarIP() {
  const lojaId = document.getElementById("searchInput").value.trim();
  const pdvNumero = document.getElementById("pdvInput").value.trim();

  if (!lojaId || !pdvNumero) { showToast("Preencha Loja e PDV.", true); return; }

  try {
    const response = await fetch("./ip.json");
    const ipData = await response.json();
    const loja = ipData.find(l => l.idLoja === lojaId);

    if (!loja) { showToast("Loja não encontrada nos IPs.", true); return; }
    const pdv = loja.pdvs.find(p => p.numero === pdvNumero);
    if (!pdv) { showToast("PDV não encontrado.", true); return; }

    const info = `Loja: ${lojaId}
PDV: ${pdv.numero}
IP: ${pdv.ip}
Máscara: ${pdv.mascara}
Gateway: ${pdv.gateway}
DNS: ${pdv.dns}
FTP: ${pdv.ftp}
SIAC: ${pdv.siac}`;
    await navigator.clipboard.writeText(info);
    showToast("IP do PDV " + pdvNumero + " copiado!");
  } catch (err) {
    showToast("Erro ao carregar IPs.", true);
  }
}

function limparTudo() {
  const ids = ["searchInput", "chamado", "cervello", "telefoneLoja", "telefoneGerente", "problema", "procedimentosRemotos", "patrimonio", "patrimonioInfo", "modelo", "modeloSerEnviado", "sku", "obra", "pecaSerEnviado", "pdvInput"];
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = "";
  });
  document.getElementById("camposExtras").classList.add("hidden");
  document.getElementById("aiPanel").classList.add("hidden");
  showToast("Sistema limpo!");
}

function abrirLigacao(campoId) {
  let tel = document.getElementById(campoId).value.replace(/\D/g, '');
  if (tel.length < 10) { showToast("Telefone inválido.", true); return; }
  if (tel.length === 11 && tel.startsWith('0')) tel = tel.substring(1);
  window.open(`https://wa.me/55${tel}`, '_blank');
}

// Sync patrimonio fields and Auto-Fill Logic
document.addEventListener("DOMContentLoaded", () => {
  const pat = document.getElementById("patrimonio");
  const patInfo = document.getElementById("patrimonioInfo");
  const modeloInput = document.getElementById("modelo");
  const obraInput = document.getElementById("obra");

  // Função para pesquisar a plaqueta no "equipamentos.json"
  function buscarEPreencherModelo(valorPlaqueta) {
    if (!valorPlaqueta) return;

    // Procura na nossa base (array de equipamentos)
    const encontrado = equipamentos.find(equip => {
      // Como não sabemos qual será a coluna certa no Excel, testamos os nomes mais comuns
      const plaquetaNaBase = equip["Plaqueta"] || equip["Patrimônio"] || equip["Patrimonio"];
      return plaquetaNaBase && String(plaquetaNaBase).trim() === String(valorPlaqueta).trim();
    });

    if (encontrado) {
      if (modeloInput) {
        // Preencho o modelo caso encontre
        modeloInput.value = encontrado["Modelo"] || encontrado["modelo"] || encontrado["MODELO"] || "";
      }
      if (obraInput) {
        // Preencho o termo (obra) caso encontre
        obraInput.value = encontrado["Termo"] || encontrado["termo"] || encontrado["TERMO"] || encontrado["Obra"] || encontrado["Contrato"] || "";
      }
    }
  }

  if (pat && patInfo) {
    pat.addEventListener("input", (e) => {
      patInfo.value = e.target.value;
      buscarEPreencherModelo(e.target.value);
    });

    patInfo.addEventListener("input", (e) => {
      pat.value = e.target.value;
      buscarEPreencherModelo(e.target.value);
    });
  }
});
