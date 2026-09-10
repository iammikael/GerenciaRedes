async function atualizarDashboard() {
  try {
    const resposta = await fetch('/api/snmp');
    const dados = await resposta.json();

    if (dados.error) {
      document.getElementById('status').textContent = 'Erro: ' + dados.error;
      return;
    }

    document.getElementById('sysDescr').textContent = dados.sysDescr;
    document.getElementById('sysUpTime').textContent = dados.sysUpTime;
    document.getElementById('sysName').textContent = dados.sysName;
    document.getElementById('ifNumber').textContent = dados.ifNumber;
    document.getElementById('ifInOctets').textContent = dados.ifInOctets + ' bytes';

    const agora = new Date().toLocaleTimeString('pt-BR');
    document.getElementById('status').textContent = 'Última atualização: ' + agora;
  } catch (erro) {
    document.getElementById('status').textContent = 'Erro ao conectar com o servidor.';
    console.error(erro);
  }
}

atualizarDashboard();
setInterval(atualizarDashboard, 3000);