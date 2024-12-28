import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Sidebar from "@/components/form-builder/Sidebar";
import WorkspacePanel from "@/components/form-builder/WorkspacePanel";

interface FormElement {
  id: string;
  type: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: string[];
}

const defaultElements: FormElement[] = [
  {
    id: "1",
    type: "text",
    label: "Name",
    placeholder: "Enter your name",
    required: true,
  },
  {
    id: "2",
    type: "email",
    label: "Email",
    placeholder: "Enter your email",
    required: true,
  },
  {
    id: "3",
    type: "select",
    label: "Country",
    options: ["United States", "Canada", "United Kingdom"],
  },
];

const FormBuilder = () => {
  const [formElements, setFormElements] =
    React.useState<FormElement[]>(defaultElements);

  const handleElementDrop = (element: FormElement, index: number) => {
    const newElement = {
      ...element,
      id: `${Date.now()}`,
    };

    const newElements = [...formElements];
    newElements.splice(index, 0, newElement);
    setFormElements(newElements);
  };

  const handleElementReorder = (dragIndex: number, hoverIndex: number) => {
    const newElements = [...formElements];
    const [draggedElement] = newElements.splice(dragIndex, 1);
    newElements.splice(hoverIndex, 0, draggedElement);
    setFormElements(newElements);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <WorkspacePanel
          elements={formElements}
          onElementDrop={handleElementDrop}
          onElementReorder={handleElementReorder}
        />
      </div>
    </DndProvider>
  );
};

export default FormBuilder;
