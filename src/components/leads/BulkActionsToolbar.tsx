
"use client";

import { Button } from "@/components/ui/button";
import { Edit3, Mail, TrendingUp, Trash2, X } from "lucide-react";

interface BulkActionsToolbarProps {
  selectedCount: number;
  onClearSelection: () => void;
}

export function BulkActionsToolbar({ selectedCount, onClearSelection }: BulkActionsToolbarProps) {
  if (selectedCount === 0) return null;

  return (
    <div className="sticky top-20 z-20 my-4 p-3 bg-card border border-[#E5E7EB] rounded-lg shadow-md flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={onClearSelection} className="text-muted-foreground hover:text-primary">
            <X className="h-4 w-4" />
            <span className="sr-only">Clear selection</span>
        </Button>
        <span className="text-sm font-medium text-foreground">{selectedCount} lead{selectedCount > 1 ? 's' : ''} selected</span>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={() => alert("Change Status clicked")}>
          <Edit3 className="mr-2 h-4 w-4" /> Change Status
        </Button>
        <Button variant="outline" size="sm" onClick={() => alert("Add to Campaign clicked")}>
          <Mail className="mr-2 h-4 w-4" /> Add to Campaign
        </Button>
        <Button variant="outline" size="sm" onClick={() => alert("Export clicked")}>
          <TrendingUp className="mr-2 h-4 w-4" /> Export
        </Button>
        <Button variant="destructive" size="sm" onClick={() => alert("Delete clicked")}>
          <Trash2 className="mr-2 h-4 w-4" /> Delete
        </Button>
      </div>
    </div>
  );
}
