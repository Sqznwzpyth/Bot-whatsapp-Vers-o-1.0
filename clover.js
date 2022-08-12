// use como quiser pq é totalmente editável 
// Não adicionei sistema de boardcast pelo simples motivo de dar ban no bot por mensagem automatica repetititva
// Siga-me no insta @luccas1fx e @lcpxvzx
const { 
default: WAConnection,
MessageType,
Presence,
GroupSettingChange,
WA_MESSAGE_STUB_TYPES,
Mimetype,
relayWAMessage,
makeInMemoryStore,
useSingleFileAuthState,
BufferJSON, 
DisconnectReason, 
fetchLatestBaileysVersion,
downloadContentFromMessage,
delay
} = require("@adiwajshing/baileys")
const fs = require("fs")
const chalk = require("chalk")
const util = require("util")
const Crypto = require("crypto")
const ff = require('fluent-ffmpeg')
const P = require("pino") 
const axios = require('axios')
const clui = require("clui")
const fetch = require("node-fetch")
const yts = require("yt-search")
const path = require("path")
const speed = require("performance-now")
const { color } = require("./lib/color")
const { banner, getRandom, getExtension, upload } = require("./lib/functions")
const { Sticker, createSticker, StickerTypes } = require('wa-sticker-formatter')
const { fromBuffer } = require("file-type")
const textpro = require('./lib/textpro.js')
const maker = require('mumaker')
const mimeTypes = require('mime-types')
const FormData = require('form-data')
// DATA E HORA //
const moment = require("moment-timezone")
const hora = moment.tz("America/Sao_Paulo").format("HH:mm:ss")
const data = moment.tz("America/Sao_Paulo").format("DD/MM/YY")
/// ARQUIVOS JSON ////

const {
	tmpdir
   } = require("os")
   
const config = JSON.parse(fs.readFileSync("./files/config/data.json"))
const { fetchJson } = require('./lib/fetcher')
const registro = JSON.parse(fs.readFileSync('./src/seguranca/registro.json'))
const sotoy = JSON.parse(fs.readFileSync('./sotoy.json'))
const { addFlod , isFlod } = require('./spam.js')
const { isFiltered, addFilter } = require('./spam.js')
const _leveling = JSON.parse(fs.readFileSync('./arquivos/lib/leveling.json'))
const welkom = JSON.parse(fs.readFileSync('./arquivos/seguranca/welkom.json'))
const antifake = JSON.parse(fs.readFileSync('./arquivos/seguranca/antifake.json'))
const _level = JSON.parse(fs.readFileSync('./arquivos/level.json'))
const prem = JSON.parse(fs.readFileSync('./arquivos/premium.json'))
const registros = JSON.parse(fs.readFileSync("./arquivos/lib/registros.json"))
const fenix = JSON.parse(fs.readFileSync("./arquivos/clans/fenix.json"))
const touros = JSON.parse(fs.readFileSync("./arquivos/clans/touros.json"))
const akatsuki = JSON.parse(fs.readFileSync("./arquivos/clans/akatsuki.json"))
const dragonforce = JSON.parse(fs.readFileSync("./arquivos/clans/dragonforce.json"))
const manji = JSON.parse(fs.readFileSync('./arquivos/clans/manji.json'))
const exsuwordpowers = JSON.parse(fs.readFileSync('./arquivos/clans/exsuwordpowers.json'))
const img = JSON.parse(fs.readFileSync("./arquivos/fotos/logo.json"))
const antilink = JSON.parse(fs.readFileSync('./arquivos/seguranca/antilink.json'))
const uang = JSON.parse(fs.readFileSync('./arquivos/dinheiro.json'))

const getGroupAdmins = (participants) => {
admins = []
for (let i of participants) {
if(i.admin == "admin") admins.push(i.id)
if(i.admin == "superadmin") admins.push(i.id)
}
return admins
}
const getBuffer = (url, options) => new Promise(async (resolve, reject) => { 
options ? options : {}
await axios({method: "get", url, headers: {"DNT": 1, "Upgrade-Insecure-Request": 1}, ...options, responseType: "arraybuffer"}).then((res) => {
resolve(res.data)
}).catch(reject)
})

function TelegraPh (Path) {
	return new Promise (async (resolve, reject) => {
		if (!fs.existsSync(Path)) return reject(new Error("File not Found"))
		try {
			const form = new FormData();
			form.append("file", fs.createReadStream(Path))
			const data = await  axios({
				url: "https://telegra.ph/upload",
				method: "POST",
				headers: {
					...form.getHeaders()
				},
				data: form
			})
			return resolve("https://telegra.ph" + data.data[0].src)
		} catch (err) {
			return reject(new Error(String(err)))
		}
	})
}

///  prefixo e dono aqui ///
logo = img.logo
nomeBot = config.nomeBot
numeroBot = config.numeroBot
nomeDono = config.nomeDono
numeroDono = config.numeroDono
const dono = "557184301033"
prefix = config.prefix
prefixo = config.prefix

let girastamp = speed()
let latensi = speed() - girastamp

