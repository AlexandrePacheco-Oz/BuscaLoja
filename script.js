let lojas = {};

fetch('lojas.json')
  .then(res => res.json())
  .then(data => lojas = data)
  .catch(err => alert("Erro ao carregar os dados das lojas."));

function buscarLoja() {
  const id = document.getElementById("searchInput").value.trim();
  const dados = lojas[id];

  if (dados) {
    document.getElementById("camposExtras").classList.remove("hidden");
  } else {
    alert("Loja não encontrada.");
    document.getElementById("camposExtras").classList.add("hidden");
  }
}

function copiarInformacoes() {
  const id = document.getElementById("searchInput").value.trim();
  const dados = lojas[id];
  if (!dados) return;

  const chamado = document.getElementById("chamado").value.trim();
  const telLoja = document.getElementById("telefoneLoja").value.trim();
  const telGerente = document.getElementById("telefoneGerente").value.trim();
  const patrimonio = document.getElementById("patrimonio").value.trim();
  const problema = document.getElementById("problema").value.trim();
  
  const texto = `LOJA - ${id}
Chamado Externo: ${chamado}
Telefone Loja: ${telLoja}
Telefone Gerente: ${telGerente}
E-mail: ${dados.email}
Patrimônio Arklok: ${patrimonio}
Endereço: ${dados.rua}
Bairro: ${dados.bairro}
CEP: ${dados.cep}
Cidade: ${dados.cidade} / ${dados.UF}
Problema Encontrado: ${problema}`;

  navigator.clipboard.writeText(texto).then(() => alert("Informações copiadas!"));
}

function copiarCervello() {
  const cervello = document.getElementById("cervello").value.trim();
  const texto = `Prezados (as):
Seu chamado foi recebido pela Arklok e, em breve, iremos atender sua solicitação.
Chamado Cervello: ${cervello}

Prezado(a), o chamado foi encaminhado à equipe de Field Service. Pedimos a gentileza de aguardar o agendamento da visita técnica.`;

  navigator.clipboard.writeText(texto).then(() => alert("Texto do Cervello copiado!"));
}

function copiarChamadoTecnico() {
  const id = document.getElementById("searchInput").value.trim();
  const dados = lojas[id];
  if (!dados) { alert("Você precisa buscar uma loja primeiro."); return; }

  const chamado = document.getElementById("chamado").value.trim();
  const problema = document.getElementById("problema").value.trim();
  const procedimentos = document.getElementById("procedimentosRemotos").value.trim();

  const textoTecnico = `Chamado Técnico | Pague Menos/Extrafarma Loja ${id} – ${dados.cidade}
Prezados,
Solicitamos Atendimento Técnico Na Pague Menos Loja - ${id}

Chamado: ${chamado}

Descrição Do Chamado: ${problema}
Procedimentos executados remotamente: ${procedimentos}

Endereço: ${dados.rua}
Bairro: ${dados.bairro}
CEP: ${dados.cep}
Cidade: ${dados.cidade}
UF: ${dados.UF || "UF não informada"}

Itens e Instruções para Manutenção no Cliente:
Para realizar o reparo do equipamento solicitado pela loja, é essencial levar os seguintes itens:
1. Imagem do sistema:
A imagem necessária encontra-se na última versão enviada pelo cliente, disponível no SharePoint. O caminho para acessá-la é:
Imagens > Pague Menos > Imagens > Windows Balcão
Arquivo: PAGUE MENOS - BALCÃO - WIN 11 24H2 - (Att. JUL. 2025.iso)
2. Ferramentas necessárias:
Baixar o aplicativo "HirensBoot" ou "Gandalf" para realizar o restore do arquivo “.mrimg” utilizando a ferramenta “Macrium”, que está inclusa nos aplicativos citados.
• Link para download: https://www.hirensbootcd.org/#google_vignette
Atenção: Monte o Pendrive para o boot antes de se dirigir ao estabelecimento, para evitar contratempos com a montagem do dispositivo no local.
3. Backup de dados:
Antes de iniciar qualquer procedimento, consulte a loja para verificar se é necessário realizar o backup de pastas e arquivos. Como as portas USB dos equipamentos são bloqueadas pela PGM, utilize uma das ferramentas “Hirens” ou “Gandalf” para a realização do backup.`;

  navigator.clipboard.writeText(textoTecnico).then(() => alert("Chamado Técnico copiado!"));
}

