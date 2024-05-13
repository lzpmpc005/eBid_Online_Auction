const prisma = require("@prisma/client");
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "your-email@gmail.com",
    pass: "your-password",
  },
});

const checkAuctions = async () => {
  try {
    const auctions = await prisma.auction.findMany();

    for (const auction of auctions) {
      const timeLeft = calculateTimeLeft(auction.endTime);

      if (timeLeft <= 0 && auction.current_bidder) {
        const user = await prisma.user.findUnique({
          where: { id: auction.current_bidder },
        });

        if (user && user.email) {
          let mailOptions = {
            from: "your-email@gmail.com",
            to: user.email,
            subject: "Auction Ended",
            text: `Congratulations! You have won the auction for ${auction.itemName}.`,
          };

          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
            }
          });
        }
      }
    }
  } catch (error) {
    console.error(error);
  }
};

setInterval(checkAuctions, 10000);
