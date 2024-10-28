import { requestMoreDetailsActions } from "@/actions/actionMoreDetails";
import Multimedia from "@/_components/Multimedia";

interface MovieDetailsProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata(props: MovieDetailsProps) {
  const params = await props.params;
  const { id } = params;
  return {
    title: `Movie ${id}`,
    description: `Details for movie ID ${id}`,
  };
}

export default async function MovieDetails(props: MovieDetailsProps) {
  const params = await props.params;
  const { id } = params;
  const data = await requestMoreDetailsActions(id);

  return <Multimedia data={data} />;
}
