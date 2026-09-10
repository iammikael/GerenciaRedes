# Dashboard SNMP

Dashboard web que exibe, em tempo real, dados coletados via SNMP de uma máquina Linux, usando 5 itens do MIB-2.

## Tecnologias

- Node.js + Express (backend)
- net-snmp (consulta SNMP)
- HTML, CSS e JavaScript puro (frontend)
- Net-SNMP / snmpd (agente SNMP, rodando como serviço via systemd)

## OIDs utilizados (MIB-2)

| OID | Nome | Descrição |
|---|---|---|
| `1.3.6.1.2.1.1.1.0` | sysDescr | Descrição do sistema |
| `1.3.6.1.2.1.1.3.0` | sysUpTime | Tempo ativo do sistema |
| `1.3.6.1.2.1.1.5.0` | sysName | Nome do host |
| `1.3.6.1.2.1.2.1.0` | ifNumber | Número de interfaces de rede |
| `1.3.6.1.2.1.2.2.1.10.1` | ifInOctets | Bytes recebidos pela interface de rede |

## Como rodar

> Precisa ser executado em ambiente Linux (nativo ou via WSL2 no Windows), com o agente `snmpd` instalado e ativo.

1. Instale o agente SNMP:
```bash
sudo apt install snmpd snmp -y
sudo systemctl enable snmpd
sudo systemctl start snmpd
```

2. Instale as dependências do projeto:
```bash
npm install
```

3. Rode o servidor:
```bash
node server.js
```
```bash
sudo systemctl status snmpd
```****
