import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FilterBarProps {
  categories?: { id: string; name: string; icon: string }[];
  colors?: string[];
  selectedCategory?: string;
  selectedColor?: string;
  selectedSort?: string;
  onCategoryChange?: (category: string) => void;
  onColorChange?: (color: string) => void;
  onSortChange?: (sort: string) => void;
}

export default function FilterBar({
  categories = [],
  colors = [],
  selectedCategory = "all",
  selectedColor = "all",
  selectedSort = "new",
  onCategoryChange,
  onColorChange,
  onSortChange,
}: FilterBarProps) {
  const sortOptions = [
    { value: "new", label: "Новые" },
    { value: "old", label: "Старые" },
    { value: "price-asc", label: "Дешевле" },
    { value: "price-desc", label: "Дороже" },
  ];

  return (
    <div className="sticky top-[61px] z-40 bg-background border-b border-border py-3" data-testid="filter-bar">
      <div className="max-w-[420px] mx-auto">
        <div className="overflow-x-auto scrollbar-hide px-4">
          <div className="flex gap-2 pb-1 min-w-max">
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
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </Button>
            ))}

            {/* Colors */}
            <div className="flex gap-1 items-center ml-2">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => onColorChange?.(color)}
                  className={`w-8 h-8 rounded-full border-2 ${
                    selectedColor === color ? "border-foreground" : "border-border"
                  }`}
                  style={{ backgroundColor: color }}
                  data-testid={`filter-color-${color}`}
                  aria-label={`Цвет ${color}`}
                />
              ))}
            </div>

            {/* Sort */}
            <div className="relative ml-2">
              <select
                value={selectedSort}
                onChange={(e) => onSortChange?.(e.target.value)}
                className="appearance-none bg-background border border-border rounded-full px-3 py-1.5 pr-8 text-sm cursor-pointer"
                data-testid="filter-sort"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground" />
            </div>
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
