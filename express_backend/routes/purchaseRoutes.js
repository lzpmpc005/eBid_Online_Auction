const express = require("express");
const router = express.Router();

router.get("/api/auctions/:auctionId/price", async (req, res) => {
  try {
    const prisma = req.prisma;
    const { auctionId } = req.params;

    const auction = await prisma.auction.findUnique({
      where: {
        isPublished: true,
        id: auctionId,
      },
      select: {
        price: true,
      },
    });

    if (!auction) {
      return res
        .status(404)
        .json({ error: "auction not found or not published" });
    }

    res.json(auction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// check purchase status
router.get(
  "/api/purchases/user/:userId/auction/:auctionId",
  async (req, res) => {
    try {
      const prisma = req.prisma;
      const { userId, auctionId } = req.params;

      let purchase = await prisma.purchase.findUnique({
        where: {
          userId_auctionId: {
            userId,
            auctionId,
          },
        },
      });

      if (!purchase) {
        purchase = null;
      }

      res.json(purchase);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }
);

module.exports = router;
