const express = require("express");
const router = express.Router();

router.patch("/api/auctions/:auctionId", async (req, res) => {
  try {
    const prisma = req.prisma;
    const { auctionId } = req.params;
    const { userId, current_bidder, ...values } = req.body;

    if (!userId) {
      return res.status(401).send("Unauthorized");
    }

    const auction = await prisma.auction.findUnique({
      where: {
        id: auctionId,
      },
    });

    if (!auction) {
      return res.status(404).json({ error: "auction not found" });
    }

    if (values.current_price <= auction.current_price) {
      return res
        .status(400)
        .json({ error: "Someone else already bid on this price or higher" });
    }

    const updatedauction = await prisma.auction.update({
      where: { id: auctionId },
      data: { ...values, current_bidder },
    });

    if (current_bidder) {
      await prisma.bid.create({
        data: {
          userId: current_bidder,
          auctionId: auctionId,
          bid_price: values.current_price,
        },
      });
    }

    res.json(updatedauction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/api/auctions/:auctionId", async (req, res) => {
  try {
    const prisma = req.prisma;
    const { auctionId } = req.params;
    const auction = await prisma.auction.findUnique({
      where: {
        id: auctionId,
      },
    });
    const categories = await prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
    });
    res.json({ auction, categories });
  } catch (error) {
    console.log("[auctions]", error);
    res.status(500).send("Internal Error");
  }
});

router.post("/api/auctions", async (req, res) => {
  try {
    const prisma = req.prisma;
    const { userId } = req.body;
    const { title } = req.body;
    if (!userId) {
      return res.status(401).send("Unauthorized");
    }
    const auction = await prisma.auction.create({
      data: {
        ownerId: userId,
        title,
      },
    });
    return res.json(auction);
  } catch (error) {
    console.log("[auctions]", error);
    return res.status(500).send("Internal Error");
  }
});

// retrieve all auctions
router.get("/api/all-auctions", async (req, res) => {
  try {
    const prisma = req.prisma;

    const auctions = await prisma.auction.findMany({
      where: {
        isPublished: true,
      },
      include: {
        category: true,
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

// search auctions
router.get("/api/search-auctions", async (req, res) => {
  try {
    const prisma = req.prisma;
    const { title, categoryId } = req.query;

    const auctions = await prisma.auction.findMany({
      where: {
        isPublished: true,
        title: {
          contains: title,
        },
        categoryId,
      },
      include: {
        category: true,
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

module.exports = router;
