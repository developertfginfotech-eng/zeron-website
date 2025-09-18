import { MobileChat } from "@/components/mobile-chat";
import { useTranslation } from "@/hooks/use-translation";
import { MessageSquare, Users, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function MobileChatPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6 pb-20 mobile-enhanced">
      {/* Chat Header */}
      <Card className="mobile-card mobile-scale-in border-0 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-3 text-xl">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
              <MessageSquare className="h-6 w-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-bold">{t('live_chat')}</h1>
              <p className="text-sm text-muted-foreground">Connect with investment experts</p>
            </div>
            <Badge className="bg-green-100 text-green-700 border-green-200">
              <Users className="h-3 w-3 mr-1" />
              5 Online
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
              <p className="text-xs text-blue-700 font-medium mb-1">Expert Advisors</p>
              <p className="text-lg font-bold text-blue-800">12</p>
            </div>
            <div className="text-center p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
              <p className="text-xs text-green-700 font-medium mb-1">Response Time</p>
              <p className="text-lg font-bold text-green-800">&lt; 2min</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chat Interface */}
      <MobileChat />

      {/* AI Features Banner */}
      <Card className="mobile-card mobile-fade-in-up border-0 shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary/10 to-primary/20 rounded-full flex items-center justify-center">
              <Zap className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-sm">AI-Powered Chat</h3>
              <p className="text-xs text-muted-foreground">Smart responses & market insights</p>
            </div>
            <Badge variant="secondary" className="text-xs">
              Beta
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}