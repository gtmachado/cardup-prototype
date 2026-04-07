import type { MenuSection } from "@/data/mockData";
import MenuItemCard from "./MenuItemCard";

interface MenuSectionProps {
  section: MenuSection;
}

export default function MenuSectionCard({ section }: MenuSectionProps) {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-orange-500 inline-block">
        {section.name}
      </h3>
      <div className="grid gap-4 md:grid-cols-2">
        {section.items.map((item) => (
          <MenuItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
