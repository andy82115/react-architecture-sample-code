import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const pushSearchPage = (repo?: String) => {
    if (repo) {
      router.push(`/search`);
    }
  };
  return (
    <div className="w-screen h-screen flex flex-col">
      <Button onClick={() => {
        pushSearchPage()
      }}>
        Goooooo Search Repository
      </Button>
    </div>
  );
}
