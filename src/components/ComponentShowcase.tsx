// src/components/ComponentShowcase.tsx
"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils"; // cva often requires a utility like this for merging classes

// Your original imports
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Info } from "lucide-react"; // Import an icon for the tooltip

// 1. Create a custom button variant using 'cva'
const customButtonVariants = cva(
  // Base classes applied to all variants
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        // Here is our new, custom variant
        success: "bg-green-600 text-white hover:bg-green-700/90",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// Define props for our custom button, extending standard button attributes
interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof customButtonVariants> {}

// Create a custom button component that uses our cva variants
const CustomButton = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(customButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
CustomButton.displayName = "CustomButton";


// 2. Create some mock data to display in the table
const mockData = [
    { id: 'item-1', name: 'Premium Widget', status: 'Active', stock: 120 },
    { id: 'item-2', name: 'Standard Gizmo', status: 'Inactive', stock: 0 },
    { id: 'item-3', name: 'Deluxe Gadget', status: 'Active', stock: 75 },
];

// 3. Create the main, exportable component that uses everything
export default function ComponentShowcase() {
    return (
        <div className="p-4 sm:p-6 md:p-10 bg-background"> {/* Added bg-background for consistent theme */}
            <Card className="w-full max-w-2xl mx-auto shadow-xl">
                <CardHeader>
                    <CardTitle className="font-headline text-primary">Component Showcase</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="mb-6 text-muted-foreground">
                        This table demonstrates the use of the imported Shadcn UI components.
                    </p>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Item Name</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Stock</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockData.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">{item.name}</TableCell>
                                    <TableCell>{item.status}</TableCell>
                                    <TableCell>{item.stock}</TableCell>
                                    <TableCell className="flex items-center justify-end space-x-2">
                                        {/* Tooltip demonstration */}
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button variant="outline" size="icon">
                                                        <Info className="h-4 w-4" />
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>More information about {item.name}</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                        
                                        {/* Custom 'success' button using cva */}
                                        <CustomButton variant="success" size="sm">
                                            Order Now
                                        </CustomButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
