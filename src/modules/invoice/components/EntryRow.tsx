import { TableCell, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useTheme } from "next-themes";

interface Entry {
  description: string;
  quantity: number;
  amount: number;
}

interface EntryRowProps {
  entry: Entry;
  index: number;
  entries: Entry[];
  updateEntries: (newEntries: Entry[]) => void;
}

const EntryRow = ({ entry, index, entries, updateEntries }: EntryRowProps) => {
  const { theme } = useTheme();
  const handleChange = (field: keyof Entry, value: string | number) => {
    const validatedValue = field === "quantity" || field === "amount" ? Number(value) || 0 : value;

    const updatedEntries = entries.map((e, i) =>
      i === index ? { ...e, [field]: validatedValue } : e,
    );

    updateEntries(updatedEntries);
  };

  return (
    <TableRow key={index} className="relative">
      <TableCell className="font-medium">
        <Input
          value={entry.description}
          onChange={(e) => handleChange("description", e.target.value)}
          className={`border-none bg-white text-black"  dark:bg-black dark:text-white focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-opacity-0`}
          placeholder="Enter description..."
        />
      </TableCell>
      <TableCell>
        <Input
          type="number"
          value={entry.quantity}
          onChange={(e) => handleChange("quantity", e.target.value)}
          min={0}
          className={`border-none bg-white text-black"  dark:bg-black dark:text-white focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-opacity-0`}
        />
      </TableCell>
      <TableCell className="text-right">
        <Input
          type="number"
          value={entry.amount}
          onChange={(e) => handleChange("amount", e.target.value)}
          min={0}
          className={`border-none bg-white text-black"  dark:bg-black dark:text-white focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-opacity-0 text-right`}
        />
      </TableCell>
    </TableRow>
  );
};

export default EntryRow;
