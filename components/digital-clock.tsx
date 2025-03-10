'use client';

import { useState, useEffect, useMemo } from "react";
import { Card } from "@/components/card";
import { Button } from "@/components/ui/button";

export default function DigitalClock() {
    const [time, setTime] = useState<Date>(new Date());
    const [is24Hour, setIs24Hour] = useState<boolean>(true);
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
        setMounted(true);
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const formattedTime = useMemo<string>(() => {
 
        if (!mounted) return "";
        const hours = is24Hour
            ? time.getHours().toString().padStart(2, "0")
            : (time.getHours() % 12 || 12).toString().padStart(2, "0");
        const minutes = time.getMinutes().toString().padStart(2, "0");
        const seconds = time.getSeconds().toString().padStart(2, "0");
        return `${hours}:${minutes}:${seconds}`;
    }, [time, is24Hour, mounted]);

    return (
        <div className="flex items-center justify-center h-screen"
        style={{
            backgroundImage: "url('/cute-vintage-black-alarm-clocks-84bnnrso4uguwc6k.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
        }}
        >
            <Card className="p-8 shadow-lg rounded-2xl bg-gradient-to-br from-blue-400 via-yellow-400 to-green-400">
                <div className="flex flex-col items-center justify-center">
                    <div className="text-2xl font-bold tracking-tight">
                        Digital Clock
                    </div>
                    <div className="text-sm text-gray-700 dark:text-gray-400 mb-4">
                        Display current time in hours, minutes, and seconds.
                    </div>
                    <div className="text-6xl font-bold tracking-tight">
                        {formattedTime}
                    </div>
                    <div className="mt-4 flex items-center">
                        <Button
                        variant={is24Hour ? "default" : "outline"}
                        onClick={() => setIs24Hour(true)}
                        className="mr-2 font-bold"
                        >
                            24-Hour Format
                        </Button>
                        <Button
                        variant={!is24Hour ? "default" : "outline"}
                        onClick={() => setIs24Hour(false)}
                        className="mr-2 font-bold"
                        >
                            12-Hour Format
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}