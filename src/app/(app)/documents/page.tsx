
"use client";

import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress"; // For modal checklist visual
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ChevronRight,
  Folder,
  FileText,
  MoreVertical,
  Plus,
  UploadCloud,
  ShieldCheck,
  ShieldAlert,
  Clock,
  Sparkles,
  CheckCircle2,
  Loader2,
  XCircle,
  FolderPlus,
  FileUp,
  FolderUp,
  ShieldQuestion,
  FileArchive, // For general files or zip
  FileImage, // For images
  FileSpreadsheet, // For Excel
  FileCode2, // Could use for DOCX or just FileText
  Search, // For search bar
} from "lucide-react";
import React, { useState, useMemo, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


type VerificationStatus = "Verified" | "Issues Found" | "In Progress" | "Not Verified";

interface FileItem {
  id: string;
  name: string;
  type: "folder" | "file";
  verificationStatus: VerificationStatus;
  owner: string;
  lastModified: string;
  size?: string;
  parentId?: string | null; // For folder structure
  fileType?: "pdf" | "docx" | "xlsx" | "jpg" | "png" | "zip" | "other"; // For file icons
}

interface FolderItem {
  id: string;
  name: string;
  parentId?: string | null;
}

const mockFolders: FolderItem[] = [
  { id: "root", name: "My Drive", parentId: null },
  { id: "properties", name: "Properties", parentId: "root" },
  { id: "prop1", name: "Luxury Apartment in Bandra", parentId: "properties" },
  { id: "prop2", name: "Suburban Villa Photos", parentId: "properties" },
  { id: "leads", name: "Leads", parentId: "root" },
  { id: "lead1", name: "Aarav Sharma Docs", parentId: "leads" },
  { id: "contracts", name: "Contracts", parentId: "root" },
  { id: "verified", name: "Verified Documents", parentId: "root" },
];

const mockFiles: FileItem[] = [
  { id: "f1", name: "Sales Agreement - Prop1.pdf", type: "file", fileType: "pdf", verificationStatus: "Verified", owner: "Me", lastModified: "2024-07-28", size: "2.1 MB", parentId: "prop1" },
  { id: "f2", name: "Floor Plan - Prop1.jpg", type: "file", fileType: "jpg", verificationStatus: "Not Verified", owner: "Me", lastModified: "2024-07-27", size: "800 KB", parentId: "prop1" },
  { id: "f3", name: "Client KYC - Aarav.docx", type: "file", fileType: "docx", verificationStatus: "Issues Found", owner: "Riya S.", lastModified: "2024-07-26", size: "1.2 MB", parentId: "lead1" },
  { id: "f4", name: "Rental Agreement Draft.pdf", type: "file", fileType: "pdf", verificationStatus: "In Progress", owner: "Me", lastModified: "2024-07-29", size: "550 KB", parentId: "contracts" },
  { id: "f5", name: "Market Analysis Q3.xlsx", type: "file", fileType: "xlsx", verificationStatus: "Not Verified", owner: "Me", lastModified: "2024-07-20", size: "3.5 MB", parentId: "root" },
  { id: "f6", name: "Project Blueprint Q1.pdf", type: "file", fileType: "pdf", verificationStatus: "Verified", owner: "Me", lastModified: "2024-07-15", size: "10.2 MB", parentId: "verified" },
  { id: "folder_photos_prop1", name: "Property Photos", type: "folder", verificationStatus: "Not Verified", owner: "Me", lastModified: "2024-07-27", parentId: "prop1" },
  { id: "f7_in_photos", name: "Living Room.jpg", type: "file", fileType: "jpg", verificationStatus: "Not Verified", owner: "Me", lastModified: "2024-07-27", size: "1.1 MB", parentId: "folder_photos_prop1" },
  { id: "f8", name: "Archive.zip", type: "file", fileType: "zip", verificationStatus: "Not Verified", owner: "Me", lastModified: "2024-07-25", size: "15.3 MB", parentId: "root" },
  { id: "f9", name: "Miscellaneous Doc.txt", type: "file", fileType: "other", verificationStatus: "Not Verified", owner: "Riya S.", lastModified: "2024-07-24", size: "50 KB", parentId: "root" },
];

const getVerificationBadge = (status: VerificationStatus) => {
  switch (status) {
    case "Verified":
      return {
        badge: <Badge className="bg-green-100 text-green-700 border-green-300 hover:bg-green-200 dark:bg-green-700/20 dark:text-green-300 dark:border-green-600"><ShieldCheck className="h-3.5 w-3.5 mr-1" /> Verified</Badge>,
        tooltip: "TerraSecure™ AI has verified this document's authenticity and compliance. No issues found."
      };
    case "Issues Found":
      return {
        badge: <Badge className="bg-amber-100 text-amber-700 border-amber-300 hover:bg-amber-200 dark:bg-amber-700/20 dark:text-amber-300 dark:border-amber-600"><ShieldAlert className="h-3.5 w-3.5 mr-1" /> Issues Found</Badge>,
        tooltip: "TerraSecure™ AI has flagged potential risks. Click to view report."
      };
    case "In Progress":
      return {
        badge: <Badge className="bg-blue-100 text-blue-700 border-blue-300 hover:bg-blue-200 dark:bg-blue-700/20 dark:text-blue-300 dark:border-blue-600"><Clock className="h-3.5 w-3.5 mr-1 animate-spin" /> In Progress</Badge>,
        tooltip: "Verification by TerraSecure™ AI is currently in progress."
      };
    default: // Not Verified
      return {
        badge: <Badge variant="outline" className="border-slate-300 text-slate-600 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-400 dark:hover:bg-slate-700"><ShieldQuestion className="h-3.5 w-3.5 mr-1" /> Not Verified</Badge>,
        tooltip: "This document has not been submitted for TerraSecure™ AI verification."
      };
  }
};

const getFileIcon = (item: FileItem) => {
  if (item.type === "folder") return <Folder className="h-5 w-5 text-primary" />;
  switch (item.fileType) {
    case "pdf": return <FileText className="h-5 w-5 text-red-500" />;
    case "docx": return <FileText className="h-5 w-5 text-blue-500" />; // Using FileText as FileCode2 might be confusing
    case "xlsx": return <FileSpreadsheet className="h-5 w-5 text-green-500" />;
    case "jpg":
    case "png": return <FileImage className="h-5 w-5 text-purple-500" />;
    case "zip": return <FileArchive className="h-5 w-5 text-orange-500" />;
    default: return <FileText className="h-5 w-5 text-gray-500" />;
  }
};

type VerificationStepStatus = "pending" | "loading" | "success" | "warning";
interface VerificationChecklistItemProps {
  label: string;
  status: VerificationStepStatus;
}

const VerificationChecklistItem: React.FC<VerificationChecklistItemProps> = ({ label, status }) => {
  const Icon = status === "loading" ? Loader2 : status === "success" ? CheckCircle2 : status === "warning" ? XCircle : Clock;
  const color = status === "success" ? "text-green-600 dark:text-green-400" : status === "warning" ? "text-amber-600 dark:text-amber-400" : status === "pending" ? "text-muted-foreground/70" : "text-muted-foreground";

  return (
    <div className={cn("flex items-center text-sm py-1.5", color)}>
      <Icon className={cn("h-4 w-4 mr-2.5 shrink-0", status === "loading" && "animate-spin")} />
      {label}
    </div>
  );
};

const verificationStepsConfig: {label: string; id: string}[] = [
    {label: "Analyzing Document Layout...", id: "layout"},
    {label: "Cross-referencing Public Records...", id: "records"},
    {label: "Scanning for Clause Anomalies...", id: "anomalies"},
    {label: "Checking for Digital Tampering...", id: "tampering"},
];


export default function DocumentsPage() {
  const [selectedFolderId, setSelectedFolderId] = useState<string>("root");
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [verificationProgress, setVerificationProgress] = useState(0);
  const [currentVerificationStepIndex, setCurrentVerificationStepIndex] = useState(-1); // -1 means not started
  const [verificationStepStatuses, setVerificationStepStatuses] = useState<Record<string, VerificationStepStatus>>(
    verificationStepsConfig.reduce((acc, step) => ({...acc, [step.id]: 'pending'}), {})
  );
  const [overallVerificationMessage, setOverallVerificationMessage] = useState<string | null>(null);


  const { toast } = useToast();

  const handleFileUpload = () => {
    toast({ title: "File Upload", description: "File upload functionality coming soon." });
  };
  
  const handleFolderUpload = () => {
    toast({ title: "Folder Upload", description: "Folder upload functionality coming soon." });
  };

  const handleNewFolder = () => {
    const folderName = prompt("Enter new folder name:");
    if (folderName) {
      toast({ title: "Folder Created", description: `Folder "${folderName}" created (mock).` });
    }
  };

  const startMockVerification = () => {
    setIsVerifyModalOpen(true);
    setVerificationProgress(0);
    setCurrentVerificationStepIndex(0);
    setOverallVerificationMessage(null);
    
    const initialStatuses = verificationStepsConfig.reduce((acc, step) => ({...acc, [step.id]: 'pending'}), {});
    setVerificationStepStatuses(initialStatuses);

    let stepIndex = 0;
    const intervalTime = 1200; // ms per step

    const processStep = () => {
      if (stepIndex < verificationStepsConfig.length) {
        const currentStepId = verificationStepsConfig[stepIndex].id;
        
        // Set current to loading
        setVerificationStepStatuses(prev => ({...prev, [currentStepId]: 'loading'}));
        setCurrentVerificationStepIndex(stepIndex); // To update progress bar accurately for current step

        // Simulate processing time for this step
        setTimeout(() => {
          // Simulate success or warning for the completed step
          const isSuccess = Math.random() > 0.2; // 80% chance of success for demo
          setVerificationStepStatuses(prev => ({...prev, [currentStepId]: isSuccess ? 'success' : 'warning'}));
          
          // Update overall progress
          setVerificationProgress(((stepIndex + 1) / verificationStepsConfig.length) * 100);
          
          stepIndex++;
          processStep(); // Move to next step
        }, intervalTime);
      } else {
        // All steps done
        const hasWarnings = Object.values(verificationStepStatuses).includes('warning');
        if (hasWarnings) {
            setOverallVerificationMessage("Verification Complete. Potential issues found.");
             toast({ variant: "destructive", title: "Verification Complete!", description: "Potential issues found (mock)." });
        } else {
            setOverallVerificationMessage("Verification Complete! Document appears secure.");
            toast({ title: "Verification Complete!", description: "Document appears secure (mock)." });
        }
      }
    };
    processStep(); // Start the first step
  };
  
   useEffect(() => {
    if (currentVerificationStepIndex >= 0 && currentVerificationStepIndex < verificationStepsConfig.length) {
        const stepId = verificationStepsConfig[currentVerificationStepIndex].id;
        if (verificationStepStatuses[stepId] !== 'loading') { // If current step is not loading, start it
            setVerificationStepStatuses(prev => ({
                ...prev,
                [stepId]: 'loading'
            }));
        }
    }
  }, [currentVerificationStepIndex, verificationStepStatuses]); // Rerun when index changes

  const currentPath = useMemo(() => {
    const path = [];
    let currentId: string | null | undefined = selectedFolderId;
    while (currentId) {
      const folder = mockFolders.find(f => f.id === currentId);
      if (folder) {
        path.unshift({ id: folder.id, name: folder.name });
        currentId = folder.parentId;
      } else {
        currentId = null;
      }
    }
    return path;
  }, [selectedFolderId]);

  const displayedItems = useMemo(() => {
    const currentFolderItems = mockFolders.filter(item => item.parentId === selectedFolderId)
      .map(f => ({ ...f, type: 'folder', verificationStatus: 'Not Verified', owner: 'Me', lastModified: new Date().toISOString().split('T')[0] } as FileItem))
      .sort((a, b) => a.name.localeCompare(b.name));
    const currentFileItems = mockFiles.filter(item => item.parentId === selectedFolderId)
      .sort((a, b) => a.name.localeCompare(b.name));
    return [...currentFolderItems, ...currentFileItems];
  }, [selectedFolderId]);

  const FolderTreeItem: React.FC<{ folder: FolderItem; level: number }> = ({ folder, level }) => {
    const childFolders = mockFolders.filter(f => f.parentId === folder.id);
    return (
      <div style={{ paddingLeft: `${level * 0.5}rem` }}> {/* Reduced padding for tighter tree */}
        <Button
          variant={selectedFolderId === folder.id ? "secondary" : "ghost"}
          className={cn(
            "w-full justify-start h-9 px-2.5 text-sm font-normal hover:bg-accent dark:hover:bg-accent/70",
            selectedFolderId === folder.id 
              ? "bg-primary/10 text-primary hover:bg-primary/15 dark:bg-primary/20 dark:text-primary dark:hover:bg-primary/25 font-medium" 
              : "text-muted-foreground hover:text-foreground"
          )}
          onClick={() => setSelectedFolderId(folder.id)}
        >
          <Folder className="h-4 w-4 mr-2 shrink-0" />
          {folder.name}
        </Button>
        {childFolders.map(child => <FolderTreeItem key={child.id} folder={child} level={level + 1} />)}
      </div>
    );
  };

  return (
    <div className="container mx-auto">
      <PageHeader title="Documents">
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Plus className="mr-2 h-4 w-4" /> New
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleNewFolder}><FolderPlus className="mr-2 h-4 w-4"/>New Folder</DropdownMenuItem>
              <DropdownMenuItem onClick={handleFileUpload}><FileUp className="mr-2 h-4 w-4"/>File Upload</DropdownMenuItem>
              <DropdownMenuItem onClick={handleFolderUpload}><FolderUp className="mr-2 h-4 w-4"/>Folder Upload</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" onClick={startMockVerification}>
            <Sparkles className="mr-2 h-4 w-4" /> Verify Document
          </Button>
        </div>
      </PageHeader>

      <div className="flex flex-col md:flex-row gap-6">
        <Card className="w-full md:w-1/4 shadow-sm">
          <CardHeader className="p-3 border-b">
            <CardTitle className="text-sm font-semibold text-primary">My Drive</CardTitle>
          </CardHeader>
          <ScrollArea className="h-[calc(100vh-280px)] md:h-[calc(100vh-220px)]">
            <CardContent className="p-2">
              {mockFolders.filter(f => !f.parentId).map(rootFolder => (
                 <FolderTreeItem key={rootFolder.id} folder={rootFolder} level={0} />
              ))}
            </CardContent>
          </ScrollArea>
        </Card>

        <div className="flex-1">
          <Card className="shadow-sm">
            <CardHeader className="p-4 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-muted-foreground overflow-x-auto whitespace-nowrap pb-1">
                  {currentPath.map((p, index) => (
                    <React.Fragment key={p.id}>
                      <Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-primary dark:hover:text-primary" onClick={() => setSelectedFolderId(p.id)}>
                        {p.name}
                      </Button>
                      {index < currentPath.length - 1 && <ChevronRight className="h-4 w-4 mx-1 shrink-0" />}
                    </React.Fragment>
                  ))}
                </div>
                <div className="relative w-full max-w-xs ml-auto">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search in this folder..." className="pl-8 h-9" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[calc(100vh-310px)] md:h-[calc(100vh-250px)]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead className="w-[180px]">Verification Status</TableHead>
                      <TableHead className="hidden sm:table-cell w-[120px]">Owner</TableHead>
                      <TableHead className="hidden lg:table-cell w-[150px]">Last Modified</TableHead>
                      <TableHead className="hidden sm:table-cell w-[100px]">File Size</TableHead>
                      <TableHead className="w-[50px] text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {displayedItems.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                          This folder is empty.
                        </TableCell>
                      </TableRow>
                    )}
                    {displayedItems.map((item) => {
                      const { badge, tooltip } = getVerificationBadge(item.verificationStatus);
                      return (
                        <TableRow key={item.id} className="hover:bg-muted/50 dark:hover:bg-muted/30 cursor-pointer" onClick={() => item.type === 'folder' && setSelectedFolderId(item.id)}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getFileIcon(item)}
                              <span className="font-medium text-foreground truncate">{item.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>{badge}</TooltipTrigger>
                                <TooltipContent><p>{tooltip}</p></TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell text-muted-foreground">{item.owner}</TableCell>
                          <TableCell className="hidden lg:table-cell text-muted-foreground">{item.lastModified}</TableCell>
                          <TableCell className="hidden sm:table-cell text-muted-foreground">{item.size || "---"}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Preview</DropdownMenuItem>
                                <DropdownMenuItem>Share</DropdownMenuItem>
                                <DropdownMenuItem>Download</DropdownMenuItem>
                                {item.type === 'file' && item.verificationStatus === "Not Verified" && (
                                  <>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={startMockVerification}>
                                      <Sparkles className="mr-2 h-4 w-4 text-primary" /> Verify with TerraSecure™
                                    </DropdownMenuItem>
                                  </>
                                )}
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive focus:text-destructive dark:focus:text-red-400">Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={isVerifyModalOpen} onOpenChange={setIsVerifyModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center font-headline text-primary">
                <Sparkles className="h-5 w-5 mr-2"/>TerraSecure™ AI Verification
            </DialogTitle>
            <DialogDescription>
              Upload your document to begin the AI-powered verification process.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="h-32 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center bg-muted/50 cursor-pointer hover:border-primary">
              <UploadCloud className="h-10 w-10 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">Drag & drop file here, or click to select</p>
              <Input type="file" className="hidden" />
            </div>
            
            {currentVerificationStepIndex >= -1 && ( // Show progress and checklist if verification has started or is about to
                <div className="mt-4 space-y-2">
                    <Progress value={verificationProgress} className="w-full h-2 mb-3" />
                    {verificationStepsConfig.map((step, index) => (
                        <VerificationChecklistItem 
                            key={step.id}
                            label={step.label} 
                            status={verificationStepStatuses[step.id]}
                        />
                    ))}
                </div>
            )}

             {overallVerificationMessage && (
                <div className={cn("mt-4 p-3 rounded-md text-sm",
                    overallVerificationMessage.includes("issues found") 
                        ? "bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-700/20 dark:border-amber-600 dark:text-amber-300" 
                        : "bg-green-50 border-green-200 text-green-700 dark:bg-green-700/20 dark:border-green-600 dark:text-green-300"
                )}>
                    <h4 className="font-semibold">{overallVerificationMessage.startsWith("Verification Complete!") ? "Verification Complete!" : "Notice"}</h4>
                    <p>{overallVerificationMessage.substring(overallVerificationMessage.indexOf("!") + 1).trim() || overallVerificationMessage}</p>
                </div>
            )}

          </div>
          <DialogFooter className="mt-2">
            <Button variant="outline" onClick={() => setIsVerifyModalOpen(false)}>Cancel</Button>
            <Button 
              onClick={() => alert("View Full Report Clicked (Placeholder)")} 
              disabled={verificationProgress < 100 || overallVerificationMessage === null}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              View Full Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

    