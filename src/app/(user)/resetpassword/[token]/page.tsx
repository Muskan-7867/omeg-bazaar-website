import ResetPassword from "@/components/user/auth/login/ResetPassword";

interface ResetPasswordPageProps {
  params: Promise<{ token: string }>;
}

export default async function Page({ params }: ResetPasswordPageProps) {
  const { token } = await params;

  return <ResetPassword token={token} />;
}
