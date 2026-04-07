import type { MenuItem } from "@/data/mockData";

interface MenuItemProps {
  item: MenuItem;
}

export default function MenuItemCard({ item }: MenuItemProps) {
  return (
    <div
      className={`bg-white rounded-xl p-4 border ${
        item.available ? "border-gray-100" : "border-gray-100 opacity-50"
      }`}
    >
      <div className="flex justify-between items-start gap-3">
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900">{item.name}</h4>
          <p className="text-gray-500 text-sm mt-1">{item.description}</p>
          <p className="text-orange-500 font-bold mt-2">
            R$ {item.price.toFixed(2).replace(".", ",")}
          </p>
        </div>
        {!item.available && (
          <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full whitespace-nowrap">
            Indisponível
          </span>
        )}
      </div>
    </div>
  );
}
