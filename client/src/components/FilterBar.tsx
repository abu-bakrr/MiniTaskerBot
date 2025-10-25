import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useConfig } from "@/hooks/useConfig";

interface FilterBarProps {
  categories?: { id: string; name: string; icon?: string }[];
  selectedCategory?: string;
  selectedSort?: string;
  priceFrom?: string;
  priceTo?: string;
  onCategoryChange?: (category: string) => void;
  onSortChange?: (sort: string) => void;
  onPriceFromChange?: (price: string) => void;
  onPriceToChange?: (price: string) => void;
  onReset?: () => void;
}

export default function FilterBar({
  categories = [],
  selectedCategory = "all",
  selectedSort = "new",
  priceFrom = "",
  priceTo = "",
  onCategoryChange,
  onSortChange,
  onPriceFromChange,
  onPriceToChange,
  onReset,
}: FilterBarProps) {
  const { config } = useConfig();
  
  const sortOptions = config?.sortOptions || [
    { id: "new", label: "Новые", emoji: "✨" },
    { id: "price_asc", label: "Дешевле", emoji: "💰" },
    { id: "price_desc", label: "Дороже", emoji: "💎" },
  ];

  const hasActiveFilters = selectedCategory !== "all" || priceFrom !== "" || priceTo !== "" || selectedSort !== "new";

  return (
    <div className="sticky top-[61px] z-40 bg-background border-b border-border py-3" data-testid="filter-bar">
      <div className="max-w-[420px] mx-auto">
        <div className="overflow-x-auto scrollbar-hide px-4">
          <div className="flex gap-2 pb-1 min-w-max items-center">
            {/* Categories */}
            <Button
              size="sm"
              variant={selectedCategory === "all" ? "default" : "outline"}
              onClick={() => onCategoryChange?.("all")}
              className="rounded-full whitespace-nowrap"
              data-testid="filter-category-all"
            >
              Все
            </Button>
            {categories.map((cat) => (
              <Button
                key={cat.id}
                size="sm"
                variant={selectedCategory === cat.id ? "default" : "outline"}
                onClick={() => onCategoryChange?.(cat.id)}
                className="rounded-full whitespace-nowrap gap-1"
                data-testid={`filter-category-${cat.id}`}
              >
                {cat.icon && <span>{cat.icon}</span>}
                <span>{cat.name}</span>
              </Button>
            ))}

            {/* Price Range */}
            <div className="flex gap-1 items-center ml-2">
              <input
                type="number"
                placeholder="От"
                value={priceFrom}
                onChange={(e) => onPriceFromChange?.(e.target.value)}
                className="w-20 h-8 px-2 text-sm border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                data-testid="input-price-from"
              />
              <span className="text-muted-foreground">-</span>
              <input
                type="number"
                placeholder="До"
                value={priceTo}
                onChange={(e) => onPriceToChange?.(e.target.value)}
                className="w-20 h-8 px-2 text-sm border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                data-testid="input-price-to"
              />
            </div>

            {/* Sort with Shadcn Select */}
            <Select value={selectedSort} onValueChange={onSortChange}>
              <SelectTrigger 
                className="w-[110px] h-8 rounded-full text-sm ml-2" 
                data-testid="filter-sort"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent align="end" sideOffset={4}>
                {sortOptions.map((opt) => (
                  <SelectItem key={opt.id} value={opt.id}>
                    {opt.emoji && <span>{opt.emoji} </span>}
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Reset Button */}
            {hasActiveFilters && (
              <Button
                size="sm"
                variant="ghost"
                onClick={onReset}
                className="rounded-full gap-1 ml-2"
                data-testid="button-reset-filters"
              >
                <X className="w-4 h-4" />
                Сбросить
              </Button>
            )}
          </div>
        </div>
      </div>
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
