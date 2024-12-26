"use client";

import * as React from "react";
import { useCallback, useMemo } from "react";
import { format, getMonth, getYear, setMonth, setYear } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type DatePickerProps = {
    startYear?: number;
    endYear?: number;
    value?: Date;
    disabled?: boolean;
    onChange: (date?: Date) => void;
}

export function DatePicker(props: DatePickerProps) {
    const {
        startYear = getYear(new Date()) - 100,
        endYear = getYear(new Date()) + 100,
        value = new Date(),
        onChange,
        disabled = false
    } = props;

    const months = useMemo(() => {
        return Array.from({ length: 12 }, (_, i) => {
            const date = new Date(0, i); // Create a date with the month set to i
            return new Intl.DateTimeFormat("en-US", { month: "long" }).format(date);
        });
    }, []);

    const years = useMemo(() => {
        return Array.from(
            { length: endYear - startYear + 1 },
            (_, i) => startYear + i
        );
    }, [endYear, startYear]);

    const handleMonthChange = useCallback((month: string) => {
        const newDate = setMonth(value, months.indexOf(month));
        onChange(newDate);
    }, [value, onChange, months]);

    const handleYearChange = useCallback((year: string) => {
        const newDate = setYear(value, parseInt(year));
        onChange(newDate);
    }, [onChange, value]);

    const handleSelect = useCallback((selectedData?: Date) => {
        if (selectedData) {
            onChange(selectedData);
        }
    }, [onChange]);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="ghost"
                    disabled={disabled}
                    className={cn(
                        "justify-start text-left font-normal border border-border",
                        { "text-muted-foreground": !value }
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {value ? format(value, "PPP") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <div className="flex justify-between p-2">
                    <Select
                        onValueChange={handleMonthChange}
                        value={value ? months[getMonth(value)] : months[0]}
                    >
                        <SelectTrigger className="w-[110px]">
                            <SelectValue placeholder="Month" />
                        </SelectTrigger>
                        <SelectContent>
                            {months.map(month => (
                                <SelectItem key={month} value={month}>{month}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select
                        onValueChange={handleYearChange}
                        value={value ? getYear(value).toString() : getYear(0).toString()}
                    >
                        <SelectTrigger className="w-[110px]">
                            <SelectValue placeholder="Year" />
                        </SelectTrigger>
                        <SelectContent>
                            {years.map(year => (
                                <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <Calendar
                    mode="single"
                    selected={value}
                    onSelect={handleSelect}
                    initialFocus
                    month={value}
                    onMonthChange={onChange}
                />
            </PopoverContent>
        </Popover>
    );
}