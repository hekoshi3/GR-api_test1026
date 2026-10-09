import { Icon_Search } from "@/src/shared/ui/icons";
import { SubmitTel } from "../../model/submit-number";
import { useRouter } from "next/navigation";

export function Search() {
    const router = useRouter()
    const handleFormAction = async (formData: FormData) => {
        const phoneNumber = formData.get("phoneNumber") as string;
        const tel = phoneNumber.replace(/[^+\d]/g, '')
        if (tel.length === 11 || tel.length === 12) {
            try {
                const body = await SubmitTel(Number(tel));
                if (body.exist) {
                    router.replace(`/${body.chatId}`)
                }
            } catch (e) {
                return
            }
        }

    };
    return (
        <div className="w-full min-w-30 shrink-0">
            <form action={handleFormAction} className="bg-search-bg rounded-xl grid grid-cols-4 mx-4 py-1">
                <input inputMode="numeric" type="tel" id="phoneNumber" name="phoneNumber" placeholder="Input number" className="focus:outline-0 col-start-1 col-end-4 px-2" />
                <div className="flex justify-end px-2">
                    <button type="submit" className="cursor-pointer bg-accent w-7 h-7 flex items-center justify-center rounded-2xl shrink-0">
                        <Icon_Search className="p-1" />
                    </button>
                </div>
            </form>
        </div>
    );
}