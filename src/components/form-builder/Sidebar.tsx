import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useDrag } from "react-dnd";
import {
  Type,
  ListOrdered,
  CheckSquare,
  AlignLeft,
  ToggleLeft,
  Radio,
} from "lucide-react";

interface FormElementType {
  id: string;
  type: string;
  icon: React.ReactNode;
  label: string;
}

interface SidebarProps {
  onElementDrag?: (element: FormElementType) => void;
}

const formElements: FormElementType[] = [
  { id: "text", type: "text", icon: <Type />, label: "Text Input" },
  { id: "select", type: "select", icon: <ListOrdered />, label: "Select" },
  {
    id: "checkbox",
    type: "checkbox",
    icon: <CheckSquare />,
    label: "Checkbox",
  },
  { id: "textarea", type: "textarea", icon: <AlignLeft />, label: "Text Area" },
  { id: "toggle", type: "toggle", icon: <ToggleLeft />, label: "Toggle" },
  { id: "radio", type: "radio", icon: <Radio />, label: "Radio Group" },
];

const DraggableElement = ({ element }: { element: FormElementType }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "formElement",
    item: element,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`cursor-move ${isDragging ? "opacity-50" : ""}`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <Card className="p-4 hover:bg-gray-50 transition-colors">
        <div className="flex items-center gap-3">
          <div className="text-gray-500">{element.icon}</div>
          <span className="font-medium">{element.label}</span>
        </div>
      </Card>
    </div>
  );
};

const Sidebar = ({ onElementDrag = () => {} }: SidebarProps) => {
  return (
    <div className="w-[280px] bg-white border-r h-full p-4 flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Form Elements</h2>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Search Elements</Label>
          <Input type="search" placeholder="Search..." className="w-full" />
        </div>

        <Separator />

        <div className="space-y-2">
          <Label>Basic Elements</Label>
          <div className="space-y-2">
            {formElements.map((element) => (
              <DraggableElement key={element.id} element={element} />
            ))}
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <Label>Actions</Label>
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              <Type className="mr-2 h-4 w-4" />
              Save Template
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Type className="mr-2 h-4 w-4" />
              Clear All
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
