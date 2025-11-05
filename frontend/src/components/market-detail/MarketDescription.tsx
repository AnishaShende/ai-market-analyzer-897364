import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, FileText } from 'lucide-react';

interface MarketDescriptionProps {
  description: string;
  website?: string;
}

export const MarketDescription = ({ description, website }: MarketDescriptionProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            <CardTitle>About</CardTitle>
          </div>
          {website && (
            <Button variant="outline" size="sm" asChild>
              <a href={website} target="_blank" rel="noopener noreferrer">
                Website
                <ExternalLink className="h-4 w-4 ml-1" />
              </a>
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};