function copiarChamadoTecnicoLibrix(){
  const id = document.getElementById("searchInput").value.trim();
  const dados = lojas[id];
  if (!dados) { alert("Você precisa buscar uma loja primeiro."); return; }

  const chamado = document.getElementById("chamado").value.trim();
  const problema = document.getElementById("problema").value.trim();
  const procedimentos = document.getElementById("procedimentosRemotos").value.trim();

  const textoTecnico = `Chamado Técnico | Pague Menos/Extrafarma Loja ${id} – ${dados.cidade}
  
Prezados,
Solicitamos Atendimento Técnico Na Pague Menos ${id}

Chamado: ${chamado}

Descrição Do Chamado: ${problema}
Procedimentos executados remotamente: ${procedimentos}

Endereço: ${dados.rua}
Bairro: ${dados.bairro}
CEP: ${dados.cep}
Cidade: ${dados.cidade}
UF: ${dados.UF || "UF não informada"}

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

  navigator.clipboard.writeText(textoTecnico).then(() => alert("Chamado Técnico copiado!"));
}

function solicitacaoTecnicaEquipamentosGerais(){
  const id = document.getElementById("searchInput").value.trim();
  const dados = lojas[id];
  if (!dados) { alert("Você precisa buscar uma loja primeiro."); return; }

  const chamado = document.getElementById("chamado").value.trim();
  const problema = document.getElementById("problema").value.trim();
  const procedimentos = document.getElementById("procedimentosRemotos").value.trim();

  const textoTecnico = `Chamado Técnico | Pague Menos/Extrafarma Loja ${id} – ${dados.cidade}
Prezados,
Solicitamos Atendimento Técnico Na Pague Menos ${id}

Chamado: ${chamado}

Descrição Do Chamado: ${problema}
Procedimentos executados remotamente: ${procedimentos}

Endereço: ${dados.rua}
Bairro: ${dados.bairro}
CEP: ${dados.cep}
Cidade: ${dados.cidade}
UF: ${dados.UF || "UF não informada"}`;

  navigator.clipboard.writeText(textoTecnico).then(() => alert("Chamado Técnico copiado!"));
}

function solicitacaoDeEquipamento(){
  const id = document.getElementById("searchInput").value.trim();
  const dados = lojas[id];
  if (!dados) { alert("Você precisa buscar uma loja primeiro."); return; }

  const chamado = document.getElementById("chamado").value.trim();
  const patrimonio = document.getElementById("patrimonio").value.trim();
  const projeto = document.getElementById("projeto").value.trim();
  const obra = document.getElementById("obra").value.trim();
  const modelo1 = document.getElementById("modelo").value.trim();
  const modeloS = document.getElementById("modeloSerEnviado").value.trim();
  const lojaCLI = document.getElementById("lojaCLI").value.trim();
  const sequencia = document.getElementById("sequencia").value.trim(); 
  const sku = document.getElementById("sku").value.trim(); 

  const textoTecnico = `[ X ] NECESSÁRIO TROCA DE EQUIPAMENTO
Patrimônio Com Problema: ${patrimonio}
Modelo: ${modelo1}
Modelo (S) Envio: ${modeloS}
Projeto: ${projeto}
Obra: ${obra}
Loja CLI: ${lojaCLI}
Sequência: ${sequencia}
SKU: ${sku}
Imagem: [ ] SIM  [ ] NÃO [ ] N/A
Saída: [ ] TÉCNICO [ ] TRANSPORTADORA [ ] CORREIOS [ ] MOTOBOY
Base: [ ] ITAPEVI [ ] BARRA FUNDA
Solicitante: ${dados.Loja}
Razão Social: ${dados.razaoSocial}
CNPJ: ${dados.CNPJ}
Endereço: ${dados.rua}
Bairro: ${dados.bairro}
Cidade: ${dados.cidade}
CEP: ${dados.cep}

**INCLUIR INFORMAÇÕES NF**
SOLICITANTE: ${dados.Loja}
USUÁRIO FINAL:  ${dados.Loja}
CHAMADO EXTERNO (SE HOUVER): ${chamado}`;

  navigator.clipboard.writeText(textoTecnico).then(() => alert("Chamado Técnico copiado!"));
}

function SolicitacaoEstoque(){
  const id = document.getElementById("searchInput").value.trim();
  const dados = lojas[id];
  if (!dados) { alert("Você precisa buscar uma loja primeiro."); return; }

  const textoTecnico = `Solicitado ao Estoque Arklok o envio de um(a) novo(a).
Por favor aguarde pelas informações de envio e previsão de entrega.`;

  navigator.clipboard.writeText(textoTecnico).then(() => alert("Chamado Técnico copiado!"));
}

function solicitacaoDePeca(){
  const id = document.getElementById("searchInput").value.trim();
  const dados = lojas[id];
  if (!dados) { alert("Você precisa buscar uma loja primeiro."); return; }

  const chamado = document.getElementById("chamado").value.trim();
  const patrimonio = document.getElementById("patrimonio").value.trim();
  const projeto = document.getElementById("projeto").value.trim();
  const obra = document.getElementById("obra").value.trim();
  const modelo1 = document.getElementById("modelo").value.trim();
  const lojaCLI = document.getElementById("lojaCLI").value.trim();
  const sequencia = document.getElementById("sequencia").value.trim(); 
  const sku = document.getElementById("sku").value.trim(); 
  const peca = document.getElementById("pecaSerEnviado").value.trim();

  const textoTecnico = `[ X ] NECESSÁRIO TROCA DE PEÇA
Patrimônio Com Problema: ${patrimonio}
Modelo: ${modelo1}
Peça: ${peca}
Projeto: ${projeto}
Obra: ${obra}
Loja CLI: ${lojaCLI}
Sequência: ${sequencia}
SKU: ${sku}
Imagem: [ ] SIM  [ ] NÃO [ ] N/A
Saída: [ ] TÉCNICO [ ] TRANSPORTADORA [ ] CORREIOS [ ] MOTOBOY
Base: [ ] ITAPEVI [ ] BARRA FUNDA
Solicitante: ${dados.Loja}
Razão Social: EMPREENDIMENTOS PAGUE MENOS S/A
CNPJ: ${dados.CNPJ}
Endereço: ${dados.rua}
Bairro: ${dados.bairro}
Cidade: ${dados.cidade}
CEP: ${dados.cep} 

**INCLUIR INFORMAÇÕES NF**
SOLICITANTE: ${dados.Loja}
USUÁRIO FINAL:  ${dados.Loja}
CHAMADO EXTERNO (SE HOUVER): ${chamado}`;

  navigator.clipboard.writeText(textoTecnico).then(() => alert("Chamado Técnico copiado!"));
}

/* --- Funções para Buscar IP --- */
function mostrarCampoPDV() {
  const campoPDV = document.getElementById("campoPDV");
  campoPDV.classList.remove("hidden");

  const pdvInput = document.getElementById("pdvInput");
  const btnConfirmar = document.getElementById("btnConfirmarPDV");

  if (pdvInput.value.trim() === "") btnConfirmar.classList.add("hidden");

  pdvInput.addEventListener("input", function() {
    if (pdvInput.value.trim() !== "") btnConfirmar.classList.remove("hidden");
    else btnConfirmar.classList.add("hidden");
  });
}

async function buscarIP() { 
  const lojaId = document.getElementById("searchInput").value.trim();
  const pdvNumero = document.getElementById("pdvInput").value.trim();
  const btnConfirmar = document.getElementById("btnConfirmarPDV");

  if (!lojaId) { alert("Digite o ID da loja."); return; }
  if (!pdvNumero) { alert("Digite o número do PDV."); return; }

  try {
    const response = await fetch("./ip.json"); 
    const lojas = await response.json(); // JSON é um array agora

    const loja = lojas.find(l => l.idLoja === lojaId);
    if (!loja) {
      alert("Loja não encontrada no arquivo.");
      return;
    }

    const pdv = loja.pdvs.find(p => p.numero === pdvNumero);
    if (!pdv) {
      alert("PDV não encontrado nessa loja.");
      return;
    }

    // Monta o texto exato para copiar
    const info = `Loja: ${lojaId}
PDV: ${pdv.numero}
IP: ${pdv.ip}
Máscara: ${pdv.mascara}
Gateway: ${pdv.gateway}
DNS: ${pdv.dns}
FTP: ${pdv.ftp}
SIAC: ${pdv.siac}`;

    await navigator.clipboard.writeText(info);

    // Feedback visual no botão
    const originalText = btnConfirmar.innerText;
    btnConfirmar.innerText = "Copiado!";
    setTimeout(() => btnConfirmar.innerText = originalText, 2000);

  } catch (err) {
    console.error(err);
    alert("Erro ao carregar o arquivo de IPs.");
  }
}


/* --- Função para limpar tudo --- */
function limparTudo() {
  const campos = ["searchInput","chamado","telefoneLoja","telefoneGerente","patrimonio","problema","cervello","procedimentosRemotos","modelo","modeloSerEnviado","projeto","obra","lojaCLI","sequencia","sku","pecaSerEnviado"];
  campos.forEach(id => document.getElementById(id).value = "");

  if (document.getElementById("pdvInput")) document.getElementById("pdvInput").value = "";
  if (document.getElementById("campoPDV")) document.getElementById("campoPDV").classList.add("hidden");
  if (document.getElementById("meuIP")) document.getElementById("meuIP").innerText = "";
  if (document.getElementById("camposExtras")) document.getElementById("camposExtras").classList.add("hidden");
}

