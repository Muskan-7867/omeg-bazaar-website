import EditCategoryForm from "@/components/admin/category/components/EditCategoryForm";

interface PageProps {
  params: Promise<{ id: string | string[] }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const categoryId = Array.isArray(id) ? id[0] : id;

  return <EditCategoryForm categoryId={categoryId} />;
}
