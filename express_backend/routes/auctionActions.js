const express = require("express");
const router = express.Router();

// publish auction
router.patch("/api/auctions/:auctionId/unpublish", async (req, res) => {
  try {
    const prisma = req.prisma;
    const { userId: ownerId } = req.body;
    const { auctionId } = req.params;

    if (!ownerId) {
      return res.status(401).send("Unauthorized");
    }

    const auction = await prisma.auction.findUnique({
      where: {
        id: auctionId,
        ownerId,
      },
    });

    if (!auction) {
      return res.status(404).send("Not found");
    }

    const unpublishedauction = await prisma.auction.update({
      where: {
        id: auctionId,
        ownerId,
      },
      data: {
        isPublished: false,
      },
    });

    res.json(unpublishedauction);
  } catch (error) {
    console.log("[auction_ID_UNPUBLISH]", error);
    res.status(500).send("Internal Error");
  }
});

// publish auction
router.patch("/api/auctions/:auctionId/publish", async (req, res) => {
  try {
    const prisma = req.prisma;
    const { userId: ownerId } = req.body;
    const { auctionId } = req.params;

    if (!ownerId) {
      return res.status(401).send("Unauthorized");
    }

    const auction = await prisma.auction.findUnique({
      where: {
        id: auctionId,
        ownerId,
      },
    });

    if (!auction) {
      return res.status(404).send("Not found");
    }

    if (
      !auction.title ||
      !auction.description ||
      !auction.imageUrl ||
      !auction.categoryId ||
      !auction.start_price ||
      !auction.close_time
    ) {
      return res.status(400).send("Missing required fields");
    }

    const publishedauction = await prisma.auction.update({
      where: {
        id: auctionId,
        ownerId,
      },
      data: {
        isPublished: true,
      },
    });

    res.json(publishedauction);
  } catch (error) {
    console.log("[auction_ID_PUBLISH]", error);
    res.status(500).send("Internal Error");
  }
});

// delete auction
router.delete("/api/auctions/:auctionId", async (req, res) => {
  try {
    const { userId: ownerId } = req.body;
    const { auctionId } = req.params;
    const prisma = req.prisma;

    if (!ownerId) {
      return res.status(401).send("Unauthorized");
    }

    const auction = await prisma.auction.findUnique({
      where: {
        id: auctionId,
        ownerId: ownerId,
      },
    });
    if (!auction) {
      return res.status(404).send("Not Found");
    }

    const deletedauction = await prisma.auction.delete({
      where: {
        id: auctionId,
      },
    });
    console.log("Deleted auction", deletedauction);

    res.json(deletedauction);
  } catch (error) {
    console.log("[auction_ID_DELETE]", error);
    res.status(500).send("Internal Error");
  }
});

module.exports = router;
