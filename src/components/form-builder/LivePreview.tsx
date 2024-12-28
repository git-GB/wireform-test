import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Monitor, Smartphone } from "lucide-react";

interface FormElement {
  type: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: string[];
}

interface LivePreviewProps {
  formElements?: FormElement[];
}

const defaultElements: FormElement[] = [
  {
    type: "text",
    label: "Full Name",
    placeholder: "Enter your name",
    required: true,
  },
  {
    type: "email",
    label: "Email Address",
    placeholder: "Enter your email",
    required: true,
  },
  {
    type: "select",
    label: "Country",
    options: ["United States", "Canada", "United Kingdom"],
    required: false,
  },
];

const LivePreview = ({ formElements = defaultElements }: LivePreviewProps) => {
  const [viewMode, setViewMode] = useState("desktop");

  const renderFormElement = (element: FormElement) => {
    switch (element.type) {
      case "text":
      case "email":
        return (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              {element.label}
              {element.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
              type={element.type}
              placeholder={element.placeholder}
              className="w-full p-2 border rounded-md"
            />
          </div>
        );
      case "select":
        return (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              {element.label}
              {element.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <select className="w-full p-2 border rounded-md">
              <option value="">Select an option</option>
              {element.options?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm h-full">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Live Preview</h2>
        <Tabs defaultValue={viewMode} className="w-[200px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="desktop" onClick={() => setViewMode("desktop")}>
              <Monitor className="w-4 h-4 mr-2" />
              Desktop
            </TabsTrigger>
            <TabsTrigger value="mobile" onClick={() => setViewMode("mobile")}>
              <Smartphone className="w-4 h-4 mr-2" />
              Mobile
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <Card className="p-6">
        <div
          className={`mx-auto ${viewMode === "mobile" ? "max-w-sm" : "max-w-2xl"}`}
        >
          <form className="space-y-4">
            {formElements.map((element, index) => (
              <div key={index}>{renderFormElement(element)}</div>
            ))}
            <Button type="submit" className="w-full">
              Submit Form
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default LivePreview;
