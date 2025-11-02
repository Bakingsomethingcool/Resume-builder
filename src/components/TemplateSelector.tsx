import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { templates } from "@/lib/templates";
import { FileText } from "lucide-react";

interface TemplateSelectorProps {
  open: boolean;
  onClose: () => void;
  onSelect: (templateId: string) => void;
}

export function TemplateSelector({ open, onClose, onSelect }: TemplateSelectorProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Choose a Template</DialogTitle>
          <DialogDescription>
            Select a template to start building your resume
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {templates.map((template) => (
            <Card
              key={template.id}
              className="cursor-pointer hover:border-primary transition-colors"
              onClick={() => {
                onSelect(template.id);
                onClose();
              }}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  <CardTitle className="text-base">{template.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-muted rounded p-4 text-xs font-mono h-32 overflow-hidden">
                  {template.markdown.substring(0, 150)}...
                </div>
                <Button className="w-full mt-3" size="sm">
                  Use Template
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
