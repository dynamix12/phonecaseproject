import { db } from "@/db";
import { notFound } from "next/navigation";

interface PageProps {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}

const Page = async ({ searchParams }: PageProps) => {
  const params = await searchParams;
  const { id } = params;

  if (!id || typeof id !== "string") {
    return notFound();
  }

  const configuration = await db.configuration.findUnique({
    where: { id },
  });

  if (!configuration) {
    return notFound();
  }

  const { imageUrl, width, height } = configuration;

  return <DesignConfigurator />;
};

export default Page;