async function startClover () {
const store = makeInMemoryStore({ logger: P().child({ level: "debug", stream: "store" }) })
const getExtension = async (type) => {
    return await mimeTypes.extension(type)
}

const getRandom = (ext) => {
	return `${Math.floor(Math.random() * 100000)}${ext}`;
}
// 𝚀𝚁𝙲𝙾𝙳𝙴
const { state, saveState } = useSingleFileAuthState("./cache/clover.json")
console.log(banner.string)
console.log( color('⭐'),color('Conectando....🤔'))
const client = WAConnection({
logger: P({ level: "silent" }),
printQRInTerminal: true,
auth: state
})

client.ev.on ("creds.update", saveState)

store.bind(client.ev)
client.ev.on("chats.set", () => {
console.log("Tem conversas", store.chats.all())
})

client.ev.on("contacts.set", () => {
console.log("Tem contatos", Object.values(store.contacts))
})

client.ev.on("connection.update", (update) => {
const { connection, lastDisconnect } = update
if(connection === "close") {
const shouldReconnect = (lastDisconnect.error)?.output?.statusCode !== DisconnectReason.loggedOut
console.log("Conexão fechada devido a", lastDisconnect.error, "Tentando reconectar...", shouldReconnect)

if(shouldReconnect) {
startClover()
}

} else if(connection === "open") {
console.log(" bot ta online!!!")
}

})

client.ev.on("messages.upsert", async m => {
try {
const info = m.messages[0]
if (!info.message) return 
//await client.sendReadReceipt(from, info.key.remoteJid, info.key.participant, [info.key.id])
if (info.key && info.key.remoteJid == "status@broadcast") return
const altpdf = Object.keys(info.message)
const type = altpdf[0] == "senderKeyDistributionMessage" ? altpdf[1] == "messageContextInfo" ? altpdf[2] : altpdf[1] : altpdf[0]
global.prefixo

const content = JSON.stringify(info.message)
const from = info.key.remoteJid

// Body
const body = (type === 'conversation' &&
info.message.conversation.startsWith(prefixo)) ?
info.message.conversation: (type == 'imageMessage') &&
info.message[type].caption.startsWith(prefixo) ?
info.message[type].caption: (type == 'videoMessage') &&
info.message[type].caption.startsWith(prefixo) ?
info.message[type].caption: (type == 'extendedTextMessage') &&
info.message[type].text.startsWith(prefixo) ?
info.message[type].text: (type == 'listResponseMessage') &&
info.message[type].singleSelectReply.selectedRowId ?
info.message.listResponseMessage.singleSelectReply.selectedRowId: (type == 'templateButtonReplyMessage') ?
info.message.templateButtonReplyMessage.selectedId: (type === 'messageContextInfo') ?
info.message[type].singleSelectReply.selectedRowId: (type == 'client.sendMessageButtonMessage') &&
info.message[type].selectedButtonId ?
info.message[type].selectedButtonId: (type == 'stickerMessage') && ((info.message[type].fileSha256.toString('base64')) !== null && (info.message[type].fileSha256.toString('base64')) !== undefined) ? (info.message[type].fileSha256.toString('base64')): ""
budy = (type === 'conversation') ? info.message.conversation : (type === 'extendedTextMessage') ? info.message.extendedTextMessage.text : ''

const args = body.trim().split(/ +/).slice(1)
const isCmd = body.startsWith(prefixo)
const comando = isCmd ? body.slice(1).trim().split(/ +/).shift().toLocaleLowerCase() : null

// Bady
bady = (type === 'conversation') ? info.message.conversation : (type == 'imageMessage') ? info.message.imageMessage.caption : (type == 'videoMessage') ? info.message.videoMessage.caption : (type == 'extendedTextMessage') ? info.message.extendedTextMessage.text : (info.message.listResponseMessage && info.message.listResponseMessage.singleSelectReply.selectedRowId) ? info.message.listResponseMessage.singleSelectReply.selectedRowId: ''

// Budy
budy = (type === "conversation") ? info.message.conversation : (type === "extendedTextMessage") ? info.message.extendedTextMessage.text : ""

//===

button = (type == "buttonsResponseMessage") ? info.message.buttonsResponseMessage.selectedDisplayText : ""
button = (type == "buttonsResponseMessage") ? info.message.buttonsResponseMessage.selectedButtonId : ""
listMessage = (type == "listResponseMessage") ? info.message.listResponseMessage.title : ""

var pes = (type === "conversation" && info.message.conversation) ? info.message.conversation : (type == "imageMessage") && info.message.imageMessage.caption ? info.message.imageMessage.caption : (type == "videoMessage") && info.message.videoMessage.caption ? info.message.videoMessage.caption : (type == "extendedTextMessage") && info.message.extendedTextMessage.text ? info.message.extendedTextMessage.text : ""

bidy =  budy.toLowerCase()

// Enviar gifs
const enviargif = (videoDir, caption) => {
client.sendMessage(from, {
video: fs.readFileSync(videoDir),
caption: caption,
gifPlayback: true
})
}

// Enviar imagens
const enviarimg = (imageDir, caption) => {
client.sendMessage(from, {
image: fs.readFileSync(imageDir),
caption: caption
})
}

// Enviar figs

async function writeExifImg (media, metadata) {
	let wMedia = await imageToWebp(media)
	const tmpFileIn = path.join(tmpdir(), `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`)
	const tmpFileOut = path.join(tmpdir(), `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`)
	fs.writeFileSync(tmpFileIn, wMedia)
   
	if (metadata.packname || metadata.author) {
	 const img = new webp.Image()
	 const json = {
	  "sticker-pack-id": `https://github.com/DikaArdnt/Hisoka-Morou`,
	  "sticker-pack-name": metadata.packname,
	  "sticker-pack-publisher": metadata.author,
	  "emojis": metadata.categories ? metadata.categories: [""]
	 }
	 const exifAttr = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00])
	 const jsonBuff = Buffer.from(JSON.stringify(json), "utf-8")
	 const exif = Buffer.concat([exifAttr, jsonBuff])
	 exif.writeUIntLE(jsonBuff.length, 14, 4)
	 await img.load(tmpFileIn)
	 fs.unlinkSync(tmpFileIn)
	 img.exif = exif
	 await img.save(tmpFileOut)
	 return tmpFileOut
	}
   }
   async function writeExifVid (media, metadata) {
	let wMedia = await videoToWebp(media)
	const tmpFileIn = path.join(tmpdir(), `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`)
	const tmpFileOut = path.join(tmpdir(), `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`)
	fs.writeFileSync(tmpFileIn, wMedia)
   
	if (metadata.packname || metadata.author) {
	 const img = new webp.Image()
	 const json = {
	  "sticker-pack-id": `https://github.com/DikaArdnt/Hisoka-Morou`,
	  "sticker-pack-name": metadata.packname,
	  "sticker-pack-publisher": metadata.author,
	  "emojis": metadata.categories ? metadata.categories: [""]
	 }
	 const exifAttr = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00])
	 const jsonBuff = Buffer.from(JSON.stringify(json), "utf-8")
	 const exif = Buffer.concat([exifAttr, jsonBuff])
	 exif.writeUIntLE(jsonBuff.length, 14, 4)
	 await img.load(tmpFileIn)
	 fs.unlinkSync(tmpFileIn)
	 img.exif = exif
	 await img.save(tmpFileOut)
	 return tmpFileOut
	}
   }

   
const enviarfig = async (figu, tag) => {
bla = fs.readFileSync(figu)
client.sendMessage(from, {sticker: bla}, {quoted: info})
}

const getFileBuffer = async (mediakey, MediaType) => { 
const stream = await downloadContentFromMessage(mediakey, MediaType)

let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
return buffer
}



const mentions = (teks, memberr, id) => {
(id == null || id == undefined || id == false) ? client.sendMessage(from, {text: teks.trim(), mentions: memberr}) : client.sendMessage(from, {text: teks.trim(), mentions: memberr})
}

const messagesC = pes.slice(0).trim().split(/ +/).shift().toLowerCase()
const arg = body.substring(body.indexOf(" ") + 1)
const numeroBot = client.user.id.split(":")[0]+"@s.whatsapp.net"
const argss = body.split(/ +/g)
const testat = body
const ants = body
const isGroup = info.key.remoteJid.endsWith("@g.us")
const tescuk = ["0@s.whatsapp.net"]
const q = args.join(" ")
const isUrl = (url) => {
			    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
			}
const sender = isGroup ? info.key.participant : info.key.remoteJid
const pushname = info.pushName ? info.pushName : ""
const groupMetadata = isGroup ? await client.groupMetadata(from) : ""
const groupName = isGroup ? groupMetadata.subject : ""
const groupDesc = isGroup ? groupMetadata.desc : ""
const groupMembers = isGroup ? groupMetadata.participants : ""
//const { menu } = require('./arquivos/menus/menu.js')
const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ""

resposta = {
espere: "࿐ Aguarde...enviando ",
dono: "࿐ Esse comando so pode ser usado pelo meu dono!!! ",
grupo: "࿐ Esse comando só pode ser usado em grupo ",
privado: "࿐ Esse comando só pode ser usado no privado ",
adm: "࿐ Esse comando só pode ser usado por administradores de grupo",
botadm: " ࿐ Este comando só pode ser usado quando o bot se torna administrador ",
registro: `[⚙️️] Você não se registrou utilize ${prefixo}rg para se registrar `,
norg: "[⚙️️] Você ja está registrado ",
erro: "࿐ Error, tente novamente mais tarde "
}


