const express = require("express");
const router = express.Router();

//retrieve user specific auction
router.get("/api/auctions/:auctionId/user/:userId", async (req, res) => {
  try {
    const prisma = req.prisma;
    const { auctionId, userId } = req.params;

    const auction = await prisma.auction.findUnique({
      where: {
        id: auctionId,
      },
    });

    if (!auction) {
      return res.status(404).json({ error: "auction not found" });
    }

    res.json(auction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// retrieve all auctions for a user(seller)
router.get("/api/auctions", async (req, res) => {
  try {
    const prisma = req.prisma;
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).send("Unauthorized");
    }

    const auctions = await prisma.auction.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.json(auctions);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

// retrieve all purchased auctions for a user
router.get("/api/users/:userId/purchased-auctions", async (req, res) => {
  try {
    const prisma = req.prisma;
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).send("Unauthorized");
    }

    const purchasedauctions = await prisma.purchase.findMany({
      where: {
        userId: userId,
      },
      select: {
        auction: {
          include: {
            category: true,
          },
        },
      },
    });

    return res.json(purchasedauctions);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Error in retrieving purchasedauctions" });
  }
});

module.exports = router;
