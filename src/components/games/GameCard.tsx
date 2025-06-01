import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface GameCardProps {
  name: string;
  description: string;
  imgSrc: string;
  href: string;
  dataAiHint?: string;
}

export function GameCard({ name, description, imgSrc, href, dataAiHint }: GameCardProps) {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-primary/30 transition-all duration-300 flex flex-col h-full group">
      <CardHeader className="p-0">
        <div className="aspect-video relative overflow-hidden">
          <Image 
            src={imgSrc} 
            alt={name} 
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            data-ai-hint={dataAiHint || "game abstract"}
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-xl font-semibold mb-1 group-hover:text-primary transition-colors">{name}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground line-clamp-2">{description}</CardDescription>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground group-hover:shadow-lg group-hover:shadow-primary/50 transition-shadow">
          <Link href={href}>
            Play Now <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