const cart2 ={"key": {   "fromMe": false,"participant":"0@s.whatsapp.net",   "remoteJid": "6283136505591-1614953337@g.us"  }, "message": {orderMessage: {itemCount: 13,status: 200, thumbnail: fs.readFileSync(`./fotos/me7.jpg`), surface: 200, message: `⊳ ${comando} \n⊳ Prefix:「 ${prefix} 」`, orderTitle: 'sayo', sellerJid: '0@s.whatsapp.net'}}, contextInfo: {"forwardingScore":999,"isForwarded":true},sendEphemeral: true}

const live = {key : {participant : '0@s.whatsapp.net'},message: {liveLocationMessage: {}}} 


const imgm = {key : {participant : '0@s.whatsapp.net'},message: {imageMessage: {}}}


const vid = {key : {participant : '0@s.whatsapp.net'},message: {videoMessage: {}}}


const contato = {key : {participant : '0@s.whatsapp.net'},message: {contactMessage:{displayName: `${pushname}`}}}


const doc = {key : {participant : '0@s.whatsapp.net'},message: {documentMessage:{}}}


// Consts dono/adm etc...
const quoted = info.quoted ? info.quoted : info
const mime = (quoted.info || quoted).mimetype || ""
const isBot = info.key.fromMe ? true : false
const isBotGroupAdmins = groupAdmins.includes(numeroBot) || false
const isAntiLink = isGroup ? antilink.includes(from) : false
const isGroupAdmins = groupAdmins.includes(sender) || false 
const isWelkom = isGroup ? welkom.includes(from) : false
const isAntiFake = isGroup ? antifake.includes(from) : false
banChats = true
const isLevelingOn = isGroup ? _leveling.includes(from) : true 
const isAntilink = sender.includes(antilink)
const argis = bidy.trim().split(/ +/)
const isOwner = sender.includes(dono)
const enviar = (texto) => {
client.sendMessage(from, { text: texto }, {quoted: info})
} 
const isRegistro = registros.includes(sender)


async function imageToWebp (media) {

	const tmpFileOut = path.join(tmpdir(), `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`)
	const tmpFileIn = path.join(tmpdir(), `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.jpg`)
   
	fs.writeFileSync(tmpFileIn, media)
   
	await new Promise((resolve, reject) => {
	 ff(tmpFileIn)
	 .on("error", reject)
	 .on("end", () => resolve(true))
	 .addOutputOptions([
	  "-vcodec",
	  "libwebp",
	  "-vf",
	  "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse"
	 ])
	 .toFormat("webp")
	 .save(tmpFileOut)
	})

}
const enviarfiguimg = async (jid, path, quoted, options = {}) => {
	let buff = Buffer.isBuffer(path) ? path: /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64'): /^https?:\/\//.test(path) ? await (await getBuffer(path)): fs.existsSync(path) ? fs.readFileSync(path): Buffer.alloc(0)
	let buffer
	if (options && (options.packname || options.author)) {
	 buffer = await writeExifImg(buff, options)
	} else {
	 buffer = await imageToWebp(buff)
	}

	await night.sendMessage(jid, {
 sticker: {
url: buffer
 }, ...options
}, {
 quoted
})
return buffer
 }
const enviarfiguvid = async (jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path: /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64'): /^https?:\/\//.test(path) ? await (await getBuffer(path)): fs.existsSync(path) ? fs.readFileSync(path): Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
 buffer = await writeExifVid(buff, options)
} else {
 buffer = await videoToWebp(buff)
}
}
// PRA ENVIAR BOTÃO DE TEMPLATE
const sendBimgT = async (id, img1, text1, desc1, but = [], vr) => {
templateMessage = {
image: {url: img1},
caption: text1,
footer: desc1,
templateButtons: but,
}
client.sendMessage(id, templateMessage, {quoted: vr})
}
// Envia imagem com botão
const enviarImgB = async (id, img1, text1, desc1, but = [], vr) => {
buttonMessage = {
image: {url: img1},
caption: text1,
footer: desc1,
buttons: but,
headerType: 4
}
client.sendMessage(id, buttonMessage, {quoted: vr})
}


// Consts isQuoted
const isImage = type == "imageMessage"
const isVideo = type == "videoMessage"
const isAudio = type == "audioMessage"
const isSticker = type == "stickerMessage"
const isContact = type == "contactMessage"
const isLocation = type == "locationMessage"
const isProduct = type == "productMessage"
const isMedia = (type === "imageMessage" || type === "videoMessage" || type === "audioMessage")
typeMessage = body.substr(0, 50).replace(/\n/g, "")
if (isImage) typeMessage = "Image"
else if (isVideo) typeMessage = "Video"
else if (isAudio) typeMessage = "Audio"
else if (isSticker) typeMessage = "Sticker"
else if (isContact) typeMessage = "Contact"
else if (isLocation) typeMessage = "Location"
else if (isProduct) typeMessage = "Product"
const isQuotedMsg = type === "extendedTextMessage" && content.includes("textMessage")
const isQuotedImage = type === "extendedTextMessage" && content.includes("imageMessage")
const isQuotedVideo = type === "extendedTextMessage" && content.includes("videoMessage")
const isQuotedDocument = type === "extendedTextMessage" && content.includes("documentMessage")
const isQuotedAudio = type === "extendedTextMessage" && content.includes("audioMessage")
const isQuotedSticker = type === "extendedTextMessage" && content.includes("stickerMessage")
const isQuotedContact = type === "extendedTextMessage" && content.includes("contactMessage")
const isQuotedLocation = type === "extendedTextMessage" && content.includes("locationMessage")
const isQuotedProduct = type === "extendedTextMessage" && content.includes("productMessage")

outrasVariavel = "bot";

let {name, urlMinhaApikey, aurlSexo, compreSuaApikey, cdd, crtt, baterai, charging, autoHourActivate, emoji_bot, blocked, multi, nopref, variosPrefixo, leitor} = outrasVariavel

// FUNCÃO DE DINHERO //
const addATM = (sender) => {
const obj = {id: sender, uang : 0}
uang.push(obj)
fs.writeFileSync('./arquivos/dinheiro.json', JSON.stringify(uang))
}
const addKoinUser = (sender, amount) => {
let position = false
Object.keys(uang).forEach((i) => {
if (uang[i].id === sender) {
position = i
}
})
if (position !== false) {
uang[position].uang += amount
fs.writeFileSync('./arquivos/dinheiro.json', JSON.stringify(uang))
}
}
const checkATMuser = (sender) => {
let position = false
Object.keys(uang).forEach((i) => {
if (uang[i].id === sender) {
position = i
}
})
if (position !== false) {
return uang[position].uang
}
}
const confirmATM = (sender, amount) => {
let position = false
Object.keys(uang).forEach((i) => {
if (uang[i].id === sender) {
position = i
}
})
if (position !== false) {
uang[position].uang -= amount
fs.writeFileSync('./arquivos/dinheiro.json', JSON.stringify(uang))
}
}

if(isGroup) {
blx = 'Meмвro࿐'}

if(isOwner) {
 blx = 'ᎠᎾᏁᎾ࿐'}


const dinheiro = checkATMuser(sender)


if(budy == `${prefixo}`) {
enviar('🤔👍')}
const dados = m.messages[0];

