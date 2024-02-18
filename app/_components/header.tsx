'use client'

import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import Link from "next/link";

const Header = () => {
    return (
        <header>
            <Card>
                <CardContent className="p-5 justify-between items-center flex flex-row">
                    <Link href="/">
                        <Image src="/logo.png" alt="FSW Barber" height={18} width={120} />
                    </Link>
                    <Button variant="outline" size="icon">
                        <MenuIcon size={16} />
                    </Button>
                </CardContent>
            </Card>
        </header>
    );
};

export default Header;