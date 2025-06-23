"use client";

import { useState, FormEvent, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Paperclip, Send, Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { answerPropertyQuery, AnswerPropertyQueryInput } from '@/ai/flows/answer-property-query';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

let messageIdCounter = 0; // Initialize a counter for message IDs

export function TerraLeadChatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const addMessage = (text: string, sender: 'user' | 'bot') => {
    setMessages(prev => [...prev, { id: `msg-${messageIdCounter++}`, text, sender, timestamp: new Date() }]);
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollViewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
      if (scrollViewport) {
        scrollViewport.scrollTop = scrollViewport.scrollHeight;
      }
    }
  }, [messages]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userInput = input;
    addMessage(userInput, 'user');
    setInput('');
    setIsLoading(true);

    try {
      const aiInput: AnswerPropertyQueryInput = { query: userInput };
      const response = await answerPropertyQuery(aiInput);
      addMessage(response.answer, 'bot');
    } catch (error) {
      console.error("Error calling AI:", error);
      addMessage("Sorry, I'm having trouble responding right now. Please try again later.", 'bot');
      toast({
        variant: "destructive",
        title: "Chatbot Error",
        description: "Could not get a response from the AI.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Initial bot message
  useEffect(() => {
    addMessage("Hello! I'm TerraLead AI. How can I help you with your property search today?", 'bot');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div className="flex flex-col h-[400px] rounded-lg border bg-card shadow-sm">
      <div className="p-4 border-b flex items-center gap-3">
        <Avatar>
          <AvatarFallback><Bot className="text-primary" /></AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold font-headline text-primary">TerraLead AI</p>
          <p className="text-xs text-muted-foreground">Online</p>
        </div>
      </div>
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "flex items-end gap-2",
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              {msg.sender === 'bot' && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback><Bot className="text-primary h-5 w-5"/></AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  "max-w-[70%] rounded-lg px-3 py-2 text-sm shadow",
                  msg.sender === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                )}
              >
                <p>{msg.text}</p>
                <p className={cn(
                  "text-xs mt-1",
                  msg.sender === 'user' ? 'text-primary-foreground/70 text-right' : 'text-muted-foreground/70 text-left'
                )}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              {msg.sender === 'user' && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback><User className="text-muted-foreground h-5 w-5"/></AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-end gap-2 justify-start">
              <Avatar className="h-8 w-8">
                <AvatarFallback><Bot className="text-primary h-5 w-5"/></AvatarFallback>
              </Avatar>
              <div className="max-w-[70%] rounded-lg px-3 py-2 text-sm shadow bg-muted text-muted-foreground">
                <p className="animate-pulse">Typing...</p>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <form onSubmit={handleSubmit} className="border-t p-3 flex items-center gap-2">
        <Button variant="ghost" size="icon" type="button" className="text-muted-foreground">
          <Paperclip className="h-5 w-5" />
          <span className="sr-only">Attach file</span>
        </Button>
        <Input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1"
          disabled={isLoading}
          aria-label="Chat input"
        />
        <Button type="submit" size="icon" disabled={isLoading || !input.trim()} className="bg-primary hover:bg-primary/90">
          <Send className="h-5 w-5" />
          <span className="sr-only">Send message</span>
        </Button>
      </form>
    </div>
  );
}