if (budy.includes("https://")){
		     if (!isGroup) return
		     if (!isAntiLink) return
		     if (isGroupAdmins) return enviar(`*${pushname}* vc é admin por isso não vou te banir`)
		   var Kick = `${sender.split("@")[0]}@s.whatsapp.net`
		    setTimeout( () => {
	    	enviar(`*𝑒𝑙𝑖𝑚𝑖𝑛𝑎𝑑𝑜 𝑑𝑜 𝑔𝑟𝑢𝑝𝑜*`)
	     	}, 100)
	     	enviar(`*_「 link  detectado 」_*\n*${pushname}* Vc será banido do grupo *${groupMetadata.subject}*`)
		    setTimeout( () => {
		    client.groupParticipantsUpdate(from, [Kick], "remove").catch((e) => {enviar(`*ERROR:* ${e}`)}) 
					}, 10)
		      setTimeout( () => {
	          
	          }, 0)
		      }
if (budy.includes("wa.me")){
		     if (!isGroup) return
		     if (!isAntiLink) return
		     if (isGroupAdmins) return enviar(`*${pushname}* vc é admin por isso não vou te banir`)
		   var Kick = `${sender.split("@")[0]}@s.whatsapp.net`
		    setTimeout( () => {
	    	enviar(`*𝑒𝑙𝑖𝑚𝑖𝑛𝑎𝑑𝑜 𝑑𝑜 𝑔𝑟𝑢𝑝𝑜*`)
	     	}, 100)
	     	enviar(`*_「 link  detectado 」_*\n*${pushname}* Vc será banido do grupo *${groupMetadata.subject}*`)
		    setTimeout( () => {  
		    client.groupParticipantsUpdate(from, [Kick], "remove").catch((e) => {enviar(`*ERROR:* ${e}`)}) 
					}, 10)
		      setTimeout( () => {
	          
	          }, 0)
		      }
if (budy.includes("http://")){
		     if (!isGroup) return
		     if (!isAntiLink) return
		     if (isGroupAdmins) return enviar(`*${pushname}* vc é admin por isso não vou te banir`)
		   var Kick = `${sender.split("@")[0]}@s.whatsapp.net`
		    setTimeout( () => {
	    	enviar(`*𝑒𝑙𝑖𝑚𝑖𝑛𝑎𝑑𝑜 𝑑𝑜 𝑔𝑟𝑢𝑝𝑜*`)
	     	}, 100)
	     	enviar(`*_「 link  detectado 」_*\n*${pushname}* Vc será banido do grupo *${groupMetadata.subject}*`)
		    setTimeout( () => {  
		    client.groupParticipantsUpdate(from, [Kick], "remove").catch((e) => {enviar(`*ERROR:* ${e}`)}) 
					}, 10)
		      setTimeout( () => {
	          
	          }, 0)
		      }


			  let cron = require('node-cron')
    cron.schedule('00 12 * * *', () => {
    let user = Object.keys(global.db.users)
    let limitUser = isRakyat ? global.limitawal.rakyat : global.limitawal.free
    for (let jid of user) global.db.users[jid].limit = limitUser
    console.log('Reseted Limit')
    }, {
    scheduled: true,
    timezone: "America/Bahia"
    })

//if(isGroup && isCmd) {
//if(isFiltered(sender)) return enviar(`*Não floda...*`)
//addFilter(sender)}

const c = args.join(' ')
// Comando no pv
if (isGroup && isCmd) console.log(`
${color(`Comando em grupo`)}
${color(`Comando:`)} ${comando}
${color(`Número:`)} ${sender.split("@")[0]}
${color(`Grupo:`)} ${groupName}
${color(`Nome:`)} ${pushname}
${color(`BOT MD`)}
`)

if (isGroup && !isCmd) console.log(`
${color(`Mensagem em grupo`)}
${color(`Comando:`)} Não
${color(`Número:`)} ${sender.split("@")[0]}
${color(`Grupo:`)} ${groupName}
${color(`Nome:`)} ${pushname}
${color(`BOT MD`)}
`)

if (!isGroup && isCmd) console.log(`
${color(`Comando no pv`)}
${color(`Comando:`)} ${comando}
${color(`Número:`)} ${sender.split("@")[0]}
${color(`Grupo:`)} Não
${color(`Nome:`)} ${pushname}
${color(`BOT MD`)}
`)

if (!isGroup && !isCmd) console.log(`
${color(`Mensagem no pv`)}
${color(`Comando:`)} Msg 
${color(`Número:`)} ${sender.split("@")[0]}
${color(`Grupo:`)} Não
${color(`Nome:`)} ${pushname}
${color(`BOT MD`)}
`)



