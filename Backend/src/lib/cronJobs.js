import crons from "cron"
import https from "https"


const job = new crons.CronJob("*/14 * * * *",()=>{
    https.get(process.env.API_URL,(res)=>{
        if(res.statusCode === 200)
        {
            console.log("Request sent Successfully")
        }
        else
        {
            console.log("Error while sending Request")
        }
    }).on("error",(e)=>{
        console.error("Error",e)
    })
})

export default job