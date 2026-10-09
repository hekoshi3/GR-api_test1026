import "@/src/_app/css/globals.css";

export default function AuthLayout({ children }: LayoutProps<"/">) {
  return (
    <main>{children}</main>
  )
}
