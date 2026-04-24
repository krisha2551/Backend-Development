import client from "../config/twilio.js";

const sendWhatsAppMessage = async (to,body) => {
  try {
    
    const response = await client.messages.create({
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`, 
      to: `whatsapp:+91${to}`, 
      body,
    });

    console.log("WhatsApp message sent:", response.sid);

    return response;
  } catch (error) {
    console.error("Error sending WhatsApp message:", error.message);
    throw error;
  }
};

export default sendWhatsAppMessage;