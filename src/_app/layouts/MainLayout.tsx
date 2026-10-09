import "@/src/_app/css/globals.css";
import { ChatList } from "@/src/widgets/chat-list-aside";
import { SideNav } from "@/src/widgets/side-nav";

export function MainLayout({ children }: LayoutProps<"/">) {
    return (
        <div className="flex flex-row overflow-clip">
            <SideNav />
            <ChatList />
            <main className="grow">
                {children}
            </main>
        </div>

    );
}
