'use client'

import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { SearchIcon, icons } from "lucide-react";

const Search = () => {
    return (
        <div className="flex items-center gap-2">
            <Input placeholder="Look for a barbershop ..."/>
            <Button variant={'default'}>
                <SearchIcon size={18}/>
            </Button>
        </div>
    );
}

export default Search