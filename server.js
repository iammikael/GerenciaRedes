const express = require('express');
const snmp = require('net-snmp');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

const oids = {
  sysDescr:   '1.3.6.1.2.1.1.1.0',
  sysUpTime:  '1.3.6.1.2.1.1.3.0',
  sysName:    '1.3.6.1.2.1.1.5.0',
  ifNumber:   '1.3.6.1.2.1.2.1.0',
  ifInOctets: '1.3.6.1.2.1.2.2.1.10.1'
};

app.get('/api/snmp', (req, res) => {
  const session = snmp.createSession('127.0.0.1', 'public');
  const oidList = Object.values(oids);
  const keys = Object.keys(oids);

  session.get(oidList, (error, varbinds) => {
    if (error) {
      console.error('Erro SNMP:', error.toString());
      res.status(500).json({ error: error.toString() });
      session.close();
      return;
    }

    const result = {};
    varbinds.forEach((vb, i) => {
      if (snmp.isVarbindError(vb)) {
        result[keys[i]] = 'erro ao ler OID';
      } else {
        result[keys[i]] = vb.value.toString();
      }
    });

    res.json(result);
    session.close();
  });
});

app.listen(PORT, () => {
  console.log(`Dashboard SNMP rodando em http://localhost:${PORT}`);
});
