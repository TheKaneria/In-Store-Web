import axios from "axios";

const baseUrl = "https://eu-test.oppwa.com";
const username = "Madhavsapariya123@gmail.com";
const password = "Madhav@123";
// const merchantId = "a11499458aae42cd9ccc1bd326fa0f22";
const merchantId = "8ac7a4c88aaf81cd018ab1fb2d3116b9";

export async function processPayment(amount, cardDetails) {
  try {
    const response = await axios.post(`${baseUrl}/v1/checkouts`, {
      authentication: {
        entity_id: merchantId,
        username: username,
        password: password,
      },
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
      paymentType: "DB",
      amount: amount,
      currency: "ZAR",
      card: cardDetails,
    });

    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error.response.data;
  }
}
