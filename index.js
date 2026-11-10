const IMVU = require('imvu.js');
const { GoogleGenAI } = require('@google/genai');

// Google AI istemcisini başlatma
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const bot = new IMVU({
    username: process.env.IMVU_USERNAME,
    password: process.env.IMVU_PASSWORD
});

bot.on('ready', () => {
    console.log(`Bot ${bot.display_name} aktif! Her mesaja otomatik cevap sistemi devrede.`);
});

// Odadaki her mesajı dinleyen fonksiyon
bot.on('message', async (room, user, message) => {
    // 1. GÜVENLİK FİLTRESİ: Bot kendi yazdığı mesaja cevap VERMEMELİ (Sonsuz döngü engeli)
    if (user.id === bot.id) return;

    // 2. FİLTRE: Eğer mesaj boşsa veya sadece boşluklardan oluşuyorsa işlem yapma
    const userMessage = message.trim();
    if (!userMessage) return;

    try {
        // Gemini modeline mesajı gönderiyoruz
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash', // En hızlı ve akıcı model
            contents: `Sen bir IMVU 3D sohbet odası botusun. Odadaki kullanıcıların mesajlarına otomatik, kısa, samimi, eğlenceli ve akıcı Türkçe cevaplar ver. Uzun paragraflar yazma, sohbeti canlı tut. 
            Konuşan Kullanıcı: ${user.display_name}
            Kullanıcının Mesajı: ${userMessage}`,
        });

        // Gelen yapay zeka cevabını odaya gönderiyoruz
        if (response.text) {
            bot.say(response.text.trim());
        }
    } catch (error) {
        console.error("Google API Hatası:", error);
    }
});

bot.login();


