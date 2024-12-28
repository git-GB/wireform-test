import React from "react";
import BuilderGrid from "./BuilderGrid";
import LivePreview from "./LivePreview";

interface FormElement {
  id: string;
  type: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: string[];
}

interface WorkspacePanelProps {
  elements?: FormElement[];
  onElementDrop?: (element: FormElement, index: number) => void;
  onElementReorder?: (dragIndex: number, hoverIndex: number) => void;
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

const WorkspacePanel = ({
  elements = defaultElements,
  onElementDrop = () => {},
  onElementReorder = () => {},
}: WorkspacePanelProps) => {
  return (
    <div className="bg-gray-50 flex-1 p-6 space-y-6 min-h-[982px]">
      <div className="grid grid-rows-2 gap-6 h-full">
        <div className="bg-white rounded-lg shadow-sm">
          <BuilderGrid
            elements={elements}
            onDrop={onElementDrop}
            onReorder={onElementReorder}
          />
        </div>
        <div className="bg-white rounded-lg shadow-sm">
          <LivePreview
            formElements={elements.map(
              ({ type, label, placeholder, required, options }) => ({
                type,
                label,
                placeholder,
                required,
                options,
              }),
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default WorkspacePanel;
