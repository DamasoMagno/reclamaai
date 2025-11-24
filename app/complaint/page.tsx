import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

export function ComplaintPage() {
  return (
    <div>
      <header>
        <h1>Complaint Page</h1>
        <nav>
          <Link href="/">Home</Link>
          <Link href="/complaint">Complaint</Link>
        </nav>
      </header>

      <main>
        <strong>Relate um problema em sua comunidade</strong>

        <form className="flex flex-col gap-4 w-64 mx-auto mt-20">
          <div>
            <div>
              <Label>Descreva o problema</Label>
              <Textarea />
            </div>
            <div>
              <div>
                <Label>Endereço</Label>
                <Textarea />
              </div>
              <div>
                <Label>Bairro</Label>
                <Textarea />
              </div>
            </div>
            <div>
              <Label>CEP</Label>
              <Textarea />
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
