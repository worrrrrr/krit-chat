// ไฟล์นี้จะรันบน Server เพื่อซ่อน API KEY
export default async function handler(req, res) {
    const { message } = req.body;
    const API_KEY = process.env.GEMINI_API_KEY; // ดึงจาก Environment Variables ที่คุณตั้งไว้

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-robotics-er-1.5-preview:generateContent?key=${API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            system_instruction: {
                parts: [{ text: "คุณคือ ICARUS ระบบวิเคราะห์ของ 'กฤช' (INFJ 5w4)... [ใส่ร่างพิมพ์เขียวที่เราสกัดกันไว้]" }]
            },
            contents: [{ role: "user", parts: [{ text: message }] }],
            generationConfig: {
                temperature: 1,
                thinking_config: { include_thoughts: true }
            }
        })
    });

    const data = await response.json();
    res.status(200).json(data);
}
