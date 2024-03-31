"use client";
import * as React from "react";
import { useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import { Plus } from "lucide-react";
import { Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ProductOptions = [
  { id: "1", name: "Motor PCB" },
  { id: "2", name: "Milk Analyzer" },
  { id: "3", name: "Plank" },
  { id: "4", name: "Drive" },
];

const DialogDemo: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);
  const [tableData, setTableData] = useState<{ id: number; product: string }[]>(
    []
  );
  const [buttonClicked, setButtonClicked] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleAddToTable = () => {
    if (quantity === 0) {
      setError("Quantity cannot be zero");
      return;
    }

    const newTableData = [];
    for (let i = 1; i <= quantity; i++) {
      newTableData.push({ id: i, product: selectedProduct });
    }
    setTableData(newTableData);
    setButtonClicked(true);
    setError("");
  };

  const extractAdminId = (): string => {
    return document.querySelector<HTMLInputElement>("#adminId")?.value || "";
  };

  const extractDescription = (): string => {
    return document.querySelector<HTMLTextAreaElement>("#desc")?.value || "";
  };

  const extractUsage = (): string => {
    const productDropdown = document.querySelector<HTMLSelectElement>("#product");
    return productDropdown ? productDropdown.value : "";
  };

  const extractReason = (): string => {
    const reasonDropdown = document.querySelector<HTMLSelectElement>("#reason");
    return reasonDropdown ? reasonDropdown.value : "";
  };

  const handleCheckIn = () => {
    const adminId = extractAdminId();
    const usage = extractUsage();
    const reason = extractReason();
    const description = extractDescription();

    const checkInData = {
      adminId,
      product: selectedProduct,
      quantity,
      usage,
      reason,
      description,
      tableData,
    };

    console.log("Check-in data:", checkInData);
  };

  const handleProductChange = (productId: string) => {
    const productName =
      ProductOptions.find((product) => product.id === productId)?.name || "";
    setSelectedProduct(productName);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add</Button>
      </DialogTrigger>
      <DialogContent className="h-[94%] min-w-[98%]">
        <DialogHeader className="h-fit m-0">
          <DialogTitle className="sm:text-4xl text-2xl font-black sm:m-4">
            Check In/ Check Out
          </DialogTitle>
        </DialogHeader>
        {/* Two rows */}
        <div className="flex items-center justify-evenly h-full">
          {/* First row with input fields */}
          <div className="w-[65%] h-full m-4">
            {/* Columns of input fiels */}
            <div className="grid w-full items-center gap-0">
              {/* ID input */}
              <div className="relative">
                <input
                  type="text"
                  id="adminId"
                  placeholder="#ASDF43RFFF"
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-black bg-transparent rounded-lg border-2 border-gray-400 appearance-none focus:outline-none focus:ring-0"
                />
                <Label
                  htmlFor="floating_outlined"
                  className="absolute text-2xl text-gray-800 bg-white transform -translate-y-6 scale-75 top-2 ml-4 z-10 origin-[0] px-0 placeholder:text-xl placeholder:px-4"
                >
                  Admin ID
                </Label>
              </div>
              {/* One row three column inputs */}
              <div className="grid sm:grid-cols-4 grid-rows-2 gap-0 justify-evenly sm:mt-4 mt-0 h-fit">
                {/* Column 1 occuping 50% of space */}
                <div className="sm:col-span-2 row-span-1 h-fit -mt-3 sm:mr-4">
                  <Label
                    htmlFor="Product"
                    className="relative text-xl scale-50 text-gray-800 bg-white ml-4 top-4 px-0 placeholder:text-xl placeholder:px-4"
                  >
                    Products
                  </Label>
                  <Select>
                    <SelectTrigger className="min-w-full border-2 border-gray-400 focus:ring-0 focus:outline-none outline-none h-[3.1rem]">
                    <SelectValue placeholder="product" />
                    </SelectTrigger>
                    <SelectContent className="w-full" id="product">
                      <SelectItem value="motor" className="text-base">
                        Motor PCB
                      </SelectItem>
                      <SelectItem value="milk" className="text-base">
                        Milk Analyzer
                      </SelectItem>
                      <SelectItem value="plank" className="text-base">
                        Plank
                      </SelectItem>
                      <SelectItem value="drive" className="text-base">
                        Drive
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {/* Column 2 occuping 25% of space */}
                <div className="sm:col-span-1 row-span-1 h-fit sm:mt-4 mt-4 sm:mr-4">
                  <div className="relative mb-2">
                    <input
                      type="number"
                      placeholder="12"
                      value={quantity} min="1"
                      className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-black bg-transparent rounded-lg border-2 border-gray-400 appearance-none focus:outline-none focus:ring-0"
                      onChange={(e) => setQuantity(parseInt(e.target.value))}
                    />
                    <Label
                      htmlFor="floating_outlined"
                      className="absolute text-2xl text-gray-800 bg-white transform -translate-y-6 scale-75 top-2 ml-4 z-10 origin-[0] px-0 placeholder:text-xl placeholder:px-4"
                    >
                      Quantity
                    </Label>
                  </div>
                </div>
                {/* Column 3 occuping 25% of space */}
                <div className="sm:col-span-1 row-span-1 sm:ml-2 ml-0 h-fit sm:mt-0 mt-3">
                  <Button
                    onClick={handleAddToTable}
                    variant={buttonClicked ? "secondary" : "default"}
                    disabled={buttonClicked}
                    className="sm:mt-4 w-full bg-[#005ba2] text-black hover:bg-[#0085ee] h-[3.1rem]"
                  >
                    {buttonClicked ? "Selected" : "Serial Number"}
                  </Button>
                  {error && (
                    <p className="text-[#ff0000] text-base text-start font-semibold">
                      {error}
                    </p>
                  )}
                </div>

                {/* Column 1 occuping 50% of space*/}
                <div className="sm:col-span-2 row-span-1 h-fit sm:mr-4 sm:mt-7 mt-2">
                  <input
                    type="text"
                    placeholder="In Milk Analyzer"
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-black bg-transparent rounded-lg border-2 border-gray-400 appearance-none focus:outline-none focus:ring-0"
                  />
                  <Label
                    htmlFor="floating_outlined"
                    className="relative text-xl text-gray-800 bg-white transform translate-y-6 scale-75 -top-16 ml-4 z-10 origin-[0] px-0 placeholder:text-xl placeholder:px-4"
                  >
                    Usage
                  </Label>
                </div>

                <div className="sm:col-span-2 row-span-1 h-full sm:mt-0 mt-2">
                  <Label
                    htmlFor="reason"
                    className="relative text-xl text-gray-800 bg-white transform translate-y-12 top-3 ml-4 z-10 origin-[0] px-0 placeholder:text-xl placeholder:px-4"
                  >
                    Reason
                  </Label>
                  <Select>
                    <SelectTrigger className="min-w-full border-2 border-gray-400 focus:ring-0 focus:outline-none outline-none h-[3.1rem]">
                      <SelectValue placeholder="Servicing" />
                    </SelectTrigger>
                    <SelectContent className="w-full" id="reason">
                      <SelectItem value="motor" className="text-base">
                        Motor PCB
                      </SelectItem>
                      <SelectItem value="milk" className="text-base">
                        Milk Analyzer
                      </SelectItem>
                      <SelectItem value="plank" className="text-base">
                        Plank
                      </SelectItem>
                      <SelectItem value="drive" className="text-base">
                        Drive
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            {/* Description section */}
            <div className="w-full flex flex-col">
              <Label htmlFor="desc" className="text-xl mb-2">
                Description
              </Label>
              <Textarea
                id="desc"
                className="w-full min-h-24 m-2"
                placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
              />
            </div>
          </div>
          {/* Second row with table */}
          <div className="ml-4 w-[35%] min-h-full">
            <div className="w-full">
              <div className="flex align-middle justify-between">
                <h1 className="text-xl mb-2 justify-start">
                  Serial numbers of Motor PCB
                </h1>
                <div className=" justify-end mb-2">
                  <Button
                    size="icon"
                    className="bg-[#0085ee] hover:bg-[#005ba2] mr-2"
                  >
                    <Plus className="h-fit w-fit" />
                  </Button>
                  <Button size="icon" className="bg-[#ea4335]">
                    <Trash className="h-fit w-fit stroke-white" />
                  </Button>
                </div>
              </div>
              <ScrollArea className="h-[25rem] w-full rounded-md border p-0">
                <div className="rounded-md border">
                  <Table>
                    <TableHead>
                      <TableRow className="flex justify-between">
                        <TableCell>ID</TableCell>
                        <TableCell>Product</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {tableData.map((row) => (
                        <TableRow className="flex justify-between" key={row.id}>
                          <TableCell>{row.id}</TableCell>
                          <TableCell>
                            <Input
                              defaultValue={row.product}
                              onChange={(e) => {
                                const newData = [...tableData];
                                newData[row.id - 1].product = e.target.value;
                                setTableData(newData);
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
        <DialogFooter className="absolute bottom-4 right-5">
          <Button
            size="lg"
            type="submit"
            className="text-white bg-[#005ba2] hover:bg-[#0085ee]"
            onClick={handleCheckIn}
          >
            Check In
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogDemo;
