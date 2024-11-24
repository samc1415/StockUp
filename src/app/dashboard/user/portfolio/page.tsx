"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export default function BuySellStocks() {
  const [user, setUser] = useState({
    userID: "",
    userType: "",
    username: "",
    displayName: "",
    wallet: 0,
    startingWallet: 0,
  });

  const [portfolio, setPortfolio] = useState<PortfolioEntry[]>([]);
  const [stockDetails, setStockDetails] = useState<Record<string, Stock>>({});
  const [tokenCookie] = useCookies(["AccessToken"]);
  const [userCookie] = useCookies(["UserID"]);
  const [error, setError] = useState<string | null>(null);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [transactionAction, setTransactionAction] = useState<"buy" | "sell">(
    "buy"
  );
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [quantity, setQuantity] = useState(0);
  const [confirmationTime, setConfirmationTime] = useState(60); // 60 seconds
  const [isAmountConfirmed, setIsAmountConfirmed] = useState(false);

  type PortfolioEntry = {
    portfolioEntryID: string;
    userID: string;
    stockID: string;
    transactionID: string;
    amount: number;
  };

  type Stock = {
    stockID: string;
    displayName: string;
    displayCode: string;
    createDate: string;
    latestPrice: number;
    volume: number;
    openingPrice: number;
  };

  // Fetch user details (UserID must be available before fetching)
  useEffect(() => {
    const fetchUser = async () => {
      if (!userCookie.UserID) return; // Ensure UserID is available

      const url = `https://apiz.zachklimowicz.com/users/${userCookie.UserID}`;
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Error fetching user: ${response.statusText}`);
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        setError("Failed to fetch user data.");
        console.error("Failed to fetch user:", error);
      }
    };

    if (userCookie.UserID) {
      fetchUser();
    }
  }, [userCookie]);

  // Fetch portfolio data (Only when UserID is available)
  useEffect(() => {
    const fetchPortfolio = async () => {
      if (!user.userID) return; // Ensure userID is available before fetching portfolio

      const url = `https://apiz.zachklimowicz.com/portfolio/${user.userID}`;
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Error fetching portfolio: ${response.statusText}`);
        }

        const data: PortfolioEntry[] = await response.json();
        setPortfolio(data); // Set portfolio once fetched

        const stockFetchPromises = data.map((entry) =>
          fetchStockDetails(entry.stockID)
        );
        await Promise.all(stockFetchPromises); // Wait for all stock data to load
      } catch (error) {
        setError("Failed to fetch portfolio data.");
        console.error("Failed to fetch portfolio:", error);
      }
    };

    if (user.userID) {
      fetchPortfolio();
    }
  }, [user.userID]);

  const sellStock = async (
    stockID: string,
    userID: string,
    salePrice: number,
    quantity: number
  ) => {
    const url = "https://apiz.zachklimowicz.com/transactions/sell/";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userID: userID,
          stockID: stockID,
          quantity: quantity,
          salePrice: salePrice,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to sell stock: ${response.statusText}`);
      }

      // Trigger re-fetch of the portfolio after successful sale
      const updatedPortfolio = await fetchPortfolioData(userID);
      setPortfolio(updatedPortfolio); // Update portfolio after successful sale
    } catch (error) {
      setError("Failed to sell stock.");
      console.error("Failed to sell stock:", error);
    }
  };

  const buyStock = async (
    stockID: string,
    userID: string,
    salePrice: number,
    quantity: number
  ) => {
    const url = "https://apiz.zachklimowicz.com/transactions/buy/";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userID: userID,
          stockID: stockID,
          quantity: quantity,
          salePrice: salePrice,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to buy stock: ${response.statusText}`);
      }

      // Trigger re-fetch of the portfolio after successful purchase
      const updatedPortfolio = await fetchPortfolioData(userID);
      setPortfolio(updatedPortfolio); // Update portfolio after successful purchase
    } catch (error) {
      setError("Failed to buy stock.");
      console.error("Failed to buy stock:", error);
    }
  };

  const fetchPortfolioData = async (userID: string) => {
    const url = `https://apiz.zachklimowicz.com/portfolio/${userID}`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching portfolio: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      setError("Failed to fetch portfolio data.");
      console.error("Failed to fetch portfolio:", error);
      return [];
    }
  };

  const fetchStockDetails = async (stockID: string) => {
    if (stockDetails[stockID]) return;

    const url = `https://apiz.zachklimowicz.com/stocks/${stockID}`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching stock: ${response.statusText}`);
      }

      const stockData: Stock = await response.json();
      setStockDetails((prev) => ({
        ...prev,
        [stockID]: stockData,
      }));
    } catch (error) {
      setError(`Failed to fetch stock ${stockID}:`);
      console.error(`Failed to fetch stock ${stockID}:`, error);
    }
  };

  // Timer for confirmation
  useEffect(() => {
    if (showModal && isAmountConfirmed) {
      const timer = setInterval(() => {
        setConfirmationTime((prevTime) => {
          if (prevTime === 0) {
            clearInterval(timer);
            setShowModal(false); // Close modal when time expires
            setError("Confirmation time expired. Transaction canceled.");
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(timer); // Cleanup timer on unmount or when modal is closed
    }
  }, [showModal, isAmountConfirmed]);

  const handleConfirmAmount = () => {
    setIsAmountConfirmed(true); // Start the timer after the amount is confirmed
  };

  const handleConfirmTransaction = () => {
    if (transactionAction === "buy") {
      buyStock(
        selectedStock!.stockID,
        user.userID,
        selectedStock!.latestPrice,
        quantity
      );
    } else if (transactionAction === "sell") {
      sellStock(
        selectedStock!.stockID,
        user.userID,
        selectedStock!.latestPrice,
        quantity
      );
    }
    setShowModal(false); // Close modal after transaction
  };

  return (
    <>
      <div>
        <div className="flex items-center">
          <div className="bg-[#e5e5e5] p-4 rounded-full">
            <div className="h-2 w-2 bg-green-500 rounded-full"></div>
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="font-bold">Cash Balance</h2>
            <p className="text-sm">${user.wallet}</p>
          </div>
        </div>
      </div>
      <div>
        <div className="flex justify-between items-center">
          <h3 className="font-bold">Table of Holdings</h3>
          <Input className="rounded-full w-1/2" placeholder="Search stocks..." />
        </div>
        <Table className="mt-6">
          <TableHeader className="bg-[#b5b5b5] dark:bg-secondary">
            <TableRow>
              <TableHead className="hidden md:table-cell text-primary">
                Stock Name
              </TableHead>
              <TableHead className="text-primary">Ticker</TableHead>
              <TableHead className="hidden md:table-cell text-primary">
                Current Price (USD)
              </TableHead>
              <TableHead className="hidden md:table-cell text-primary">
                Volume Owned
              </TableHead>
              <TableHead className="text-primary">Total Value (USD)</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {portfolio.map((entry) => {
              const stock = stockDetails[entry.stockID];
              return (
                <TableRow
                  key={
                    entry.portfolioEntryID ||
                    `${entry.stockID}-${entry.amount}`
                  }
                >
                  <TableCell className="hidden md:table-cell">
                    {stock?.displayName || "Loading..."}
                  </TableCell>
                  <TableCell>{stock?.displayCode || "N/A"}</TableCell>
                  <TableCell className="font-medium">
                    ${stock?.latestPrice?.toFixed(2) || "N/A"}
                  </TableCell>
                  <TableCell>{entry.amount}</TableCell>
                  <TableCell>
                    $
                    {stock
                      ? (stock.latestPrice * entry.amount).toFixed(2)
                      : "N/A"}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          onClick={() => {
                            setTransactionAction("buy");
                            setSelectedStock(stock);
                            setShowModal(true);
                          }}
                        >
                          Buy More
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setTransactionAction("sell");
                            setSelectedStock(stock);
                            setShowModal(true);
                          }}
                        >
                          Sell Stock
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold text-black">
              {transactionAction === "buy" ? "Buy Stock" : "Sell Stock"}
            </h3>
            <p className="mt-2 text-black">Enter the amount</p>
            <Input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              min="1"
              max={
                transactionAction === "buy"
                  ? undefined // No restriction for buying
                  : selectedStock?.volume // Limit to the volume when selling
              }
              className="text-black"
            />
            <div className="mt-4 flex flex-col gap-2">
              {isAmountConfirmed ? (
                <>
                  Time Remaining: {confirmationTime}s
                </>
              ) : (
                <Button onClick={handleConfirmAmount}>Confirm Amount</Button>
              )}
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <Button
                variant="ghost"
                onClick={() => setShowModal(false)}
                className="w-full text-black"
              >
                Cancel
              </Button>
              {isAmountConfirmed && (
                <>
                  <Button
                    onClick={handleConfirmTransaction}
                    className="w-full"
                  >
                    Confirm Transaction
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
