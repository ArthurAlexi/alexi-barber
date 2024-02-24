'use client'

import { Button } from "@/app/_components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { SearchIcon, icons } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";




const formSchema = z.object({
    search: z.string({
        required_error: "Required field"
    }).trim().min(1)
})

interface SearchProps {
    defaultValues ?: z.infer<typeof formSchema>
}

const Search = ({defaultValues} : SearchProps) => {

    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues
    })

    const handleSubmit = (data: z.infer<typeof formSchema>) => router.push(`/barbershops?search=${data.search}`)

    return (
        <div className="flex items-center gap-2">
            <Form {...form}>
                <form className="flex gap-4 w-full" onSubmit={form.handleSubmit(handleSubmit)}>
                    <FormField
                        control={form.control}
                        name="search"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <Input placeholder="Look for a barbershop ..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button variant={'default'} type="submit">
                        <SearchIcon size={18} />
                    </Button>
                </form>
            </Form>

        </div>
    );
}

export default Search