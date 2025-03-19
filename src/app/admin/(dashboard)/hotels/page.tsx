import { Button } from "@/components/ui/button"
import { HotelsTable } from "@/components/hotels-table"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

export default function HotelsPage() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Hotels</h1>
        <Link href="/hotels/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Hotel
          </Button>
        </Link>
      </div>
      <HotelsTable />
    </div>
  )
}

