import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Calendar } from "@/components/ui/calendar";
import { Settings, Calendar as CalIcon, Activity } from 'lucide-react';

export default function Artifact() {
  const [date, setDate] = useState(new Date());
  const [volume, setVolume] = useState([50]);

  return (
    <div className="p-8 flex justify-center bg-slate-50 min-h-screen">
      <Card className="w-[450px] shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="text-blue-600" />
            Control Center
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="settings" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
            </TabsList>
            
            <TabsContent value="settings" className="space-y-6">
              <div className="space-y-2 p-4 border rounded-lg bg-slate-50/50">
                <div className="flex justify-between">
                  <span className="font-medium text-sm">System Volume</span>
                  <span className="text-sm text-slate-500">{volume}%</span>
                </div>
                <Slider 
                  defaultValue={[50]} 
                  max={100} 
                  step={1} 
                  value={volume} 
                  onValueChange={setVolume}
                  className="py-4"
                />
              </div>
              <Button className="w-full">Save Changes</Button>
            </TabsContent>
            
            <TabsContent value="schedule" className="flex flex-col items-center">
              <div className="border rounded-md p-2 bg-white mb-4">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
              </div>
              <p className="text-sm text-slate-500">
                Selected: {date?.toDateString()}
              </p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}