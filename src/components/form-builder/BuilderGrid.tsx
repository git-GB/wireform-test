import React, { useRef } from "react";
import { Card } from "@/components/ui/card";
import { useDrop, useDrag } from "react-dnd";
import { cn } from "@/lib/utils";

interface FormElement {
  id: string;
  type: string;
  label: string;
  placeholder?: string;
  required?: boolean;
}

interface BuilderGridProps {
  elements?: FormElement[];
  onDrop?: (item: FormElement, index: number) => void;
  onReorder?: (dragIndex: number, hoverIndex: number) => void;
}

interface DraggableElementProps {
  element: FormElement;
  index: number;
  onReorder: (dragIndex: number, hoverIndex: number) => void;
}

const DraggableElement = ({
  element,
  index,
  onReorder,
}: DraggableElementProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: "gridElement",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "gridElement",
    hover: (item: { index: number }, monitor) => {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      onReorder(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  return (
    <Card
      ref={ref}
      className={cn(
        "col-span-12 md:col-span-6 lg:col-span-4 p-4 cursor-move hover:shadow-md transition-shadow",
        isDragging && "opacity-50",
      )}
    >
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-medium text-sm">{element.label}</span>
          {element.required && (
            <span className="text-xs text-red-500">Required</span>
          )}
        </div>
        <div className="h-10 bg-gray-100 rounded flex items-center px-3">
          <span className="text-gray-400 text-sm">
            {element.placeholder || `Enter ${element.label.toLowerCase()}`}
          </span>
        </div>
        <div className="text-xs text-gray-500">Type: {element.type}</div>
      </div>
    </Card>
  );
};

const BuilderGrid = ({
  elements = [
    {
      id: "1",
      type: "text",
      label: "Name",
      placeholder: "Enter your name",
      required: true,
    },
    { id: "2", type: "email", label: "Email", placeholder: "Enter your email" },
  ],
  onDrop = () => {},
  onReorder = () => {},
}: BuilderGridProps) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ["formElement", "gridElement"],
    drop: (item: FormElement & { index?: number }, monitor) => {
      if (monitor.getItemType() === "formElement") {
        const dropIndex = elements.length;
        onDrop(item, dropIndex);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={cn(
        "bg-white p-6 rounded-lg min-h-[491px] grid grid-cols-12 gap-4",
        isOver && "bg-gray-50",
      )}
    >
      {elements.map((element, index) => (
        <DraggableElement
          key={element.id}
          element={element}
          index={index}
          onReorder={onReorder}
        />
      ))}
      {elements.length === 0 && (
        <div className="col-span-12 flex items-center justify-center h-[400px] border-2 border-dashed border-gray-200 rounded-lg">
          <p className="text-gray-500">Drag and drop form elements here</p>
        </div>
      )}
    </div>
  );
};

export default BuilderGrid;
