
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Search, Filter, Edit3, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

const clientsData = [
  { id: "1", name: "Alice Wonderland", email: "alice@example.com", phone: "555-1234", status: "Lead", lastContact: "2024-07-20", avatar: "https://placehold.co/40x40.png?text=AW" },
  { id: "2", name: "Bob The Builder", email: "bob@example.com", phone: "555-5678", status: "Prospect", lastContact: "2024-07-18", avatar: "https://placehold.co/40x40.png?text=BB" },
  { id: "3", name: "Charlie Brown", email: "charlie@example.com", phone: "555-8765", status: "Client", lastContact: "2024-07-22", avatar: "https://placehold.co/40x40.png?text=CB" },
  { id: "4", name: "Diana Prince", email: "diana@example.com", phone: "555-4321", status: "Lead", lastContact: "2024-07-21", avatar: "https://placehold.co/40x40.png?text=DP" },
];

export default function ClientsPage() {
  return (
    <div className="container mx-auto">
      <PageHeader title="Client Management" description="Manage your contacts, leads, and clients.">
        <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link href="/clients/new"><PlusCircle className="mr-2 h-4 w-4" /> Add New Client</Link>
        </Button>
      </PageHeader>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-xl">Client List</CardTitle>
          <CardDescription>View and manage all your clients and leads.</CardDescription>
          <div className="flex items-center gap-2 pt-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search clients..." className="pl-8" />
            </div>
            <Button variant="outline"><Filter className="mr-2 h-4 w-4" /> Filter</Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">Email</TableHead>
                <TableHead className="hidden lg:table-cell">Phone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Last Contact</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clientsData.map((client) => (
                <TableRow key={client.id} className="hover:bg-muted/50 transition-colors">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Image 
                        src={client.avatar} 
                        alt={client.name} 
                        width={40} 
                        height={40} 
                        className="rounded-full" 
                        data-ai-hint="person avatar" 
                      />
                      <span className="font-medium">{client.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{client.email}</TableCell>
                  <TableCell className="hidden lg:table-cell">{client.phone}</TableCell>
                  <TableCell>
                    <Badge variant={client.status === 'Client' ? 'default' : client.status === 'Prospect' ? 'secondary' : 'outline'}
                           className={cn(
                             client.status === 'Client' && 'bg-green-500/20 text-green-700 border-green-500/30',
                             client.status === 'Prospect' && 'bg-blue-500/20 text-blue-700 border-blue-500/30',
                             client.status === 'Lead' && 'bg-yellow-500/20 text-yellow-700 border-yellow-500/30'
                           )}
                    >
                      {client.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{client.lastContact}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                        <Edit3 className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
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