switch (comando) {
// Começo dos comandos com prefix //
//     /\/\                              
//    (° v °)                             
//    /|    |\                            
//     V---V                             
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^//


case 'teste':
return enviar(` ok `)
break

case 'pornhub':	 			
 if(!q) return enviar(`Use ${prefix + command} texto`)
 enviar(resposta.aguarde)
 teks1 = q.split("/")[0]
 teks2 = q.split("/")[1]
 maker.textpro("https://textpro.me/pornhub-style-logo-online-generator-free-977.html", [
	 `${teks1}`,`${teks2}`])
   .then((data) => client.sendMessage(from, { image: { url: data }, caption: `🗿🍷` }, { quoted: cart2 }))
   .catch((err) => console.log(err));
	break

case "menu":
templateButtons = [
{index: 1, urlButton: {displayText: 'Meu Instagram ', url: 'https://instagram/lcpxvzx'}},
{index: 2, callButton: {displayText: 'Meu Número 📱', phoneNumber: '+55 (71) 8430-1033'}},
{index: 3, quickReplyButton: {displayText: '♧Seu perfil♧', id: '/perfil' }},
{index: 4, quickReplyButton: {displayText: '♤Ping♤', id: '/ping' }},
{index: 5, quickReplyButton: {displayText: '◇Menu 1◇', id: '/menu1'}},
]
  
templateMessage = {
text: 
"Opa, Luccas v2 é uma base simples sem muitos comando\n Porem com sistema limpo\nSem comandos bugados",

footer: 'Luccas v2',
templateButtons: templateButtons
}
await client.sendMessage(from,templateMessage)
break


case 'lista': 
	const sections = [
		{title: `Lista`,
		rows: [
			{title: `menu1`, rowId: `${prefix}menu1`}
		]
	 	},
	]
	let listMessages = {
		text: "Menu de pesquisa",
		footer: "Luccas v2",
		title: "Clique no botão aixo",
		buttonText: "Ver Lista",
		sections
	  }

	  client.sendMessage(from, listMessages, {quoted: cart2})
	  break

case 'hidetag':
	client.sendMessage(from, { text : args.join(" ") ? args.join(" ") : '' , mentions: groupMembers.map(a => a.id)}, { quoted: cart2 })
	break

	case 'bug': case 'report': {
		if(!c) return enviar(`Digite o Bug\n\nExemplo: ${prefix + comando} Erro do Menu`)
		client.sendMessage(`120363024276860575@g.us`, {text: `*Relatório de Bug de:* wa.me/${sender.split("@")[0]}
	Mensagem de relatório: ${c}` }, {quoted: cart2})
	enviar(`Relatado com sucesso ao proprietário\n\nCertifique-se de que o bug é válido, caso use esse recurso repetidamente sem motivo, você será bloqueado com certeza!`)
	}
	break


// bloquear comando
case 'block':
client.sendMessage(mbr, {text: `Bloquamento automatico por ignorar as politicas de privacidades`}, {quoted: info})
let mbr = info.mentionedJid[0] ? info.mentionedJid[0] : info.quoted ? info.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
await client.updateBlockStatus(mbr, 'block').then((res) => reply(jsonformat(res))).catch((err) => reply(jsonformat(err)))
break

case 's':
	const pacote = ('Luccas v2')
	const criador = ('Base em desenvolvimento')
	if ((isMedia && !info.message.videoMessage || isQuotedImage)) {
   enviar(resposta.espere)
   const encmedia = isQuotedImage ? info.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage: info.message.imageMessage
   rane = getRandom('.'+ await getExtension(encmedia.mimetype))
   imgbuff = await getFileBuffer(encmedia, 'image')
   fs.writeFileSync(rane, imgbuff)
   const media = rane
   ran = getRandom('.'+media.split('.')[1])
   const upload = await TelegraPh(media)
   await enviarfiguimg(from, util.format(upload), info, {
	packname: pacote, author: criador
   })
	} else if ((isMedia && info.message.videoMessage.seconds < 11 || isQuotedVideo && info.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11)) {
   enviar(resposta.espere)
   const encmedia = isQuotedVideo ? info.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage: info.message.videoMessage
   rane = getRandom('.'+ await getExtension(encmedia.mimetype))
   imgbuff = await getFileBuffer(encmedia, 'video')
   fs.writeFileSync(rane, imgbuff)
   const media = rane
   ran = getRandom('.'+media.split('.')[1])
   const upload = await TelegraPh(media)
   await enviarfiguvid(from, util.format(upload), info, {
	packname: pacote, author: criador
   })
	} else return enviar(`Marque a imagem com o comando ${prefixo}sticker ou coloque na legenda, o video ou gif so pode ter 10 segundos de duração`)
	break

case 'menu1':
enviar("aguarde...")
templateButtons = [
{index: 1, urlButton: {displayText: 'Criador', url: 'https://youtube.com/channel/UCc1df-Do_OpYwC_QlTi3vZQ'}},
{index: 2, urlButton: {displayText: 'Grupo', url: 'https://chat.whatsapp.com/C5bjoLLAKlcGGWogRakVsB'}},
]

templateMessage = {
image: {url: 'https://telegra.ph/file/2051ec65d3e66f4538c12.jpg',
quoted: info},
caption:`
┏━━••• *_MENUS_* 
┃》${prefix}menu2
┃》${prefix}menuadm
┗━━━━━━━━ ✓
┏━━••• *_UTLS_* 
┃》${prefix}cassino 
┃》${prefix}ban
┃》${prefix}perfil
┃》${prefix}toimg
┃》${prefix}listadm
┃》${prefix}ping
┃》${prefix}ppt
┃》${prefix}infogp
┗━━━━━━━━ ✓
┏━━••• *_%_* 
┃》${prefix}gay
┃》${prefix}gado
┃》${prefix}gostoso
┃》${prefix}punheteiro
┃》${prefix}lindo
┃》${prefix}feio
┗━━━━━━━━ ✓
┏━━••• *_ADM_* 
┃》${prefix}antilink 1
┃》${prefix}antilink 0
┃》${prefix}resetarlink
┃》${prefix}sair 
┃》${prefix}ban
┃》${prefix}mudardk
┃》${prefix}mudarnm
┃》${prefix}grupo a
┃》${prefix}grupo f
┃》${prefix}ban (marcamsg)
┃》${prefix}promover @
┃》${prefix}rebaixar @
┗━━━━━━━━ ✓
`,
footer: 'Luccas v2 ',
templateButtons: templateButtons
}
client.sendMessage(from,templateMessage)
break

case "menu2":
return enviar(`
┏━━••• *_MENUS_* 
┃》${prefix}gay
┃》${prefix}gado
┃》${prefix}gostoso
┃》${prefix}punheteiro
┃》${prefix}lindo
┃》${prefix}feio
┗━━━━━━━━ ✓
`)
break



case "menuadm":
if (!isGroup) return enviar(resposta.grupo)
if (!groupAdmins) return enviar(resposta.adm)
return enviar(`
┏━━••• *_MENUS_* 
┃》${prefix}antilink 1
┃》${prefix}antilink 0
┃》${prefix}resetarlink
┃》${prefix}sair 
┃》${prefix}ban
┃》${prefix}mudardk
┃》${prefix}mudarnm
┃》${prefix}grupo a
┃》${prefix}grupo f
┃》${prefix}ban (marcamsg)
┃》${prefix}promover @
┃》${prefix}rebaixar @
┗━━━━━━━━ ✓
`)
break


case 'cassino':
//CASSINO
 const soto = [
'🍊 : 🍒 : 🍐',
'🍒 : 🔔 : 🍊',
'🍇 : 🍇 : 🍇',
'🍊 : 🍋 : 🔔',
'🔔 : 🍒 : 🍐',
'🔔 : 🍒 : 🍊',
'🍊 : 🍋 : ??',		
'🍐 : 🍒 : 🍋',
'🍐 : 🍐 : 🍐',
'🍊 : 🍒 : 🍒',
'🔔 : 🔔 : 🍇',
'🍌 : 🍒 : 🔔',
'🍐 : 🔔 : 🔔',
'🍊 : 🍋 : 🍒',
'🍋 : 🍋 : 🍌',
'🔔 : 🔔 : 🍇',
'🔔 : 🍐 : 🍇',
'🔔 : 🔔 : 🔔',
'🍒 : 🍒 : 🍒',
'🍌 : 🍌 : 🍌'
]		
const mining = Math.ceil(Math.random() * 200) +1
const somtoy2 = sotoy[Math.floor(Math.random() * sotoy.length)]
if ((somtoy2 == '🥑 : 🥑 : 🥑') ||(somtoy2 == '🍉 : 🍉 : 🍉') ||(somtoy2 == '🍓 : 🍓 : 🍓') ||(somtoy2 == '🍎 : 🍎 : 🍎') ||(somtoy2 == '🍍 : 🍍 : 🍍') ||(somtoy2 == '🥝 : 🥝 : 🥝') ||(somtoy2 == '🍑 : 🍑 : 🍑') ||(somtoy2 == '🥥 : 🥥 : 🥥') ||(somtoy2 == '🍋 : 🍋 : 🍋') ||(somtoy2 == '🍐 : ?? : 🍐') ||(somtoy2 == '🍌 : 🍌 : 🍌') ||(somtoy2 == '🍒 : 🍒 : 🍒') ||(somtoy2 == '🔔 : 🔔 : 🔔') ||(somtoy2 == '🍊 : 🍊 : 🍊') ||(somtoy2 == '🍇 : 🍇 : 🍇')) {
var Vitória = "Você ganhou 🔮"
} else {
var Vitória = "Você perdeu..."
}
	const cassino = `
	©Luccas v2
╔═════☪︎═════╗
┣► ${somtoy2}◄┛
╚═════☪︎═════╝

*${Vitória}*`
enviar(cassino)
if (Vitória == "Você ganhou!!!") {
enviar('Parabéns')
}
await client(sender)
break

case "ban":
	let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
	await client.groupParticipantsUpdate(from, [users], 'remove')
	client.sendMessage(from, {text: `❝ 🤡 ❞Usuario: @${m.mentioned[0].split("@")[0]} foi removido. `, mentions: [m.mentioned]})
break

case "banir":
if (!isGroup) return enviar(resposta.grupo)
//if (!isRegistro) return enviar(resposta.registro)
if (!isGroupAdmins) return enviar(resposta.adm)
if (!isBotGroupAdmins) return enviar(resposta.botadm)
if (info.message.extendedTextMessage != undefined || info.message.extendedTextMessage != null) {
num = info.message.extendedTextMessage.contextInfo.participant
//if(numeroBot.includes(num)) return enviar("| felizmente não posso me auto remover, terá que fazer isso manualmente ")
//if(numeroDono.includes(num)) return enviar("| infelizmente não posso remover meu dono ")
client.sendMessage(from, {text: `|Adeus @${num.split("@")[0]}`, mentions: [num]}, {quoted: cart2})
client.groupParticipantsUpdate(from, [num], "remove")
} else { 
enviar("| Marque a mensagem da pessoa ")
}
break

case "ping":
enviar(`࿐ Velocidade de resposta ${latensi.toFixed(4)} segundos `)
break

case "toimg":
if (!isQuotedSticker) return enviar("࿐ Marca uma fig ")
buff = await getFileBuffer(info.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage, "image")
enviar(resposta.espere)
try {
client.sendMessage(from, {image: buff}, {quoted: live})
} catch(e) {
console.log(e)
enviar(resposta.erro)
}
break

case "ppt": 
if (!isGroup) return enviar(resposta.grupo)
if (args.length < 1) return enviar('exemplo: /ppt pedra')
ppt = ["pedra","papel","tesoura"]
ppy = ppt[Math.floor(Math.random() * ppt.length)]
ppg = Math.floor(Math.random() * 50)
pptb = ppy
pph = `Você ganhou ${ppg} em money`
if ((pptb == "pedra" && args == "papel") || 
(pptb == "papel" && args == "tesoura") || 
(pptb == "tesoura" && args == "pedra")) {
var vit = "vitoria"
} else if ((pptb == "pedra" && args == "tesoura") || 
(pptb == "papel" && args == "pedra") || 
(pptb == "tesoura" && args == "papel")) {
var vit = "derrota"
} else if ((pptb == "pedra" && args == "pedra") ||
(pptb == "papel" && args == "papel") ||
(pptb == "tesoura" && args == "tesoura")) {
var vit = "empate"
} else if (vit = "undefined") {
return enviar(linguagem.tterro())
}
if (vit == "vitoria") {
var tes = "Vitória do jogador"
}
if (vit == "derrota" ) {
var tes = "A vitória é do bot"
}
if (vit == "empate" ) {
var tes = "O jogo terminou em empate"
}
enviar(`Bot jogou: ${pptb}\nO jogador jogou: ${args}\n\n${tes}`)
if (tes == "Vitória do jogador") {
enviar(pph)
}
break

case 'clear': case "reiniciar":
client.sendMessage(from, ' L I M P A N D U 😎🤙\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nlimpo', text, {quoted: live})
break

case "perfil":
try {
ppimg = await client.profilePictureUrl(`${sender.split("@")[0]}@c.us`, "image")
} catch(e) {
ppimg = logo
}
perfil = await getBuffer(ppimg)
enviar(resposta.espere)
try {
client.sendMessage(from, {
image: perfil,
caption: `
࿐ Aqui está suas informações 

☆ Nome: ${pushname} 
☆ Número: ${sender.split("@")[0]}
☆ Wa.me: https://wa.me/${sender.split("@")[0]}
☆ Grupo: ${groupName}
☆ Id Group: ${from}
`
}, {quoted: cart2})
} catch(e) {
console.log(e)
enviar(resposta.erro)
}
break


case 'sticker':
	if (/image/.test(mime)) {
		let media = await quoted.download()
		let encmedia = await client.sendImageAsSticker(m.chat, media, m, { packname: `${pushname}`, author:`Luccas v2`  })
		await fs.unlinkSync(encmedia)
		} else if (/video/.test(mime)) {
		if ((quoted.msg || quoted).seconds > 11) return enviar('Maximum 10 seconds!')
		let media = await quoted.download()
		let encmedia = await client.sendVideoAsSticker(from, media, m, { packname: `${pushname}`, author:`Luccas v2` })
		await fs.unlinkSync(encmedia)
		} else {
		enviar(`Send Image/Video With Caption ${prefix + command}\nVideo Duration 1-9 Seconds`)
		}
		break

case 'gay':// Sem Fotos
const aleta = `${Math.floor(Math.random() * 105)}`
enviar('Aguarde, confiscando sua porcentagem...')
await delay(5000)
enviar(`${pushname} Sua Porcentagem De Gay é De : ${aleta}%`)
break
case 'feio': // Sem Fotos
const aletb = `${Math.floor(Math.random() * 105)}`
enviar('Aguarde, confiscando sua porcentagem...')
await delay(5000)
enviar(`${pushname} Sua Porcentagem De Feio é De : ${aletb}%`)
break
break
case 'lindo':
const aletc = `${Math.floor(Math.random() * 105)}`
enviar('Aguarde, confiscando sua porcentagem...')
await delay(5000)
enviar(`${pushname} Sua Porcentagem De Lindo(a) é De : ${aletc}%`)
break
case 'gostoso':
const aletd = `${Math.floor(Math.random() * 105)}`
enviar('Aguarde, confiscando sua porcentagem...')
await delay(5000)
enviar(`${pushname} Sua Porcentagem De Gostoso(a) é De : ${aletd}%`)
break

case 'gado':
const alete = `${Math.floor(Math.random() * 105)}`
enviar('Aguarde, confiscando sua porcentagem...')
await delay(5000)
enviar(`${pushname} Sua Porcentagem De Gado(a) é De : ${alete}%`)
break
case 'punheteiro':
const aletl = `${Math.floor(Math.random() * 105)}`
enviar('Aguarde, confiscando sua porcentagem...')
await delay(5000)
enviar(`${pushname} Sua Porcentagem De punheteiro(a) é De : ${aletl}%`)
break

case "gplink":
if (!isGroup) return enviar(resposta.grupo)
if (!groupAdmins) return enviar(resposta.adm)
if (!isBotGroupAdmins) return enviar(resposta.botadm)
const link = await client.groupInviteCode(from)
enviar(`࿐ Link do grupo : https://chat.whatsapp.com/${link} `)
break

case "resetarlink":
if (!isGroup) return enviar(resposta.grupo)
if (!groupAdmins) return enviar(resposta.adm)
if (!isBotGroupAdmins) return enviar(resposta.botadm)
try {
await client.groupRevokeInvite(from)
enviar("࿐ Link de convite resetado com sucesso ✓ ")
} catch(e) {
console.log(e)
enviar(resposta.erro)
}
break

case "sair":
if (!isGroup) return enviar(resposta.grupo)
if (!groupAdmins) return enviar(resposta.adm)
enviar("ok...me desculpe se eu nao pude ajudá-lo(a) com o que vc precisava....adeus😔")
await delay(1000)
try {
await client.groupLeave(from)
} catch(e) {
console.log(e)
enviar(resposta.erro)
}
break

 

case "rebaixar":
if (!isGroup) return enviar(resposta.grupo)
if (!groupAdmins) return enviar(resposta.adm)
if (!isBotGroupAdmins) return enviar(resposta.botadm)
if (q < 1) return enviar("࿐ Digite o número, animal ")
if (!isBotGroupAdmins) return enviar(resposta.botadm)
try {
client.groupParticipantsUpdate(from, [`${q}@s.whatsapp.net`], "demote")
enviar(`࿐ ${q} Foi rebaixado a membro comum com sucesso `)
} catch(e) {
console.log(e)
enviar(resposta.erro)
}
break

case "promover":
if (!isGroup) return enviar(resposta.grupo)
if (!groupAdmins) return enviar(resposta.adm)
if (!isBotGroupAdmins) return enviar(resposta.botadm)
if (q < 1) return enviar("࿐ Cade o número, mongolóide ")
if (!isBotGroupAdmins) return enviar(resposta.botadm)
try {
client.groupParticipantsUpdate(from, [`${q}@s.whatsapp.net`], "promote")
enviar(`o mero mortal virou adm`)
//client.sendMessage(from, {text:`࿐ ${q} Foi promovido a adm com sucesso `, quoted: cart2 })
//kak = fs.readFileSync("./audios/promover.mp3")
client.sendMessage(from, {quoted: info})
} catch(e) {
console.log(e)
enviar(resposta.erro)
}
break

case "grupo":
if (!isGroup) return enviar(resposta.grupo)
if (!groupAdmins) return enviar(resposta.adm)
if (!isBotGroupAdmins) return enviar(resposta.botadm)
try {
if (q == "a") {
await client.groupSettingUpdate(from, "not_announcement")
enviar("࿐ Grupo aberto com sucesso")
}
if (q == "f") {
await client.groupSettingUpdate(from, "announcement")
enviar("࿐ Grupo fechado com sucesso ")
}
} catch(e) {
console.log(e)
enviar(resposta.erro)
}
break

case 'add':
			//num = anu.participants[0]
					//if (!isBotAdmins) return replay(`${mess.botAdmin}`)
					//if (!isAdmins) return replay(`${mess.admin}`)
			let users2 = m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
			await client.groupParticipantsUpdate(m.chat, [users2], 'add')
			//let tag = Miku.sendMessage(m.chat, {text: `Alvo adicionado com sucesso! ${num.split("@s.us")[0]}`}, {quoted: cart})
			client.sendMessage(m.chat,{text:`Alvo adicionado @${users2.split("@")[0]} com sucesso `,contextInfo: { mentionedJid: [users] }}, {quoted: cart})

		break
case "infogp":
if (!isGroup) return enviar(resposta.grupo)
if (!isBotGroupAdmins) return enviar(resposta.botadm)
enviar(`
📝 Nome : ${groupName}
📃 Descrição : ${groupDesc}
🆔 Id : ${from}
📅 Data : ${data}
🕛 Horário : ${hora}
`)
break

case "mudardk":
if (!isGroup) return enviar(resposta.grupo)
if (!groupAdmins) return enviar(resposta.adm)
if (!isBotGroupAdmins) return enviar(resposta.botadm)
try {
await client.groupUpdateDescription(from, `${q}`)
enviar("࿐ Descrição alterada com sucesso ✓ ")
} catch(e) {
console.log(e)
enviar(resposta.erro)
}
break

case "mudarnm":
if (!isGroup) return enviar(resposta.grupo)
if (!groupAdmins) return enviar(resposta.adm)
if (!isBotGroupAdmins) return enviar(resposta.botadm)
try {
await client.groupUpdateSubject(from, `${q}`)
enviar("࿐ Nome alterado com sucesso ✓ ")
} catch(e) {
console.log(e)
enviar(resposta.erro)
}
break

case 'listadm':
				if (!isGroup) return enviar(resposta.grupo)
					teks = `List admin of group *${groupMetadata.subject}*\nTotal : ${groupAdmins.length}\n\n`
					no = 0
					for (let admon of groupAdmins) {
						no += 1
						teks += `[${no.toString()}] @${admon.split('@')[0]}\n`
					}
					mentions(teks, groupAdmins, true)
					break
					
					case 'antilink':
                    if (!isGroup) return enviar(mess.only.group)
					if (!isGroupAdmins) return enviar(mess.only.admin)
					if (!isBotGroupAdmins) return enviar(mess.only.Badmin)
					if (args.length < 1) return enviar('digite 1 para ativar ')
					if (Number(args[0]) === 1) {
						if (isAntiLink) return enviar('o anti-link está ativo')
						antilink.push(from)
						fs.writeFileSync('./src/antilink.json', JSON.stringify(antilink))
						client.sendMessage(from, {text: 'O anti-link foi ativo no grupo ✔️'}, {quoted: cart2 })
					} else if (Number(args[0]) === 0) {			
						antilink.splice(from, 1)
						fs.writeFileSync('./src/antilink.json', JSON.stringify(antilink))
						enviar('O anti-link foi desativado com sucesso neste grupo✔️')
					} else {
						enviar('1 para ativar, 0 para desativar ')
					}
					break
			
					case 'play2':
if (args.length < 1) return enviar('Exemplo /play2 nombre de la musica')
enviar('Espere um momento porfavor')
plaur = await fetchJson(`https://api-yogipw.herokuapp.com/api/yt/playmp3?query=${encodeURIComponent(q)}`) 
pliass = `
╭═─═─═─═─ • ◆ • ─═─═─═─═
╿📝 *Titulo* : ${plaur.título}
╿📅 *Vistas* : ${plaur.visualizações}
╿📝 *Canal* : ${plaur.canal}
╿📃 *Fecha* : ${plaur.publicado}
╰═─═─═─═─ • ◆ • ─═─═─═─═`
imiga = await getBuffer(plaur.thumb)
client.sendMessage(from,{image: imiga,
caption: pliass, quoted: cart2})
enviar('Estou enviando...\nTenha paciencia')
audblaz = await getBuffer(plaur.link)
client.sendMessage(from, {audio: audblaz, mimetype: "audio/mp4"}, {quoted: cart}).catch(e => {
enviar(resposta.erro)
})
break

case 'play-video':
if (!ispremium) return enviar(resposta.premium)
if (args.length < 1) return enviar('Exemplo /video cabo c tá no chao')
enviar('Espere um momento porfavor')
plaure = await fetchJson(`https://ayu-team.herokuapp.com/api/dl/playv?nome=${encodeURIComponent(q)}&apikey=xPaqsnKXDi`) 
plios = `
╭═─═─═─═─ • ◆ • ─═─═─═─═
╿📝 *Titulo* : ${plaure.título}
╿📅 *Vistas* : ${plaure.visualizações}
╿📝 *Canal* : ${plaure.canal}
╿📃 *Fecha* : ${plaure.publicado}
╰═─═─═─═─ • ◆ • ─═─═─═─═`
imigap = await getBuffer(plaure.thumb)
client.sendMessage(from,{image: imigap,
caption: plios})
enviar('Estou enviando...\nTenha paciencia')
audblaze = await getBuffer(plaure.url)
client.sendMessage(from, {video: audblaze, mimetype: "video/mp4"}, {quoted: live}).catch(e => {
enviar(resposta.erro)
})
break


case 'play':
if (args.length < 1) return enviar('Exemplo /play cabo c tá no chao')
enviar('Espere un momento porfavor')
plau = await fetchJson(`https://ayu-team.herokuapp.com/api/dl/play2?nome=${encodeURIComponent(q)}&apikey=xPaqsnKXDi`) 
pli = `
╭═─═─═─═─ • ◆ • ─═─═─═─═
╿📝 *Titulo* : ${plau.título}
╿📃 *Tamaño* : ${plau.tamanho}
╿📅 *Vistas* : ${plau.visualizações}
╿🕛 *likes* : ${plau.likes}
╿🗣️ *Deslikes*: ${plau.deslikes}
╿📝 *Canal* : ${plau.canal}
╿📃 *Fecha* : ${plau.data_de_upload}
╿📅 *Descripción* : ${plau.descrição}
╰═─═─═─═─ • ◆ • ─═─═─═─═`
imig = await getBuffer(plau.capa)
client.sendMessage(from,{image: imig,
caption: pli})
audbla = await getBuffer(plau.resultado)
client.sendMessage(from, {audio: audbla, mimetype: "audio/mp4"}, {quoted: cart2}).catch(e => {
enviar(resposta.erro)
})
break

case 'iphonemodelojeep':
	let sections2 = [
		{title: `Selecione o modelo do iphone`,
		rows: [
			{title: `Iphone 6s`, rowId: `${prefixo}aifoneseisesi`},
			{title: `Iphone 7/7 Plus`, rowId: `${prefixo}aifoneotoesi`},
			{title: `Iphone 8/8 Plus`, rowId: `${prefixo}aifonesetiresi`},
			{title: `Iphone Xs`, rowId: `${prefixo}aifonexisesi`}
		]}
	]


	listMessage3 = {
		text: `
	  ┏━━━━━━━━━━━━━┓
	  ✦・┊Natural Case
	  ┏━━━━━━━━━━━━━┛
	  ┃➺ Cliente: ${pushname}
	  ┗━━━━━━━━━━━━━┛
	  ┃➺ Selecione um menu abaixo:
	  `,
		footer: `${hora}`,
		title: "Bem vindo a minha lista de modelos.",
		buttonText: "Escolha modelo do iphone",
		sections: sections2	
	  }

	  client.sendMessage(from, listMessage3, {quoted: live})

break
	  case 'bc':
	  if (!isOwner) return enviar(`você não é meu dono`)
	if (!args.join(" ")) return enviar(`coloque um texto \n\nExample : ${prefix + command} ${global.OwnerName}`)
	let anu = await store.chats.all().map(v => v.id)
	enviar(`Send Broadcast To ${anu.length} Chat\nTime's up ${anu.length * 1.5} second`)
	for (let yoi of anu) {
	await sleep(1500)
	let txt = `「 *${global.OwnerName}'s Transmissão* 」\n\n${text}`
	Miku.send5ButImg(yoi, txt, `${global.BotName}`, Thumb)
	}
	enviar('TM Feita com sucesso')
	break  
// Fim dos comandos com prefix //
//     /\/\                              
//    (° v °)                             
//    /|    |\                            
//     V---V                             
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^//
default:

}
// Começo dos comandos sem prefix //
//     /\/\                              
//    (° v °)                             
//    /|    |\                            
//     V---V                             
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^//


