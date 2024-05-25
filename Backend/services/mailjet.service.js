const Mailjet = require('node-mailjet');

const mailjet = Mailjet.apiConnect(
  process.env.MAILJET_API_KEY,
  process.env.MAILJET_API_SECRET
);
export const mailService=async(guardianEmail,carNumber,location,userEmail)=>{



  const request = await mailjet.post('send', { version: 'v3.1' }).request({
    Messages: [
      {
        From: {
          Email: userEmail,
          Name: 'Me',
        },
        To: [
          {
            Email: guardianEmail,
            Name: 'you',
          },
        ],
        Subject: 'Alert Accident Report',
        TextPart: 'Greetings from RapidRescueAmbulanceService a accident of carNumber'+carNumber+"hs been Reported on location"+location+"contact the patient as soon as possible",
        HTMLPart:
          '<h3>Dear passenger 1, welcome to <a href="https://www.mailjet.com/">Mailjet</a>!</h3><br />May the delivery force be with you!',
      },
    ],
  })
  request
    .then(result => {
      console.log(result.body)
    })
    .catch(err => {
      console.log(err.statusCode)
    })

}

