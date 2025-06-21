export default function AuthLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return (
    <div className="">
      <div className="">{children}</div>
    </div>
  );

}