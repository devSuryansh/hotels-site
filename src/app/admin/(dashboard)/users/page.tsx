import { Button } from "@/components/ui/button"
import { UsersTable } from "@/components/users-table"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

export default function UsersPage() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Users</h1>
        <Link href="/users/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </Link>
      </div>
      <UsersTable />
    </div>
  )
}