if (budy.includes("naturecase") || (budy.includes("NatureCase") || budy.includes("ola") || budy.includes("Ola"))){
	let sections = [
		{title: `Selecione a marca do produto`,
		rows: [
			{title: `Iphone`, rowId: `${prefixo}iphonemodelojeep`, description: `Mostrará modelos de capas para iphone`}
		]
	}
	]

		listMessage2 = {
			text: `
		  ┏━━━━━━━━━━━━━┓
		  ✦・┊Natural Case
		  ┏━━━━━━━━━━━━━┛
		  ┃➺ Cliente: ${pushname}
		  ┃➺ Modelo: iphone
		  ┗━━━━━━━━━━━━━┛
		  ┃➺ Selecione um menu abaixo:
		  `,
			footer: `${hora}`,
			title: "Bem vindo a minha lista de modelos.",
			buttonText: "Escolha o modelo",
			sections
		  }
	client.sendMessage(from, listMessage2, {quoted: live})
  }
/*if(budy.match('fofo')){
client.sendMessage(from,{audio: { url: "./audios/fofo.mp3" }, mimetype: 'audio/mp4' ,ptt: true},{quoted: info})
}

if(budy.match('vc sabia')){
client.sendMessage(from,{audio: { url: "./audios/vcsabia.mp3" }, mimetype: 'audio/mp4' ,ptt: true},{quoted: info})
}

if(budy.match('O poder dessa garota')){
client.sendMessage(from,{audio: { url: "./audios/opoder.mp3" }, mimetype: 'audio/mp4' ,ptt: true},{quoted: info})
}

if(budy.match('Brocasito Fuck')){
client.sendMessage(from,{audio: { url: "./audios/brocafuck.mp3" }, mimetype: 'audio/mp4' ,ptt: true},{quoted: info})
}

if(budy.match('Brocasito Luz Do Luar')){
client.sendMessage(from,{audio: { url: "./audios/brocaluzdoluar.mp3" }, mimetype: 'audio/mp4' ,ptt: true},{quoted: info})
}

if(budy.match('Brocasito O Mundo')){
client.sendMessage(from,{audio: { url: "./audios/brocaomundo.mp3" }, mimetype: 'audio/mp4' ,ptt: true},{quoted: info})
}

if(budy.match('Brocasito Perguntas')){
client.sendMessage(from,{audio: { url: "./audios/brocaperguntas.mp3" }, mimetype: 'audio/mp4' ,ptt: true},{quoted: info})
}

if(budy.match('Brocasito P90')){
client.sendMessage(from,{audio: { url: "./audios/brocasitoP90.mp3" }, mimetype: 'audio/mp4' ,ptt: true},{quoted: info})
}

if(budy.match('Brocasito Planos')){
client.sendMessage(from,{audio: { url: "./audios/brocasitoplanos.mp3" }, mimetype: 'audio/mp4' ,ptt: true},{quoted: info})
}

if(budy.match('Brocasito Tijolos')){
client.sendMessage(from,{audio: { url: "./audios/brocatijolos.mp3" }, mimetype: 'audio/mp4' ,ptt: true},{quoted: info})
}

if (budy.includes("carai") || (budy.includes("Carai") || budy.includes("krlh") || budy.includes("Krlh"))){
  client.sendMessage(from,{sticker: fs.readFileSync('./sticker/carai.webp')})
}

if (budy.includes("obrigado") || (budy.includes("Obrigado"))){
  client.sendMessage(from,{sticker: fs.readFileSync('./sticker/obrigado.webp')})
}

if (budy.includes("bot on?") || (budy.includes("Bot on?") || budy.includes("ta on?") || budy.includes("Ta on?"))){
  client.sendMessage(from,{sticker: fs.readFileSync('./sticker/sim.webp')})
}
*/
// Fim dos comandos sem prefix //
//     /\/\                              
//    (° v °)                             
//    /|    |\                            
//     V---V                             
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^//
} catch (e) {
console.log(e)
}

})

}
startClover()