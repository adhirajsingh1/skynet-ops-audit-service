const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const SERVICE_NAME = "skynet-ops-audit-service";

const db = new sqlite3.Database("./events.db");

db.run(`
CREATE TABLE IF NOT EXISTS events (
id TEXT PRIMARY KEY,
type TEXT,
tenantId TEXT,
severity TEXT,
message TEXT,
source TEXT,
metadata TEXT,
occurredAt TEXT,
storedAt TEXT
)
`);

app.get("/health", (req, res) => {
res.status(200).json({
status: "ok",
service: SERVICE_NAME,
environment: process.env.NODE_ENV || "dev",
timestamp: new Date().toISOString()
});
});

const allowedSeverity = ["info","warning","error","critical"];

app.post("/events", (req, res) => {

const { type, tenantId, severity, message, source, metadata, occurredAt } = req.body;

if(!type || !tenantId || !severity || !message || !source){
return res.status(400).json({error:"Missing required fields"});
}

if(!allowedSeverity.includes(severity)){
return res.status(400).json({error:"Invalid severity"});
}

const id = "evt_" + uuidv4();
const storedAt = new Date().toISOString();

db.run(
`INSERT INTO events VALUES (?,?,?,?,?,?,?,?,?)`,
[id,type,tenantId,severity,message,source,JSON.stringify(metadata || {}),occurredAt || storedAt,storedAt]
);

res.status(201).json({
success:true,
eventId:id,
storedAt
});
});

app.get("/events", (req,res)=>{

const { tenantId, severity, limit=10, offset=0 } = req.query;

let query = "SELECT * FROM events WHERE 1=1";
let params = [];

if(tenantId){
query += " AND tenantId=?";
params.push(tenantId);
}

if(severity){
query += " AND severity=?";
params.push(severity);
}

query += " LIMIT ? OFFSET ?";
params.push(limit,offset);

db.all(query, params, (err, rows)=>{

if(err){
return res.status(500).json({error:"database error"});
}

res.json({
items: rows,
limit: Number(limit),
offset: Number(offset),
total: rows.length
});

});

});

app.listen(PORT, ()=>{
console.log(`${SERVICE_NAME} running on port ${PORT}`);
});