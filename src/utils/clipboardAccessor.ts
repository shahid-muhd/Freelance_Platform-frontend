import { useToast } from "@/components/ui/use-toast";

export default function useClipboard() {
  const { toast } = useToast();
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        description: "Copied to clipboard",
      });
    });
  };

  return {
    copyToClipboard,
  };
}
