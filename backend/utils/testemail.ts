import { sendEmail } from "./sendEmail.js";

(async () => {
  try {
    await sendEmail(
      "syedabduluzair60@gmail.com", 
      "TEST EMAIL", 
      "Agar yeh email aaye to config sahi hai"
    );
    console.log("Email sent successfully!");
  } catch (err) {
    console.error("Email failed:", err);
  }
})();
