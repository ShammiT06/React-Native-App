import crons from "cron";
import axios from "axios";

const job = new crons.CronJob("*/14 * * * *", async () => {
  console.log("⏰ Cron job running...");

  try {
    const url = process.env.API_URL;
    console.log("API URL =>", url);

    const response = await axios.get(url);

    if (response.status === 200) {
      console.log("✅ Request sent successfully:", response.status);
    } else {
      console.log("❌ Error while sending request:", response.status, response.statusText);
    }
  } catch (error) {
    if (error.response) {
      console.error("🔥 Server Error:", error.response.status, error.response.statusText);
    } 
    else {
      console.error("❌ Request setup error:", error.message);
    }
  }
});

export default job;
